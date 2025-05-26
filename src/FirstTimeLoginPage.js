
import './App.css';
import Header from './Header';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState , useEffect, useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Passcode from './Passcode';
import {createUserAPICall} from './API.js'

function FirstTimeLoginPage() {

  const [fetchUserError, setFetchUserError] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false)
  const hasRun = useRef(false);
  const [passcode, setPasscode] = useState('')
  const {user,signIn} = useContext(AuthContext);
  function handleStudentClick() { setIsTeacher(false); }
  function handleTeacherClick() { setIsTeacher(true); }

  useEffect(() => {
    if (!hasRun.current) {
      handleClick();
      hasRun.current = true;
    }
  }, []);
  const handleClick = async () => {
    let user_type = 'TEACHER';

    const userData = {
      email: user.email,
      user_type: user_type,
      verification_code: '309e919e74b9'
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
          <FormLabel id="demo-radio-buttons-group-label">Welcome !! Setting up your User Account...</FormLabel>
        </FormControl>
      </div>
    </div>

  );
}

export default FirstTimeLoginPage;
