
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
function CreateClass() {


  return (

    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop:'20px' }}>
        <TextField
          label="Class Name"
          id="outlined-size-small"
          size="small"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
      <TextField
          multiline
          style={{width:'450px'}}
          label="Student Email Whitelist"
          id="outlined-size-small"
          size="small"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop:'20px' }}>
      <Button variant="contained">Create Class</Button>
      </div>
    </div>
  );
}

export default CreateClass;
