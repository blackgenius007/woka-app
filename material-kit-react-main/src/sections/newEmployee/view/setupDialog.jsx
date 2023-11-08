/* eslint-disable */
import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Stack,
  Typography,
 
} from '@mui/material';
 
import Iconify from 'src/components/iconify';
import CloseIcon from '@mui/icons-material/Close';
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

 
