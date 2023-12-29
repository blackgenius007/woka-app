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
import { getAllInventoryEachPoint } from 'src/Services/ProcureServices/inventorySlice';
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
  //   tableContainer: {
  //     background: '#222',
  //     borderRadius: '10px',
  //     padding: '1rem',
  //   },
  //   table: {
  //     color: '#fff',
  //     // width: '100%',
  //     // borderCollapse: 'collapse',
  //     textAlign: 'left',
  //     borderCollapse: 'separate', // Separate borders for cells
  //     borderSpacing: '0', // No spacing between cells
  //   },
  //   tableHead: {
  //     background: '#333',
  //   },
  //   tableHeadCell: {
  //     padding: '0.5rem',
  //     textAlign: 'center', // Align header cells to center
  //   },
  //   tableBodyRow: {
  //     borderBottom: '1px solid #444',
  //   },
  //   tableBodyCell: {
  //     // padding: '0.5rem',
  //     // textAlign: 'center', // Align body cells to center
  //     border: '1px solid #444', // Add border to each cell
  //     padding: '0.5rem',
  //     textAlign: 'center',
  //   },
  //   avatar: {
  //     borderRadius: '50%',
  //     width: '30px',
  //     height: '30px',
  //   },
  //   link: {
  //     background: 'none',
  //     border: 'none',
  //     color: '#00aaff',
  //     cursor: 'pointer',
  //     textDecoration: 'none',
  //     fontSize: '14px',
  //     fontFamily: 'inherit',
  //     padding: 0,
  //     margin: 0,
  //   },
  //   actionIcons: {
  //     fontSize: '1.1rem',
  //     color: '#fff',
  //     marginRight: '0.5rem',
  //     cursor: 'pointer',
  //     transition: 'color 0.3s ease-in-out',
  //   },
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

const InventoryTable = ({ email, tagName, businessName }) => {
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
  const [open, setOpen] = useState(false);
  // const [openAction, setOpenAction] = useState(false);
  const [exportMode, setExportMode] = useState(0);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
//function to open Popover
const handleOpenMenu = (event,itemId) => {
  setOpen(event.currentTarget);
  setSelectedUpdate(itemId)
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

  const handleAddChange = (id, quantity) => {
    console.log('=================', id);
    var nums = parseInt(quantity) + parseInt(add);
    console.log(nums);
  };

  const handleSubChange = (id, quantity) => {
    if (parseInt(quantity) - parseInt(minus) < 0) {
      alert('The input value is too high.');
    } else {
      var nums = parseInt(quantity) - parseInt(minus);
      const order = prompt('Please enter destination of item');

      console.log(nums, order);
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

  // function to calculate total payout

  // filteredRows.map((row) => {
  //   const { _id, designation } = row;
  //   const { grossIncome, country } = designation;
  //   const employeeFinancialData = financialData[_id];

  //   // Calculate financial data if not available
  //   if (!employeeFinancialData) {
  //     calculateFinancialData(_id, grossIncome, country);
  //     return null; // Render nothing for now, will be updated on next render
  //   }
  //   console.log(employeeFinancialData);
  //   // Calculate financial data if not available
  //   if (!employeeFinancialData) {
  //     calculateFinancialData(_id, grossIncome, country);
  //     return null; // Render nothing for now, will be updated on next render
  //   }
  //   console.log(employeeFinancialData);

  //   // Calculate Total Remuneration
  //   const monthlyRate = employeeFinancialData.monthlySalary;

  //   // Calculate net Remuneration
  //   const netRemuneration =
  //     monthlyRate +
  //     parseFloat(row.overtime) +
  //     parseFloat(row.allowance) -
  //     parseFloat(row.IOU).toFixed(2);

  //   // Add the calculated remuneration to the total
  //   totalRemunerationForAll += netRemuneration;
  // });

  // console.log('function for salary=>', totalRemunerationForAll);

  // Function to handle 'add' input change for a specific row
  const handleAddInputChange = (rowId, value) => {
    // Create a copy of the current rowInputValues object
    const updatedRowInputValues = { ...rowInputValues };
    // Update the 'add' value for the specific row
    updatedRowInputValues[rowId] = { ...updatedRowInputValues[rowId], add: value };
    setRowInputValues(updatedRowInputValues);
  };

  // Function to handle 'minus' input change for a specific row
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
              <th style={futuristicStyles.tableHeadCell}>Re-stock/Outgoing</th>
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

                  <td style={futuristicStyles.tableBodyCell}>
                  
                    
                      {row.itemName}
                    
                  </td>

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

                  <td style={futuristicStyles.tableBodyCell}>
                    { row.category}
                  </td>

                  <td style={futuristicStyles.tableBodyCell}>
                    {row.description}
                  </td>
                  <td style={futuristicStyles.tableBodyCell}>
                    {row.tagName}
                  </td>
                  <td style={futuristicStyles.tableBodyCell}>
                    {row.stock}
                  </td>
                  <td style={futuristicStyles.tableBodyCell}>
                    {fNumber(row.price)}
                  </td>
                  <td style={futuristicStyles.tableBodyCell}>
                    {row.updatedAt}
                  </td>

                  <td style={futuristicStyles.tableBodyCell}>
                  <IconButton onClick={(event)=>handleOpenMenu(event,row._id)}>
                        <Iconify icon="eva:more-vertical-fill" />
                      </IconButton>
                    {/* <input
                      type="number"
                      style={{
                        width: '50px',
                        padding: '5px',
                        border: 'none',
                        borderBottom: '1px solid #ddd',
                        background: 'transparent',
                        color: 'white',
                      }}
                      value={rowInputValues[row._id]?.add || ''}
                      onChange={(e) => handleAddInputChange(row._id, e.target.value)}
                    />
                    <IconButton
                      onClick={() => handleAddChange(row._id, row.quantity)}
                      style={{ color: '#26a69a' }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-plus"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#26a69a"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        +
                      </svg>
                    </IconButton>
                  </td>
                  <td style={futuristicStyles.tableBodyCell}>
                    <input
                      type="number"
                      style={{
                        width: '50px',
                        padding: '5px',
                        border: 'none',
                        borderBottom: '1px solid #ddd',
                        background: 'transparent',
                        color: 'white',
                      }}
                      value={rowInputValues[row._id]?.minus || ''}
                      onChange={(e) => handleMinusInputChange(row._id, e.target.value)}
                    />
                    <IconButton
                      onClick={() => handleSubChange(row._id, row.quantity)}
                      style={{ color: '#e57373' }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-transfer-out"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#e57373"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        -
                      </svg>
                    </IconButton> */}
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
        // onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
       
        <MenuItem  >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem  sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
};

export default function MainPage({ email, tagName, businessName }) {
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
        <InventoryTable email={email} businessName={businessName} tagName={tagName} />
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
