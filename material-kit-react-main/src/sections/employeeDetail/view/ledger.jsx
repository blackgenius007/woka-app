/* eslint-disable */

import React, { useState, useEffect, useMemo } from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { fNumber } from 'src/utils/format-number';
import {
  calculateTaxAsync,
  addAllowance,
  allowanceReset,
  addOvertime,
  addIOU,
  overtimeReset,
} from '../../../Services/AccountServices/financialSlice';
import Collapsible from 'react-collapsible';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
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

const Ledger = ({ healthCare, grossIncome,employeeId,country}) => {
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [complains, setComplains] = useState('Unpaid salary');
  const [queries, setQueries] = useState('Lateness to work 6/18/23');
  const [requests, setRequests] = useState('');
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  // const [amount, setAmount] = useState({});
  const [currentLoan, setCurrentLoan] = useState(0);
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    ait: 0,
    investment: 0,
  });
  const [loan, setLoan] = useState({
    loanAmount: '',
    minimumRepay: '',
  });
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

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
   const financialData = useSelector((state) => state.financial);
 
  
  console.log('financial-data :', financialData  );

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

  const handleConfirmSubmit = (e) => {
    e.preventDefault();

    const { loanAmount, minimumRepay } = loan;
    const repayDetail = {
      loanAmount,
      minimumRepay,
      id,
      repayDate,
    };
    if (loan) {
      console.log('repayetail:', repayDetail);

      setConfirmationOpen(true); // Open the verification dialog
    }
  };

  // handle submit loan
  const handleLoanSubmit = async (e) => {
    e.preventDefault();

    const { loanAmount, minimumRepay, repayDate } = loan;
    const loanDetail = {
      loanAmount,
      minimumRepay,
      id,
      repayDate,
    };

    try {
      const response = await dispatch(addLoan({ loanDetail }));
      console.log('response=>', response);
      if (response.meta.requestStatus === 'fulfilled') {
        setMessage('Successfully submitted, disbursement can be initiated!');
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
    const { loanAmount, minimumRepay, repayDate } = loan;

    // Parse the current repayDate using Moment
    const currentRepayDate = moment(repayDate);

    // Add one month to the current repayDate
    const adjustedRepayDate = currentRepayDate.add(1, 'months');

    // Format the adjustedRepayDate as a string in the desired format
    const adjustedRepayDateFormatted = adjustedRepayDate.format('YYYY-MM-DD');

    const exemptBy = loanAmount / minimumRepay + 1;
    const ExemptBy = moment().add(exemptBy, 'months').calendar();

    const loanDetail = {
      id,
      ExemptBy,
      repayDate: adjustedRepayDateFormatted, // Include the adjusted repayDate
    };
    console.log('exempted=>', loanDetail);
    try {
      const response = await dispatch(updateLoan({ loanDetail }));
      console.log('response=>', response);
      if (response.meta.requestStatus === 'fulfilled') {
        setMessage('The loan expiry date has been successfully adjusted forward by one month.');
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
      id,
      today,
    };

    try {
      const response = await dispatch(loanPayOff({ loanDetail }));
      console.log('response=>', response);
      if (response.meta.requestStatus === 'fulfilled') {
        setMessage('Successfully paid off remaining loan!');
      } else {
        throw new Error('Pay Off failed: Response was not successful');
      }
    } catch (error) {
      console.error('Error adding loan:', error); // Log the detailed error
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  // Petty cash functionality section
  const addEntry = () => {
    if (description && amount) {
      if (closingBalance === 0) {
        alert('Insufficient Balance. Add to balance first.');
        return;
      }
      const newEntry = { description, amount: parseFloat(amount) };
      setEntries([...entries, newEntry]);
      setDescription('');
      setAmount('');
      updateBalances(-newEntry.amount);
    }
  };

  const addBalance = () => {
    if (amount) {
      updateBalances(parseFloat(amount));
      setAmount('');
    }
  };

  const updateBalances = (entryAmount) => {
    setOpeningBalance(closingBalance);
    setClosingBalance(closingBalance + entryAmount);
  };

  // Todo functions
  const handleAddTodo = () => {
    if (newTodo && newTodo.trim() !== '') {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodo(''); // Clear the input field after adding the todo
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

  // Open textArea
  // const handleTextOpen = () => {
  //   setMessage('');
  //   setId(user.data._id);
  //   setTextOpen(true); // Open the dialog or component as needed
  // };

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
            <Button
              onClick={handleConfirmSubmit}
              style={{
                backgroundColor: '#FFD300',
                fontSize: '10px',
                padding: '3px 6px',
              }}
            >
              Submit
            </Button>
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
            <label htmlFor="iouDescription" style={{ marginBottom: '5px' }}>
              Description:
            </label>
            <input
              type="text"
              id="iouDescription"
              //   value={iouDescription}
              //   onChange={(e) => setIOUDescription(e.target.value)}
              style={{
                padding: '3px',
                fontSize: '12px',
                width: '100%',
                maxWidth: '150px',
                marginBottom: '5px',
                border: '1px solid #ccc',
              }}
            />
            <label htmlFor="iouAmount" style={{ marginBottom: '5px' }}>
              Amount:
            </label>
            <input
              type="number"
              id="iouAmount"
              //   value={iouAmount}
              //   onChange={(e) => setIOUAmount(e.target.value)}
              style={{
                padding: '3px',
                fontSize: '12px',
                width: '100%',
                maxWidth: '80px',
                marginBottom: '5px',
                border: '1px solid #ccc',
              }}
            />
            <button
              //   onClick={addIOUEntry}
              style={{
                background: '#00aaff',
                color: '#fff',
                padding: '3px 8px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px',
                marginBottom: '5px',
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
                <span
                  style={{
                    flex: '1',
                    fontSize: '12px',
                    fontFamily: 'Your-Handwriting-Font, cursive',
                    textAlign: 'center',
                  }}
                >
                  {iou.description}
                </span>
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
      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
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
      </Dialog>
      {/* <FileViewer open={OpenFiles} close={handleFileClose} id={id} />
      <UploadFiles close={handleUploadClose} open={OpenUpload} id={id} /> */}
    </>
  );
};

export default Ledger;
