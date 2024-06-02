import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
function Header() {
  const responseMessage = (response) => {
    console.log(response);
};
const errorMessage = (error) => {
  console.log(error);
};

  return (

<div style={{  display:'flex', justifyContent: 'space-between', borderBottom:  '3px solid transparent', borderImage: `linear-gradient(to right,lightBlue, blue)`, borderImageSlice:'1' }}>
 <div>
    <h1 style={{ color: '#1564FF',paddingLeft: '20px' }}>Student Planner</h1>
  </div>  
    <div style={{marginTop: '25px', paddingRight:'20px'}}>
    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
</div>



  );
}

export default Header;
