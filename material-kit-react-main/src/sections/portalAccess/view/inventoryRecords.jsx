/* eslint-disable */
import * as React from 'react';
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
import{getAllInventoryEachPoint} from 'src/Services/ProcureServices/inventorySlice'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InventoryDialog({open, close,employeeNumber, tag ,email,businessName}) {
 

 console.log('inventory:',employeeNumber,tag ,email)

 

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
              {businessName}-{tag}
            </Typography>
            <Button autoFocus color="inherit" onClick={close}>
              save
            </Button>
          </Toolbar>
        </AppBar>
         
        <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Manage Inventory Records</Typography>

     
          <Button
            variant="contained"
            style={{ backgroundColor: '#0096FF', color: 'white' }} // Set background color to blue and text color to white
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Inventory history
          </Button>
     
      </Stack>
      <Scrollbar>
        <h2>Inventory Table</h2> 
      </Scrollbar>
    </Container>
      </Dialog>
    </React.Fragment>
  );
}
