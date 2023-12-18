 /* eslint-disable */
 import React from 'react';

 const DoctorCard = () => {
   const blueColor = '#0081e0';
 
   const cardStyle = {
     maxWidth: '70%',
     background: '#fff',
     borderRadius: '2px',
     margin: 'auto',
     position: 'relative',
     boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
     transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
     padding: '20px', // Increased padding
     boxSizing: 'border-box',
   };
 
   const infoStyle = {
     padding: '20px', // Increased padding
     display: 'grid',
     gridTemplateColumns: '120px auto', // Adjusted grid template columns
   };
 
   const avatarStyle = {
     overflow: 'hidden',
     height: '90px', // Increased height
     width: '90px', // Increased width
     borderRadius: '4px', // Increased border radius
     marginTop: '10px', // Increased margin top
   };
 
   const imgStyle = {
     width: '100%',
     borderRadius: '4px',
     overflow: 'hidden',
   };
 
   const detailsStyle = {
     alignSelf: 'center',
     padding: '15px 0', // Adjusted padding
   };
 
   const nameStyle = {
     fontSize: '24px', // Increased font size
     lineHeight: '1',
     padding: '5px 0', // Adjusted padding
     fontWeight: '500', // Increased font weight
   };
 
   const metaInfoStyle = {
     padding: '5px 0', // Adjusted padding
     color: '#787878',
     lineHeight: '20px', // Increased line height
     fontWeight: '400',
   };
 
   const pracAreaExpStyle = {
     '&:not(:empty)': {
       '&::before': {
         content: '|',
         padding: '15px', // Increased padding
       },
     },
   };
 
   const actionsStyle = {
     margin: '0 20px 20px', // Adjusted margin
     display: 'table',
     width: 'calc(100% - 40px)', // Adjusted width
     borderCollapse: 'collapse',
     borderRadius: '3px',
     borderStyle: 'hidden',
     boxShadow: '0 0 0 1px #f6f7f8',
   };
 
   const ratingCommentsConsultationAppoStyle = {
     textAlign: 'center',
     padding: '0',
     display: 'table-cell',
     border: '1px solid #f2f2f2',
     verticalAlign: 'middle',
     height: '80px', // Increased height
   };
 
   const ratingsStyle = {
     width: '22%', // Increased width
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
   };
 
   const ratingControlStyle = {
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
   };
 
   const faStyle = {
     fontSize: '24px', // Increased font size
     color: '#ffdc40',
   };
 
   const ratingCountStyle = {
     fontSize: '16px', // Adjusted font size
     textTransform: 'uppercase',
     color: '#898989',
   };
 
   const commentsStyle = {
     width: '26%', // Increased width
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
   };
 
   const commentCountStyle = {
     strong: {
       display: 'block',
       color: blueColor,
       fontSize: '24px', // Increased font size
       fontWeight: '500', // Increased font weight
       lineHeight: '26px', // Increased line height
     },
     fontSize: '16px', // Adjusted font size
     textTransform: 'uppercase',
     color: '#898989',
   };
 
   const consultationStyle = {
     width: '26%', // Increased width
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
   };
 
   const feeStyle = {
     strong: {
       display: 'block',
       color: blueColor,
       fontSize: '24px', // Increased font size
       fontWeight: '500', // Increased font weight
       lineHeight: '26px', // Increased line height
     },
     fontSize: '16px', // Adjusted font size
     textTransform: 'uppercase',
     color: '#898989',
   };
 
   const appoStyle = {
     width: '18%', // Decreased width
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
   };
 
   const btnStyle = {
     background: blueColor,
     textDecoration: 'none',
     color: '#fff',
     textTransform: 'uppercase',
     padding: '20px', // Increased padding
     fontSize: '18px', // Increased font size
     fontWeight: '500', // Increased font weight
   };
 
   const locationsStyle = {
     padding: '20px 20px 30px', // Adjusted padding
     borderTop: '1px solid #f6f7f8',
     borderRadius: '0 0 4px 4px', // Adjusted border radius
     lineHeight: '1.2',
     fontSize: '16px', // Increased font size
     color: '#898989',
     fontWeight: '400',
     textTransform: 'capitalize',
   };
 
   const certifiedStyle = {
     content: "''",
     background: `url('//via.placeholder.com/150') no-repeat`, // Increased background size
     backgroundSize: 'contain',
     height: '40px', // Increased height
     width: '40px', // Increased width
     position: 'absolute',
     top: '15px', // Increased top position
     right: '15px', // Increased right position
     borderRadius: '50%',
     display: 'block',
   };
 
   return (
     <div className="doctor-card hoverable certified" style={cardStyle}>
       <div className="info" style={infoStyle}>
         <div className="avatar" style={avatarStyle}>
           <img src="//via.placeholder.com/300" alt="doc name" style={imgStyle} />
         </div>
         <div className="details" style={detailsStyle}>
           <div className="name" style={nameStyle}>
             Some Popular Name
           </div>
           <div className="meta-info" style={metaInfoStyle}>
             <span className="sp" style={pracAreaExpStyle}>
               Actor-Director
             </span>
             <span className="prac-area" style={pracAreaExpStyle}>
               Lorem ipsum dolor sit amet.
             </span>
             <span className="exp-yr" style={pracAreaExpStyle}>
               10 years exp.
             </span>
           </div>
         </div>
       </div>
       <div className="actions" style={actionsStyle}>
         <div style={ratingsStyle} className="ratings">
           <div style={ratingControlStyle} className="rating-control">
             <i style={faStyle} className="fa fa-star"></i>
             <i style={faStyle} className="fa fa-star"></i>
             <i style={faStyle} className="fa fa-star-half-o"></i>
             <i style={faStyle} className="fa fa-star-o"></i>
             <i style={faStyle} className="fa fa-star-o"></i>
           </div>
           <div style={ratingCountStyle} className="rating-count">
             000 Ratings
           </div>
         </div>
         <div style={commentsStyle} className="comments">
           <div style={commentCountStyle} className="comment-count">
             <strong>340</strong> Comments
           </div>
         </div>
         <div style={consultationStyle} className="consultation">
           <div style={feeStyle} className="fee">
             <strong>34K</strong> Followers
           </div>
         </div>
         <div style={appoStyle} className="appo">
           <a href="#" className="btn" style={btnStyle}>
             Book Now
           </a>
         </div>
       </div>
       <div className="locations" style={locationsStyle}>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       </div>
       <div style={certifiedStyle}></div>
     </div>
   );
 };
 
 export default DoctorCard;
 







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
