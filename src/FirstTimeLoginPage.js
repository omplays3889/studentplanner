
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
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Passcode from './Passcode';
import {createUserAPICall} from './API.js'
import { red } from '@mui/material/colors';

function FirstTimeLoginPage() {

  const [fetchUserError, setFetchUserError] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false)
  const { user } = useContext(AuthContext);
  function handleStudentClick() { setIsTeacher(false); }
  function handleTeacherClick() { setIsTeacher(true); }


  const handleClick = async () => {
    if (isTeacher) {
      const verification_code = document.getElementById("passocde")?.value;
      const userData = {
        email: user.email,
        user_type: 'TEACHER',
        verification_code: verification_code
      }
      const response = await createUserAPICall(userData);
      if (Array.isArray(response) && response.length > 0) {
        setFetchUserError(false)
      } else {
        setFetchUserError(true);
      }
    } else {
      const verification_code = '';
      const userData = {
        email: user.email,
        user_type: 'STUDENT',
        verification_code: verification_code
      }
      const response = await createUserAPICall(userData);
      if (Array.isArray(response) && response.length > 0) {
        setFetchUserError(false)
      } else {
        setFetchUserError(true);
      }
    }
  }

  return (

    <div style={{ width: '100%', overflowX: 'hidden', height: '100%' }}>
      <Header>
      </Header>
      <div style={{ display: 'flex', marginTop: '20px', width: '100%', height: '80%', justifyContent: 'center' }}>
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
      <div style={{ display: 'flex', float: 'right', flexDirection: 'column', marginRight: '20px' }}>

        {isTeacher ? <Passcode id="passocde" /> : <></>}

        <Box sx={{ '& button': { m: 1 } }}>
          {fetchUserError ? <div style={{color: 'red'}}> ** Error verifying user. Please try again. </div> : <></>}
          <Button variant="contained" sx={{ bgcolor: '#1564FF', marginLeft: '5px' }} size="medium" onClick={async () => {
            await handleClick();
          }}>
            Continue
          </Button>
        </Box>
      </div>

    </div>

  );
}

export default FirstTimeLoginPage;
