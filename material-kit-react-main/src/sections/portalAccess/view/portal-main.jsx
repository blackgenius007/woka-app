/* eslint-disable */

import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

import PortalBody from './portal-body';
// import Register from './register';
// import PersonalDetail from './personalDetail';
 
 
//   import Avatar from '@mui/material/Avatar';
//   import ImageIcon from '@mui/material/icons/Image';
//  import WorkIcon from '@mui/icons-material/Work';
// import Carousel from ' @mui/icons-material/Carousel';
// import BeachAccessIcon from '@mui/material-ui/BeachAccess';
import {
  Grid,
  Divider,
  Typography,
  Card,
  IconButton,
  Button,
  Tooltip,
  Hidden,
  Box,
  withStyles,
  withWidth,
  isWidthUp,
} from '@mui/material';


 
function PortalData() {
   // Access the portalCode from the Redux store
   const portalCode = useSelector((state) => state.auth.employeeCode.portalCode);
  
 
  const[open,setOpen]=useState(false)

const handleOpen=()=>{
  setOpen(true)
}

const handleClose=()=>{
  setOpen(false)
}


  return (
    <>
  <PortalBody />
     <Typography
            style={{  marginLeft: '10px',color:'#A9A9A9'}}
            className='panelText'
            variant="h4"
           
          >
            Don't have a Job seeker account? <Button onClick={handleOpen}><Typography  style={{ textDecoration: 'none', color:'orange'}} variant='h5'>Sign up</Typography></Button>
          </Typography>
      <br />
      <Grid container>
                <Grid md={8}>

                
          {/* <div>
            <Image style={{ maxHeight: '200px' }} src={filyIcon3} rounded />
          </div> */}
        </Grid>
        <Grid md={4}>
        
          {/* <Carousel/> */}
        
         
          
        </Grid>
      </Grid>

      {/* <Register open={open} handleClose={handleClose}/> */}
    </>
  );
}

export default PortalData;
