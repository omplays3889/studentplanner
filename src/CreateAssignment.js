

import './App.css';
import { React, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { obtainClassesAPICall, createAssignmentAPICall } from './API.js';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import AlertMassage from './AlertMessage.js';

const timezone = require('dayjs/plugin/timezone')
const utc = require('dayjs/plugin/utc')

dayjs.extend(utc)
dayjs.extend(timezone)

function CreateAssignment() {

  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectedDateTime, setSelectedDateTime] =  useState();
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const { user } = useContext(AuthContext);
  const [status, setStatusBase] = useState("");

  const createAssignment = async () => {
    if (data[selectedIndex]?.class_name?.length > 0 
      && name?.length > 0 && details?.length > 0) {
      let assignment_detail = {};
      assignment_detail.class_name = data[selectedIndex]?.class_name;
      assignment_detail.class_id = data[selectedIndex]?.id;

      assignment_detail.title = name;
      assignment_detail.details = details;
      assignment_detail.duedate = selectedDateTime.format();

      await createAssignmentAPICall(user, assignment_detail);
      setSelectedDateTime(dayjs().tz('America/Los_Angeles'));
      setName('');
      setDetails('');
      setSelectedIndex(-1);
      setStatusBase({type: "info", msg: "Assignment successfully created.", key: Math.random() });
    } else {
      setStatusBase({type: "error", msg: "Group Name, Assignment Name and Assignment Details are mandatory fields.", key: Math.random() });
    }
  }

  const handleDateTimeChange = (newValue) => {
    setSelectedDateTime(newValue);
  };

  const handleChange = (event) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === event.target.value) {
        setSelectedIndex(i);
      }
    }
  };

  const fetchData = async () => {
    const response = await obtainClassesAPICall(user);
    setData(response);
  }

  useEffect(() => {
    fetchData();
  }, []);




  if (data) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '5px', width: '250px', marginTop: '10px' }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel sx={{ fontSize: '14px' }} id="demo-select-small-label">Group Name</InputLabel>
            <Select
              sx={{ fontSize: '14px' }}
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedIndex >= 0 ? data[selectedIndex].id : ""}
              label="ClassName"
              onChange={handleChange}
            >
              {data.map(myClass => (
                <MenuItem sx={{ fontSize: '14px' }} key={myClass.id} value={myClass.id}>
                  {myClass.class_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </div>
        <div style={{ marginLeft: '10px', width: '275px' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer size='small' components={['DateTimePicker', 'DateTimePicker']}>
              <DateTimePicker
                label="Due Date"
                slotProps={{
                  textField: {
                    size: 'small', // don't need this anymore so feel free to remove
                    sx: {
                      '> .MuiOutlinedInput-root': {
                        fontSize: "14px" // whatever height you want here
                      },
                      '& label': {
                        fontSize: '14px', // Label font size
                      }
                    }
                  }
                }}
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
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', marginLeft: '10px' }}>
          <TextField
            multiline
            style={{ width: '450px', minHeight: '6em'  }}
            label="Assignment Details"
            id="outlined-size-small"
            size="small"
            value={details}
            InputLabelProps={{
              style: { fontSize: '14px' },
            }}
            inputProps={{
              maxLength: 3500,
              style: { fontSize: '14px' , minHeight: '150px'},
            }}
            onChange={e => setDetails(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', marginLeft:'10px' }}>
          <Button variant="contained" onClick={createAssignment}>Create Assignment</Button>
        </div>
        {status ? <AlertMassage key={status.key} message={status.msg} type={status.type} /> : null}
      </div>
    );
  } else {
    return (<></>);
  }
}

export default CreateAssignment;
