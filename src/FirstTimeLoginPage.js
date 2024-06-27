
import './App.css';
import Header from './Header';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Passcode from './Passcode';
import {createUserAPICall} from './API.js'

function FirstTimeLoginPage() {

  const [fetchUserError, setFetchUserError] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false)
  const [passcode, setPasscode] = useState('')
  const {user,signIn} = useContext(AuthContext);
  function handleStudentClick() { setIsTeacher(false); }
  function handleTeacherClick() { setIsTeacher(true); }

  const handleClick = async () => {
    let user_type = 'STUDENT';

    if (isTeacher) {
      user_type = 'TEACHER';
    }
    const userData = {
      email: user.email,
      user_type: user_type,
      verification_code: passcode
    }
    const response = await createUserAPICall(userData);
    if (JSON.stringify(response) === '{}') {
      setFetchUserError(true);
    } else {
      setFetchUserError(false);
      await signIn(userData);
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

        {isTeacher ? <Passcode setPasscode={setPasscode}/> : <></>}

        <Box sx={{ '& button': { m: 1 } }}>
          {fetchUserError && isTeacher ? <div style={{color: 'red'}}> ** Error verifying user. Please try again. </div> : <></>}
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
