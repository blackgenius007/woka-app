/* eslint-disable */
import React, { useState } from 'react';
import { Container, Grid, TextField, Form, Button, Typography } from '@mui/material';
import { createDataCollectionPoint } from 'src/Services/AuthServices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const CollectPointForm = ({ userEmail }) => {
  const dispatch = useDispatch();

  const [collector, setCollector] = useState({
    employeeNumber: '',
    tag: '',
  });
  const { employeeNumber, tag } = collector;

  const collectpoint = { employeeNumber, tag,userEmail };
  const handleCreateCollectPoint = () => {
    // Dispatch collection point action
    dispatch(createDataCollectionPoint({ collectpoint }));
  };

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
              name="tag"
              label="Inventory location or Project name "
              variant="outlined"
              fullWidth
              value={collector.tag}
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
