/* eslint-disable */
import React, { useState } from 'react';
import { Grid, Button, TextField, Typography, MenuItem } from '@mui/material';
import ItemStatus from './itemStatus';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // Center horizontally
  padding: '16px',
  overflowX: 'hidden',
};

const columnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%', // Set column width to 100%
  alignItems: 'center', // Center items vertically
};

const textFieldStyle = {
  width: '100%', // Set a custom width
};

const NewItem = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    SKU: '',
    price: '',
    stock: '',
    category: '',
    supplier: '',
    status: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleItemStatusChange = (event) => {
    setFormData({
      ...formData,
      status: event.target.value,
    });
  };

  return (
    <div style={containerStyle}>
      <Typography variant="h5" component="h1" style={{ color: 'grey' }}>
        NEW ITEM FORM
      </Typography>
      <br />
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} style={columnStyle}>
            <TextField
              variant="outlined"
              size="medium"
              fullWidth
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              style={textFieldStyle} // Apply custom width style
            />
            {/* ... (other TextField components) */}
            <TextField
              select
              label="Item Status"
              name="status"
              value={formData.status}
              onChange={handleItemStatusChange}
              variant="outlined"
              fullWidth
              style={textFieldStyle} // Apply custom width style
            >
              {ItemStatus.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ marginTop: '20px' }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewItem;
