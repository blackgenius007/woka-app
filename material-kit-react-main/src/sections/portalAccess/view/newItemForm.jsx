/* eslint-disable */
import React, { useState } from 'react';
import {
  Button,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from '@mui/material';
import ItemStatus from './itemStatus';

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
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              style={{ marginTop: '10px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{ marginTop: '10px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="SKU Number"
              name="SKU"
              value={formData.SKU}
              onChange={handleInputChange}
              style={{ marginTop: '10px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Unit Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              style={{ marginTop: '10px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Number in Stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              style={{ marginTop: '10px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={{ marginTop: '10px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
              style={{ marginTop: '10px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Item Status"
              name="status"
              value={formData.status}
              onChange={handleItemStatusChange}
              variant="outlined"
              fullWidth
              style={{ marginTop: '10px' }}
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

       