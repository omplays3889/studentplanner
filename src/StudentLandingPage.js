
import './App.css';
import Header from './Header';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import {useState, useEffect } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import CreateGroup from './CreateGroup';
import EditGroup from './EditGroup';
import CreateAssignment from './CreateAssignment';
import ViewAssignments from './ViewAssigments';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        
          <Tab label="Create Assignment" {...a11yProps(0)} />
          <Tab label="View Assignments" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CreateAssignment/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ViewAssignments/>
      </CustomTabPanel>
    </Box>
  );
}
function StudentLandingPage() {


  return (

    <div style={{ width: '100%', overflowX: 'hidden', height: '100%' }}>
      <Header>
      </Header>
      <div style={{ display: 'flex', marginTop: '20px', width: '100%', height: '80%', justifyContent: 'center' }}>
        <BasicTabs />
      </div>


    </div>

  );
}

export default StudentLandingPage;
