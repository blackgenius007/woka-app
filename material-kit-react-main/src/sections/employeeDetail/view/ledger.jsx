/* eslint-disable */

import React, { useState, useEffect, useMemo } from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { fNumber } from 'src/utils/format-number';
import {
  calculateTaxAsync,
  updateLoan,
  addLoan,
  addIOU,
  overtimeReset,
} from '../../../Services/AccountServices/financialSlice';
import Collapsible from 'react-collapsible';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import PublishIcon from '@mui/icons-material/Publish';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CreateIcon from '@mui/icons-material/Create';
// import UploadFiles from '../HR/Files/uploadFile';
// import FileViewer from '../HR/Files/fileViewer';
// import TextArea from '../HR/Files/textArea';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
// import AddFundsDialog from './AddFundsDialog ';
// import WithdrawFundsDialog from './WithdrawFundsDialog';
// import LoanIcon from '@mui/icons-material/LocalAtm';
// import loan from '../../../assets/svg/loan.svg';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

const Ledger = ({ healthCare, grossIncome, employeeId, country,currentLoan,currentRepayDate,currentRepay }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [entries, setEntries] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [openingBalance, setOpeningBalance] = useState(0);
  const [closingBalance, setClosingBalance] = useState(0);
  const [OpenFiles, setOpenFiles] = useState(false);
  const [OpenUpload, setOpenUpload] = useState(false);

  const [collapseOpen, setCollapseOpen] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [messages, setMessages] = useState([]);
  const [iouEntries, setiouEntries] = useState([]);
  const [iouDescription, setIOUDescription] = React.useState('');
  const [iouAmount, setIOUAmount] = React.useState(0);

  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  // const [amount, setAmount] = useState({});
 
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    ait: 0,
    investment: 0,
  });
  const [loan, setLoan] = useState({
    loanAmount: '',
    minimumRepay: '',
  });
  const [loanMessage, setLoanMessage] = useState('');
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // const popupState = usePopupState({ variant: 'popover', popupId: 'demo-popup-popover' });

  const hasLoanAndRepayment = loan && loan.loanAmount && loan.minimumRepay;

  useEffect(() => {
    // Function to trigger financial data calculation
    const calculateFinancialData = () => {
      console.log(
        'Calculating financial data for employee:',
        employeeId,
        grossIncome,
        country,
        healthCare
      );

      // Dispatch the action to calculate tax asynchronously
      dispatch(calculateTaxAsync({ employeeId, grossIncome, country, healthCare }));
    };

    // Call the function to calculate financial data
    calculateFinancialData();

    // Specify the dependencies for useEffect
  }, [employeeId, grossIncome, country, healthCare, dispatch]);

  // Retrieve financial data from financialSlice

  const financialData = useSelector((state) => state.financial[employeeId]);
  const thirtyPercentMonthlySalary = financialData && financialData.monthlySalary * 0.3;

  // Save todos to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleLoanAmountChange(e) {
    const { name, value } = e.target;
    setLoan((loan) => ({ ...loan, [name]: value }));
  }
  const repayDate = moment()
    .add(loan.loanAmount / loan.minimumRepay, 'months')
    .calendar();

  // handle submit loan
  const handleLoanSubmit = async (e) => {
    e.preventDefault();

    const { loanAmount, minimumRepay  } = loan;
    const loanDetail = {
      loanAmount,
      minimumRepay,
      employeeId,
      repayDate,
    };

    try {
      const response = await dispatch(addLoan({ loanDetail }));
      console.log('response=>', response);
      if (response.meta.requestStatus === 'fulfilled') {
        setLoanMessage('Successfully submitted, disbursement can be initiated!');
      } else {
        throw new Error('Adding loan failed: Response was not successful');
      }
    } catch (error) {
      console.error('Error adding loan:', error); // Log the detailed error
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  const handleCancelSubmit = () => {
    setConfirmationOpen(false); // Close the dialog if cancel is clicked
  };

  const handleExemption = async () => {
 
    // currentLoan,currentRepayDate,currentRepay

    // Parse the current repayDate using Moment
    const currentRepayDated = moment(currentRepayDate);

    // Add one month to the current repayDate
    const adjustedRepayDate = currentRepayDated.add(1, 'months');

    // Format the adjustedRepayDate as a string in the desired format
    const adjustedRepayDateFormatted = adjustedRepayDate.format('YYYY-MM-DD');

    const exemptBy = currentLoan / currentRepay + 1;
    const ExemptBy = moment().add(exemptBy, 'months').calendar();

    const loanDetail = {
      employeeId,
      ExemptBy,
      repayDate: adjustedRepayDateFormatted, // Include the adjusted repayDate
    };
    console.log('exempted=>', loanDetail);
    try {
      const response = await dispatch(updateLoan({ loanDetail }));
      console.log('response=>', response);
      if (response.meta.requestStatus === 'fulfilled') {
        setMessage('The loan maturity date has been successfully adjusted forward by one month.');
      } else {
        throw new Error('Adding loan failed: Response was not successful');
      }
    } catch (error) {
      console.error('Error adding loan:', error); // Log the detailed error
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  const handleLoanPayoff = async (id, loan) => {
    const today = moment();

    const loanDetail = {
      employeeId,
      today,
    };

    try {
      const response = await dispatch(loanPayOff({ loanDetail }));
      console.log('response=>', response);
      if (response.meta.requestStatus === 'fulfilled') {
        setMessage('Remaining loan has been successfully settled!');
      } else {
        throw new Error('Pay Off failed: Response was not successful');
      }
    } catch (error) {
      console.error('Error adding loan:', error); // Log the detailed error
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  //handle IOUs
  const handleIOUChange = (event) => {
    const inputValue = parseFloat(event.target.value);
    setIOUAmount(inputValue);
  };

  const handleIOUSubmit = () => {
    alert('treeee')
    if (iouAmount <= thirtyPercentMonthlySalary) {
      dispatch(updateIOU(employeeId, iouAmount))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            // IOU has been successfully updated
            alert('IOU has been successfully updated!');
          } else {
            // Handle the case where the request was not successful
            console.error('IOU update failed:', response);
            alert('Failed to update IOU. Please try again.');
          }
        })
        .catch((error) => {
          // Handle any unexpected errors during the update
          console.error('Error updating IOU:', error);
          alert('An error occurred while updating IOU. Please try again.');
        });
    } else {
      alert('IOU amount cannot exceed 30% of monthly salary');
    }
  };
  
  

  // Open files
  const handleFileOpen = () => {
    setOpenFiles(true);
  };

  const handleFileClose = () => {
    setOpenFiles(false);
  };
  // Open upload

  const handleUploadOpen = () => {
    setOpenUpload(true);
  };

  const handleUploadClose = () => {
    setOpenUpload(false);
  };
 

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen); // Toggle the collapse state
  };

  const handleSend = () => {
    // Handle sending the text content, e.g., sending it as a message
    console.log('Sending text:', text);
  };

  return (
    <>
      <div
        style={{
          marginBottom: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MonetizationOnIcon style={{ fontSize: '32px', marginRight: '10px' }} />
            <div>
              <p style={{ fontSize: '24px', marginBottom: '2px' }}>Employee interest free loans </p>
              <p style={{ fontSize: '10px', color: '#888' }}>
                Enter loan amount and monthly repayment
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <input
              type="number"
              placeholder="Loan Amount"
              name="loanAmount"
              value={loan.loanAmount}
              onChange={handleLoanAmountChange}
              style={{
                padding: '3px',
                fontSize: '10px',
                width: '60px',
                marginRight: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              type="number"
              placeholder="Monthly Repayment"
              name="minimumRepay"
              value={loan.minimumRepay}
              onChange={handleLoanAmountChange}
              style={{
                padding: '3px',
                fontSize: '10px',
                width: '60px',
                marginRight: '5px',
                border: '1px solid #ccc',
              }}
            />
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <Button
                    style={{
                      backgroundColor: '#FFD300',
                      fontSize: '10px',
                      color: 'black', // Set the font color to black
                      padding: '3px 6px',
                    }}
                    variant="contained"
                    {...bindTrigger(popupState)}
                  >
                    Submit
                  </Button>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <div
                      style={{
                        padding: '16px',
                        maxWidth: '300px',
                      }}
                    >
                      {hasLoanAndRepayment ? (
                        <>
                          <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                            Loan Amount: <strong>{fNumber(loan.loanAmount)}</strong>
                          </div>
                          <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                            Minimum Repay: <strong>{fNumber(loan.minimumRepay)}</strong>
                          </div>
                          <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                            Repay Date: <strong>{repayDate}</strong>
                          </div>
                          {loanMessage}
                        </>
                      ) : (
                        <div
                          style={{
                            marginTop: '20px',
                            color: '#E97451',
                            fontSize: '14px',
                          }}
                        >
                          Please enter loan and repayment values.
                        </div>
                      )}
                      {hasLoanAndRepayment ? (
                        <>
                          <Button
                            onClick={handleLoanSubmit}
                            color="primary"
                            style={{
                              fontSize: '14px',
                            }}
                          >
                            Confirm
                          </Button>
                          <Button
                            onClick={handleCancelSubmit}
                            color="primary"
                            style={{
                              fontSize: '14px',
                              marginRight: '8px',
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  </Popover>
                </div>
              )}
            </PopupState>
            {/* <Button
              onClick={handleConfirmSubmit}
              style={{
                backgroundColor: '#FFD300',
                fontSize: '10px',
                padding: '3px 6px',
              }}
            >
              Submit
            </Button> */}
            <Button
              variant="contained"
              color="warning"
              onClick={handleExemption}
              style={{ fontSize: '8px', padding: '3px 6px', marginLeft: '5px' }}
            >
              Exempt (+1 Month)
            </Button>

            <Button
              variant="contained"
              color="warning"
              onClick={handleLoanPayoff}
              style={{ fontSize: '8px', padding: '3px 6px', marginLeft: '5px' }}
            >
              Payoff (100%)
            </Button>
          </div>
        </div>
      </div>
      <span>{message}</span>

      {/* New Collapsible for IOUs */}
      <Collapsible
        trigger={
          <Button type="submit" fullWidth variant="contained" size="large" color="secondary">
            Record IOUs
          </Button>
        }
      >
        <div
          style={{
            fontFamily: 'Arial, sans-serif',
            color: '#fff',
            background: '#1a1a1a',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Display 30% of monthly salary in bold white fonts */}
            <div
              style={{
                fontWeight: 'normal',
                fontSize: '14px',
                color: 'white',
                marginBottom: '10px',
              }}
            >
              IOU limit (30% of Monthly Salary): {fNumber(thirtyPercentMonthlySalary)}
            </div>

            {/* Input for IOU amount */}
            <input
              type="number"
              value={iouAmount}
              onChange={handleIOUChange}
              placeholder="Enter IOU amount"
              style={{
                padding: '3px',
                fontSize: '12px',
                width: '100%',
                maxWidth: '80px',
                marginBottom: '10px',
                border: '1px solid #ccc',
              }}
            />

            {/* Button to submit IOU */}
            <button
              onClick={handleIOUSubmit}
              style={{
                background: '#00aaff',
                color: '#fff',
                padding: '3px 8px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px',
                marginBottom: '10px',
              }}
            >
              Add IOU Entry
            </button>
          </div>
          <ul style={{ margin: '10px 0', padding: '0', listStyle: 'none' }}>
            {iouEntries.map((iou, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '5px 0',
                  padding: '5px',
                  backgroundColor: '#222',
                  borderRadius: '5px',
                }}
              >
                {/* Display only the IOU amount */}
                <span
                  style={{
                    flex: '0 0 60px',
                    textAlign: 'right',
                    fontSize: '12px',
                    fontFamily: 'Your-Handwriting-Font, cursive',
                  }}
                >
                  {iou.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Collapsible>
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          color: '#333',
          background: '#f5f5f5',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Employee Status */}

        {/* ... (existing code) */}

        {/* Icon Grid */}
        <div
          style={{
            marginTop: '20px',
            background: '#1a1a1a',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <h2
            style={{
              borderBottom: '2px solid #ddd',
              paddingBottom: '5px',
              fontSize: '18px',
              margin: '0 0 10px',
              color: '#fff',
            }}
          >
            Official Records
          </h2>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                onClick={handleUploadOpen}
                startIcon={<PublishIcon />}
                style={{
                  color: '#b8e6ff',
                  borderColor: '#b8e6ff',
                  fontSize: '14px',
                }}
              >
                Upload
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                startIcon={<InsertDriveFileIcon />}
                onClick={handleFileOpen}
                style={{
                  color: '#b8e6ff',
                  borderColor: '#b8e6ff',
                  fontSize: '14px',
                }}
              >
                Files
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                onClick={toggleCollapse}
                startIcon={<CreateIcon />}
                style={{
                  color: '#b8e6ff',
                  borderColor: '#b8e6ff',
                  fontSize: '14px',
                }}
              >
                Write
              </Button>
            </Grid>
            {/* Add more icons as needed */}
          </Grid>
        </div>
      </div>
      <Collapsible open={collapseOpen}>
        <div>
          <h2> Comments</h2>
          {/* <textarea
        value={text}
        onChange={handleTextChange}
        style={{
          width: '100%',
          height: '200px',
          padding: '10px',
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          border: '1px solid #ccc',
          borderRadius: '5px',
          resize: 'vertical',
        }}
        placeholder="Type your elaborate text here..."
      /> */}
          <p style={{ textAlign: 'right' }}>Character Count: {text.length}</p>
          <button
            onClick={handleSend}
            style={{
              background: '#00aaff',
              color: '#fff',
              padding: '8px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Send
          </button>
        </div>
      </Collapsible>

      {/* Verification Dialog */}

      {/* <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle>Are you sure you want to submit the following loan details?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div style={{ marginBottom: '10px', fontSize: '14px' }}>
              Loan Amount: <strong>{fNumber(loan.loanAmount)}</strong>
            </div>
            <div style={{ marginBottom: '10px', fontSize: '14px' }}>
              Minimum Repay: <strong>{fNumber(loan.minimumRepay)}</strong>
            </div>
            <div style={{ marginBottom: '10px', fontSize: '14px' }}>
              Repay Date: <strong>{repayDate}</strong>
            </div>
            {message && (
              <div
                style={{
                  marginTop: '20px',
                  color: '#E97451',
                  fontSize: '14px',
                }}
              >
                {message}
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSubmit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLoanSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog> */}
      {/* <FileViewer open={OpenFiles} close={handleFileClose} id={id} />
      <UploadFiles close={handleUploadClose} open={OpenUpload} id={id} /> */}
    </>
  );
};

export default Ledger;
