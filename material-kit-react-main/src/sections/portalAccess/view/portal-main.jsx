 /* eslint-disable */ 
 import { useState } from 'react';
 import  {login}  from '../../Services/AuthServices/authSlice';
 import { useSelector, useDispatch } from 'react-redux';
  
 
 import Box from '@mui/material/Box';
 import Link from '@mui/material/Link';
 import Card from '@mui/material/Card';
 import Stack from '@mui/material/Stack';
 import Button from '@mui/material/Button';
 import Divider from '@mui/material/Divider';
 import TextField from '@mui/material/TextField';
 import Typography from '@mui/material/Typography';
 import IconButton from '@mui/material/IconButton';
 import LoadingButton from '@mui/lab/LoadingButton';
 import { alpha, useTheme } from '@mui/material/styles';
 import InputAdornment from '@mui/material/InputAdornment';
 
 
 import { useRouter } from 'src/routes/hooks';
 
 import { bgGradient } from 'src/theme/css';
 
 import Logo from 'src/components/logo';
 import Iconify from 'src/components/iconify';
 
 // ----------------------------------------------------------------------
 
 export default function LoginView() {
 
  
   const { user, isSuccess,isError,message} = useSelector(
     (state) => state.auth
   );
   const theme = useTheme();
 
   const router = useRouter();
 
   const [showPassword, setShowPassword] = useState(false);
 
   const dispatch = useDispatch();
   const [userLogin, setLogin] = useState({
     email: '',
     password: '',
   });
   
   const handleLoginChange = (e) => {
     const { name, value } = e.target;
     setLogin((userLogin) => ({ ...userLogin, [name]: value }));
   };
 
   const handleSubmitLogin = async () => {
     // Dispatch the login action
     const actionResult = await dispatch(login(userLogin));
   
     // Check if the login action was successful
     if (login.fulfilled.match(actionResult)) {
       router.push('/');
     }
   };
   
 
  
 
   const renderForm = (
     <>
       <Stack spacing={3}>
         <TextField name="email" label="Email address" onChange={ handleLoginChange} />
 
         <TextField
           name="password"
           label="Password"
           type={showPassword ? 'text' : 'password'}
           InputProps={{
             endAdornment: (
               <InputAdornment position="end">
                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                   <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                 </IconButton>
               </InputAdornment>
             ),
           }}
           onChange={ handleLoginChange}
         />
       </Stack>
 
       <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
         <Link variant="subtitle2" underline="hover">
           Forgot password?
         </Link>
       </Stack>
 
       <LoadingButton
         fullWidth
         size="large"
         type="submit"
         variant="contained"
         color="inherit"
         onClick={handleSubmitLogin}
       >
         Login
       </LoadingButton>
     </>
   );
 
   return (
     <Box
       sx={{
         ...bgGradient({
           color: alpha(theme.palette.background.default, 0.9),
           imgUrl: '/assets/background/overlay_4.jpg',
         }),
         height: 1,
       }}
     >
       <Logo
         sx={{
           position: 'fixed',
           top: { xs: 16, md: 24 },
           left: { xs: 16, md: 24 },
         }}
       />
 
       <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
         <Card
           sx={{
             p: 5,
             width: 1,
             maxWidth: 420,
           }}
         >
           <Typography variant="h4"> Workfily Sign in</Typography>
 
           <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
             Portal version?
             <Link variant="subtitle2" sx={{ ml: 0.5 }}>
               Get started
             </Link>
           </Typography>
 
           <Stack direction="row" spacing={2}>
             <Button
               fullWidth
               size="large"
               color="inherit"
               variant="outlined"
               sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
             >
               <Iconify icon="eva:google-fill" color="#DF3E30" />
             </Button>
 
             <Button
               fullWidth
               size="large"
               color="inherit"
               variant="outlined"
               sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
             >
               <Iconify icon="eva:facebook-fill" color="#1877F2" />
             </Button>
 
             <Button
               fullWidth
               size="large"
               color="inherit"
               variant="outlined"
               sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
             >
               <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
             </Button>
           </Stack>
 
           <Divider sx={{ my: 3 }}>
             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
               OR
             </Typography>
           </Divider>
 
           {renderForm}
         </Card>
       </Stack>
     </Box>
   );
 }
 





// /* eslint-disable */

// import React,{useState, useEffect} from 'react';
// import { useSelector } from 'react-redux';

// import PortalBody from './portal-body';
// // import Register from './register';
// // import PersonalDetail from './personalDetail';
 
 
// //   import Avatar from '@mui/material/Avatar';
// //   import ImageIcon from '@mui/material/icons/Image';
// //  import WorkIcon from '@mui/icons-material/Work';
// // import Carousel from ' @mui/icons-material/Carousel';
// // import BeachAccessIcon from '@mui/material-ui/BeachAccess';
// import {
//   Grid,
//   Divider,
//   Typography,
//   Card,
//   IconButton,
//   Button,
//   Tooltip,
//   Hidden,
//   Box,
//   withStyles,
//   withWidth,
//   isWidthUp,
// } from '@mui/material';


 
// function PortalData() {
//    // Access the portalCode from the Redux store
//    const portalCode = useSelector((state) => state.auth.employeeCode.portalCode);
  
 
//   const[open,setOpen]=useState(false)

// const handleOpen=()=>{
//   setOpen(true)
// }

// const handleClose=()=>{
//   setOpen(false)
// }


//   return (
//     <>
//     <p>
//       { portalCode}
//     </p> 
//      <Typography
//             style={{  marginLeft: '10px',color:'#A9A9A9'}}
//             className='panelText'
//             variant="h4"
           
//           >
//             Don't have a Job seeker account? <Button onClick={handleOpen}><Typography  style={{ textDecoration: 'none', color:'orange'}} variant='h5'>Sign up</Typography></Button>
//           </Typography>
//       <br />
//       <Grid container>
//                 <Grid md={8}>

                
//           {/* <div>
//             <Image style={{ maxHeight: '200px' }} src={filyIcon3} rounded />
//           </div> */}
//         </Grid>
//         <Grid md={4}>
        
//           {/* <Carousel/> */}
        
         
          
//         </Grid>
//       </Grid>

//       {/* <Register open={open} handleClose={handleClose}/> */}
//     </>
//   );
// }

// export default PortalData;
