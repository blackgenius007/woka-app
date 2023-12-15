  /* eslint-disable */
  import React, { useState } from 'react';
  import {
    Typography,
    Button,
    Grid,
    Paper,
    Avatar,
    TextField,
    IconButton,
  } from '@mui/material';
  import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
  import Slider from 'react-slick';
  
  import 'slick-carousel/slick/slick.css';
  import 'slick-carousel/slick/slick-theme.css';
  
  const EmployeePortal = ({ employee }) => {
    const [isEditing, setIsEditing] = useState(false);
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleSaveChanges = () => {
      // Implement logic to save changes to the database
      setIsEditing(false);
    };
  
    // Sample data for carousel advertisements
    const advertisements = [
      { id: 1, image: 'ad1.jpg', alt: 'Ad 1' },
      { id: 2, image: 'ad2.jpg', alt: 'Ad 2' },
      { id: 3, image: 'ad3.jpg', alt: 'Ad 3' },
    ];
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <Paper style={{ backgroundColor: '#00bfff', padding: '16px', textAlign: 'center', color: '#fff' }}>
            <Typography variant="h4">Futuristic Employee Portal</Typography>
          </Paper>
  
          <Grid container style={{ padding: '24px' }}>
            <Grid item xs={12} md={6}>
              <div>
                <Typography variant="h5">{employee.employeeName}</Typography>
                <Typography variant="body1">Employee ID: {employee.employeeID}</Typography>
                <Typography variant="body1">Department: {employee.department}</Typography>
                {/* Add more details as needed */}
              </div>
            </Grid>
            <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
              <Avatar alt={employee.employeeName} src={employee.imagePath} style={{ width: '80px', height: '80px' }} />
            </Grid>
          </Grid>
  
          <Grid container style={{ padding: '24px' }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Actions</Typography>
              <ul>
                <li>
                  <Button style={{ border: '1px solid #fff', color: '#fff' }}>
                    View Payroll
                  </Button>
                </li>
                <li>
                  <Button style={{ border: '1px solid #fff', color: '#fff' }} onClick={handleEditClick}>
                    Edit Details
                  </Button>
                </li>
                {/* Add more actions */}
              </ul>
            </Grid>
  
            {isEditing && (
              <Grid item xs={12} md={6}>
                <Paper style={{ backgroundColor: '#333', padding: '16px', borderRadius: '8px' }}>
                  <Typography variant="h5">Edit Details</Typography>
                  {/* Include form for editing details */}
                  <form onSubmit={handleSaveChanges}>
                    {/* Add input fields for editing details */}
                    <TextField label="New Detail" fullWidth style={{ marginBottom: '16px' }} />
                    {/* Add more input fields as needed */}
                    <Button type="submit" variant="contained" color="primary">
                      Save Changes
                    </Button>
                  </form>
                </Paper>
              </Grid>
            )}
          </Grid>
  
          <Paper style={{ backgroundColor: '#00bfff', padding: '16px', textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
            <Typography variant="body2">© 2023 Futuristic Employee Portal</Typography>
          </Paper>
        </div>
  
        <div style={{ flex: 1, marginLeft: '24px' }}>
          <Typography variant="h5" style={{ color: '#00bfff', marginBottom: '16px' }}>
            Advertisements
          </Typography>
          <Slider {...settings}>
            {advertisements.map((ad) => (
              <div key={ad.id} style={{ width: '100%' }}>
                <img src={ad.image} alt={ad.alt} style={{ width: '100%', borderRadius: '8px' }} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  };
  
  export default EmployeePortal;
  




// import React, { useState, useEffect, Fragment } from 'react';
// // import { GiCash } from 'react-icons/gi';
// import EditIcon from '@mui/icons-material/Edit';
// import DoneIcon from '@mui/icons-material/Done';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
// import axios from 'axios';
// // import PaymentDetail from './paymentDetail';
// // import UploadPhoto from './uploadPhoto';
// // import PersonalDetail from './personalDetail';
// // import { Popup } from 'semantic-ui-react';
// // import filyIcon2 from '../../../../assets/img/about/back.jpg';
// // import { useHistory, useParams } from 'react-router-dom';
// // import ColorfulChip from '../../../../shared/components/ColorfulChip';
 
 
//  import Swal from 'sweetalert2';

// import { Grid, Typography, Card, Chip, IconButton } from '@mui/material';

// import styled from 'styled-components';

// const Styles = styled.div`
//   body {
//     background: radial-gradient(#ff0000, #060606);
//     background-repeat: no-repeat;
//     background-position: left;
//     height: 80vh;
//     display: flex;
//     align-items: center;
//   }
//   ::selection {
//     background: transparent;
//   }
//   svg {
//     cursor: pointer;
//   }

//   input[type='checkbox'],
//   #containerLeftBottom,
//   #detailsContainer,
//   #rdj {
//     display: none;
//     transition: 0.5s;
//   }

//   #titleContent,
//   #detailsContent {
//     stroke: #f1efc1;
//     fill: #f1efc1;
//     font-family: 'Orbitron', sans-serif;
//     pointer-events: none;
//   }

//   /* The typing effect */
//   @keyframes typing {
//     from {
//       width: 0;
//     }
//     to {
//       width: 100%;
//     }
//   }

//   /* The typewriter cursor effect */
//   @keyframes blink-caret {
//     from,
//     to {
//       border-color: transparent;
//     }
//     50% {
//       border-color: orange;
//     }
//   }

//   #detailsContent {
//     color: hsl(0deg 0% 100%);
//     font-size: 20px;
//     font-family: 'Orbitron';
//     letter-spacing: 2px;
//     text-align: justify;
//     /*     border-right: .15em solid orange;  */
//     margin: 0 auto;
//     animation:
//       typing 0.5s steps(30, end),
//       blink-caret 0.5s step-end;
//   }

//   #containerBox,
//   #containerRightBottom,
//   #loadingLights {
//     transition: 0.5s;
//   }

//   #fireCircles,
//   #innerCircle,
//   #outerCircle,
//   #middleCircle {
//     transition: 1s transform;
//     transform-origin: center;
//     transform-box: fill-box;
//     pointer-events: bounding-box;
//   }

//   input[type='checkbox']:checked + svg #fireCircles #outerCircle {
//     transform: rotate(360deg);
//   }

//   input[type='checkbox']:checked + svg #fireCircles + #container #containerLeftBottom {
//     display: block;
//   }

//   input[type='checkbox']:checked + svg #detailsContainer {
//     display: block;
//   }

//   input[type='checkbox']:checked + svg #rdj {
//     display: block;
//   }

//   input[type='checkbox']:checked + svg #fireCircles #innerCircle {
//     transform: rotate(-120deg);
//   }

//   input[type='checkbox']:checked + svg #fireCircles + #container #containerRightBottom {
//     transform: translate(0px, 164px);
//     transition: 0s;
//     position: relative;
//   }

//   input[type='checkbox']:checked + svg #fireCircles + #container #containerBox {
//     d: path(
//       'M250,449.999998c19.64.515,28.781-.462,41.5-12l11.5-12c9.98-7.571,16.62-9.831,30.5-10h127.5c11.484-.409,17.715,1.899,28.5,10l13,12c9.098,9.05,15.207,11.924,27.5,14h327.5v0l62.5-2c11.148-3.896,20.243-6.824,28.5-14l72.5-72.5c5.15-7.217,7.68-11.513,11-20L1032.5,108h2v-41h-1.5v-25.25-25.25c.04-9.12834-2.76-12.34415-13-14.5h-53-793.5l-7.529-.63164C227.189,8.8461,272.536,56.6375,285,116.5l-2.75.5c12.64,101.955-49.038,162.651-139.75,166c0,0,0,.500001,0,.500001v-2.000001C72.263372,288.877571,9.87479,229.139162,5.49988,172.499999v279.499999l189.50012-2h55'
//     );
//   }

//   input[type='checkbox']:checked + svg #fireCircles + #container #loadingLights {
//     transform: translate(0px, 169px);
//     transition: 0.5s;
//     position: relative;
//   }

//   input[type='checkbox']:checked + svg #fireCircles #middleCircle {
//     transform: rotate(250deg);
//     transition: 0.5s;
//   }

//   input[type='checkbox']:checked + svg #fireCircles + #container #firstLight {
//     fill: rgb(4 232 204);
//     transition: 0.2s;
//     transition-delay: 0s;
//     transform-origin: left;
//   }

//   input[type='checkbox']:checked + svg #fireCircles + #container #secondLight {
//     fill: rgb(97 208 255);
//     transition: 0.2s;
//     transition-delay: 0.2s;
//     transform-origin: left;
//   }

//   input[type='checkbox']:checked + svg #fireCircles + #container #thirdLight {
//     fill: rgb(224 228 86);
//     transition: 0.2s;
//     transition-delay: 0.4s;
//     transform-origin: left;
//   }

//   #firstLight {
//     fill: rgb(47 179 163);
//     transition: 0.2s fill;
//     transition-delay: 0.4s;
//     transform-origin: right;
//   }

//   #secondLight {
//     fill: rgb(20 174 224);
//     transition: 0.2s fill;
//     transition-delay: 0.2s;
//     transform-origin: right;
//   }

//   #thirdLight {
//     transition: 0.2s fill;
//     transition-delay: 0s;
//     transform-origin: right;
//   }
// `;
// function PortalBody({ employeeAccess }) {
 
//   // let { employeeAccess } = useParams();
//   console.log(employeeAccess);

//   const [employee, setEmployee] = React.useState({});
//   const [openPayment, setPayment] = useState(false);
//   const [editPhoto, setEditPhoto] = useState(false);
//   const [openPersonal, setPersonal] = useState(false);
//   const [message, setMessage] = useState('');
//   const [department, setDepartment] = useState({});
//   const [loading, setLoading] = useState(false);

//   // alert(employeeAccess)
//   const [isChecked, setIsChecked] = useState(false);
//   const hiddenFileInput = React.useRef(null);

//   const handleClick = (event) => {
//     hiddenFileInput.current.click();
//   };

//   function playSound() {
//     // document.querySelector('input[type="checkbox"]').checked = !document.querySelector('input[type="checkbox"]').checked;
//     let sound1 = 'https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-interface-zoom-890.mp3';
//     let sound2 =
//       'https://assets.mixkit.co/sfx/preview/mixkit-game-quick-warning-notification-268.mp3';
//     let sound3 = 'https://assets.mixkit.co/sfx/preview/mixkit-tech-click-1140.mp3';
//     let sound4 = 'https://assets.mixkit.co/sfx/preview/mixkit-interface-hint-notification-911.mp3';
//     let sound5 = 'https://assets.mixkit.co/sfx/preview/mixkit-fast-sci-fi-bleep-903.mp3';
//     let sound6 = 'https://assets.mixkit.co/sfx/preview/mixkit-high-tech-bleep-2521.mp3';
//     let sound7 =
//       'https://assets.mixkit.co/sfx/preview/mixkit-high-tech-bleep-confirmation-2520.mp3';
//     // let audio = new Audio(document.querySelector('input[type="checkbox"]').checked ? sound6: sound7);
//     let audio = new Audio();
//     if (!audio.ended) {
//       audio.pause();
//       audio.currentTime = 0;
//     }
//     audio.play();
//   }

//   const handleClosePayment = () => {
//     setPayment(false);
//   };

//   const handleOpenPayment = () => {
//     setPayment(true);
//   };

//   const handleCloseEditPhoto = () => {
//     setEditPhoto(false);
//   };

//   const handleOpenEditPhoto = () => {
//     setEditPhoto(true);
//   };

//   const handleCloseEditPersonal = () => {
//     setPersonal(false);
//   };

//   const handleOpenEditPersonal = () => {
//     setPersonal(true);
//   };

//   // useEffect(() => {

//   //     const fetchEmployee = async () => {
//   //       setLoading(true);
//   //       const res = await axios.get(`/api/v1/portal/accessId/${employeeAccess}`, {
//   //         params: {
//   //           _limit: 100,
//   //         },
//   //       });

//   //       if (res.data) {
//   //         setDepartment(res.data.department);
//   //         setEmployee(res.data);
//   //         setLoading(false);
//   //         console.log(res.data.department);
//   //       }
//   //     };

//   //   fetchEmployee();
//   // }, []);

//   useEffect(() => {
//     if (employeeAccess) {
//       console.log(employeeAccess)
//   //     axios.get(`/api/v1/portal/accessId/${employeeAccess}`).then(
//   //       (res) => {
//   //         // alert('Submitted successfully!');
//   //         console.log(res.data);
//   //         console.log(res.data.department);
//   //         setEmployee(res.data);
//   //         setDepartment(res.data.department);
//   //       },
//   //       (err) => {
//   //         if (err.response.status === 500)
//   //           // alert(err.response.data);

//   //           Swal.fire({
//   //             title: `${err.response.data}`,
//   //             width: 600,
//   //             height: 600,
//   //             padding: '3em',
//   //             color: '#716add',
//   //             // imageUrl: 'https://unsplash.it/400/200',
//   //             // imageWidth: 400,
//   //             // imageHeight: 200,
//   //             background: '#fff',
//   //             backdrop: `
//   //   rgba(0,0,123,0.4)
//   //   // url("/images/nyan-cat.gif")
//   //   left top
//   //   no-repeat
//   // `,
//   //           });
//   //         console.log(err.response.data);

           
//   //       }
//   //     );
//     }
//   }, []);

//   return (
//     <>
//       <div
//         style={{
//           marginTop: '90px',
//           // background: '#fffff',
//           // backgroundRepeat: 'no-repeat',
//           position: 'relative',
//           backgroundColor: '#fffff',
//           // backgroundImage: `url(${filyIcon2})`,
//           backgroundRepeat: 'no-repeat',
//           backgroundSize: 'cover',
//           backgroundPosition: 'right',
//           height: '60vh',
//           display: 'flex',
//           alignItems: 'center',
//         }}
//       >
//         <Grid container>
//           <Grid md={6}>
//             <Styles>
//               <input
//                 type="checkbox"
//                 ref={hiddenFileInput}
//                 onChange={() => {
//                   setIsChecked(!isChecked);
//                 }}
//               />

 

//               <svg
//                 onClick={handleClick}
//                 xmlns="http://www.w3.org/2000/svg"
//                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                 width="100vw"
//                 height="50vh"
//                 viewBox="0 0 1036 460"
//                 shape-rendering="geometricPrecision"
//                 text-rendering="geometricPrecision"
//               >
//                 <g id="fireCircles">
//                   <g
//                     id="innerCircle"
//                     style={{ isolation: 'isolate', transform: 'translate(.000001 0.000001)' }}
//                   >
//                     <path
//                       d="M104.5,245.5c50.522,20.662,110.307-1.715,133.5-49l-3.5-2C210.584,239.326,155.844,260.356,106,242l-1.5,3.5Z"
//                       fill="#f1efc1"
//                     />
//                     <path
//                       d="M50.9999,88C80.8853,41.3236,130.974,26.6843,178,41.5l1.5-3c-56.418-21.0141-113.3223,9.6264-132.0001,48l3.5,1.5Z"
//                       fill="#f1efc1"
//                     />
//                   </g>

//                   <g
//                     id="middleCircle"
//                     style={{ isolation: 'isolate', transform: 'translate(0 0.000001)' }}
//                   >
//                     <path
//                       d="M109,269.5l3-10c-7.749-1.9-11.855-3.713-19.0001-7.5l-1.5,2c-29.7052-13.227-43.5219-26.425-61-59l3-1.5c-3.9435-5.961-4.9342-9.706-6.5-17l-10.5,4c1.4714,6.863,2.7194,10.693,5.5,17.5l3.5-1c17.6217,33.53,31.7616,46.358,62.5,61.5l-1,3c7.6774,4.415,12.4224,6.268,22.0001,8Z"
//                       fill="#737372"
//                     />
//                     <path
//                       d="M179,258.5l3.5,9c-3.646,2-5.954,2.647-10.5,3l-3-9c0,0,6.437-1.018,10-3Z"
//                       fill="#737372"
//                     />
//                     <path
//                       d="M199.5,250.5c3.78-2.096,5.647-3.3,8.5-5.5l5.5,7.5c-3.068,2.6-5.187,3.897-9.5,6l-4.5-8Z"
//                       fill="#737372"
//                     />
//                     <path d="M72.9999,31l8.5-6l5.5,9.5-9.5,5.5-4.5-9Z" fill="#737372" />
//                     <path d="M103,16l8.5-3l4.5,9-9,3-4-9Z" fill="#737372" />
//                     <path
//                       d="M176,14l-1.5,11c8.199,2.3423,12.122,4.1035,19,7l1.5-2.5c31.337,16.0454,44.302,29.1144,60,59L252.5,90l6.5,15.5l9.5-3-6-16.5-3.5,1c-15.528-31.9354-28.84-45.3346-61-61l1-3.5c-8.177-3.8579-13.061-5.8207-23-8.5Z"
//                       fill="#737372"
//                     />
//                     <path
//                       d="M184,256.5c4.077-1.132,6.255-2.039,10-4l5,9c-4.586,2.635-6.882,3.613-10.5,4.5l-4.5-9.5Z"
//                       fill="#f1efc1"
//                     />
//                     <path
//                       d="M260.5,110l9.5-2l2.5,11-2,.5c4.748,37.045,1.315,55.991-15.5,86.5l2,1.5c-12.554,19.169-21.128,28.706-38.5,42.5l-6-8c16.333-13.187,24.086-21.735,35.5-39l2,1c15.341-30.546,18.481-48.774,15-83.5h-3L260.5,110Z"
//                       fill="#f1efc1"
//                     />
//                     <path
//                       d="M66.4999,34.5l6.5,8.5c-17.7313,12.102-25.1695,20.785-35.5,38.5l-2.1092-1.4431C19.2746,111.452,16.3387,129.788,19.4999,163.5l2.5-.5l3.5,9.5-10,4-3.5-11l2.5-2c-3.8095-35.625.279-54.466,16.5-86.4474l-3-2.0526c12.5326-17.2092,20.8653-26.1302,38.5-40.5Z"
//                       fill="#f1efc1"
//                     />
//                     <path d="M86.9999,22l9-4L101.5,27l-9.0001,5-5.5-10Z" fill="#f1efc1" />
//                     <path
//                       d="M176,14c-22.255-5.11265-34.544-5.86404-56-2l1,10c20.521-3.729,32.63-2.2006,53.5,3L176,14Z"
//                       fill="#f1efc1"
//                     />
//                     <path
//                       d="M165.5,271.5l-1-9c-23.852,2.063-35.778,1.823-52.5-3l-3,10c21.165,4.224,33.503,5.253,56.5,2Z"
//                       fill="#f1efc1"
//                     />
//                   </g>
//                   <g id="outerCircle" style={{ isolation: 'isolate' }}>
//                     <path
//                       d="M155.619,0.499987h-13.119v3.000013c65.793-1.71862,126.834,46.1367,137,114l2.75-.5l2.75-.5C272.536,56.6375,227.189,8.8461,165.971,1.36836c-3.403-.415602-6.854-.706677-10.352-.868373Z"
//                       fill="#f1efc1"
//                     />
//                     <path
//                       d="M5.49988,166l-5.000002,1C16.6159,242.886,74.7505,285.685,142.5,285.5v-2-.5-2.5C68.1241,278.908,21.0245,234.302,5.49988,166Z"
//                       fill="#f1efc1"
//                     />
//                   </g>
//                 </g>
//                 <g id="container">
//                   {/* <g id="loadingLights">
  
//       <path id="firstLight" d="M317,275.5l-2-2.5l9-9.5l5-2h34.5l1,3.5-9.5,9.5-2,1h-36Z" fill="#3da79a" />
   
    
//      <path id="firstLight" d="M317,275.5l-2-2.5l9-9.5l5-2h34.5l1,3.5-9.5,9.5-2,1h-36Z" fill="#3da79a" />
 
//       <path id="secondLight" d="M372.5,275.5l-2-2.5l9-9.5l5-2h34.5l1,3.5-9.5,9.5-2,1h-36Z" fill="#1d91b6"   />
//       <path id="thirdLight" d="M428,275.5l-2-2.5l9-9.5l5-2h34.5l1,3.5-9.5,9.5-2,1h-36Z" fill="#b4b58d" />
//     </g>  */}
//                   <path
//                     d="M250,283.5c19.64.515,28.781-2.462,41.5-14l11.5-12c9.98-7.571,16.62-9.831,30.5-10h127.5c11.484-.409,17.715,1.899,28.5,10l13,12c9.098,9.05,15.207,11.924,27.5,14h327.5v-2h66c11.148-3.896,16.743-6.824,25-14L1021,195c5.15-7.217,7.68-11.513,11-20l.5-67h2v-41h-1.5v-25.25-25.25c.04-9.12834-2.76-12.34415-13-14.5h-53-793.5l-7.529-.63164C227.189,8.8461,272.536,56.6375,285,116.5l-2.75.5c12.64,101.955-49.038,162.651-139.75,166c0,0,0,.500001,0,.500001v-2.000001v1.999998L250,283.5Z"
//                     transform="translate(0 0.000002)"
//                     stroke="#f1efc1"
//                     fill="#75aeb1"
//                     fill-opacity="0.29"
//                   />
//                   {/* <path  d="M967,0L967,2L1020,2C1030.24,4.15585,1033.04,7.37166,1033,16.5L1033,41.75L1033,67L1034.5,67L1036,67L1036,16.5C1035.51,4.06512,1031.88,0.578335,1020,0L967,0Z" transform="matrix(-1 0 0 -1 1038 453)" fill="rgb(241,239,193)" stroke="none" style={{mixBlendMode: "normal", paintOrder: "fill"}}></path>  */}
//                   {/* <path id="containerRightBottom" d="M1034.5,108h-2l-.5,67c-3.32,8.487-5.85,12.783-11,20l-72.5,72.5c-8.257,7.176-13.852,10.104-25,14h-66v2v2.5l66-.5c13.323-4.081,19.832-7.941,29.5-18l72-72.5c5.51-7.215,7.93-11.591,11-20v-67h-1.5Z" fill="#f1efc1" /> */}
//                   {/* <path id="containerRightTop" d="M967,0v2h53c10.24,2.15585,13.04,5.37166,13,14.5v25.25v25.25h1.5h1.5v-50.5c-.49-12.43488-4.12-15.921665-16-16.5h-53Z" transform="translate(0 2)" fill="#f1efc1" /> */}
//                 </g>
//                 <text
//   dx="0"
//   dy="0"
//   font-size="40"
//   letter-spacing="1"
//   transform="translate(350.214422 151.281082)"
//   id="titleContent"
//   fill="#00bfff" <!-- Set the fill color to a futuristic blue -->
// >
//   {employee.employeeName}
// </text>

// <foreignObject
//   id="detailsContainer"
//   x="10"
//   y="10"
//   width="700"
//   height="350"
//   transform="translate(300 160.281082)"
// >
//   <div
//     id="detailsContent"
//     xmlns="http://www.w3.org/1999/xhtml"
//     style="font-family: 'Roboto', sans-serif; color: #ffffff;" <!-- Use a clean, sans-serif font and white color -->
//   >
//     You are currently {employee.score}% recommendable. Your complaint Status is{' '}
//     {employee.complainStatus}. You have spent 2 years 5 months at MC&T.
//   </div>
// </foreignObject>

// <text
//   dx="0"
//   dy="0"
//   font-size="20"
//   letter-spacing="1"
//   id="textContent"
//   fill="#00ff00" <!-- Set the fill color to a futuristic green -->
// >
//   70%
// </text>

// <image
//   transform="translate(70 66)"
//   href={employee.imagePath}
//   height="150"
//   width="150"
//   style="filter: grayscale(20%) contrast(150%);" <!-- Apply a slight grayscale and increased contrast -->
// />

// <text
//   id="titleContent"
//   transform="translate(800 90)"
//   dx="0"
//   dy="0"
//   font-size="40"
//   letter-spacing="1"
//   fill="#ff00ff" <!-- Set the fill color to a futuristic pink/purple -->
// >
//   {department.designation}
// </text>
//               </svg>
//             </Styles>
//           </Grid>
          
//           <br />
//           <Grid md={6}>
//             {/* <div class="btn-group-vertical" style={{marginRight:'60px'}}> */}
//             <label>
              
//                   <Chip
//                     size="small"
//                     // icon={<GiCash />}
//                     label=""
//                     clickable
//                     style={{ backgroundColor: '#FFFFFF', marginTop: '10px', display: 'absolute' }}
//                     onClick={() => handleOpenPayment()}
//                     deleteIcon={<DoneIcon />}
//                   />
 
//             </label>
//             <label>
             
//                   <Chip
//                     size="small"
//                     // icon={<PersonOutline />}
//                     label=""
//                     clickable
//                     style={{ backgroundColor: '#FFFFFF', marginTop: '10px', display: 'absolute' }}
//                     onClick={() => handleOpenEditPersonal()}
//                     deleteIcon={<DoneIcon />}
//                   />
                

//               {/* <Chip
//                               size="small"
//                               icon={<PersonOutline />}
//                               label=""
//                               clickable
//                               style={{ backgroundColor: '#FFFFFF', marginTop:'10px'}}
//                              onClick={() => this.handleEditPayment()}
//                               deleteIcon={<DoneIcon />}
//                             /> */}
//             </label>
//             <label>
//               <Chip
//                 size="small"
//                 icon={<InsertPhotoIcon />}
//                 label=""
//                 clickable
//                 style={{ backgroundColor: '#FFFFFF', marginTop: '10px' }}
//                 onClick={() => handleOpenEditPhoto()}
//                 deleteIcon={<DoneIcon />}
//               />
//             </label>
//           </Grid>
//         </Grid>
//       </div>
//       {/* <PaymentDetail open={openPayment} close={handleClosePayment} employee={employee} />
//       <PersonalDetail
//         openPersonal={openPersonal}
//         close={handleCloseEditPersonal}
//         employee={employee}
//       />
//       <UploadPhoto openPhoto={editPhoto} close={handleCloseEditPhoto} employee={employee} /> */}
//     </>
//   );
// }

// export default PortalBody;
