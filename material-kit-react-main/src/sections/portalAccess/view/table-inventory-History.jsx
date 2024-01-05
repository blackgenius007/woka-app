/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import moment from 'moment';
import {logInventoryActivity} from 'src/Services/LogsServices/logSlice';
import { useDownloadExcel } from 'react-export-table-to-excel';
import Swal from 'sweetalert2';
import { fNumber } from 'src/utils/format-number';

import { Clear, FileCopy } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import DialogTitle from '@mui/material/DialogTitle';
import { PersonOutline } from '@mui/icons-material';
import { Typography, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@mui/material';
import { Icon } from '@iconify/react';
import CloseIcon from '@mui/icons-material/Close';
 
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import { Popup } from 'semantic-ui-react';
 
import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

// Add futuristic styles here...
const futuristicStyles = {
  tableContainer: {
    background: '#222',
    borderRadius: '10px',
    padding: '1rem',
    overflowX: 'auto',
  },
  table: {
    color: '#fff',
    textAlign: 'left',
    borderCollapse: 'collapse',
    width: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)', // 3D effect
  },
  tableHead: {
    background: '#333',
  },
  tableHeadCell: {
    padding: '0.5rem',
    textAlign: 'center',
    fontSize: '14px', // Adjusted font size
  },
  tableBodyRow: {
    borderBottom: '1px solid #444',
    borderRadius: '10px', // Slightly curvy edges
  },
  tableBodyCell: {
    border: '1px solid #444',
    padding: '0.5rem',
    textAlign: 'center',
    fontSize: '12px', // Adjusted font size
  },
  avatar: {
    borderRadius: '50%',
    width: '30px',
    height: '30px',
  },
  button: {
    backgroundColor: '#7393B3',
    color: '#ffffff',
    fontSize: '12px', // Adjusted font size
    borderRadius: '5px',
    margin: '0.5rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#4F6B87',
    },
  },
  link: {
    color: '#00aaff',
    textDecoration: 'none',
    fontSize: '14px',
    fontFamily: 'inherit',
  },
  actionIcons: {
    fontSize: '1.1rem',
    color: '#fff',
    marginRight: '0.5rem',
    cursor: 'pointer',
    transition: 'color 0.3s ease-in-out',
  },
  paginationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  paginationText: {
    fontSize: '14px',
    margin: '0 10px',
    color: '#333',
  },
  paginationButton: {
    backgroundColor: '#7393B3',
    color: '#ffffff',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#4F6B87',
    },
  },
};

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const InventoryHistoryTable = ({ email, tagName, businessName, close, reOpen }) => {
 console.log('log table:',email, tagName)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dateOffset, setDateOffset] = useState(7);
  const [searched, setSearched] = useState('');
  const [add, setAdd] = useState(0);
  const [input, setInput] = useState(0);
  const [minus, setMinus] = useState(0);
  const [rowInputValues, setRowInputValues] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [selectedSKU, setSelectedSKU] = useState(null);
  const [selectedQTY, setSelectedQTY] = useState(null);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  // const [openAction, setOpenAction] = useState(false);
  const [exportMode, setExportMode] = useState(0);
  const [renderKey, setRenderKey] = useState(0);
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //function to open Popover
  const handleOpenMenu = (event, itemId, itemquantity, SKU, Item) => {
    setOpen(event.currentTarget);
    setSelectedUpdate(itemId);
    setSelectedQTY(itemquantity);
    setSelectedSKU(SKU);
    setSelectedItem(Item);
  };
  // function to close Popover
  const handleCloseMenu = () => {
    setOpen(null);
  };

  // function to fetch all inventory
  useEffect(() => {
    // Assuming getAllInventoryEachPoint is an async thunk
    dispatch(logInventoryActivity({ email, tagName }));
  }, [dispatch, email, tagName]);

 // Define the custom selector inside the component
 const {
  inventoryLog,
  isLoading,
  isSuccess,
  isError,
  message
} = useSelector((state) => state.inventoryLog);
  

  // search function
  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
  };

  // Function to enable export mode
  const enableExportMode = () => {
    setExportMode(true);
  };

  // Function to disable export mode
  const disableExportMode = () => {
    setExportMode(false);
  };
  const ExportSheet = () => {
    setExportMode(1);
  };

  
 

  // Filter the inventory array based on the search term
  const filteredRows = inventoryLog.filter((row) =>
    Object.values(row).some((value) => String(value).toLowerCase().includes(searched.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);


  // Dialogue box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const tableRef = useRef(null);

  // excel download function
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Salary',
    sheet: 'Users',
  });

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></div>
      <br />
      <label>
        {exportMode ? (
          <>
            {/* Cancel button with Clear icon */}
            <Button onClick={disableExportMode}>
              <Clear />
              Cancel
            </Button>
            {/* Excel button with SVG icon */}
            <Button onClick={ExportSheet} style={{ backgroundColor: '#E97451', color: '#ffffff' }}>
              <FileCopy style={{ color: '#ffffff' }} /> Export to Excel
            </Button>
          </>
        ) : (
          <Button
            onClick={enableExportMode}
            style={{ backgroundColor: '#7393B3', color: '#ffffff' }}
          >
            Convert to Exportable version
          </Button>
        )}
    
        <TextField
          value={searched}
          onChange={(e) => requestSearch(e.target.value)}
          label="Search database"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searched && (
                  <IconButton onClick={() => requestSearch('')}>
                    <Clear />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </label>
      <div style={futuristicStyles.tableContainer}>
    
        <table style={futuristicStyles.table}>
          <thead style={futuristicStyles.tableHead}>
            <tr>
              <th style={futuristicStyles.tableHeadCell}>Item image</th>
              <th style={futuristicStyles.tableHeadCell}>Item</th>
              <th style={futuristicStyles.tableHeadCell}>SKU Number</th> 
              <th style={futuristicStyles.tableHeadCell}>Description</th>
              <th style={futuristicStyles.tableHeadCell}>Location</th>
              <th style={futuristicStyles.tableHeadCell}>Stock</th>
              <th style={futuristicStyles.tableHeadCell}>Item movement</th>
              <th style={futuristicStyles.tableHeadCell}>Destination</th>
              <th style={futuristicStyles.tableHeadCell}>Transaction_time</th>
              
              {/* <th style={futuristicStyles.tableHeadCell}>Out-going</th> */}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => {
              return (
                <tr key={row.id} style={futuristicStyles.tableBodyRow}>
                  {exportMode === 1 ? (
                    ''
                  ) : (
                    <td style={futuristicStyles.tableBodyCell}>
                      <img src={row.imagePath} alt="" style={futuristicStyles.avatar} />
                    </td>
                  )}

                  <td style={futuristicStyles.tableBodyCell}>{row.itemName}</td>

                  <td style={futuristicStyles.tableBodyCell}>
                    <Link
                      style={{
                        color: '#ffff',
                        textDecoration: 'none',
                        backgroundImage: 'none',
                      }}
                    >
                      {row.SKU}
                    </Link>
                  </td>
                 
               
                  <td style={futuristicStyles.tableBodyCell}>{row.description}</td>
                  <td style={futuristicStyles.tableBodyCell}>{row.tagName}</td>
                  <td style={futuristicStyles.tableBodyCell}>{row.stock}</td>
                  <td style={futuristicStyles.tableBodyCell}>{row.dirSymbol}</td>
                  <td style={futuristicStyles.tableBodyCell}>{row.itemDest}</td>
                  <td style={futuristicStyles.tableBodyCell}>{moment(row.updatedAt).format('h:mm a D MMMM YYYY')}</td>

                   
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />

      <div style={futuristicStyles.paginationContainer}>
        <IconButton
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
          style={futuristicStyles.paginationButton}
        >
          <ChevronLeft />
        </IconButton>
        <span style={futuristicStyles.paginationText}>
          Page {page + 1} of {totalPages}
        </span>
        <IconButton
          onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
          disabled={page === totalPages - 1}
          style={futuristicStyles.paginationButton}
        >
          <ChevronRight />
        </IconButton>
      </div>
       
    </>
  );
};

export default function MainPage({ email, tagName, close, businessName, reOpen }) {
  console.log('log table-1:',email, tagName)
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Horizontally center the content
    justifyContent: 'center', // Vertically center the content
    // height: '75vh', // Set the height of the container to full viewport height
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formPopoverOpen, setFormPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Open new form Popover
  const handleFormPopoverOpen = (event) => {
    setFormPopoverOpen(true);
    setAnchorEl(event.currentTarget);
  };

  // Close new form Popover
  const handleFormPopoverClose = () => {
    setFormPopoverOpen(false);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container>
 
      <Scrollbar>
        <InventoryHistoryTable email={email} businessName={businessName} tagName={tagName} />
      </Scrollbar>
     
    </Container>
  );
}
