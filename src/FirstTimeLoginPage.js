
import './App.css';
import Header from './Header';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Passcode from './Passcode';

function FirstTimeLoginPage() {

  const [isTeacher, setIsTeacher] = useState(false)

  function handleStudentClick() { setIsTeacher(false); }
  function handleTeacherClick() { setIsTeacher(true); }

  function handleClick() { alert("Hey !!"); }

  return (

    <div style={{ width: '100%', overflowX: 'hidden', height: '100%' }}>
      <Header>
      </Header>
      <div style={{ display: 'flex', marginTop:'20px',width: '100%', height: '80%', justifyContent: 'center' }}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label"> </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Student"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Student" control={<Radio />} onClick={handleStudentClick} label="I am a student" />
            <FormControlLabel value="Teacher" control={<Radio />} onClick={handleTeacherClick} label="I am a teacher" />

          </RadioGroup>
        </FormControl>
      </div>
      <div style={{ display: 'flex', float:'right', flexDirection: 'column', marginRight:'20px' }}>
        
        {isTeacher ? <Passcode /> : <></>}

        <Box sx={{ '& button': { m: 1 } }}>
          <Button variant="contained" size="small" onClick={handleClick}>Continue</Button>
        </Box>
      </div>

    </div>

  );
}

export default FirstTimeLoginPage;
