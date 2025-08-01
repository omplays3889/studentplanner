
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
            Our AI-based Student Planner empowers students to keep all their assignments in one place and lets technology handle the reminders.
          </p>
          <p>
            Here’s how it works...
          </p>
          <p>
            You can create groups by adding other students using their email addresses. 
            You can then create assignments for any group you've created throughout the school year.
          </p>
          <p>
            Other students in your groups can log in and view a list of their assignments, organized by the groups they are enrolled in. 
            Students can also create personal assignments for themselves.
          </p>
          <p>
            Not only that...
          </p>
          <label>
            Students will receive daily email notifications listing all their pending assignments, sorted by due dates. 
            A color-coded scheme highlights assignment urgency, helping students prioritize their tasks more effectively.
          </label>
          <p>
            Isn't this AMAZING? And it's completely free!
          </p>
          <label>
            Don't wait—ask your school or teacher to onboard with this AI-powered planner.
            Need help? Reach out to: omplays3889@gmail.com
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
