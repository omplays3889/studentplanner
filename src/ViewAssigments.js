
import './App.css';
import { React, useState, useEffect } from 'react';
import { Button,  FormHelperText} from '@mui/material';
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
import { obtainAssignmentsAPICall, deleteAssignmentAPICall, obtainClassesAPICall } from './API';
import AlertMassage from './AlertMessage.js';
import {Divider, Box} from '@mui/material';
import { Chip } from '@mui/material';

const ZoneLegend = () => (
  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
    <Chip label="Red Zone: Past Due Date" sx={{ backgroundColor: 'indianred', color: 'white' }} />
    <Chip label="Coral Zone: Due in 1-5 days" sx={{ backgroundColor: 'coral', color: 'white' }} />
    <Chip label="Blue Zone: Due in 5+ days" sx={{ backgroundColor: '#1e88e5', color: 'white' }} />
  </Box>
);

const { DateTime } = require("luxon");

function ViewAssignments() {

  const { user} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [deletedAssignments, setDeletedAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [assignmentClasses, setAssignmentClasses] = useState([]);
  const [assignmentsExists, setAssignmentsExists] = useState(false);
  const [counter, setCounter] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState();
  const [status, setStatusBase] = useState("");

  const getColor = (duedate) => {
    const dueDate = DateTime.fromISO(duedate, { zone: 'America/Los_Angeles' });
    const now = DateTime.now().setZone('America/Los_Angeles');

    const diffInDays = dueDate.diff(now, 'days').days;

    if (diffInDays <= 0) {
        return "indianred";
    } else if (diffInDays > 0 && diffInDays <= 5) {
        return "coral";
    } else if (diffInDays > 5) {
        return "rgb(21, 100, 255)";
    } else {
        return "black";
    }
}

  const saveChanges = async () => {
    deletedAssignments.forEach(async (id) => {
      await deleteAssignmentAPICall(user, id);
    })
    setDeletedAssignments([]);
    setStatusBase({type: "info", msg: "Assignments successfully saved.", key: Math.random() });
  }

  const handleDelete = (index) => {
    deletedAssignments.push(data[index].id);
    data.splice(index, 1);
    setCounter(counter+1);
  };


  const handleChange = (event) => {
    fetchData();
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].id === event.target.value) {
        setSelectedIndex(i);
        assignmentClasses.map(cls =>  {if(cls.id == classes[i].id) {
          setAssignmentsExists(true);
        }
      });

      }
    }
  };

  const fetchData = async () => {
    const response = await obtainAssignmentsAPICall(user);
    const jsonData = response;
    const jsonClasses = [];
    const jsonIds = [];
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonIds.includes(jsonData[i].class_id) == false) {
        jsonIds.push(jsonData[i].class_id);
        let jsonClass = {
          id: jsonData[i].class_id,
          name: jsonData[i].class_name
        }
        jsonClasses.push(jsonClass);
      }
    }

    const classesResponse = await obtainClassesAPICall(user);
    setClasses(classesResponse);
    setAssignmentClasses(jsonClasses);
    setData(jsonData);
    setDeletedAssignments([]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (data && classes) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px', width: '250px', marginTop:'10px'}}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel sx={{fontSize:'14px'}} id="demo-select-small-label">Group Name</InputLabel>
            <Select
              sx={{fontSize:'14px'}}
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedIndex >= 0 ? classes[selectedIndex].id : ""}
              label="ClassName"
              onChange={handleChange}
            >
              {classes.map(myClass => (
                <MenuItem sx={{fontSize:'14px'}} key={myClass.id} value={myClass.id}>
                  {myClass.class_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px', width: '550px'}}>
        {!assignmentsExists && (
          <FormHelperText style={{ marginLeft: '12px' }}>
              No assignment exists for the selected Group.
          </FormHelperText>
        )}
        <List>
        { data && selectedIndex>=0 && data.map((assignment, index)=> (
          assignment.class_id == classes[selectedIndex].id ?
          <div>
          <div style={{  marginLeft:'14px', fontSize:'14px', color:getColor(assignment.duedate), fontWeight:'bold'}}>
          {new Date(assignment.duedate).toLocaleString('en-US', {
            timeZone: 'America/Los_Angeles',  // Specify PST time zone
            year: 'numeric',                  // Display full year
            month: 'short',                   // Display abbreviated month name (e.g., Jan, Feb, etc.)
            day: 'numeric',                   // Display day of the month
            hour: 'numeric',                  // Display hours in 12-hour format
            minute: 'numeric',                // Display minutes
            hour12: true                      // Use AM/PM
          })}
          </div>
           <ListItem key={index}
           secondaryAction={
            assignment.owner_email_id === user.email_id ?
             <IconButton edge="end" aria-label="delete">
               <DeleteIcon  onClick={() => handleDelete(index)}/>
             </IconButton>
             : <></>
           }
         >
           <ListItemText
           primaryTypographyProps={{
            style: {fontSize: '14px'},
              }}
             primary={assignment.title}
             secondary={assignment.details}
           />
         </ListItem>
         <Box my={1}>
                  <Divider />
                </Box>
          </div> : <></>
          )) }
             
            </List>
        </div>
        <ZoneLegend />
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <Button variant="contained" onClick={saveChanges}>Save Changes</Button>
        </div>
        {status ? <AlertMassage key={status.key} message={status.msg} type={status.type} /> : null}
      </div>
    );
  } else {
    return (<></>);
  }
}

export default ViewAssignments;
