
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
            Our AI based Students Planner makes technology help students to keep their assignments at one place and let the technology take care of reminders.
          </p>
          <p>
            Here is how it works...
          </p>
          <p>
            You can create Groups including other students with students email addresses.
            You can then create assignments for any class/group you created through out the school year.
          </p>
          <p>
            Other students in your group can login and see list of their assignments per group they are enrolled in.
            Students can also create personal assignments for them selves.
          </p>
          <p>
            Not Only That...
          </p>
          <label>
            Students will receive email notifications every day with all their pending assignments sorted by their deadlines dates.
            It has color coded scheme that makes assignments reminders visiblly prioritized.
          </label>
          <p>
            Isn't this AMAZING?? And Its Free !!!
          </p>
          <label>
               Don't wait, ask your school/teacher to onboard with this AI planner.
               Need help? Reach out to omplays3889@gmail.com
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
