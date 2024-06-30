
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Alert from '@mui/material/Alert';
import {createClassAPICall} from './API.js';
import AlertMassage from './AlertMessage.js';

function CreateClass() {

  const [name, setName] = useState('');
  const [emails, setEmails] = useState('');
  const {user} = useContext(AuthContext);
  const [status, setStatusBase] = useState("");

  const createClass = async () => {
    if(name && name.length > 0 && emails && emails.length > 0) {
      let class_detail = {};
      class_detail.class_name = name;
      class_detail.email_ids = emails;
      await createClassAPICall(user, class_detail);
      setName('');
      setEmails('');
    } else {
      setStatusBase({ msg: "Class Name and Students Emails are mandatory fields.", key: Math.random() });
    }
  }

  return (

    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop:'20px' }}>
        <TextField
          label="Class Name"
          id="outlined-size-small"
          size="small"
          value={name}
          InputLabelProps={{
            style: {fontSize: '14px'},
           }}
          inputProps={{
            style: {fontSize: '14px'},
           }}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
      <TextField
          multiline
          style={{width:'450px'}}
          label="Students Emails Whitelist"
          id="outlined-size-small"
          size="small"
          value={emails}
          onChange={e => setEmails(e.target.value)}
          helperText="Enter students emails seperated by coma"
          InputLabelProps={{
            style: {fontSize: '14px'},
           }}
          inputProps={{
            style: {fontSize: '14px', minHeight: '150px'},
           }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop:'20px' }}>
      <Button variant="contained" onClick={createClass}>Create Class</Button>
      </div>
      {status ? <AlertMassage key={status.key} message={status.msg} /> : null}
    </div>
  );
}

export default CreateClass;
