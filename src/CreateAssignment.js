

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
import {obtainClassesAPICall} from './API.js';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function CreateAssignment() {

  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs('2022-04-17T15:30'));
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const { user } = useContext(AuthContext);

  const createAssignment = async () => {
    let assignment_detail = {};
    assignment_detail.class_name = data[selectedIndex]?.class_name;
    assignment_detail.class_id = data[selectedIndex]?.id;

    assignment_detail.title = name;
    assignment_detail.details = details;
    assignment_detail.duedate = selectedDateTime;

    alert(JSON.stringify(assignment_detail));
  }

  const handleDateTimeChange = (newValue) => {
    setSelectedDateTime(newValue);
  };

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
      const response = await obtainClassesAPICall(user);
      setData(response);
      console.log(response);
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
                size='small'
                value={selectedDateTime}
                onChange={handleDateTimeChange}
              />
            </DemoContainer>
          </LocalizationProvider>

        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', marginLeft: '10px' }}>
          <TextField
            label="Assignment Name"
            id="outlined-size-small"
            size="small"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', marginLeft: '10px' }}>
          <TextField
            multiline
            style={{ width: '450px' }}
            label="Assignment Details"
            id="outlined-size-small"
            size="small"
            onChange={e => setDetails(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <Button variant="contained" onClick={createAssignment}>Create Assignment</Button>
        </div>
      </div>
    );
  } else {
    return (<></>);
  }
}

export default CreateAssignment;
