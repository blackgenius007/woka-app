/* eslint-disable */
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import Table from './table';
import{getAllInventoryEachPoint} from 'src/Services/ProcureServices/inventorySlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InventoryDialog({open, close,employeeNumber, tagName ,email,businessName}) {
 console.log(tagName ,email,businessName)

  // Accessing inventory data from the Redux store
  const inventoryData = useSelector((state) => state.inventory);

 console.log('INVENTORY=>',inventoryData)

  return (
    <React.Fragment>
    
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
         <AppBar sx={{ position: 'relative', backgroundColor: '#fff', color: '#000' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={close} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
              {businessName}-{tagName}
            </Typography>
            {/* <Typography
          variant="h4"
          style={{
            color: '#1565c0',
            marginTop: '20px',
            marginRight: '300px',
            fontFamily: 'cursive', // Use a curvy font family
            fontWeight: 'bold', // Make the font thicker
          }}
        >
          Manage Inventory Records
        </Typography> */}
            <Button
            variant="contained"
            style={{ backgroundColor: '#0096FF', color: 'white' }} // Set background color to blue and text color to white
           
          >
            View Inventory History
          </Button>
          </Toolbar>
        </AppBar>
         <br/>
         <br/>
        
        <Table email={email} tagName={tagName} businessName={businessName} />
    
      </Dialog>
    </React.Fragment>
  );
}
