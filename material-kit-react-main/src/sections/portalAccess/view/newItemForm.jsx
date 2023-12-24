import React, { useState } from 'react';
import {
  Button,
  Popover,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from '@mui/material';

const NewItemForm = () => {
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          size="medium"
          fullWidth
          label="Item Name"
          name="itemName"
          value={formData.itemName}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          size="medium"
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          size="medium"
          fullWidth
          label="SKU Number"
          name="SKU"
          value={formData.SKU}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          size="medium"
          fullWidth
          label="Unit Price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          size="medium"
          fullWidth
          label="Number in Stock"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          size="medium"
          fullWidth
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          size="medium"
          fullWidth
          label="Supplier"
          name="supplier"
          value={formData.supplier}
          onChange={handleInputChange}
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
        >
          {['In Stock', 'Out of Stock'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

const PopoverFormExample = () => {
  const [formPopoverOpen, setFormPopoverOpen] = useState(false);

  const handleFormPopoverOpen = (event) => {
    setFormPopoverOpen(true);
  };

  const handleFormPopoverClose = () => {
    setFormPopoverOpen(false);
  };

  return (
    <>
      <Button onClick={handleFormPopoverOpen} variant="contained">
        Open Form Popover
      </Button>
      <Popover
        open={formPopoverOpen}
        onClose={handleFormPopoverClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 50, left: 50 }}
      >
        <div style={{ padding: '20px', maxWidth: '300px' }}>
          <Typography variant="h5" component="h1" style={{ color: 'grey' }}>
            NEW ITEM FORM
          </Typography>
          <NewItemForm />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ marginTop: '20px' }}
          >
            Submit
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default PopoverFormExample;
