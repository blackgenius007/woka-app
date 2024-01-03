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
import moment from 'moment';
import {
  getAllInventoryEachPoint,
  incomingStock,
  outGoingStock,
} from 'src/Services/ProcureServices/inventorySlice';
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
import NewItemForm from './newItemForm';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import { Popup } from 'semantic-ui-react';
// import face from '../../../../assets/face-0.jpg';
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

const InventoryTable = ({ email, tagName, businessName,close }) => {
  console.log('table props:', email, tagName, businessName);

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
  // const [openAction, setOpenAction] = useState(false);
  const [exportMode, setExportMode] = useState(0);
  const [renderKey, setRenderKey] = useState(0);
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //function to open Popover
  const handleOpenMenu = (event, itemId, itemquantity, SKU) => {
    setOpen(event.currentTarget);
    setSelectedUpdate(itemId);
    setSelectedQTY(itemquantity);
    setSelectedSKU(SKU);
  };
  // function to close Popover
  const handleCloseMenu = () => {
    setOpen(null);
  };

  // function to fetch all inventory
  useEffect(() => {
    // Assuming getAllInventoryEachPoint is an async thunk
    dispatch(getAllInventoryEachPoint({ email, tagName }));
  }, [dispatch, email, tagName]);

  // Accessing the 'inventory' property from the Redux state
  const { inventory, isLoading, isError } = useSelector((state) => state.inventory);

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
// const handleAddChange = async (id, quantity) => {
//   try {
//     console.log('=================', id, rowInputValues[id]?.add);
//     const nums = parseInt(quantity) + parseInt(rowInputValues[id]?.add || 0);
//     console.log(nums);

//     // In stock Action
//     const response = await dispatch(incomingStock({ email, id, nums, quantity }));

//     // Check if the request was fulfilled
//     if (response.meta?.requestStatus === 'fulfilled') {
//       // Display SweetAlert2 alert upon fulfillment
//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Item added successfully!',
//       });

//       // Trigger a re-render by updating the state
//       setRenderKey((prevKey) => prevKey + 1);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     // Handle the error as needed
//     // You can show an error message or log it
//   }
// };

 

const handleAddChange = async (id, quantity) => {
  var nums = parseInt(quantity) + parseInt(rowInputValues[id]?.add || 0);
  // In stock Action
  const response = await dispatch(incomingStock({ email, id, nums, quantity }));

  if (response.meta.requestStatus === 'fulfilled') {
    // Close the Popover
    handleCloseMenu();

    // Display a custom alert
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Items added successfully. Click Cancel and reopen to view changes.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the case when the user clicks OK
      } else {
        // Handle the case when the user clicks Cancel
      }
    });

    // Trigger a re-render by updating the state
    setRenderKey((prevKey) => prevKey + 1);
  }
};

  // const handleAddChange = (id, quantity) => {
  //   console.log('=================', id, rowInputValues[id]?.add);
  //   var nums = parseInt(quantity) + parseInt(rowInputValues[id]?.add || 0);
  //   console.log(nums);
  //   // In stock Action
  //   dispatch(incomingStock({ email, id, nums, quantity }));
 
  //         // Trigger a re-render by updating the state
  //     setRenderKey((prevKey) => prevKey + 1);
  //     handleCloseMenu()
  // };

  const handleSubChange = (id, quantity) => {
    const { minus } = rowInputValues[id] || { minus: 0 };
  
    if (parseInt(quantity) - parseInt(minus) < 0) {
      alert('The input value is too high.');
    } else {
      var nums = parseInt(quantity) - parseInt(minus);
      const order = prompt(
        'Please enter destination of item, Ex: name of location, department, project, individual, etc.'
      );
  
      // Check if the user canceled the prompt or entered an empty string
      if (order === null || order.trim() === '') {
        console.log('User canceled the prompt or entered an empty string.');
      } else {
        console.log(nums, order);
        // Out stock Action
        dispatch(outGoingStock({ email, id, nums, quantity, order }));
      }
    }
  };
  
  // Filter the inventory array based on the search term
  const filteredRows = inventory.filter((row) =>
    Object.values(row).some((value) => String(value).toLowerCase().includes(searched.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  // Function to handle 'add Item' input change for a specific row
  const handleAddInputChange = (rowId, value) => {
    // Ensure that the value is not undefined or null before updating the state
    if (value !== undefined && value !== null) {
      // Create a copy of the current rowInputValues object
      const updatedRowInputValues = { ...rowInputValues };

      // Update the 'add' value for the specific row
      updatedRowInputValues[rowId] = { ...updatedRowInputValues[rowId], add: value };

      // Set the updated state
      setRowInputValues(updatedRowInputValues);
    }
  };

  // Function to handle 'minus Item' input change for a specific row
  const handleMinusInputChange = (rowId, value) => {
    // Create a copy of the current rowInputValues object
    const updatedRowInputValues = { ...rowInputValues };
    // Update the 'minus' value for the specific row
    updatedRowInputValues[rowId] = { ...updatedRowInputValues[rowId], minus: value };
    setRowInputValues(updatedRowInputValues);
  };

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
        <Button variant="contained" style={{ backgroundColor: '#E97451' }}>
          suppliers contact
        </Button>

        <Button variant="contained">Request for orders</Button>
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
              <th style={futuristicStyles.tableHeadCell}>Category</th>
              <th style={futuristicStyles.tableHeadCell}>Description</th>
              <th style={futuristicStyles.tableHeadCell}>Location</th>
              <th style={futuristicStyles.tableHeadCell}>Stock</th>
              <th style={futuristicStyles.tableHeadCell}>Unit Price</th>
              <th style={futuristicStyles.tableHeadCell}>Modified</th>
              <th style={futuristicStyles.tableHeadCell}>Re-stock +/Outgoing -</th>
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

                  <td style={futuristicStyles.tableBodyCell}>{row.category}</td>

                  <td style={futuristicStyles.tableBodyCell}>{row.description}</td>
                  <td style={futuristicStyles.tableBodyCell}>{row.tagName}</td>
                  <td style={futuristicStyles.tableBodyCell}>{row.stock}</td>
                  <td style={futuristicStyles.tableBodyCell}>{fNumber(row.price)}</td>
                  <td style={futuristicStyles.tableBodyCell}>{row.updatedAt}</td>

                  <td style={futuristicStyles.tableBodyCell}>
                    <IconButton
                      onClick={(event) => handleOpenMenu(event, row._id, row.stock, row.SKU)}
                    >
                      <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                  </td>
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
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <span style={{ marginLeft: '30px', fontSize: '12px', color: 'grey' }}>{selectedSKU}</span>
        <hr />
        <MenuItem>
          <input
            type="number"
            placeholder="Out -"
            style={{
              width: '50px',
              padding: '5px',
              border: 'none',
              borderBottom: '1px solid #ddd',
              background: '#333', // Darker background color
              color: 'white',
            }}
            value={rowInputValues[selectedUpdate]?.minus || ''}
            onChange={(e) => handleMinusInputChange(selectedUpdate, e.target.value)}
          />
          <IconButton
            onClick={() => handleSubChange(selectedUpdate, selectedQTY)}
            style={{ color: '#26a69a' }}
          >
            <Icon icon="game-icons:hand-truck" color="purple" width="32" height="32" />
          </IconButton>
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <input
            type="number"
            placeholder="In +"
            style={{
              width: '50px',
              padding: '5px',
              border: 'none',
              borderBottom: '1px solid #ddd',
              background: '#333', // Darker background color
              color: 'white',
            }}
            value={rowInputValues[selectedUpdate]?.add || ''}
            onChange={(e) => handleAddInputChange(selectedUpdate, e.target.value)}
          />
          <IconButton
            onClick={() => handleAddChange(selectedUpdate, selectedQTY)}
            style={{ color: '#26a69a' }}
          >
            <Icon icon="fluent-emoji-flat:delivery-truck" color="purple" width="32" height="32" />
          </IconButton>
        </MenuItem>
      </Popover>
    </>
  );
};

export default function MainPage({ email, tagName,close,businessName }) {
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
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Inventory Management</Typography>

        <Button
          onClick={handleFormPopoverOpen}
          variant="contained"
          style={{ backgroundColor: '#0096FF', color: 'white' }} // Set background color to blue and text color to white
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Item
        </Button>
      </Stack>
      <Scrollbar>
        <InventoryTable  email={email} businessName={businessName} tagName={tagName} />
      </Scrollbar>
      <Popover
        open={formPopoverOpen}
        onClose={handleFormPopoverClose}
        anchorReference="none"
        anchorEl={null}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <NewItemForm email={email} tagName={tagName} businessName={businessName} />
      </Popover>
    </Container>
  );
}
