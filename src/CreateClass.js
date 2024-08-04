
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Alert from '@mui/material/Alert';
import { createClassAPICall } from './API.js';
import AlertMassage from './AlertMessage.js';
import {checkEmails} from './Utils.js';

function CreateClass() {

  const [name, setName] = useState('');
  const [emails, setEmails] = useState('');
  const { user } = useContext(AuthContext);
  const [status, setStatusBase] = useState("");


  const createClass = async () => {
    const result = checkEmails(emails);

    if (name && name.length > 0 && result.allValid) {
      let class_detail = {};
      class_detail.class_name = name;
      class_detail.email_ids = result.emails;
      await createClassAPICall(user, class_detail);
      setName('');
      setEmails('');
      setStatusBase({ type: "info", msg: "Class successfully created.", key: Math.random() });
    } else {
      setStatusBase({ type: "error", msg: "Class Name or Students Emails are not valid.", key: Math.random() });
    }
  }

  return (

    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
        <TextField
          label="Class Name"
          id="outlined-size-small"
          size="small"
          value={name}
          InputLabelProps={{
            style: { fontSize: '14px' },
          }}
          inputProps={{
            maxLength: 254,
            style: { fontSize: '14px' },
          }}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
        <TextField
          multiline
          style={{ width: '450px' }}
          label="Students Emails Whitelist"
          id="outlined-size-small"
          size="small"
          value={emails}
          onChange={e => setEmails(e.target.value)}
          helperText="Enter students emails seperated by a coma"
          InputLabelProps={{
            style: { fontSize: '14px' },
          }}
          inputProps={{
            maxLength: 7999,
            style: { fontSize: '14px', minHeight: '150px' },
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
        <Button variant="contained" onClick={createClass}>Create Class</Button>
      </div>
      {status ? <AlertMassage key={status.key} message={status.msg} type={status.type} /> : null}
    </div>
  );
}

export default CreateClass;
