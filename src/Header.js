import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import { Button } from '@mui/material';

function Header() {
  const { user, signIn, signOut } = useContext(AuthContext);

  const onSuccess = (response) => {
    var decodedHeader = jwtDecode(response.credential);

    const { name, email } = decodedHeader;

    signIn(decodedHeader);
  };
  const onError = (error) => {
    console.log(error);
  };

  return (

    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid transparent', borderImage: `linear-gradient(to right,lightBlue, blue)`, borderImageSlice: '1' }}>
      <div>
        <h1 style={{ color: '#1564FF', paddingLeft: '20px' }}>Students Planner</h1>
      </div>
      <div style={{ marginTop: '25px', paddingRight: '20px' }}>
        {!user ?
          <GoogleLogin onSuccess={onSuccess} onError={onError} />
          :
          <Button variant="contained" sx={{ bgcolor: '#1564FF', marginLeft: '5px' }} size="medium" onClick={signOut}>
            Log Out
          </Button>}
      </div>
    </div>



  );
}

export default Header;
