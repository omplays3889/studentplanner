
import './App.css';
import StudentLandingPage from './StudentLandingPage';
import TeacherLandingPage from './TeacherLandingPage';
import FirstTimeLoginPage from './FirstTimeLoginPage';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import IntroPage from './Intropage';

function MainLandingPage() {
  const { user, signIn, signOut } = useContext(AuthContext);

  return (
    <div>
    {
      user ? 
      
      user.user_type ? ( user.user_type === 'TEACHER' ? <TeacherLandingPage/> : <StudentLandingPage/>  ) : <FirstTimeLoginPage/> 
      
      : <IntroPage/>
    }
    </div>
  );
}
export default MainLandingPage;
