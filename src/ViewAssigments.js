
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
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function ViewAssignments() {

  const { user} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState();

  const handleDelete = (index) => {
    console.log("deleting.." + index);
    console.log("Selected index = "+selectedIndex);
    data.splice(index, 1);
    setCounter(counter+1);
    console.log("update state done");
  };


  const handleChange = (event) => {
    for (let i = 0; i < classes.length; i++) {
      if (classes[i] === event.target.value) {
        setSelectedIndex(i);
      }
    }
    console.log(classes[selectedIndex]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('./assigments_teacher.json');
      const jsonData = await response.json();
      const jsonClasses = [];
      for (let i = 0; i < jsonData.length; i++) {
        if (jsonClasses.includes(jsonData[i].class_name) == false) {
          jsonClasses.push(jsonData[i].class_name);
        }
      }
      setClasses(jsonClasses);
      setData(jsonData);
      console.log(jsonData);
    }
    fetchData();
  }, []);

  if (data) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px', width: '250px', marginTop:'10px'}}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Class Name</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedIndex >= 0 ? classes[selectedIndex] : ""}
              label="ClassName"
              onChange={handleChange}
            >
              {classes.map(myClass => (
                <MenuItem key={myClass} value={myClass}>
                  {myClass}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px', width: '500px'}}>
        <List>
        { data && data.map((assignment, index)=> (
          assignment.class_name === classes[selectedIndex] ?
           <ListItem key={index}
           secondaryAction={
            assignment.owner_email_id === user.email ?
             <IconButton edge="end" aria-label="delete">
               <DeleteIcon  onClick={() => handleDelete(index)}/>
             </IconButton>
             : <></>
           }
         >
           <ListItemText
             primary={assignment.duedate + " : " + assignment.title}
             secondary={assignment.details}
           />
         </ListItem> : <></>
          )) }
             
            </List>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <Button variant="contained">Save Changes</Button>
        </div>
      </div>
    );
  } else {
    return (<></>);
  }
}

export default ViewAssignments;
