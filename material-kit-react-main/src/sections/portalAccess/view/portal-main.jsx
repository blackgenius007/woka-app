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
  
    </>
  );
}

export default PortalData;
