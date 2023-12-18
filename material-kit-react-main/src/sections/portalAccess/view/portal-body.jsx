/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { authPortalAccess } from 'src/Services/HR-Services/employeeSlice';
import { authDataAccess } from 'src/Services/HR-Services/employeeSlice';
import IconButton from '@mui/material/IconButton';
import InventoryIcon from '@mui/icons-material/Inventory';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import StorageIcon from '@mui/icons-material/Storage';
import Swal from 'sweetalert2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { Typography, Button, Grid, Paper, Avatar, TextField, Popover } from '@mui/material';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const EmployeePortal = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployeeData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [defaultPopoverOpen, setDefaultPopoverOpen] = useState(false);
  const [additionalDataPopoverOpen, setAdditionalDataPopoverOpen] = useState(false);
  const [dataCode, setDataCode] = useState('');
  const [dataMessage, setDataMessage] = useState('');

  const handleDefaultPopoverOpen = (event) => {
    setDefaultPopoverOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleDefaultPopoverClose = () => {
    setDefaultPopoverOpen(false);
  };

  // const handleCollector = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

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

  // const handleSubmit = () => {
  //   // Add your logic to handle the submitted dataCode
  //   // alert('Data Code submitted:', dataCode);
  //   dispatch(authDataAccess(dataCode));
  //   // Close the popover
  //   handleClose();
  // };

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
        'https://res.cloudinary.com/youseful-apps/image/upload/v1656692093/samples/ecommerce/shoes.png',
      alt: 'Ad 2',
    },
    {
      id: 3,
      image:
        'https://res.cloudinary.com/youseful-apps/image/upload/v1659615143/avatar/h7oqmtok7lads4qn3s6r.png',
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper
            style={{
              backgroundColor: '#fff',
              padding: '16px',
              textAlign: 'center',
              color: '#000', // Contrast text color
              boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1), 0px -5px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h4">Futuristic Employee Portal</Typography>
          </Paper>
          <br />
          <Grid container spacing={2} style={{ padding: '24px' }}>
            <Grid item xs={12} md={6}>
              <div>
                <Typography variant="h5"> Maxwell James </Typography>
                <Typography variant="body1">Employee ID: 2888999 </Typography>
                <Typography variant="body1">Department: Accounts </Typography>
                {/* Add more details as needed */}
              </div>
            </Grid>
            <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
              <Avatar
                alt={employee}
                src="https://res.cloudinary.com/youseful-apps/image/upload/v1702332939/front_unv6ak.png"
                style={{ width: '80px', height: '80px' }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ padding: '24px' }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Actions</Typography>
              <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '16px', width: '200px' }}
                  onClick={() => console.log('View Payroll clicked')}
                >
                  <MonetizationOnIcon style={{ marginRight: '8px' }} />
                  View Payroll
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '16px', width: '200px' }}
                  onClick={handleEditClick}
                >
                  <EditIcon style={{ marginRight: '8px' }} />
                  Edit Details
                </Button>

                <Button
                  variant="contained"
                  style={{ width: '200px', backgroundColor: '#fff', color: '#00bfff' }}
                  onClick={handleDefaultPopoverOpen}
                >
                  <StorageIcon style={{ marginRight: '8px' }} />
                  Data access
                </Button>
              </div>
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

          <Paper
            style={{
              backgroundColor: '#fff',
              padding: '16px',
              textAlign: 'center',
              position: 'fixed',
              bottom: 0,
              width: '100%',
              color: '#000', // Contrast text color
              boxShadow: '0px -5px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="body2">© 2023 Futuristic Employee Portal</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" style={{ color: '#fff', marginBottom: '16px' }}>
            Advertisements
          </Typography>
          <div style={{ width: '100%', height: '300px', overflow: 'hidden', borderRadius: '8px' }}>
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
        </Grid>
      </Grid>
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
          <Typography variant="h6" gutterBottom>
            Enter your Data collector access code
          </Typography>
          <input placeholder="Data Code" value={dataCode} onChange={handleInputChange} />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          
    {dataMessage && ( // Conditionally render the error message
      <Typography variant="body2" style={{ color: 'red', marginTop: '8px' }}>
        {dataMessage}
      </Typography>
    )}
        </div>
      </Popover>
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
