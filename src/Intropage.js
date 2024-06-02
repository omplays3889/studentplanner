
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
            Teachers create assignments for the class.
            Students see list of teachers from their school, they subscribe to their teachers FEED, and All Done !!
          </p>
          <p>
            Students will receive emails when any new assignment is created by their subscribed teachers.
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
               Reach out to onboarding@studentplanner.me
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
