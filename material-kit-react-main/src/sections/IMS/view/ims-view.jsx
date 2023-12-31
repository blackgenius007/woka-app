/* eslint-disable */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  Grid,
  Paper,
  Popover,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CollectionSetup from './Data-collection/collectionSetup';
import Scrollbar from 'src/components/scrollbar';
import InventorySheet from './inventorySheet';
import { Icon } from '@iconify/react';
import { createDataCollectionPoint } from 'src/Services/AuthServices/authSlice';
import Iconify from 'src/components/iconify';

const IMSPage = () => {
  const dispatch = useDispatch();
  //user details
  const { ownerEmail, role } = useSelector((state) => state.auth.user.data);

  // user role
  const userEmail = role === 'owner' || role === 'admin' ? ownerEmail : email;
  console.log(userEmail);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleCreateCollectPoint = (collectPoint, userEmail) => {
    console.log('Creating collection point:', collectPoint);
    // Dispatch the createDataCollectionPoint action with the payload
    dispatch(createDataCollectionPoint(collectPoint));

    // Close the popover or perform any other logic as needed
    setAnchorEl(null);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleLowStockAlerts = () => {
    // Add logic for Low Stock Alerts
  };

  const handleOrderStatusUpdates = () => {
    // Add logic for Order Status Updates
  };

  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <Container>
      <div style={{ marginBottom: '16px' }}>
        <Stack direction={isSmallScreen ? 'column' : 'row'} spacing={3} alignItems="center">
          <Typography variant="h4">Inventory Management System</Typography>

          {/* Add button for creating a new inventory item */}
          <Link to="/new-inventory-item">
            <Button variant="contained" style={{ backgroundColor: '#0096FF', color: 'white' }}>
              New Inventory
            </Button>
          </Link>

          {/* Add buttons or icons for key elements */}
          <Stack direction={isSmallScreen ? 'column' : 'row'} spacing={2} width="100%">
            <Button
              variant="contained"
              style={{ backgroundColor: '#00CC66', color: 'white' }}
              startIcon={<Icon icon="vaadin:truck" />}
              // Add link to Order Management page
              component={Link}
              to="/order-management"
              fullWidth={isSmallScreen}
            >
              Inventory records
            </Button>

            <Button
              variant="contained"
              style={{ backgroundColor: '#FF9900', color: 'white' }}
              startIcon={<Icon icon="mdi:people-outline" />}
              // Add link to Supplier Management page
              component={Link}
              to="/supplier-management"
              fullWidth={isSmallScreen}
            >
              Supplier Management
            </Button>

            <Button
              variant="contained"
              style={{ backgroundColor: '#FF3366', color: 'white' }}
              startIcon={<Icon icon="fxemoji:barchart" />}
              // Add link to Reports and Analytics page
              component={Link}
              to="/reports-analytics"
              fullWidth={isSmallScreen}
            >
              Reports and Analytics
            </Button>

            <Button
              variant="contained"
              style={{ backgroundColor: '#FF3366', color: 'white' }}
              startIcon={<Icon icon="clarity:alert-line" />}
              // Add link or handle Low Stock Alerts
              onClick={handleLowStockAlerts}
              fullWidth={isSmallScreen}
            >
              Low Stock Alerts
            </Button>

            <Button
              variant="contained"
              style={{ backgroundColor: '#FF3366', color: 'white' }}
              startIcon={<Icon icon="fluent:alert-28-filled" />}
              // Add link or handle Order Status Updates
              onClick={handleOrderStatusUpdates}
              fullWidth={isSmallScreen}
            >
              Order Status Updates
            </Button>
          </Stack>
        </Stack>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '16px' }}>
            <InventorySheet />
          </Paper>
        </Grid>

        {/* Add another grid item for the second column */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '16px' }}>{/* Add another component here if needed */}</Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            style={{ backgroundColor: '#FF3366', color: 'white' }}
            fullWidth
            onClick={handlePopoverOpen}
          >
            Create Collection Point
          </Button>
        </Grid>
      </Grid>
      {/* Popover for the Create Collection Point form */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper style={{ padding: '16px' }}>
          <CollectionSetup userEmail={userEmail} />
        </Paper>
      </Popover>
    </Container>
  );
};

export default IMSPage;
