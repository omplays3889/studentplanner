
import './App.css';
import StudentLandingPage from './StudentLandingPage';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import IntroPage from './Intropage';

function MainLandingPage() {
  const { user, signIn, signOut } = useContext(AuthContext);

  return (
    <div>
    {
      user ?  <StudentLandingPage/>  : <IntroPage/>
    }
    </div>
  );
}
export default MainLandingPage;
