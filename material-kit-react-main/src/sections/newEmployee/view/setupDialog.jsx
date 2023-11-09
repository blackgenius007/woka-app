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
  Typography,
  Stack,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import PayrollSettings from './payrollSetting';
import Department from './department';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SetupDialog({ open, close }) {
  return (
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <PayrollSettings />
          </Grid>
          <Grid item xs={12} md={6}>
            <Department />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

 
