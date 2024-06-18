

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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function CreateAssignment() {

  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState();

  const handleChange = (event) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].class_name === event.target.value) {
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




  if (data) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px', width: '250px', marginTop: '10px' }}>
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
        <div style={{marginLeft: '10px' , width: '275px'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer size='small' components={['DateTimePicker', 'DateTimePicker']}>
              <DateTimePicker
                label="Due Date"
                slotProps={{ textField: { size: 'small' } }}
                defaultValue={dayjs('2022-04-17T15:30')}
                size='small'
              />
            </DemoContainer>
          </LocalizationProvider>

        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', marginLeft: '10px' }}>
          <TextField
            label="Assignment Name"
            id="outlined-size-small"
            size="small"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', marginLeft: '10px' }}>
          <TextField
            multiline
            style={{ width: '450px' }}
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
