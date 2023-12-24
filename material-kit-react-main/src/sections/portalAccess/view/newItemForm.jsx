  /* eslint-disable */
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
 import ItemStatus from './itemStatus';
import { Grid, Button, TextField, Typography, MenuItem } from '@mui/material';
// import { registerInmate } from '../InmateServices/inmateSlice';
 

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
    <div style={{ padding: '20px', maxWidth: '300px' }}>
      <Typography variant="h5" component="h1" style={{ color: 'grey' }}>
        NEW ITEM FORM
      </Typography>
      <br />
      <form>
      <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="SKU Number"
              name="SKU"
              value={formData.SKU}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Unit Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Number in Stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              size="small"
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

       