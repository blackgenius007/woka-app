/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { authPortalAccess } from 'src/Services/HR-Services/employeeSlice';
import { authDataAccess } from 'src/Services/HR-Services/employeeSlice';

import InventoryIcon from '@mui/icons-material/Inventory';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import {
  Typography,
  Button,
  Grid,
  Container,
  Card,
  Box,
  CardMedia,
  Avatar,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  TextField,
  Popover,
} from '@mui/material';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import HomeIcon from '@mui/icons-material/Home';
import StorageIcon from '@mui/icons-material/Storage';
import DataIcon from '@mui/icons-material/DataUsage';

const EmployeePortal = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployeeData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [defaultPopoverOpen, setDefaultPopoverOpen] = useState(false);
  const [additionalDataPopoverOpen, setAdditionalDataPopoverOpen] = useState(false);
  const [dataCode, setDataCode] = useState('');
  const [dataMessage, setDataMessage] = useState('');

  // Popover to for data code input
  const handleDefaultPopoverOpen = (event) => {
    setDefaultPopoverOpen(true);
    setAnchorEl(event.currentTarget);
  };

  //Close data code input Popover
  const handleDefaultPopoverClose = () => {
    setDefaultPopoverOpen(false);
  };

  const handleInputChange = (event) => {
    setDataCode(event.target.value);
  };

  const handleAdditionalDataPopoverClose = () => {
    setAdditionalDataPopoverOpen(false);
  };

  const handleSubmit = async () => {
    try {
      // Dispatch the authDataAccess action and wait for the response
      const response = await dispatch(authDataAccess(dataCode));

      // Check if the response is successful
      if (response.meta.requestStatus === 'fulfilled') {
        // If successful, set the additional data Popover to open
        setAdditionalDataPopoverOpen(true);
      } else {
        // If not successful, set the error message in the component state
        setDataMessage(response.payload.message); // Assuming the error message is available in the payload
      }

      // Close the default Popover
      handleDefaultPopoverClose();
    } catch (error) {
      // Handle any errors that might occur during the dispatch
      console.error('An error occurred during dataAccess dispatch:', error);
    }
  };

  const open = Boolean(anchorEl);

  //Access the portalCode from the Redux store
  const portalCode = useSelector((state) => state.auth.employeeCode.portalCode);
  const { isError, message } = useSelector((state) => state.employees);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(authPortalAccess(portalCode));
        // Handle success case
      } catch (err) {
        // Access the error message
        if (err && err.message) {
          const errorResponseMessage = err.message;
          // Use errorResponseMessage as needed (e.g., show an alert)
          console.error(errorResponseMessage);
        }
      }
    };

    fetchData();
  }, [dispatch, portalCode]);

  useEffect(() => {
    // Check if there is an error and show a SweetAlert
    if (isError) {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK',
      }).then(() => {
        // Navigate back to the home page
        window.location.href = '/';
      });
    }
  }, [isError, message, Swal]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes to the database
    setIsEditing(false);
  };

  // Sample data for carousel advertisements
  const advertisements = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/youseful-apps/image/upload/v1656692114/cld-sample.jpg',
      alt: 'Ad 1',
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/youseful-apps/image/upload/v1702968350/mcdonald_iweq7v.webp',
      alt: 'Ad 2',
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/youseful-apps/image/upload/v1702968361/GLO_vyaejh.jpg',
      alt: 'Ad 3',
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000, // Adjusted speed for a slower transition
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <>
      <Box>
        {/* Navbar */}
        <AppBar position="static" color="transparent" elevation={0} sx={{ mb: -2 }}>
          <Toolbar>
            <Avatar variant="rounded" sx={{ backgroundColor: 'white', marginRight: '8px' }}>
              <IconButton color="primary">
                <HomeIcon />
              </IconButton>
            </Avatar>
            <Avatar
              alt=""
              src="https://res.cloudinary.com/youseful-apps/image/upload/v1702332939/front_unv6ak.png"
              style={{ width: '50px', height: '50px' }}
            />
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box py={8} sm={6} md={8} lg={10} bgcolor="gray.100">
          <Container maxWidth="lg">
            <Grid container spacing={8} alignItems="center">
              {/* Left Section */}
              <Grid item md={6} xs={12}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                  Awesome Startup Name
                </Typography>

                <Typography variant="body1" paragraph>
                  Made with 1 prompt using the new{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    href="https://huggingface.co/fblgit/una-cybertron-7b-v2-bf16"
                  >
                    cybertron-7b-v2
                  </a>
                  .<br />
                  Sed rhoncus ante in risus viverra aliquam. Fusce ultrices tellus eu nisl
                  malesuada, vitae dapibus odio pulvinar. Integer a dui sed dolor cursus ornare eget
                  quis enim.
                </Typography>
                <Box>
                  <Button
                    href="#"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginRight: 2 }}
                  >
                    Get Started
                  </Button>
                  <Button
                    href="#"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginRight: 2 }}
                  >
                    Another Button
                  </Button>
                  <Button
                    href="#"
                    variant="contained"
                    size="large"
                    startIcon={<StorageIcon style={{ marginRight: '8px' }} />}
                    sx={{
                      backgroundColor: 'white',
                      color: '#00227b',
                    }}
                    onClick={handleDefaultPopoverOpen}
                  >
                    Data Access
                  </Button>
                </Box>
              </Grid>

              {/* Right Section */}
              <Grid item md={6} xs={12}>
                <Card>
                  <div
                    style={{
                      width: '100%',
                      height: '300px',
                      overflow: 'hidden',
                      borderRadius: '8px',
                    }}
                  >
                    <Slider {...settings}>
                      {advertisements.map((ad) => (
                        <div key={ad.id}>
                          <img
                            src={ad.image}
                            alt={ad.alt}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      {/* Data access Popover */}
      <Popover
        open={defaultPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleDefaultPopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: '16px', minWidth: '200px' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'lighter', fontSize: '1.2rem' }}>
            Enter your Data collector access code
          </Typography>
          <input placeholder="Data Code" value={dataCode} onChange={handleInputChange} />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          {dataMessage && (
            <Typography variant="body2" style={{ color: 'red', marginTop: '8px' }}>
              {dataMessage}
            </Typography>
          )}
        </div>
      </Popover>

      {/* Additional data Popover */}
      <Popover
        open={additionalDataPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleAdditionalDataPopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div style={{ padding: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Data Collection Point
          </Typography>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <IconButton>
              <InventoryIcon />
            </IconButton>
            <Typography variant="body1">Inventory Records</Typography>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <EventIcon />
            </IconButton>
            <Typography variant="body1">Attendance Records</Typography>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default EmployeePortal;

// import React, { useState, useEffect } from 'react';
// import { authPortalAccess } from 'src/Services/HR-Services/employeeSlice';
// import { authDataAccess } from 'src/Services/HR-Services/employeeSlice';
// import IconButton from '@mui/material/IconButton';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import EventIcon from '@mui/icons-material/Event';
// import EditIcon from '@mui/icons-material/Edit';
// import { useDispatch, useSelector } from 'react-redux';
// import StorageIcon from '@mui/icons-material/Storage';
// import Swal from 'sweetalert2';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

// import { Typography, Button, Grid, Paper, Avatar, TextField, Popover } from '@mui/material';
// import Slider from 'react-slick';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const EmployeePortal = () => {
//   const dispatch = useDispatch();
//   const [isEditing, setIsEditing] = useState(false);
//   const [employee, setEmployeeData] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [defaultPopoverOpen, setDefaultPopoverOpen] = useState(false);
//   const [additionalDataPopoverOpen, setAdditionalDataPopoverOpen] = useState(false);
//   const [dataCode, setDataCode] = useState('');
//   const [dataMessage, setDataMessage] = useState('');

// // Popover to for data code input
//   const handleDefaultPopoverOpen = (event) => {
//     setDefaultPopoverOpen(true);
//     setAnchorEl(event.currentTarget);
//   };

//   //Close data code input Popover
//   const handleDefaultPopoverClose = () => {
//     setDefaultPopoverOpen(false);
//   };

//   const handleInputChange = (event) => {
//     setDataCode(event.target.value);
//   };

//   const handleAdditionalDataPopoverClose = () => {
//     setAdditionalDataPopoverOpen(false);
//   };

//   const handleSubmit = async () => {
//     try {
//       // Dispatch the authDataAccess action and wait for the response
//       const response = await dispatch(authDataAccess(dataCode));

//       // Check if the response is successful
//       if (response.meta.requestStatus === 'fulfilled') {
//         // If successful, set the additional data Popover to open
//         setAdditionalDataPopoverOpen(true);
//       } else {
//         // If not successful, set the error message in the component state
//         setDataMessage(response.payload.message); // Assuming the error message is available in the payload
//       }

//       // Close the default Popover
//       handleDefaultPopoverClose();
//     } catch (error) {
//       // Handle any errors that might occur during the dispatch
//       console.error('An error occurred during dataAccess dispatch:', error);
//     }
//   };

//   const open = Boolean(anchorEl);

//   //Access the portalCode from the Redux store
//   const portalCode = useSelector((state) => state.auth.employeeCode.portalCode);
//   const { isError, message } = useSelector((state) => state.employees);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(authPortalAccess(portalCode));
//         // Handle success case
//       } catch (err) {
//         // Access the error message
//         if (err && err.message) {
//           const errorResponseMessage = err.message;
//           // Use errorResponseMessage as needed (e.g., show an alert)
//           console.error(errorResponseMessage);
//         }
//       }
//     };

//     fetchData();
//   }, [dispatch, portalCode]);

//   useEffect(() => {
//     // Check if there is an error and show a SweetAlert
//     if (isError) {
//       Swal.fire({
//         title: 'Error!',
//         text: message,
//         icon: 'error',
//         confirmButtonText: 'OK',
//       }).then(() => {
//         // Navigate back to the home page
//         window.location.href = '/';
//       });
//     }
//   }, [isError, message, Swal]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveChanges = () => {
//     // Implement logic to save changes to the database
//     setIsEditing(false);
//   };

//   // Sample data for carousel advertisements
//   const advertisements = [
//     {
//       id: 1,
//       image: 'https://res.cloudinary.com/youseful-apps/image/upload/v1656692114/cld-sample.jpg',
//       alt: 'Ad 1',
//     },
//     {
//       id: 2,
//       image:
//         'https://res.cloudinary.com/youseful-apps/image/upload/v1656692093/samples/ecommerce/shoes.png',
//       alt: 'Ad 2',
//     },
//     {
//       id: 3,
//       image:
//         'https://res.cloudinary.com/youseful-apps/image/upload/v1659615143/avatar/h7oqmtok7lads4qn3s6r.png',
//       alt: 'Ad 3',
//     },
//   ];

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 2000, // Adjusted speed for a slower transition
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//   };
//   return (
//     <>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Paper
//             style={{
//               backgroundColor: '#fff',
//               padding: '16px',
//               textAlign: 'center',
//               color: '#000',
//               boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1), 0px -5px 5px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <Typography variant="h4">Futuristic Employee Portal</Typography>
//           </Paper>
//           <br />
//           <Grid container spacing={2} style={{ padding: '24px' }}>
//             <Grid item xs={12} md={6}>
//               <div>
//                 <Typography variant="h5"> Maxwell James </Typography>
//                 <Typography variant="body1">Employee ID: 2888999 </Typography>
//                 <Typography variant="body1">Department: Accounts </Typography>
//                 {/* Add more details as needed */}
//               </div>
//             </Grid>
//             <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
//               <Avatar
//                 alt={employee}
//                 src="https://res.cloudinary.com/youseful-apps/image/upload/v1702332939/front_unv6ak.png"
//                 style={{ width: '80px', height: '80px' }}
//               />
//             </Grid>
//           </Grid>

//           <Grid container spacing={2} style={{ padding: '24px' }}>
//             <Grid item xs={12} md={6}>
//               <Typography variant="h5">Actions</Typography>
//               <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center' }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   style={{ marginRight: '16px', width: '200px' }}
//                   onClick={() => console.log('View Payroll clicked')}
//                 >
//                   <MonetizationOnIcon style={{ marginRight: '8px' }} />
//                   View Payroll
//                 </Button>

//                 <Button
//                   variant="contained"
//                   color="primary"
//                   style={{ marginRight: '16px', width: '200px' }}
//                   onClick={handleEditClick}
//                 >
//                   <EditIcon style={{ marginRight: '8px' }} />
//                   Edit Details
//                 </Button>

//                 <Button
//                   variant="contained"
//                   style={{ width: '200px', backgroundColor: '#fff', color: '#00bfff' }}
//                   onClick={handleDefaultPopoverOpen}
//                 >
//                   <StorageIcon style={{ marginRight: '8px' }} />
//                   Data access
//                 </Button>
//               </div>
//             </Grid>

//             {isEditing && (
//               <Grid item xs={12} md={6}>
//                 <Paper style={{ backgroundColor: '#333', padding: '16px', borderRadius: '8px' }}>
//                   <Typography variant="h5">Edit Details</Typography>
//                   {/* Include form for editing details */}
//                   <form onSubmit={handleSaveChanges}>
//                     {/* Add input fields for editing details */}
//                     <TextField label="New Detail" fullWidth style={{ marginBottom: '16px' }} />
//                     {/* Add more input fields as needed */}
//                     <Button type="submit" variant="contained" color="primary">
//                       Save Changes
//                     </Button>
//                   </form>
//                 </Paper>
//               </Grid>
//             )}
//           </Grid>

//           <Paper
//             style={{
//               backgroundColor: '#fff',
//               padding: '16px',
//               textAlign: 'center',
//               position: 'fixed',
//               bottom: 0,
//               width: '100%',
//               color: '#000',
//               boxShadow: '0px -5px 5px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <Typography variant="body2">© 2023 Futuristic Employee Portal</Typography>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" style={{ color: '#fff', marginBottom: '16px' }}>
//             Advertisements
//           </Typography>
//           <div style={{ width: '100%', height: '300px', overflow: 'hidden', borderRadius: '8px' }}>
//             <Slider {...settings}>
//               {advertisements.map((ad) => (
//                 <div key={ad.id}>
//                   <img
//                     src={ad.image}
//                     alt={ad.alt}
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                     }}
//                   />
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </Grid>
//       </Grid>

//       {/* Data access Popover */}
//       <Popover
//         open={defaultPopoverOpen}
//         anchorEl={anchorEl}
//         onClose={handleDefaultPopoverClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'center',
//         }}
//       >
//         <div style={{ padding: '16px', minWidth: '200px' }}>
//           <Typography variant="h6" gutterBottom>
//             Enter your Data collector access code
//           </Typography>
//           <input placeholder="Data Code" value={dataCode} onChange={handleInputChange} />
//           <Button variant="contained" color="primary" onClick={handleSubmit}>
//             Submit
//           </Button>
//           {dataMessage && (
//             <Typography variant="body2" style={{ color: 'red', marginTop: '8px' }}>
//               {dataMessage}
//             </Typography>
//           )}
//         </div>
//       </Popover>

//       {/* Additional data Popover */}
//       <Popover
//         open={additionalDataPopoverOpen}
//         anchorEl={anchorEl}
//         onClose={handleAdditionalDataPopoverClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//       >
//         <div style={{ padding: '16px' }}>
//           <Typography variant="h6" gutterBottom>
//             Data Collection Point
//           </Typography>

//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
//             <IconButton>
//               <InventoryIcon />
//             </IconButton>
//             <Typography variant="body1">Inventory Records</Typography>
//           </div>

//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton>
//               <EventIcon />
//             </IconButton>
//             <Typography variant="body1">Attendance Records</Typography>
//           </div>
//         </div>
//       </Popover>
//     </>
//   );
//   // return (
//   //   <>
//   //     <Grid container spacing={2}>
//   //       <Grid item xs={12} md={6}>
//   //         <Paper
//   //           style={{
//   //             backgroundColor: '#fff',
//   //             padding: '16px',
//   //             textAlign: 'center',
//   //             color: '#000', // Contrast text color
//   //             boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1), 0px -5px 5px rgba(0, 0, 0, 0.1)',
//   //           }}
//   //         >
//   //           <Typography variant="h4">Futuristic Employee Portal</Typography>
//   //         </Paper>
//   //         <br />
//   //         <Grid container spacing={2} style={{ padding: '24px' }}>
//   //           <Grid item xs={12} md={6}>
//   //             <div>
//   //               <Typography variant="h5"> Maxwell James </Typography>
//   //               <Typography variant="body1">Employee ID: 2888999 </Typography>
//   //               <Typography variant="body1">Department: Accounts </Typography>
//   //               {/* Add more details as needed */}
//   //             </div>
//   //           </Grid>
//   //           <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
//   //             <Avatar
//   //               alt={employee}
//   //               src="https://res.cloudinary.com/youseful-apps/image/upload/v1702332939/front_unv6ak.png"
//   //               style={{ width: '80px', height: '80px' }}
//   //             />
//   //           </Grid>
//   //         </Grid>

//   //         <Grid container spacing={2} style={{ padding: '24px' }}>
//   //           <Grid item xs={12} md={6}>
//   //             <Typography variant="h5">Actions</Typography>
//   //             <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center' }}>
//   //               <Button
//   //                 variant="contained"
//   //                 color="primary"
//   //                 style={{ marginRight: '16px', width: '200px' }}
//   //                 onClick={() => console.log('View Payroll clicked')}
//   //               >
//   //                 <MonetizationOnIcon style={{ marginRight: '8px' }} />
//   //                 View Payroll
//   //               </Button>

//   //               <Button
//   //                 variant="contained"
//   //                 color="primary"
//   //                 style={{ marginRight: '16px', width: '200px' }}
//   //                 onClick={handleEditClick}
//   //               >
//   //                 <EditIcon style={{ marginRight: '8px' }} />
//   //                 Edit Details
//   //               </Button>

//   //               <Button
//   //                 variant="contained"
//   //                 style={{ width: '200px', backgroundColor: '#fff', color: '#00bfff' }}
//   //                 onClick={handleDefaultPopoverOpen}
//   //               >
//   //                 <StorageIcon style={{ marginRight: '8px' }} />
//   //                 Data access
//   //               </Button>
//   //             </div>
//   //           </Grid>

//   //           {isEditing && (
//   //             <Grid item xs={12} md={6}>
//   //               <Paper style={{ backgroundColor: '#333', padding: '16px', borderRadius: '8px' }}>
//   //                 <Typography variant="h5">Edit Details</Typography>
//   //                 {/* Include form for editing details */}
//   //                 <form onSubmit={handleSaveChanges}>
//   //                   {/* Add input fields for editing details */}
//   //                   <TextField label="New Detail" fullWidth style={{ marginBottom: '16px' }} />
//   //                   {/* Add more input fields as needed */}
//   //                   <Button type="submit" variant="contained" color="primary">
//   //                     Save Changes
//   //                   </Button>
//   //                 </form>
//   //               </Paper>
//   //             </Grid>
//   //           )}
//   //         </Grid>

//   //         <Paper
//   //           style={{
//   //             backgroundColor: '#fff',
//   //             padding: '16px',
//   //             textAlign: 'center',
//   //             position: 'fixed',
//   //             bottom: 0,
//   //             width: '100%',
//   //             color: '#000', // Contrast text color
//   //             boxShadow: '0px -5px 5px rgba(0, 0, 0, 0.1)',
//   //           }}
//   //         >
//   //           <Typography variant="body2">© 2023 Futuristic Employee Portal</Typography>
//   //         </Paper>
//   //       </Grid>

//   //       <Grid item xs={12} md={6}>
//   //         <Typography variant="h5" style={{ color: '#fff', marginBottom: '16px' }}>
//   //           Advertisements
//   //         </Typography>
//   //         <div style={{ width: '100%', height: '300px', overflow: 'hidden', borderRadius: '8px' }}>
//   //           <Slider {...settings}>
//   //             {advertisements.map((ad) => (
//   //               <div key={ad.id}>
//   //                 <img
//   //                   src={ad.image}
//   //                   alt={ad.alt}
//   //                   style={{
//   //                     width: '100%',
//   //                     height: '100%',
//   //                     objectFit: 'cover',
//   //                   }}
//   //                 />
//   //               </div>
//   //             ))}
//   //           </Slider>
//   //         </div>
//   //       </Grid>
//   //     </Grid>
//   //     <Popover
//   //       open={defaultPopoverOpen}
//   //       anchorEl={anchorEl}
//   //       onClose={handleDefaultPopoverClose}
//   //       anchorOrigin={{
//   //         vertical: 'bottom',
//   //         horizontal: 'center',
//   //       }}
//   //       transformOrigin={{
//   //         vertical: 'top',
//   //         horizontal: 'center',
//   //       }}
//   //     >
//   //       <div style={{ padding: '16px', minWidth: '200px' }}>
//   //         <Typography variant="h6" gutterBottom>
//   //           Enter your Data collector access code
//   //         </Typography>
//   //         <input placeholder="Data Code" value={dataCode} onChange={handleInputChange} />
//   //         <Button variant="contained" color="primary" onClick={handleSubmit}>
//   //           Submit
//   //         </Button>

//   //   {dataMessage && ( // Conditionally render the error message
//   //     <Typography variant="body2" style={{ color: 'red', marginTop: '8px' }}>
//   //       {dataMessage}
//   //     </Typography>
//   //   )}
//   //       </div>
//   //     </Popover>
//   //     <Popover
//   //       open={additionalDataPopoverOpen}
//   //       anchorEl={anchorEl}
//   //       onClose={handleAdditionalDataPopoverClose}
//   //       anchorOrigin={{
//   //         vertical: 'bottom',
//   //         horizontal: 'right',
//   //       }}
//   //       transformOrigin={{
//   //         vertical: 'top',
//   //         horizontal: 'right',
//   //       }}
//   //     >
//   //       <div style={{ padding: '16px' }}>
//   //         <Typography variant="h6" gutterBottom>
//   //           Data Collection Point
//   //         </Typography>

//   //         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
//   //           <IconButton>
//   //             <InventoryIcon />
//   //           </IconButton>
//   //           <Typography variant="body1">Inventory Records</Typography>
//   //         </div>

//   //         <div style={{ display: 'flex', alignItems: 'center' }}>
//   //           <IconButton>
//   //             <EventIcon />
//   //           </IconButton>
//   //           <Typography variant="body1">Attendance Records</Typography>
//   //         </div>
//   //       </div>
//   //     </Popover>
//   //   </>
//   // );
// };

// export default EmployeePortal;
