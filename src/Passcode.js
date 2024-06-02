import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Passcode() {
    return (
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
  
  <TextField
            label="Passcode"
            id="outlined-size-small"
            defaultValue=""
            size="small"
            inputProps={{ maxLength: 8}}
            sx={{marginTop:'20px', marginLeft:'50px'}}
          />
          </Box>
    );
}

export default Passcode;