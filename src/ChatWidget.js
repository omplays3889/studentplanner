import React, { useState } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import AgentInterface from './AgentInterface';

function ChatWidget({ 
  // Configuration props
  config = {},
  title = "AI Assistant",
  dataContext = {},
  user = null,
  onProcessMessage = null,
  welcomeMessage = "Hello! How can I help you today?",
  placeholder = "Type your message...",
  // UI customization
  fabPosition = { bottom: 16, right: 16 },
  dialogSize = "md",
  dialogHeight = "600px"
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Floating Action Button */}
      <Fab 
        color="primary" 
        onClick={handleOpen}
        sx={{ 
          position: 'fixed', 
          bottom: fabPosition.bottom, 
          right: fabPosition.right,
          zIndex: 1000
        }}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth={dialogSize} 
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            height: dialogHeight,
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          {title}
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent
          sx={{
            padding: 0,
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <AgentInterface 
            config={config}
            dataContext={dataContext}
            user={user}
            onProcessMessage={onProcessMessage}
            welcomeMessage={welcomeMessage}
            placeholder={placeholder}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChatWidget; 