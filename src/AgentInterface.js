import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Send as SendIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  VolumeUp as SpeakerIcon,
  VolumeOff as SpeakerOffIcon
} from '@mui/icons-material';

function AgentInterface({ 
  // Configuration props
  config = {},
  // Data props
  dataContext = {},
  // User context
  user = null,
  // Custom message processor
  onProcessMessage = null,
  // UI customization
  welcomeMessage = "Hello! How can I help you today?",
  placeholder = "Type your message...",
  height = "100%"
}) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [recognition, setRecognition] = useState(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = () => {
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([{
      id: 1,
      sender: 'agent',
      text: welcomeMessage,
      timestamp: new Date().toLocaleTimeString()
    }]);
  }, [welcomeMessage]);

  // Simple text-to-speech function
  const speak = (text) => {
    if (voiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognition.start();
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let response;
      
      if (onProcessMessage) {
        // Use custom message processor
        response = await onProcessMessage(inputMessage, dataContext, user, config);
      } else {
        // Default response
        response = { message: "I'm not configured to process messages yet." };
      }
      
      const agentMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        text: response.message || response,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, agentMessage]);
      
      // Speak the response if voice is enabled
      if (voiceEnabled) {
        speak(agentMessage.text);
      }
      
      // Call refresh callback if provided
      if (config.onRefreshData) {
        await config.onRefreshData();
      }
      
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ height, display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5' }}>
      {/* Header with voice controls */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 1, 
        bgcolor: 'white',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Typography variant="caption" color="text.secondary">
          Voice {voiceEnabled ? 'On' : 'Off'}
        </Typography>
        <Tooltip title={voiceEnabled ? 'Disable voice output' : 'Enable voice output'}>
          <IconButton 
            size="small" 
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            color={voiceEnabled ? 'primary' : 'default'}
          >
            {voiceEnabled ? <SpeakerIcon /> : <SpeakerOffIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: '70%',
                backgroundColor: message.sender === 'user' ? '#1976d2' : '#ffffff',
                color: message.sender === 'user' ? 'white' : 'black'
              }}
            >
              <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                {message.text}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7, mt: 1, display: 'block' }}>
                {message.timestamp}
              </Typography>
            </Paper>
          </Box>
        ))}
        
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} />
              <Typography variant="body2">Thinking...</Typography>
            </Paper>
          </Box>
        )}
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={isLoading}
            size="small"
          />
          
          {/* Microphone Button */}
          <Tooltip title={isListening ? 'Stop listening' : 'Start voice input'}>
            <IconButton
              onClick={handleVoiceInput}
              disabled={isLoading}
              color={isListening ? 'error' : 'default'}
              sx={{
                backgroundColor: isListening ? '#ffebee' : 'transparent',
                '&:hover': {
                  backgroundColor: isListening ? '#ffcdd2' : '#f5f5f5',
                }
              }}
            >
              {isListening ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
          </Tooltip>
          
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            sx={{ minWidth: 56 }}
          >
            <SendIcon />
          </Button>
        </Box>
        
        {isListening && (
          <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
            🎤 Listening... Speak now
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default AgentInterface; 