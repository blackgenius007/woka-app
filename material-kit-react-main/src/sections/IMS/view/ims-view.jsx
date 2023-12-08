/* eslint-disable */

import React from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Scrollbar from 'src/components/scrollbar';
// import InventoryTable from 'components/InventoryTable'; // Adjust this import based on your project structure
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify';
 

const IMSPage = () => {
  const handleLowStockAlerts = () => {
    // Add logic for Low Stock Alerts
  };

  const handleOrderStatusUpdates = () => {
    // Add logic for Order Status Updates
  };

  return (
    <Container>
      <Stack direction="column" spacing={3} alignItems="center">
        <Typography variant="h4">Inventory Management System</Typography>

        {/* Add button for creating a new inventory item */}
        <Link to="/new-inventory-item">
          <Button
            variant="contained"
            style={{ backgroundColor: '#0096FF', color: 'white' }}
          >
            New Inventory Item
          </Button>
        </Link>

        {/* Add buttons or icons for key elements */}
        <Stack direction="column" spacing={2} width="100%">
          <Button
            variant="contained"
            style={{ backgroundColor: '#00CC66', color: 'white' }}
            startIcon={<Icon icon="vaadin:truck" />}
            // Add link to Order Management page
            component={Link}
            to="/order-management"
            fullWidth
          >
            Order Management
          </Button>

          <Button
            variant="contained"
            style={{ backgroundColor: '#FF9900', color: 'white' }}
            startIcon={<Icon icon="mdi:people-outline" />}
            // Add link to Supplier Management page
            component={Link}
            to="/supplier-management"
            fullWidth
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
            fullWidth
          >
            Reports and Analytics
          </Button>

          <Button
            variant="contained"
            style={{ backgroundColor: '#FF3366', color: 'white' }}
            startIcon={<Icon icon="clarity:alert-line" />}
            // Add link or handle Low Stock Alerts
            onClick={handleLowStockAlerts}
            fullWidth
          >
            Low Stock Alerts
          </Button>

          <Button
            variant="contained"
            style={{ backgroundColor: '#FF3366', color: 'white' }}
            startIcon={<Icon icon="fluent:alert-28-filled" />}
            // Add link or handle Order Status Updates
            onClick={handleOrderStatusUpdates}
            fullWidth
          >
            Order Status Updates
          </Button>
        </Stack>
      </Stack>

      {/* Display the current inventory table */}
      <Scrollbar>
        {/* <InventoryTable /> */}
        INVENTORY TABLE HERE
      </Scrollbar>
    </Container>
  );
  // return (
  //   <Container>
  //     <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
  //       <Typography variant="h4">Inventory Management System</Typography>

  //       {/* Add buttons that link to vital elements of IMS */}
  //       <Link to="/new-inventory-item">
  //         <Button
  //           variant="contained"
  //           style={{ backgroundColor: '#0096FF', color: 'white' }}
  //         >
  //           New Inventory Item
  //         </Button>
  //       </Link>

  //       {/* Add more buttons as needed */}
  //     </Stack>

  //     {/* Add buttons or icons for key elements */}
  //     <Stack direction="row" spacing={2} mb={3}>
  //       <Button
  //         variant="contained"
  //         style={{ backgroundColor: '#00CC66', color: 'white' }}
  //         startIcon={<Icon icon="vaadin:truck" />}
  //         // Add link to Order Management page
  //         component={Link}
  //         to="/order-management"
  //       >
  //         Order Management
  //       </Button>

  //       <Button
  //         variant="contained"
  //         style={{ backgroundColor: '#FF9900', color: 'white' }}
  //         startIcon={<Icon icon="mdi:people-outline" />}
  //         // Add link to Supplier Management page
  //         component={Link}
  //         to="/supplier-management"
  //       >
  //         Supplier Management
  //       </Button>

  //       <Button
  //         variant="contained"
  //         style={{ backgroundColor: '#FF3366', color: 'white' }}
  //         startIcon={<Icon icon="fxemoji:barchart" />}
  //         // Add link to Reports and Analytics page
  //         component={Link}
  //         to="/reports-analytics"
  //       >
  //         Reports and Analytics
  //       </Button>

  //       <Button
  //         variant="contained"
  //         style={{ backgroundColor: '#FF3366', color: 'white' }}
  //         startIcon={<Icon icon="clarity:alert-line" />}
  //         // Add link or handle Low Stock Alerts
  //         onClick={() => handleLowStockAlerts()}
  //       >
  //         Low Stock Alerts
  //       </Button>

  //       <Button
  //         variant="contained"
  //         style={{ backgroundColor: '#FF3366', color: 'white' }}
  //         startIcon={<Icon icon="fluent:alert-28-filled" />}
  //         // Add link or handle Order Status Updates
  //         onClick={() => handleOrderStatusUpdates()}
  //       >
  //         Order Status Updates
  //       </Button>
  //     </Stack>

  //     {/* Display the current inventory table */}
  //     <Scrollbar>
  //       {/* <InventoryTable /> */}
  //       INVENTORY TABLE HERE
  //     </Scrollbar>
  //   </Container>
  // );
};

export default IMSPage;
