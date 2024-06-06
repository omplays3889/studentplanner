

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

function CreateAssignment() {

  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState();

  const handleChange = (event) => {
    for (let i = 0; i < data.teacher_classes.length; i++) {
      if (data.teacher_classes[i].name === event.target.value) {
        setSelectedIndex(i);
      }
    }
    console.log(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('./classes.json');
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    }
    fetchData();
  }, []);




  if (data.teacher_classes) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden', height: '100%' }}>
         <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px', width: '250px', marginTop:'10px'}}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Class Name</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedIndex >= 0 ? data.teacher_classes[selectedIndex].name : ""}
              label="ClassName"
              onChange={handleChange}
            >
              {data.teacher_classes.map(myClass => (
                <MenuItem key={myClass.id} value={myClass.name}>
                  {myClass.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop:'20px', marginLeft:'10px' }}>
        <TextField
          label="Assignment Name"
          id="outlined-size-small"
          size="small"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', marginLeft: '10px' }}>
      <TextField
          multiline
          style={{width:'450px'}}
          label="Assignment Details"
          id="outlined-size-small"
          size="small"
        />
      </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <Button variant="contained">Create Assignment</Button>
        </div>
      </div>
    );
  } else {
    return (<></>);
  }
}

export default CreateAssignment;
