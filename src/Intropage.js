
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import Header from './Header';


function Intropage() {


  return (

    <div style={{width:'100%',overflowX:'hidden', height:'100%'}}>
      <Header>
      </Header>
      <div style={{display:'flex',width:'100%', height:'80%'}}>
        <div style={{width:'50%', paddingLeft: '20px'}}>
          <h1 style={{ color: 'coral' }}>
            Never miss a deadline!
          </h1>
          <p>
            In today's tech-driven world, students juggle busy schedules and need all the help they can get to stay organized.
            Our Student Planner makes technology help students to keep their assignments at one place and let the technology take care of reminders.
          </p>
          <p>
            Here is how it works...
          </p>
          <p>
            Teachers create classes enrolling their students with students email addresses.
            Teachers then can create assignments for any class they created through out the school year.
          </p>
          <p>
            Students can login and see list of their assignments per class they are enrolled in.
            Students can also create personal assignment for them selves.
          </p>
          <p>
            Not Only That...
          </p>
          <label>
            Students will receive email notifications every day with all their pending assignments sorted by their deadlines dates.
          </label>
          <p>
            Isn't this AMAZING?? And Its Free !!!
          </p>
          <label>
               Don't wait, ask your school to onboard with our platform.
               Reach out to onboarding@students-planner.com
            </label>
        </div>
        <div style={{width: '50%', height: '80%'}}>
        <img src="/file.png" alt="image" style={{width:'120%', height:'120%'}}/>
        </div>
      </div>
    </div>
  );
}

export default Intropage;
