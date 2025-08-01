import Groq from 'groq-sdk';
import config from './Config';
import { createAssignmentAPICall, createGroupAPICall, obtainGroupsAPICall } from './API';

// Initialize Groq client
let groq = null;
const initGroq = () => {
  if (!groq) {
    const apiKey = config.groqApiKey;
    if (!apiKey || apiKey === 'your_groq_api_key_here') {
      throw new Error('GROQ_API_KEY not configured');
    }
    groq = new Groq({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
  }
  return groq;
};

// Generic LLM service that can be configured for any domain
export const createLLMService = (serviceConfig) => {
  const {
    systemPrompt,
    dataContext,
    actionHandlers
  } = serviceConfig;

  const processUserMessage = async (userInput, user) => {
    try {
      const groqClient = initGroq();
      
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.1,
        max_tokens: 300,
        response_format: { type: 'json_object' }
      });

      const response = JSON.parse(completion.choices[0]?.message?.content);
      
      // Handle actions using provided handlers
      if (actionHandlers[response.action]) {
        return await actionHandlers[response.action](response.parameters, dataContext, user);
      } else {
        return { message: response.response || "I can help you with the available commands." };
      }
    } catch (error) {
      console.error('LLM Service Error:', error);
      return { 
        message: "Sorry, I encountered an error. Please try again."
      };
    }
  };

  return { processUserMessage };
};

// Default student planner configuration
export const createStudentPlannerLLM = (assignments, groups) => {
  const systemPrompt = `You are a student planner assistant. You can:
1. CREATE_ASSIGNMENT - Create assignments for groups
2. VIEW_ASSIGNMENTS - Show assignments by date
3. CREATE_GROUP - Create new groups
4. VIEW_GROUPS - List all groups

Available groups: ${groups.map(c => c.group_name).join(', ')}

Actions you can perform:
1. CREATE_ASSIGNMENT - Create assignments for groups
2. VIEW_ASSIGNMENTS - Show assignments by date
3. CREATE_GROUP - Create new groups  
4. VIEW_GROUPS - List all groups

ALWAYS respond with valid JSON in this exact format:
{
  "action": "ACTION_NAME",
  "parameters": { /* extracted parameters */ },
  "response": "Human-friendly response"
}

DETAILED EXAMPLES:

User: "show me assignments tomorrow" 
Response: {
  "action": "VIEW_ASSIGNMENTS",
  "parameters": {
    "timeFilter": "tomorrow"
  },
  "response": "I'll show you assignments due tomorrow"
}

User: "assignments due today"
Response: {
  "action": "VIEW_ASSIGNMENTS", 
  "parameters": {
    "timeFilter": "today"
  },
  "response": "Here are today's assignments"
}

User: "what's due in 3 days"
Response: {
  "action": "VIEW_ASSIGNMENTS",
  "parameters": {
    "timeFilter": "in 3 days"
  },
  "response": "I'll show assignments due in 3 days"
}

User: "create assignment Math Quiz for Algebra due tomorrow"
Response: {
  "action": "CREATE_ASSIGNMENT",
  "parameters": {
    "assignmentName": "Math Quiz",
    "groupName": "Algebra", 
    "dueDate": "tomorrow"
  },
  "response": "I'll create the Math Quiz assignment for Algebra group"
}

User: "make group Physics 101"
Response: {
  "action": "CREATE_GROUP",
  "parameters": {
    "groupName": "Physics 101"
  },
  "response": "I'll create the Physics 101 group"
}

User: "show my groups"
Response: {
  "action": "VIEW_GROUPS",
  "parameters": {},
  "response": "Here are your groups"
}

PARAMETER EXTRACTION RULES:
- For VIEW_ASSIGNMENTS: Extract time words like "today", "tomorrow", "yesterday", "in X days", "next week"
- For CREATE_ASSIGNMENT: Extract assignment name, group name, and due date
- For CREATE_GROUP: Extract group name after words like "create", "make", "new"
- Always include "parameters" object, even if empty {}
- Map similar phrases: "assignments" = "VIEW_ASSIGNMENTS", "groups" = "VIEW_GROUPS"`;

  const actionHandlers = {

    CREATE_ASSIGNMENT: async (params, context, user) => {
      const { assignmentName, groupName, dueDate } = params;
      
      const group = context.groups.find(g => 
        g.group_name.toLowerCase().includes(groupName.toLowerCase()) ||
        groupName.toLowerCase().includes(g.group_name.toLowerCase())
      );
      
      if (!group) {
        return { message: `Group "${groupName}" not found. Available: ${context.groups.map(g => g.group_name).join(', ')}` };
      }

      const parsedDate = parseDueDate(dueDate);
      
      try {
        const assignmentDetail = {
          title: assignmentName,
          group_name: group.group_name,
          group_id: parseInt(group.group_id || group.id),
          details: `Created via AI on ${new Date().toLocaleDateString()}`,
          duedate: new Date(parsedDate).toISOString(),
          teacher_email: user.email_id
        };

        const result = await createAssignmentAPICall(user, assignmentDetail);
        
        if (result && result !== "ERROR") {
          return { message: `✅ Created "${assignmentName}" for ${group.group_name} due ${new Date(parsedDate).toLocaleDateString()}` };
        } else {
          return { message: `❌ Failed to create assignment` };
        }
      } catch (error) {
        return { message: `❌ Error: ${error.message}` };
      }
    },

    VIEW_ASSIGNMENTS: async (params, context, user) => {
      
      const { timeFilter } = params;
    
      const targetDate = calculateTargetDate(timeFilter);
      
      const filtered = context.assignments.filter(assignment => {
        const assignmentDate = new Date(assignment.duedate || assignment.due_date);
        return assignmentDate.toDateString() === targetDate.toDateString();
      });

      if (filtered.length === 0) {
        return { message: `📅 No assignments due ${timeFilter}` };
      }

      let response = `📅 Assignments due ${timeFilter}:\n\n`;
      filtered.forEach((assignment, index) => {
        response += `${index + 1}. ${assignment.title || assignment.assignment_name} (${assignment.group_name})\n`;
      });
      
      return { message: response };
    },

    CREATE_GROUP: async (params, context, user) => {
      const { groupName } = params;
      
      if (!groupName || groupName.length < 2) {
        return { message: "❌ Group name must be at least 2 characters" };
      }

      try {
        const groupDetail = {
          group_name: groupName,
          email_ids: user.email_id,
          teacher_email: user.email_id
        };

        const result = await createGroupAPICall(user, groupDetail);
        
        if (result && result !== "ERROR") {
          return { message: `✅ Created group "${groupName}"` };
        } else {
          return { message: `❌ Failed to create group` };
        }
      } catch (error) {
        return { message: `❌ Error: ${error.message}` };
      }
    },

    VIEW_GROUPS: async (params, context, user) => {
      try {
        const groups = await obtainGroupsAPICall(user);
        
        if (!groups || groups === "ERROR" || groups.length === 0) {
          return { message: "📋 No groups found. Create one: 'Create group Math 101'" };
        }

        let response = "📋 Your groups:\n\n";
        groups.forEach((group, index) => {
          const studentCount = group.email_ids ? group.email_ids.split(',').filter(e => e.trim()).length : 0;
          response += `${index + 1}. ${group.group_name} (${studentCount} students)\n`;
        });
        
        return { message: response };
      } catch (error) {
        return { message: `❌ Error fetching groups: ${error.message}` };
      }
    }
  };

  return createLLMService({
    systemPrompt,
    availableActions: ['CREATE_ASSIGNMENT', 'VIEW_ASSIGNMENTS', 'CREATE_GROUP', 'VIEW_GROUPS'],
    dataContext: { assignments, groups },
    actionHandlers
  });
};

