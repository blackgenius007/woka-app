 /* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExportToExcelButton from './ExportToExcelButton';
import TextField from '@mui/material/TextField';
import { CSVLink } from 'react-csv';
import { ButtonBase, Hidden } from '@mui/material';
import Container from '@mui/material/Container';
import PdfExportButton from './PdfExportButton';
import moment from 'moment';
import TableContainer from '@mui/material/TableContainer';
import Card from '@mui/material/Card';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { fNumber } from 'src/utils/format-number';
import { Icon } from '@iconify/react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

//    import face from '../../assets/img/face-0.jpg';

import Box from '@mui/material/Box';
import {
  calculateTaxAsync,
  addAllowance,
  allowanceReset,
  addOvertime,
  addIOU,
  overtimeReset,
} from 'src/Services/AccountServices/financialSlice';

import {
  retrieveAllEmployees,
  retrieveEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} from '../../../Services/HR-Services/employeeSlice';
import { Clear, FileCopy } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PersonOutline } from '@mui/icons-material';
import { Typography, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';

import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

// Futuristic styles
const futuristicStyles = {
  tableContainer: {
    background: '#222',
    borderRadius: '10px',
    padding: '1rem',
  },
  table: {
    color: '#fff',
    width: '100%',
    textAlign: 'left',
    borderCollapse: 'separate',
    borderSpacing: '0',
    fontSize: '14px', // Adjust the font size as needed
  },
  tableHead: {
    background: '#333',
  },
  tableHeadCell: {
    padding: '0.5rem',
    textAlign: 'center',
    fontSize: '14px', // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
  },
  tableBodyRow: {
    borderBottom: '1px solid #444',
  },
  tableBodyCell: {
    border: '1px solid #444',
    padding: '0.5rem',
    textAlign: 'center',
    fontSize: '12px', // Adjust the font size as needed
    fontWeight: 'normal', // Adjust the font weight as needed
  },
  avatar: {
    borderRadius: '50%',
    width: '50px',
    height: '50px',
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#00aaff',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '14px',
    fontFamily: 'inherit',
    padding: 0,
    margin: 0,
  },
  actionIcons: {
    fontSize: '1.1rem',
    color: '#fff',
    marginRight: '0.5rem',
    cursor: 'pointer',
    transition: 'color 0.3s ease-in-out',
  },
};

// Combine styles based on screen size
const combinedStyles = {
  ...futuristicStyles,
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

const SalaryCalculator = ({ drawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hiddenFileInput = React.useRef(null);

  const { employees, isLoading, isError, message } = useSelector((state) => state.employees);
  const { user } = useSelector((state) => state.auth);
  console.log(employees);

  // Retrieve financial data from financialSlice
  const financialData = useSelector((state) => state.financial);
  console.log('financials=>', financialData);

  // Function to trigger financial data calculation
  const calculateFinancialData = (employeeId, grossIncome, country, healthCare) => {
    console.log('front-calculateFinancialData:', employeeId, grossIncome, country);
    dispatch(calculateTaxAsync({ employeeId, grossIncome, country, healthCare }));
  };

  const tableRef = useRef(null);
  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
  };

  const cancelSearch = () => {
    setSearched('');
  };

  const [searched, setSearched] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectDept, setSelectDept] = useState([]);
  const [isUploadVisible, setUploadVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [unit, setDepartment] = useState('');
  const [images, setImages] = useState({});
  const [url, setUrl] = useState({});
  const [uploadedFile, setUploadedFile] = useState({});
  const [preview, setPreview] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [dateOffset, setDateOffset] = useState(7);
  const [open, setOpen] = useState(null);
  const [exportMode, setExportMode] = useState(0);

  // initialise total renumeration
  let totalRemunerationForAll = 0;

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    // Function to update filteredRows based on search
    const updateFilteredRows = () => {
      const filtered = employees.filter((row) => {
        return Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searched.toLowerCase())
        );
      });
      setFilteredRows(filtered);
    };

    const fetchDepartmentData = async () => {
      try {
        // Map the department data to an array of options
        const departmentOptions = user.data.departmentAdded.map((department, i) => ({
          value: i,
          label: department.replace(/\\/g, '').replace(/"/g, '').trim(),
        }));

        setOptions(departmentOptions);
      } catch (error) {
        console.error('Error fetching department data:', error);
      }
    };

    //call department option function
    fetchDepartmentData();

    // Call the function whenever search term or employee data changes
    updateFilteredRows();
  }, [searched, employees]);

  //  const defaultOption = selectDept['Select Department'];

  const handleDepartmentChange = (e) => {
    setDepartment(e.label);
    console.log(e.label);
  };

  // redirect to department view
  const handleDepartmentView = () => {
    navigate(`/department-view/${unit}`);
  };

  const handleLinkClick = () => {
    alert('');
  };

  //user details
  const { ownerEmail, role } = useSelector((state) => state.auth.user.data);

  // user role
  const userEmail = role === 'owner' || role === 'admin' ? ownerEmail : email;
  console.log(userEmail);

  // Photo onChanged function
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const resume = event.target.files[0];
    const fileUploaded = event.target.files[0];
    const url = URL.createObjectURL(fileUploaded);
    setUrl(url);
    setImages(fileUploaded);
    console.log(fileUploaded.name);
    console.log(fileUploaded);
    console.log('images : ', images);
    setPreview(true);
  };
  // function to upload inmate picture
  const onSubmitPhoto = async () => {
    try {
      if (images) {
        console.log('photo+', selectedInmate._id);
        const id = selectedInmate._id;
        const formData = new FormData();
        formData.append('file', images, images.name);
        console.log(formData.has('file')); // This will log true if the image key exists in the FormData

        console.log('formData:', formData); // Log the formData object

        const response = await axios.post(`/api/v1/images/upload/${id}`, formData);

        console.log('Server response:');
        console.log(response.data);

        // Handle success scenario
        alert('Uploaded successfully');
      } else {
        alert('Please select an image');
      }
    } catch (error) {
      console.log('Error uploading image:', error);
      // Handle error scenario
      alert('Image upload failed. Please try again.');
    }
  };

  // Toggle function
  const toggleUpload = () => {
    setUploadVisible((prevState) => !prevState);
  };
  // retrieve all employee from API
  useEffect(() => {
    // Dispatch retrieveAllEmployee action
    dispatch(retrieveAllEmployees(userEmail));
  }, [dispatch, userEmail]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }

  // Table export mode function

  // Function to enable export mode
  const enableExportMode = () => {
    setExportMode(true);
  };

  // Function to disable export mode
  const disableExportMode = () => {
    setExportMode(false);
  };

  const handleSearch = (e) => {
    setSearched(e.target.value);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    const year = date.getFullYear().toString().slice(-2); // Extract the last two digits of the year
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    let hour = date.getHours();
    const minute = date.getMinutes();
    const amOrPm = hour >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hour = hour % 12 || 12;

    const formattedDate = `${day} ${month} ${year}, ${hour}:${minute
      .toString()
      .padStart(2, '0')} ${amOrPm}`;

    return formattedDate;
  };

  // Dialogue box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDialog = (employee) => {
    // Open the dialog and pass the inmate data
    setOpenDialog(true);
    setSelectedEmployee(employee);
  };

  const handleCloseDialog = () => {
    // Close the dialog
    setOpenDialog(false);
    setSelectedEmployee(null);
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
      </div>
      <br />
      <label>
        <Button variant="info" color="primary">
          <Icon icon="flat-color-icons:overtime" width="30" height="30" />
        </Button>

        <Button>
          <Icon icon="arcticons:moneybuster" width="30" height="30" />
        </Button>

        <Chip
          label="Set overtime rate"
          clickable
          style={{ backgroundColor: '#fff', fontSize: '12px' }}
        />
        {exportMode ? (
          <>
            {/* Cancel button with Clear icon */}
            <Button onClick={disableExportMode}>
              <Clear />
              Cancel
            </Button>
            {/* Excel button with SVG icon */}
            <FileCopy style={{ color: '#ffffff' }} />{' '}
           <label><PdfExportButton tableRef={tableRef} filename="salary.pdf" /></label> 
           <label>
           <ExportToExcelButton tableRef={tableRef} />
            {/* <Button>
           <Icon icon="vscode-icons:file-type-excel2" width="45" height="45" />
            </Button> */}
            
            </label>
          </>
        ) : (
          <Button
            onClick={enableExportMode}
            style={{ backgroundColor: '#7393B3', color: '#ffffff' }}
          >
            Convert to Exportable version
          </Button>
        )}
        <Button variant="contained" onClick={drawer} style={{ backgroundColor: '#E97451' }}>
          Wages Calculator
        </Button>
        {/* Button to toggle the sidebar */}
        <Button variant="contained" onClick={drawer}>
          How it works
        </Button>
        {/* Render totalRemunerationForAll in a separate table row */}
        {/* <tr>
          <td colSpan="8" style={{ textAlign: 'right' }}>
            <strong>After Tax Aggregate Salary for All Monthly Employees:</strong>
          </td>
          <td style={{ textAlign: 'center' }}>{fNumber(totalRemunerationForAll.toFixed(2))}</td>
        </tr> */}
      </label>
      <div style={combinedStyles.tableContainer}>
      <table ref={tableRef} style={combinedStyles.table}>
  {/* <Hidden xsDown> */}
  <thead style={combinedStyles.tableHead}>
  <tr>
    {exportMode ? (
      <>
        <th style={futuristicStyles.tableHeadCell}>Name</th>
        <th style={futuristicStyles.tableHeadCell}>Total Salary</th>
        <th style={futuristicStyles.tableHeadCell}>Bank code</th>
        <th style={futuristicStyles.tableHeadCell}>Bank name</th>
        <th style={futuristicStyles.tableHeadCell}>Account Number</th>
      </>
    ) : (
      <>
        <th style={futuristicStyles.tableHeadCell}>Employee</th>
        <th style={futuristicStyles.tableHeadCell}>Name</th>
        <th style={futuristicStyles.tableHeadCell}>Designation</th>
        <th style={futuristicStyles.tableHeadCell}>Salary</th>
        <th style={futuristicStyles.tableHeadCell}>Allowance</th>
        <th style={futuristicStyles.tableHeadCell}>Overtime</th>
        <th style={futuristicStyles.tableHeadCell}>IOU</th>
        <th style={futuristicStyles.tableHeadCell}>Loan</th>
        <th style={futuristicStyles.tableHeadCell}>Loan repay</th>
        <th style={futuristicStyles.tableHeadCell}>Loan Expiry date</th>
        <th style={futuristicStyles.tableHeadCell}>Total Salary</th>
        <th style={futuristicStyles.tableHeadCell}>Bank name</th>
        <th style={futuristicStyles.tableHeadCell}>Bank code</th>
        <th style={futuristicStyles.tableHeadCell}>Account Number</th>
      </>
    )}
  </tr>
