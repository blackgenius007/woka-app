/* eslint-disable */
import React, { useState } from 'react';
import { savePayrollData } from '../../../Services/HR-Services/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  TextField,
 
} from '@mui/material';
import Draggable from 'react-draggable'; 
import { fNumber } from 'src/utils/format-number';
 

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function PayrollSettings(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { _id, ownerId,businessSector,country } = user.data;
  const [open, setOpen] = useState(false);
  const [openPartime, setOpenPartime] = useState(false);
  const [state, setState] = React.useState({
    fulltime: true,
    partime: false,
    remote: false,
  });
  const [payroll, setPayroll] = useState({
    designation: '',
    medical: '',
    perhrIncome: '',
    grossIncome: '',
  });
  const [message, setMessage] = useState('');
  const { designation, medical,perhrIncome, grossIncome } =
    payroll;
  
  const details = {
    businessSector,
    designation,
    medical,
    perhrIncome,
    grossIncome,
    country
  };   

  const basicSalary = grossIncome * 0.15;
  const housingAlnc = grossIncome * 0.075;
  const transportAlnc = grossIncome * 0.075;
  const EntertainmentAlnc = grossIncome * 0.1;
  const UtilityAlnc = grossIncome * 0.6;
  const workHr = 8.0 * 5 * 52;
  const workHrRate = grossIncome / workHr;


 


  const handleClose = () => {
    setOpen(false);
  };

  const handleClosePartime = () => {
    setOpenPartime(false);
  };

  const handleOpen = () => {
    if (payroll.grossIncome && payroll.perhrIncome) {
      setMessage('You can either create a salary designation or hourly rate employee, not both at once.');
    } else {
      setMessage('');
      // Perform the action for viewing when only one field is filled
          if (payroll.grossIncome) {
      setOpen(true);
    } else {
      setOpenPartime(true);
    }
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setPayroll((prevPayroll) => {
      let updatedPayroll = { ...prevPayroll, [name]: value };
  
      if (name === 'grossIncome' && updatedPayroll.perhrIncome) {
        updatedPayroll = { ...updatedPayroll, perhrIncome: '' };
        setMessage('You can either create a salary designation or hourly rate employee, not both at once.');
      } else if (name === 'perhrIncome' && updatedPayroll.grossIncome) {
        updatedPayroll = { ...updatedPayroll, grossIncome: '' };
        setMessage('You can either create a salary designation or hourly rate employee, not both at once.');
      } else {
        setMessage('');
      }
  
      return updatedPayroll;
    });
  };




const onSubmitHandle = (e) => {
  e.preventDefault();

console.log(details)
  const payrollData = details; // Assuming payroll is already defined

  let requestPayload;
  if (ownerId) {
    requestPayload = { ownerId, ...payrollData };
  } else {
    requestPayload = { _id, ...payrollData };
  }

  axios.post('https://woka-app.vercel.app/api/v1/employee/newDesignation', requestPayload)
    .then((response) => {
      console.log('Submitted successfully!', response.data);
      alert('Submitted successfully!');
    })
    .catch((error) => {
      console.error('An error occurred! Try submitting the form again.', error);
      alert('An error occurred! Try submitting the form again.');
    });
};

 
//   const toMoney = (value) => {
//     return accounting.formatMoney(accounting.unformat(value), {
//       symbol: '',
//       precision: 2,
//     });
//   };

  return (  
    <>
CREATE NEW DESIGNATION
<br/>
<br/>
<form >
      <TextField
        variant="outlined"
        autoFocus
        margin="dense"
        name="designation"
        value={payroll.designation}
        onChange={handleChange}
        required
        label="Create new Job designation"
        autoComplete="off"
        type="text"
        fullWidth
      />

      <TextField
        variant="outlined"
        autoFocus
        margin="dense"
        name="grossIncome"
        value={payroll.grossIncome}
        onChange={handleChange}
        required
        label="Enter Gross Income only if  designation is for Salary Employee "
        autoComplete="off"
        type="number"
        fullWidth
      />

      <TextField
        variant="outlined"
        autoFocus
        margin="dense"
        name="perhrIncome"
        value={payroll.perhrIncome}
        onChange={handleChange}
        required
        label="Hourly Income for Non-Salary Designation"
        autoComplete="off"
        type="number"
        fullWidth
      />

      <TextField
        variant="outlined"
        autoFocus
        margin="dense"
        name="medical"
        value={payroll.medical}
        onChange={handleChange}
        required
        label="Medical Allowance (Optional)"
        autoComplete="off"
        type="number"
        fullWidth
      />


    </form>
        
          <Box mr={1}>
           
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpen}
           
          >
            View
          </Button>
          {message && (
        <Typography variant="body1" color="error" align="center">
          {message}
        </Typography>
      )}

      
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          // style={{color:'#ffcc00'}}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle
            style={{
              cursor: 'move',
              backgroundColor: '#20B2AA',
              color: '#fff',
            }}
            id="draggable-dialog-title"
          >
            <div style={{ color: '#fff' }}>
              Full time Employee Salary breakdown before Tax
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you accept breakdown,click on send or cancel to adjust your
              gross income
            </DialogContentText>
            <br />
            <TableContainer>
  <Table size="small">
    <TableBody>
      <TableRow>
        <TableCell>Basic Pay</TableCell>
        <TableCell>15%</TableCell>
        <TableCell>
          <b>{fNumber(basicSalary)}</b>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Housing Allowance</TableCell>
        <TableCell>7.5%</TableCell>
        <TableCell>
          <b>{fNumber(housingAlnc)}</b>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Transport Allowance</TableCell>
        <TableCell>7.5%</TableCell>
        <TableCell>
          <b>{fNumber(transportAlnc)}</b>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Entertainment</TableCell>
        <TableCell>10%</TableCell>
        <TableCell>
          <b>{fNumber(EntertainmentAlnc)}</b>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Utility Allowance</TableCell>
        <TableCell>60%</TableCell>
        <TableCell>
          <b>{fNumber(UtilityAlnc)}</b>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Gross Income</TableCell>
        <TableCell>Total</TableCell>
        <TableCell>
          <b>{fNumber(grossIncome)}</b>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Income/hr</TableCell>
        <TableCell>Total</TableCell>
        <TableCell>
          <b>{fNumber(workHrRate)}</b>
        </TableCell>
      </TableRow>
      {medical ? (
        <TableRow>
          <TableCell>Medical Allowance</TableCell>
          <TableCell>-</TableCell>
          <TableCell>
            <b>{fNumber(medical)}</b>
          </TableCell>
        </TableRow>
      ) : null}
    </TableBody>
  </Table>
  <Typography>
    If you accept the breakdown, click on send or cancel to adjust your gross income
  </Typography>
</TableContainer>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={onSubmitHandle}
             
            >
              Save
            </Button>

            <IconButton onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-x"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="#6f32be"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </IconButton>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openPartime}
          onClose={handleClosePartime}
          PaperComponent={PaperComponent}
          // style={{color:'#ffcc00'}}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle
            style={{
              cursor: 'move',
              backgroundColor: '#20B2AA',
              color: '#fff',
            }}
            id="draggable-dialog-title"
          >
            <div style={{ color: '#fff' }}>
              Part-time Employee breakdown (Hourly pay)
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you accept breakdown,click on send or cancel to adjust your
              gross income
            </DialogContentText>
            <br />
            <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>Hourly Pay</TableCell>
            <TableCell>100%</TableCell>
            <TableCell>
              <b>{fNumber(payroll.perhrIncome)}</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Monthly Pay</TableCell>
            <TableCell>Approx.</TableCell>
            <TableCell>
              <b>{fNumber(payroll.perhrIncome * 8 * 20)}</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Yearly Pay</TableCell>
            <TableCell>Approx.</TableCell>
            <TableCell>
              <b>{fNumber(payroll.perhrIncome * 8 * 365)}</b>
            </TableCell>
          </TableRow>
          {medical ? (
            <TableRow>
              <TableCell>Medical Allowance</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                <b>{fNumber(medical)}</b>
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
      <DialogContentText>
        If you accept the breakdown, click on send or cancel to adjust your gross income
      </DialogContentText>
    </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={onSubmitHandle}
            
            >
              Save
            </Button>

            <IconButton onClick={handleClosePartime}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-x"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="#6f32be"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </IconButton>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default PayrollSettings;
