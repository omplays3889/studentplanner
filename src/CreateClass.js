
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

function CreateClass() {

  const [name, setName] = useState('');
  const [emails, setEmails] = useState('');

  const createClass = () => {
    alert("Creating Class : "+ name);
    alert("Emails: "+ emails);
  }

  return (

    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop:'20px' }}>
        <TextField
          label="Class Name"
          id="outlined-size-small"
          size="small"
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
      <TextField
          multiline
          style={{width:'450px'}}
          label="Student Email Whitelist"
          id="outlined-size-small"
          size="small"
          onChange={e => setEmails(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop:'20px' }}>
      <Button variant="contained" onClick={createClass}>Create Class</Button>
      </div>
    </div>
  );
}

export default CreateClass;
