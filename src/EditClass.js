
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
import { obtainClassesAPICall } from './API';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import {updateClassAPICall} from './API.js';

function EditClass() {

  const [data, setData] = useState([]);
  const [emails,setEmails] = useState([]);
  const [additionalEmails, setAdditionalEmails] = useState('');
  const [counter, setCounter] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState();
  const { user } = useContext(AuthContext);

  const saveClass = async () => {
    if(selectedIndex >= 0) {
      let class_detail = {};
      class_detail.class_id = data[selectedIndex].id;
      class_detail.class_name = data[selectedIndex].class_name;
      class_detail.email_ids = cleanEmails(emails.join(',')+','+additionalEmails);
      await updateClassAPICall(user,class_detail);
      setCounter(counter+1);
      await fetchData();
    }
  }

  const cleanEmails = (emailString) => {
    return emailString
      .split(',') // Split the string by commas
      .map(email => email.trim()) // Trim any leading/trailing whitespace from each part
      .filter(email => email !== '') // Filter out any empty strings
      .join(', '); // Join the parts back together with a single comma and space
  };

  const handleDelete = (emailIndex) => {
    emails.splice(emailIndex, 1);
    setCounter(counter+1);
  };


  const handleChange = (event) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].class_name === event.target.value) {
        setEmails(data[i].email_ids.split(','));
        setSelectedIndex(i);
      }
    }
    console.log(event.target.value);
  };

  const fetchData = async () => {
    //const response = await fetch('./classes.json');
    const response = await obtainClassesAPICall(user);
    setData(response);
    setEmails(response[selectedIndex]?.email_ids.split(','));
    setAdditionalEmails('');
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (data && data.length > 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px', width: '250px', marginTop:'10px'}}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Class Name</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedIndex >= 0 ? data[selectedIndex].class_name : ""}
              label="ClassName"
              onChange={handleChange}
            >
              {data.map(myClass => (
                <MenuItem key={myClass.id} value={myClass.class_name}>
                  {myClass.class_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px', width: '400px'}}>
        <List>
        { selectedIndex >= 0 && emails && emails.map((option, index)=> (
          option && option.length > 0 ?
           <ListItem key={index}
           secondaryAction={
             <IconButton edge="end" aria-label="delete">
               <DeleteIcon  onClick={() => handleDelete(index)}/>
             </IconButton>
           }
         >
           <ListItemText
             primary={option}
           />
         </ListItem>
          : <></>
          )) }
             
            </List>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
        { data[selectedIndex] && 
        <TextField
          multiline
          style={{width:'400px'}}
          label="Additional Student Email Whitelist"
          id="outlined-size-small"
          size="small"
          value={additionalEmails}
          onChange={e => setAdditionalEmails(e.target.value)}
         />
        }
      </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <Button variant="contained" onClick={saveClass}>Save Class</Button>
        </div>
      </div>
    );
  } else {
    return (<></>);
  }
}

export default EditClass;
