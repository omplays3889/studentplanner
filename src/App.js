import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './AuthContext';
import StudentLandingPage from './StudentLandingPage';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import IntroPage from './Intropage';
import MainLandingPage from './MainLandingPage';

function App() {
  return (
    <AuthProvider>
     <MainLandingPage/>
  </AuthProvider>
  );
}

export default App;
