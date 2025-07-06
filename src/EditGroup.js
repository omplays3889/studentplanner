
import './App.css';
import { React, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { obtainGroupsAPICall, deleteGroupAPICall, updateGroupAPICall } from './API.js';
import { useContext } from 'react';
import { AuthContext } from './AuthContext.js';
import AlertMassage from './AlertMessage.js';
import { checkEmails } from './Utils.js';

function EditGroup() {

  const [data, setData] = useState([]);
  const [emails, setEmails] = useState([]);
  const [additionalEmails, setAdditionalEmails] = useState('');
  const [counter, setCounter] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState();
  const { user } = useContext(AuthContext);
  const [status, setStatusBase] = useState("");

  const deleteGroup = async () => {
    if (selectedIndex > 0) {
      let group_detail = {};
      group_detail.group_id = data[selectedIndex].id;
      setSelectedIndex(0);
      await deleteGroupAPICall(user, group_detail);
      setStatusBase({ type: "info", msg: "Group successfully deleted.", key: Math.random() });
    }
  }

  const saveGroup = async () => {
    if (selectedIndex >= 0) {
      const result = checkEmails(emails.join(',') + ',' + additionalEmails);
      if (result.allValid) {
        let refinedEmails = result.emails;
        if (refinedEmails.length > 0) {
          if (refinedEmails.length < 7999) {
            let group_detail = {};
            group_detail.group_id = data[selectedIndex].id;
            group_detail.group_name = data[selectedIndex].group_name;
            group_detail.email_ids = refinedEmails;
            await updateGroupAPICall(user, group_detail);
            setCounter(counter + 1);
            await fetchData();
            setStatusBase({ type: "info", msg: "Group successfully saved.", key: Math.random() });
          } else {
            setStatusBase({ type: "error", msg: "Total chars in emails list exceeded 8000 chars.", key: Math.random() });
          }
        } else {
          setStatusBase({ type: "error", msg: "Your group does not have any email.", key: Math.random() });
        }
      } else {
        setStatusBase({ type: "error", msg: "Additional Emails field value is not valid.", key: Math.random() });
      }
    }
  }

  const cleanEmails = (emailString) => {
    return emailString
      .split(',') // Split the string by commas
      .map(email => email.trim()) // Trim any leading/trailing whitespace from each part
      .filter(email => email !== '') // Filter out any empty strings
      .join(','); // Join the parts back together with a single comma and space
  };

  const handleDelete = (emailIndex) => {
    emails.splice(emailIndex, 1);
    setCounter(counter + 1);
  };


  const handleChange = (event) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === event.target.value) {
        setEmails(data[i].email_ids.split(','));
        setSelectedIndex(i);
      }
    }
  };

  const fetchData = async () => {
    const response = await obtainGroupsAPICall(user);
    setData(response);
    setEmails(response[selectedIndex]?.email_ids.split(','));
    setAdditionalEmails('');

    if(response.length <= 0) {
      setStatusBase({ type: "error", msg: "No Group available, please create a Group.", key: Math.random() });
    }
  }

  useEffect(() => {
    fetchData();
  }, [selectedIndex]);

  if (data && data.length > 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px', width: '250px', marginTop: '10px' }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel sx={{ fontSize: '14px' }} id="demo-select-small-label">Group Name</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedIndex >= 0 ? data[selectedIndex].id : ""}
              label="GroupName"
              sx={{ fontSize: '14px' }}
              onChange={handleChange}
            >
              {data.map(myGroup => (
                <MenuItem sx={{ fontSize: '14px' }} key={myGroup.id} value={myGroup.id}>
                  {myGroup.group_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px', width: '400px' }}>
          <List>
            {selectedIndex >= 0 && emails && emails.map((option, index) => (
              option && option.trim().length > 0 ?
                <ListItem key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => handleDelete(index)} />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primaryTypographyProps={{
                      style: { fontSize: '14px' },
                    }}
                    primary={option}
                  />
                </ListItem>
                : <></>
            ))}

          </List>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          {data[selectedIndex] &&
            <TextField
              multiline
              style={{ width: '450px' }}
              label="Additional Students Emails Whitelist"
              id="outlined-size-small"
              size="small"
              value={additionalEmails}
              helperText="Enter student emails seperated by coma"
              InputLabelProps={{
                style: { fontSize: '14px' },
              }}
              inputProps={{
                style: { fontSize: '14px', minHeight: '150px' },
              }}
              onChange={e => setAdditionalEmails(e.target.value)}
            />
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <Button variant="contained" style={{ marginRight: '30px' }} onClick={saveGroup}>Save Group</Button>
          {selectedIndex >= 0 && data[selectedIndex].group_name !== 'Independent'?
          <Button variant="contained" onClick={deleteGroup}>Delete Group</Button> : 
          <Button variant="contained" disabled onClick={deleteGroup}>Delete Group</Button>}
        </div>
        {status ? <AlertMassage key={status.key} message={status.msg} type={status.type} /> : null}
      </div>
    );
  } else {
    return (<></>);
  }
}

export default EditGroup;
