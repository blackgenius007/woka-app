/* eslint-disable */
import React, { useState } from 'react';
import { Container, Grid, TextField, Form, Button, Typography } from '@mui/material';
import { createDataCollectionPoint } from 'src/Services/AuthServices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const CollectPointForm = ({ userEmail }) => {
  const dispatch = useDispatch();

  const [collector, setCollector] = useState({
    employeeNumber: '',
    tagName: '',
  });
  const { employeeNumber, tagName } = collector;

  const handleCreateCollectPoint = async () => {
    console.log('collector:', employeeNumber, tag, userEmail);
  
    try {
      // Dispatch collection point action with separate string values
      const response = await dispatch(createDataCollectionPoint({ employeeNumber, tagName, userEmail }));
  
      // Check if the response is successful
      if (createDataCollectionPoint.fulfilled.match(response)) {
        // Display SweetAlert2 success message
        Swal.fire({
          title: 'Success!',
          text: 'Data collection point created successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
  
        // You can also perform any additional actions after success if needed
        // For example, navigate to another page, reset form fields, etc.
      } else {
        // Handle the case where the response indicates an error
        console.error('Error creating data collection point:', response.error);
  
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while creating the data collection point.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      // Handle other errors, not related to the action
      console.error('Error creating data collection point:', error);
  
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  // const handleCreateCollectPoint = () => {
  //   console.log('collector:',employeeNumber, tag, userEmail )
  //   // Dispatch collection point action with separate string values
  //   dispatch(createDataCollectionPoint({employeeNumber, tag, userEmail}));
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollector((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <Container>
        <form onSubmit={handleCreateCollectPoint}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="employeeNumber"
              label="Unique number"
              variant="outlined"
              fullWidth
              value={collector.employeeNumber}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="tagName"
              label="Inventory location or Project name "
              variant="outlined"
              fullWidth
              value={collector.tagName}
              onChange={handleInputChange}
              required
            />
          </Grid>
        </form>
        {/* <TextField
        label="Employee Unique Number"
        value={employeeNumber}
        onChange={(e) => setEmployeeNumber(e.target.value)}
      />
      <TextField
        label="Tag (Project/Branch/Department)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      /> */}
        <Button variant="contained" onClick={handleCreateCollectPoint}>
          Create Collection Point
        </Button>
      </Container>
    </div>
  );
};

export default CollectPointForm;
