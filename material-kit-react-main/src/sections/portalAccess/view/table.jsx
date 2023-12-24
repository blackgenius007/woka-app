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
              size="medium" // Change size to medium, large, or fullWidth
              fullWidth
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="medium"
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="medium"
              fullWidth
              label="SKU Number"
              name="SKU"
              value={formData.SKU}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="medium"
              fullWidth
              label="Unit Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="medium"
              fullWidth
              label="Number in Stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="medium"
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="medium"
              fullWidth
              label="Supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
            />
            <TextField
              select
              label="Item Status"
              name="status"
              value={formData.status}
              onChange={handleItemStatusChange}
              variant="outlined"
              fullWidth
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
