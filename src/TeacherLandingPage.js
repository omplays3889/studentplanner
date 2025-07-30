
import './App.css';
import Header from './Header';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import {useState, useEffect } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import CreateGroup from './CreateGroup';
import EditGroup from './EditGroup';
import CreateAssignment from './CreateAssignment';
import ViewAssignments from './ViewAssigments';
import ChatWidget from './ChatWidget';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { createStudentPlannerLLM } from './LLMService';
import { obtainAssignmentsAPICall, obtainGroupsAPICall } from './API';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function BasicTabs() {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Create Group" {...a11yProps(0)} />
          <Tab label="Edit Group" {...a11yProps(1)} />
          <Tab label="Create Assignment" {...a11yProps(2)} />
          <Tab label="View Assignments" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
       <CreateGroup/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <EditGroup/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CreateAssignment/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ViewAssignments/>
      </CustomTabPanel>
    </Box>
  );
}
function TeacherLandingPage() {
  const { user} = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);

  const refreshData = React.useCallback(async () => {
    if (user?.email_id) {
      const assignmentsResult = await obtainAssignmentsAPICall(user);
      const groupsResult = await obtainGroupsAPICall(user);
      
      if (assignmentsResult !== "ERROR") setAssignments(assignmentsResult);
      if (groupsResult !== "ERROR") setClasses(groupsResult);
    }
  }, [user?.email_id]);

  // Initialize data on mount
  React.useEffect(() => {
    refreshData();
  }, [user?.email_id, refreshData]);

  // Create LLM service for student planner
  const createMessageProcessor = () => {
    const ApiService = (import('./API')).default;
    const llmService = createStudentPlannerLLM(assignments, classes, ApiService);
    return async (inputMessage, dataContext, user, config) => {
      return await llmService.processUserMessage(inputMessage, user);
    };
  };

  // Chat configuration
  const chatConfig = {
    onRefreshData: refreshData
  };

  const chatDataContext = {
    assignments,
    classes
  };

  return (

    <div style={{ width: '100%', overflowX: 'hidden', height: '100%' }}>
      <Header>
      </Header>
      <div style={{ display: 'flex', marginTop: '20px', width: '100%', height: '80%', justifyContent: 'center' }}>
        <BasicTabs />
      </div>
      <ChatWidget 
        config={chatConfig}
        title="Student Planner Assistant"
        dataContext={chatDataContext}
        user={user}
        onProcessMessage={createMessageProcessor()}
        welcomeMessage={`Hello! I can help you with your student planner:\n• Create assignments: "Create assignment Math Quiz for Algebra due tomorrow"\n• View assignments: "Show assignments due today"\n• Create groups: "Create group Physics 101"\n• View groups: "Show my groups"`}
        placeholder="Ask me about assignments and groups..."
      />

    </div>

  );
}

export default TeacherLandingPage;