// Helper functions
const parseDueDate = (dateString) => {
  const today = new Date();
  const lower = dateString.toLowerCase();
  
  if (lower.includes('today')) {
    return new Date(today);
  } else if (lower.includes('tomorrow')) {
    const result = new Date(today);
    result.setDate(today.getDate() + 1);
    return result;
  } else if (lower.includes('next week')) {
    const result = new Date(today);
    result.setDate(today.getDate() + 7);
    return result;
  }
  
  const daysMatch = lower.match(/in (\d+) days?/);
  if (daysMatch) {
    const days = parseInt(daysMatch[1]);
    const result = new Date(today);
    result.setDate(today.getDate() + days);
    return result;
  }

  const result = new Date(today);
  result.setDate(today.getDate() + 1);
  return result;
};

const calculateTargetDate = (timeFilter) => {
  const today = new Date();
  
  if (timeFilter === 'today') {
    return new Date(today);
  } else if (timeFilter === 'tomorrow') {
    const result = new Date(today);
    result.setDate(today.getDate() + 1);
    return result;
  } else if (timeFilter.startsWith('in ')) {
    const daysMatch = timeFilter.match(/in (\d+) days?/);
    if (daysMatch) {
      const days = parseInt(daysMatch[1]);
      const result = new Date(today);
      result.setDate(today.getDate() + days);
      return result;
    }
  }
  
  return new Date(today);
};

// Legacy export for backward compatibility
export const processUserMessage = async (userInput, assignments, groups, user) => {
  const llmService = createStudentPlannerLLM(assignments, groups);
  return await llmService.processUserMessage(userInput, user);
};

const LLMServiceModule = { createLLMService, createStudentPlannerLLM, processUserMessage };
export default LLMServiceModule; 