</thead>

  {/* </Hidden> */}
  <tbody>
    {paginatedRows.map((row) => {
      const { _id, employeeName, designation, healthCare, minimumRepay } = row;
      const { grossIncome, country } = designation;
      const employeeFinancialData = financialData[_id];

      // Calculate financial data if not available
      if (!employeeFinancialData) {
        calculateFinancialData(_id, grossIncome, country, healthCare);
        return null; // Render nothing for now, will be updated on the next render
      }

      // Calculate Total Remuneration
      const monthlyRate = employeeFinancialData.monthlySalary;
      const totalRemuneration = (
        monthlyRate +
        parseFloat(row.overtime) +
        parseFloat(row.allowance ? row.allowance : 0) -
        parseFloat(row.IOU) -
        parseFloat(row.minimumRepay)
      ).toFixed(2);

      // Calculate net Remuneration
      const netRemuneration =
        monthlyRate +
        parseFloat(row.overtime) +
        parseFloat(row.allowance) -
        parseFloat(row.IOU) -
        parseFloat(row.minimumRepay);

      // Add the calculated remuneration to the total
      totalRemunerationForAll += netRemuneration;

      return (
        <tr key={row.id} style={futuristicStyles.tableBodyRow}>
          {exportMode ? (
            <>
              <td style={futuristicStyles.tableBodyRow}>
                <Link to={`/employee-detail/${row._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                  {employeeName}
                </Link>
              </td>
              <td style={futuristicStyles.tableBodyCell}>
                {fNumber(totalRemuneration)}
              </td>
              <td style={futuristicStyles.tableBodyCell}>-</td>
              <td style={futuristicStyles.tableBodyCell}>{row.bankName}</td>
              <td style={futuristicStyles.tableBodyCell}>{row.accountNumber}</td>
            </>
          ) : (
            <>
              <td style={combinedStyles.tableBodyRow}>
                <Link to={`/employee-detail/${row.imagePath}`} style={{ textDecoration: 'none', color: 'white' }}>
                  <Avatar alt="Remy Sharp" src={row.imagePath} />
                </Link>
              </td>
              <td style={futuristicStyles.tableBodyRow}>
                <Link to={`/employee-detail/${row._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                  {employeeName}
                </Link>
              </td>
              <td style={futuristicStyles.tableBodyCell}>
                <Link
                  to={`/employee-detail/${row._id}`}
                  style={{ color: '#ffff', textDecoration: 'none', backgroundImage: 'none' }}
                >
                  {row.designation.designation}
                </Link>
              </td>
              <td style={futuristicStyles.tableBodyCell}>
                {fNumber(employeeFinancialData.monthlySalary)}
              </td>
              <td style={futuristicStyles.tableBodyCell}>
                {fNumber(row.allowance ? row.allowance : '0.00')}
              </td>
              <td style={futuristicStyles.tableBodyCell}>
                {fNumber(row.overtime)}
              </td>
              <td style={futuristicStyles.tableBodyCell}>
                {fNumber(row.IOU)}
              </td>
              <td style={futuristicStyles.tableBodyCell}>
                {fNumber(row.loan && row.exemptionIsOn ? row.loan : '0.00')}
              </td>
              <td style={futuristicStyles.tableBodyCell}>
                {fNumber(row.minimumRepay)}
              </td>
              <td style={futuristicStyles.tableBodyCell}>
                {row.loan ? moment(new Date(row.repayDate)).format('MMM Do YY') : '-'}
              </td>
              <td style={futuristicStyles.tableBodyCell}>
                {row.department.grossIncome === null ? (
                  fNumber(
                    row.loan && moment().isBefore(moment(row.repayDate))
                      ? parseInt(row.designation.perhrIncome * 8 * 20 - parseInt(row.minimumRepay) + parseInt(row.allowance))
                      : parseInt(row.department.perhrIncome * 8 * 20 + parseInt(row.allowance))
                  )
                ) : (
                  fNumber(totalRemuneration)
                )}
              </td>
              <td style={futuristicStyles.tableBodyCell}>
                {row.bankName}
              </td>
              <td style={futuristicStyles.tableBodyCell}>-</td>
              <td style={futuristicStyles.tableBodyCell}>
                {row.accountNumber}
              </td>
            </>
          )}
        </tr>
      );
    })}
 
    {/* Total Remuneration for All Employees */}
    <tr>
      <td colSpan="8" style={{ textAlign: 'right' }}>
        <strong>Total:</strong>
      </td>
      <td style={{ textAlign: 'center' }}>{fNumber(totalRemunerationForAll.toFixed(2))}</td>
    </tr>
  </tbody>
</table>
      </div>
      <br />
      {/* Pagination controls */}
      <div>
        <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default function MainPage() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Horizontally center the content
    justifyContent: 'center', // Vertically center the content
    // height: '75vh', // Set the height of the container to full viewport height
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Salary Calculator</Typography>

        <Link to="/new-employee">
          <Button
            variant="contained"
            style={{ backgroundColor: '#0096FF', color: 'white' }} // Set background color to blue and text color to white
          >
            Data Analytics
          </Button>
        </Link>
      </Stack>
      <Scrollbar>
        <SalaryCalculator drawer={toggleSidebar} />
      </Scrollbar>
    </Container>
  );
}