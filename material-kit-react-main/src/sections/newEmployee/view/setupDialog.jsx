/* eslint-disable */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import PayrollSettings from './payrollSetting';
import Department from './department';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function setupDialog({open,close}) {

  return (
    <React.Fragment>
      
      <Dialog fullScreen open={open} onClose={close} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={close} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogTitle>Setup</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <PayrollSettings />
          </Grid>
          <Grid item xs={6}>
            <Department />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
    </React.Fragment>
  );
}

 
