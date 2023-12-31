/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { createInventory } from 'src/Services/ProcureServices/inventorySlice';

import { Button, Typography, Grid, TextField, MenuItem } from '@mui/material';
import ItemStatus from './itemStatus';

const NewItem = ({ email, tagName, businessName }) => {
  const dispatch = useDispatch();
  console.log('new form:', email, tagName, businessName);
  const [alertOpen, setAlertOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: email,
    tagName: tagName,
    itemName: '',
    description: '',
    suppliers_email: '',
    suppliers_number: '',
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
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // Submit items
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Dispatch the createInventory action with the form data
      const response = await dispatch(createInventory(formData));

      // Optionally, you can reset the form after successful submission
      setFormData({
        email: email,
        tagName: tagName,
        itemName: '',
        description: '',
        suppliers_email: '',
        suppliers_number: '',
        price: '',
        stock: '',
        category: '',
        supplier: '',
        status: '',
      });

      // Check if the action was fulfilled
      if (response.meta.requestStatus === 'fulfilled') {
        // Display a Material-UI success alert
        setAlertOpen(true);
      } else {
        // Handle the case where the action was rejected
        console.error('Error creating inventory item:', response.error);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Unexpected error creating inventory item:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px' }}>
      {alertOpen && (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Alert severity="success" onClose={handleAlertClose}>
            <AlertTitle>Success</AlertTitle>
            Inventory item created successfully!
          </Alert>
        </Stack>
      )}

      <Typography variant="h5" component="h1" style={{ color: 'grey' }}>
        {tagName}-New Inventory Form
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
            label="Supplier Name"
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
            style={{ marginTop: '10px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label="Suppliers email"
            name="suppliers_email"
            value={formData.suppliers_email}
            onChange={handleInputChange}
            style={{ marginTop: '10px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label="Suppliers Number"
            name="suppliers_number"
            value={formData.suppliers_number}
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

        <Button
          onClick={handleSubmit}
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
