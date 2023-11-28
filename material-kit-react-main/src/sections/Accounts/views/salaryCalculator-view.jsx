 
 
    /* eslint-disable */


    import React, { useState, useEffect, useRef } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import TextField from '@mui/material/TextField';
    import { ButtonBase,Hidden } from '@mui/material';
    import Container from '@mui/material/Container';
    import TableContainer from '@mui/material/TableContainer';
    import Card from '@mui/material/Card'; 
    import Popover from '@mui/material/Popover';
    import MenuItem from '@mui/material/MenuItem';
    import Stack from '@mui/material/Stack';
    import Iconify from 'src/components/iconify';
    import Scrollbar from 'src/components/scrollbar';
    import { Icon } from '@iconify/react';
    import Dropdown from 'react-dropdown';
    import 'react-dropdown/style.css';
    import moment from 'moment';
 //    import face from '../../assets/img/face-0.jpg';
     
    import Box from '@mui/material/Box';
  
  
     import {retrieveAllEmployees,
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
   },
   tableHead: {
     background: '#333',
   },
   tableHeadCell: {
     padding: '0.5rem',
     textAlign: 'center',
   },
   tableBodyRow: {
     borderBottom: '1px solid #444',
   },
   tableBodyCell: {
     border: '1px solid #444',
     padding: '0.5rem',
     textAlign: 'center',
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
    
      const { employees, isLoading, isError, message } = useSelector(
         (state) => state.employees
       );
       const {user} = useSelector(
        (state) => state.auth
      );
    console.log(employees);
  
         // Retrieve financial data from financialSlice
  const financialData = useSelector((state) => state.financial);
  console.log('financials=>', financialData);
   
     
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
           const departmentOptions = user.data.departmentAdded.map(
             (department, i) => ({
               value: i,
               label: department.replace(/\\/g, '').replace(/"/g, '').trim(),
             })
           );
   
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
      const handleDepartmentView=()=>{
       navigate(`/department-view/${unit}`);
     }
 
      const handleLinkClick =()=>{
       alert('')
      }
    
    
    
      
    
      //user details
      const { ownerEmail,role } = useSelector((state) => state.auth.user.data);
    
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
        console.log('images : ',images);
        setPreview(true);
      };    
      // function to upload inmate picture
      const onSubmitPhoto = async () => {
        try {
          if (images) {
            console.log('photo+', selectedInmate._id);
            const id = selectedInmate._id
            const formData = new FormData();
            formData.append('file', images, images.name);
            console.log(formData.has('file')); // This will log true if the image key exists in the FormData
    
            console.log('formData:', formData);  // Log the formData object
      
            const response = await axios.post(
              `/api/v1/images/upload/${id}`,
              formData
            );
      
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
       
      const calculateAge=(dateOfBirth)=>{
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
      
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
      
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
      
        return age;
      }
    
      return (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
            {/* react-dropdown */}
            {unit ? (
   <>
     <Dropdown 
       options={options}
       onChange={handleDepartmentChange}
       value={unit}
       placeholder="Select a Department"
       style={{ minWidth: '200px' }} // Set a minimum width
       contentRenderer={({ props, state }) => (
         <div style={{ minWidth: '200px' }}>
           {state.values.length ? state.values.map((v) => <div key={v.value}>{v.label}</div>) : props.searchable ? props.noResultsText : props.placeholder}
         </div>
       )}
     />
 
     {/* Button */}
     <Button onClick={(e) => handleDepartmentView(e)} variant="contained" color="primary">
       Open
     </Button>
   </>
 ) : (
   <Dropdown 
     options={options}
     onChange={handleDepartmentChange}
     value={null}
     placeholder="Select a Department"
     style={{ minWidth: '200px' }} // Set a minimum width
     contentRenderer={({ props, state }) => (
       <div style={{ minWidth: '200px' }}>
         {state.values.length ? state.values.map((v) => <div key={v.value}>{v.label}</div>) : props.searchable ? props.noResultsText : props.placeholder}
       </div>
     )}
   />
 )}
 
 
 <Tooltip
       title="Manage Employee Attendance"
       arrow
       enterTouchDelay={0}
       leaveTouchDelay={1500}
       placement="top-end" // Display on top right
       sx={{
         fontSize: '36px', // Increase font size x3
         fontWeight: 'bold', // Make it bolder
         backgroundColor: '#fff', // White background
         color: '#8B4513', // Brown text color
         border: '1px solid #8B4513', // Brown border
         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow
         padding: '24px', // Add padding for larger size
         animation: 'fade-in 0.3s ease-out', // Add fade-in animation
         '@keyframes fade-in': {
           from: { opacity: 0 },
           to: { opacity: 1 },
         },
       }}
     >
   <Icon icon="arcticons:simple-time-tracker" width="50" height="50" hFlip={true} />
   </Tooltip>
 
          </div>
          <br />
          <div style={combinedStyles.tableContainer}>
   <table style={combinedStyles.table}>
   <Hidden xsDown>
     <thead style={combinedStyles.tableHead}>
       <tr>
         <th style={combinedStyles.tableHeadCell}>Employee</th>
         <th style={combinedStyles.tableHeadCell}>Name</th>
         <th style={combinedStyles.tableHeadCell}>Sex</th>
         <th style={combinedStyles.tableHeadCell}>Designation</th>
         
         <th style={combinedStyles.tableHeadCell}>Department</th>
         <th style={combinedStyles.tableHeadCell}>Unique code</th>
         <th style={combinedStyles.tableHeadCell}>Bank Name</th>
         <th style={combinedStyles.tableHeadCell}>Account Number</th>
         <th style={combinedStyles.tableHeadCell}>Action</th>
        
       </tr>
     </thead>
      </Hidden> 
     <tbody>
       {paginatedRows.map((row) => {
         return (
           <tr key={row.id} style={combinedStyles.tableBodyRow}>
             
             <td style={combinedStyles.tableBodyRow}>
               <Link
                 to={`/employee-detail/${row.imagePath}`}
                 style={{ textDecoration: 'none', color: 'white' }}
               >
                 <Avatar alt="Remy Sharp" src={row.imagePath} />
               </Link>{' '}
             </td>
 
             <td style={combinedStyles.tableBodyCell}>
               <ButtonBase onClick={() => handleOpenDialog(row)}>
                 {row.employeeName}
               </ButtonBase>
             </td>
 
             <td style={combinedStyles.tableBodyCell}>{row.sex}</td>
 
             <td style={combinedStyles.tableBodyCell}>
               {row.designation && row.designation.designation}
             </td>
             <Hidden xsDown>
             <td style={combinedStyles.tableBodyCell}>{row.department}</td>
 
             <td style={combinedStyles.tableBodyCell}>{row.employeeCode}</td>
             <td style={combinedStyles.tableBodyCell}>{row.bankName}</td>
             <td style={combinedStyles.tableBodyCell}>{row.accountNumber}</td>
             <td style={combinedStyles.tableBodyCell}>
             
               <IconButton onClick={handleOpenMenu}>
                 <Iconify icon="eva:more-vertical-fill" />
               </IconButton>
             </td>
             </Hidden>
           </tr>
         );
       })}
     </tbody>
   </table>
 </div> 
 
          <br />
    
          {
      selectedEmployee && <div>
       <BootstrapDialog
      onClose={handleCloseDialog}
      aria-labelledby="customized-dialog-title"
      open={openDialog}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
        {selectedEmployee.employeeName}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Avatar
            alt={selectedEmployee.employeeName}
            src={selectedEmployee.imagePath}
            sx={{ width: 100, height: 100, marginRight: 2 }}
          />
          <Box>
            <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
            Age: {calculateAge(selectedEmployee.dateOfBirth)}
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
              Status: {selectedEmployee.complainStatus}
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
              Employment date: {selectedEmployee.joinDate}
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
              Employee Number: {selectedEmployee.employeeCode}
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
              Gender: {selectedEmployee.sex}
            </Typography>
            {/* <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
              SSN: {selectedInmate.social_security}
            </Typography> */}
            <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
              Contact : {selectedEmployee.mobileNumber}   
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: 'grey' }}>
              Email: {selectedEmployee.email}   
            </Typography>
          </Box> 
        </Box>
        <Typography variant="body2" gutterBottom style={{ color: 'grey' }}>
          {selectedEmployee.description}
        </Typography>
      </DialogContent>
      <DialogActions>
              <ButtonGroup>
              {user.data.role === 'owner' || user.data.role === 'admin' ? (
               <Link to={`/employee-detail/${selectedEmployee._id}`}>
                <Button
   
  
 >
   Admin
 </Button>
               </Link>
  
 ) : (
   ''
 )}
                <Button onClick={toggleUpload}>Upload Photo</Button>
               </ButtonGroup> 
             </DialogActions>
      {isUploadVisible && (
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          
          {/* <UploadPhoto id={selectedInmate._id} />   */}
            <IconButton onClick={handleClick}>
            <Popup
              trigger={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-upload"
                  width="45"
                  height="45"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#9e9e9e"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                  <polyline points="7 9 12 4 17 9" />
                  <line x1="12" y1="4" x2="12" y2="16" />
                </svg>
              }
              position="bottom center"
            >
              Upload existing picture
            </Popup>
          </IconButton> 
           <label>
            {preview ? (
              <img src={url} width="80px" height="80px" alt="" />
            ) : (
              <img src={face} width="80px" height="80px" alt="" />
            )}
            <input
        type="file"
        name="file "
        accept=".jpg,.png,.jpeg"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
            />
          </label>  
         <Button variant="contained" color="primary" onClick={onSubmitPhoto} >
            Submit
          </Button>   
        </Box>     
      )}
     </BootstrapDialog>    
    
     </div>
    
    }
          {/* Pagination controls */}
          <div>
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
            >
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
         <MenuItem onClick={handleCloseMenu}>
           <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
           Edit
         </MenuItem>
 
         <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
           <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
           Delete
         </MenuItem>
       </Popover>
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
         <Typography variant="h4">Employee</Typography>
 
         <Link to="/new-employee">
         <Button
   variant="contained"
   style={{ backgroundColor: '#0096FF', color: 'white' }} // Set background color to blue and text color to white
   startIcon={<Iconify icon="eva:plus-fill" />}
 >
 
 New Employee            
 
 </Button>
 </Link>
 
       </Stack>
       <Scrollbar>
       <TableContainer sx={{ overflow: 'unset' }}>
          <SalaryCalculator drawer={toggleSidebar} />
          </TableContainer>
         </Scrollbar>
           </Container>
     
 
      
      );
    }
    
     
 
 
  



// import React, { useState, useEffect,useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import TextField from '@mui/material/TextField';
// import Scrollbar from 'src/components/scrollbar';
// // import RightSidebar from '../RightSidebar';
// import Container from '@mui/material/Container'; 
// import moment from 'moment';
// import { Icon } from '@iconify/react';
// // import excelIconSvg from '../../../../assets/svg/excel-1516.svg'
// import { useDownloadExcel } from 'react-export-table-to-excel';
// import Swal from 'sweetalert2';
// import {
//   calculateTaxAsync,
//   addAllowance,
//   allowanceReset,
//   addOvertime,
//   addIOU,
//   overtimeReset,
// } from 'src/Services/AccountServices/financialSlice';
 
// import { retrieveAllEmployees } from 'src/Services/HR-Services/employeeSlice';
// import { Clear,FileCopy } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import Dialog from '@mui/material/Dialog';
// import { fNumber } from 'src/utils/format-number'; 
// // import { FcDataConfiguration, FcOvertime, FcRatings } from 'react-icons/fc';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { PersonOutline } from '@mui/icons-material';
// import { Typography, Chip, Grid } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import { InputAdornment } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
 

// import PropTypes from 'prop-types';
// import Avatar from '@mui/material/Avatar';
// import { Popup } from 'semantic-ui-react';
 
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';         
 

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// // Add futuristic styles here...
// const futuristicStyles = {
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
// };

// function BootstrapDialogTitle(props) {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

// BootstrapDialogTitle.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired,
// };



 
// const SalaryCalculator = ({ drawer }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [dateOffset, setDateOffset] = useState(7);
//   const [searched, setSearched] = useState('');
//     const [open, setOpen] = useState(false);
//   const [exportMode, setExportMode] = useState(0);
//   let totalRemunerationForAll = 0;
//   // Pagination state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   //user details
//   const { role, email, ownerEmail } = useSelector(
//     (state) => state.auth.user.data
//   );
//     // Retrieve attendance data from employeeSlice
//   const { employees } = useSelector(
//     (state) => state.employees
//   );
//   // user role
//   const userEmail = role === 'owner' || role === 'admin' ? ownerEmail : email;
//   console.log(userEmail);   

//   //fetch attendance details
//   useEffect(() => {           
        
//     dispatch(retrieveAllEmployees({ userEmail }));
//   }, [dispatch, userEmail ]);


//   // Retrieve financial data from financialSlice
//   const financialData = useSelector((state) => state.financial);
//   console.log(employees, financialData);

//   // Function to trigger financial data calculation
//   const calculateFinancialData = ( employeeId, grossIncome, country, healthCare ) => {
//     console.log(
//       'front-calculateFinancialData:',
//       employeeId,
//       grossIncome,
//       country
//     );
//     dispatch(calculateTaxAsync({ employeeId, grossIncome, country,healthCare }));    
        
//   };
//   // search function
//   const requestSearch = (searchedVal) => {
//     setSearched(searchedVal);
//   };

     

//  // Function to enable export mode
//  const enableExportMode = () => {
//   setExportMode(true);
// };

// // Function to disable export mode
// const disableExportMode = () => {
//   setExportMode(false);
// };
//   const ExportSheet = () => {
//     setExportMode(1);
//   };
  

//   // function to add overtime
//   const AddOvertime = (id, employee) => {
//     // alert(id)
//     Swal.fire({
//       title: `${employee}`,
//       text: 'standard employee overtime rate is 1.5 (1.5 multiply by normal hourly rate)',
//       input: 'text',
//       inputAttributes: {
//         autocapitalize: 'off',
//       },
//       showCancelButton: true,
//       confirmButtonText: 'Add Overtime hr',
//       showLoaderOnConfirm: true,
//       preConfirm: async (result) => {
//         try {
//           const response = await dispatch(addOvertime({ id, value: result }));
//           console.log('response=>', response);
//           if (response.meta.requestStatus === 'fulfilled') {
//             Swal.fire({
//               title: 'Add Overtime',
//               text: 'Successful!',
//               icon: 'success',
//               confirmButtonText: 'Ok',
//             });
//           } else {
//             throw new Error(
//               'Adding overtime failed: Response was not successful'
//             );
//           }
//         } catch (error) {
//           console.error('Error adding overtime:', error); // Log the detailed error
//           Swal.showValidationMessage(`An error occurred: ${error.message}`);
//         }
//       },
//       allowOutsideClick: () => !Swal.isLoading(),
//     });
//   };

//   const overtimeReset = () => {
//     // const { user } = auth;
//     // const email = user.email;
//     let overtime = parseInt(0);
//     axios.post(`/api/v1/employee/overtimeReset/${email}/ ${overtime}`).then(
//       (res) => {
//         Swal.fire({
//           title: 'Overtime Reset',
//           text: 'Successful!',
//           icon: 'success',
//           confirmButtonText: 'Ok',
//         });
//       },
//       (err) => {
//         alert('An error occurred! Try submitting the form again.', err);
//       }
//     );
//   };



//   const goBack = () => {};

//   // Add allowance
//   const AddAllowance = (id, employee) => {
//     Swal.fire({
//       title: `${employee}`,
//       text: '',
//       input: 'text',
//       inputAttributes: {
//         autocapitalize: 'off',
//       },
//       showCancelButton: true,
//       confirmButtonText: 'Add allowance',
//       showLoaderOnConfirm: true,
//       preConfirm: async (result) => {
//         try {
//           const response = await dispatch(addAllowance({ id, value: result }));
//           console.log('response=>', response);
//           if (response.meta.requestStatus === 'fulfilled') {
//             Swal.fire({
//               title: 'Add Allowance',
//               text: 'Successful!',
//               icon: 'success',
//               confirmButtonText: 'Ok',
//             });
//           } else {
//             throw new Error(
//               'Adding overtime failed: Response was not successful'
//             );
//           }
//         } catch (error) {
//           console.error('Error adding overtime:', error); // Log the detailed error
//           Swal.showValidationMessage(`An error occurred: ${error.message}`);
//         }
//       },
//       allowOutsideClick: () => !Swal.isLoading(),
//     });
//   };

//   // Add allowance
//   const AddIOU = (id, employee) => {
//     Swal.fire({
//       title: `${employee}`,
//       text: '',
//       input: 'text',
//       inputAttributes: {
//         autocapitalize: 'off',
//       },
//       showCancelButton: true,
//       confirmButtonText: 'Add IOU',
//       showLoaderOnConfirm: true,
//       preConfirm: async (result) => {
//         try {
//           const response = await dispatch(addIOU({ id, value: result }));
//           console.log('response=>', response);
//           if (response.meta.requestStatus === 'fulfilled') {
//             Swal.fire({
//               title: 'Add IOU',
//               text: 'Successful!',
//               icon: 'success',
//               confirmButtonText: 'Ok',
//             });
//           } else {
//             throw new Error(
//               'Adding overtime failed: Response was not successful'
//             );
//           }
//         } catch (error) {
//           console.error('Error adding overtime:', error); // Log the detailed error
//           Swal.showValidationMessage(`An error occurred: ${error.message}`);
//         }
//       },
//       allowOutsideClick: () => !Swal.isLoading(),
//     });
//   };

//   // function to reset allowance
//   const AllowanceReset = () => {
//     Swal.fire({
//       title: 'Allowance Reset',
//       text: 'Are you sure you want to reset the allowance?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Reset',
//       showLoaderOnConfirm: true,
//       preConfirm: async () => {
//         try {
//           let overtime = parseInt(0);
//           const response = await dispatch(allowanceReset({ email, overtime }));

//           if (response.success) {
//             Swal.fire({
//               title: 'Allowance Reset',
//               text: 'Successful!',
//               icon: 'success',
//               confirmButtonText: 'Ok',
//             });
//           } else {
//             throw new Error('Allowance reset failed'); // You can customize the error message
//           }
//         } catch (error) {
//           Swal.showValidationMessage(`An error occurred: ${error.message}`);
//         }
//       },
//       allowOutsideClick: () => !Swal.isLoading(),
//     });
//   };

//   const filteredRows =
//     employees &&
//     employees
//       .filter((row) => row.paySchedule === 'Monthly') // Filter by paySchedule === 'weekly'
//       .filter((row) =>
//         Object.values(row).some((value) =>
//           String(value).toLowerCase().includes(searched.toLowerCase())
//         )
//       ); // Further filter by search term     

//       const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
//       const startIndex = page * rowsPerPage;
//       const endIndex = startIndex + rowsPerPage;
//       const paginatedRows = filteredRows.slice(startIndex, endIndex);

//       // function to calculate total payout
    
//         filteredRows.map((row) =>{
//           const { _id, designation, employeeId, healthCare  } = row;
//           const { grossIncome, country } = designation;
//           const employeeFinancialData = financialData[_id];

//           // Calculate financial data if not available
//           if (!employeeFinancialData) {
//             calculateFinancialData(_id, grossIncome, country,healthCare);
//             return null; // Render nothing for now, will be updated on next render
//           }
//           console.log(employeeFinancialData);
// // Calculate financial data if not available
// if (!employeeFinancialData) {
// calculateFinancialData(_id, grossIncome, country);
// return null; // Render nothing for now, will be updated on next render
// }
// console.log(employeeFinancialData);

// // Calculate Total Remuneration
// const monthlyRate =
// employeeFinancialData.monthlySalary ;
 

// // Calculate net Remuneration
// const netRemuneration =
// monthlyRate +
// parseFloat(row.overtime) +
// parseFloat(row.allowance) -
// parseFloat(row.IOU).toFixed(2);

// // Add the calculated remuneration to the total
// totalRemunerationForAll += netRemuneration;
//         })

      

// console.log('function for salary=>',totalRemunerationForAll)
 
 

//   // Dialogue box
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const tableRef = useRef(null);

//   // excel download function
//   const { onDownload } = useDownloadExcel({
//     currentTableRef: tableRef.current,
//     filename: 'Salary',
//     sheet: 'Users',
//   });

//   return (
//     <>
//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <TextField
//           value={searched}
//           onChange={(e) => requestSearch(e.target.value)}
//           label="Search database"
//           variant="outlined"
//           size="small"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 {searched && (
//                   <IconButton onClick={() => requestSearch('')}>
//                     <Clear />
//                   </IconButton>
//                 )}
//               </InputAdornment>
//             ),
//           }}
//         />
//       </div>
//       <br />
//       <label>
//         {/* <Popup
//           trigger={
//             <Button variant="info" color="primary" onClick={goBack}>
//               <TiArrowBackOutline />
//             </Button>
//           }
//           position="bottom center"
//         >
//           Go back to employee panel
//         </Popup> */}

 
//             <Button variant="info" color="primary"  >
          
//             <Icon icon="flat-color-icons:overtime" width="45" height="45" />
             
//             </Button>
       

//         <Button>
//         <Icon icon="arcticons:moneybuster" width="45" height="45" />
//         </Button>

       
//         <Chip
//           // avatar={<FcRatings />}
//           label="Set overtime rate"
//           clickable
//           style={{ backgroundColor: '#fff' }}
//         />
     
        
//         {exportMode ? (        
//         <>
//           {/* Cancel button with Clear icon */}
//           <Button onClick={disableExportMode}>
//             <Clear />
//             Cancel
//           </Button>
//           {/* Excel button with SVG icon */}
//           <Button onClick={ExportSheet} style={{ backgroundColor: '#E97451', color: '#ffffff' }}>
//   <FileCopy style={{ color: '#ffffff' }} /> Export to Excel
// </Button>

//         </>
//       ) : (
//         <Button onClick={enableExportMode}style={{ backgroundColor: '#7393B3', color: '#ffffff' }}>
//           Convert to Exportable version
//         </Button>
//       )}
//               <Button variant="contained" onClick={drawer} style={{backgroundColor:'#E97451'}} >
//         Wages Calculator
//         </Button>
//       {/* Button to toggle the sidebar */}
//       <Button variant="contained" onClick={drawer}>
//           How it works
//         </Button>
//         {/* Render totalRemunerationForAll in a separate table row */}
//         <tr>
//             <td colSpan="8" style={{ textAlign: 'right' }}>
//               <strong>After Tax Aggregate Salary for All Monthly Employees:</strong>
//             </td>
//             <td style={{ textAlign: 'center' }}>
              
//                {fNumber(totalRemunerationForAll.toFixed(2))} 
//             </td>
//           </tr>
    
//       </label>
//       <div style={futuristicStyles.tableContainer}>
//         <table style={futuristicStyles.table}>
//           <thead style={futuristicStyles.tableHead}>
//             <tr>
          
//             <th style={futuristicStyles.tableHeadCell}>Employee</th>
//             <th style={futuristicStyles.tableHeadCell}>Name</th>
//             <th style={futuristicStyles.tableHeadCell}>Designation</th>
//             <th style={futuristicStyles.tableHeadCell}>Salary</th>
//             <th style={futuristicStyles.tableHeadCell}>Allowance</th>
//             <th style={futuristicStyles.tableHeadCell}>Overtime</th>
//             <th style={futuristicStyles.tableHeadCell}>IOU</th>
//             <th style={futuristicStyles.tableHeadCell}>Loan</th>
//             <th style={futuristicStyles.tableHeadCell}>Loan repay</th>
//             <th style={futuristicStyles.tableHeadCell}>Loan Expiry date</th>
//             <th style={futuristicStyles.tableHeadCell}>Total Salary</th>
//             <th style={futuristicStyles.tableHeadCell}>Bank name</th>
//             <th style={futuristicStyles.tableHeadCell}>Bank code</th>
//             <th style={futuristicStyles.tableHeadCell}>Account Number</th>
               
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedRows.map((row) => {
//               console.log('in-map:', row);
//               const { _id, employeeName, designation } = row;
//               const { grossIncome, country } = designation;
//               const employeeFinancialData = financialData[_id];

//               // Calculate financial data if not available
//               if (!employeeFinancialData) {
//                 calculateFinancialData(_id, grossIncome, country);
//                 return null; // Render nothing for now, will be updated on next render
//               }
//               console.log(employeeFinancialData);
//  // Calculate financial data if not available
//  if (!employeeFinancialData) {
//   calculateFinancialData(_id, grossIncome, country);
//   return null; // Render nothing for now, will be updated on next render
// }
// console.log(employeeFinancialData);

// // Calculate Total Remuneration
// const monthlyRate =
//   employeeFinancialData.monthlySalary ;
// const totalRemuneration = (
//   monthlyRate   +
//   row.overtime +
//   row.allowance -
//   row.IOU
// ).toFixed(2);
   
// // Calculate net Remuneration
// const netRemuneration =
// monthlyRate +
//   parseFloat(row.overtime) +
//   parseFloat(row.allowance) -
//   parseFloat(row.IOU)         
// ;

// // Add the calculated remuneration to the total
// totalRemunerationForAll += netRemuneration;
// console.log('All:',totalRemunerationForAll)
//               return (
//                 <tr key={row.id} style={futuristicStyles.tableBodyRow}>
//                 {exportMode === 1 ? (
//                     ''
//                   ) : (
//                     <td style={futuristicStyles.tableBodyCell}>
//                     <img
//                       src={row.imagePath}
//                       alt=""
//                       style={futuristicStyles.avatar}
//                     />
//                   </td>
//                   )}
                                

//                   <td style={futuristicStyles.tableBodyRow}>
//               <Link
//                 to={ `/employee-detail/${row._id}` }
//                 style={{ textDecoration: 'none', color: 'white' }}
//               >
//                 {' '}
//                 { employeeName}
//               </Link>{' '}
//             </td>

//             <td style={futuristicStyles.tableBodyCell}>
//               <Link
//                 to={ `/employee-detail/${row._id}` }
//                 style={{
//                   color: '#ffff',
//                   textDecoration: 'none',
//                   backgroundImage: 'none',
//                 }}
//               >
//                 {row.designation.designation}
//               </Link>
//             </td>
                                  
//                     <td style={futuristicStyles.tableBodyCell}>
                  
//                     {fNumber(employeeFinancialData.monthlySalary)}
//                   </td>  

//                   <td style={futuristicStyles.tableBodyCell}>
//               {fNumber(row.allowance ? row.allowance : '0.00')}
//             </td>
//             <td style={futuristicStyles.tableBodyCell}>{fNumber(row.overtime)}</td>
//             <td style={futuristicStyles.tableBodyCell}>{fNumber(row.IOU)}</td>
//             <td style={futuristicStyles.tableBodyCell}>{fNumber(row.loan && row.exemptionIsOn ? row.loan : '0.00')}</td>
//             <td style={futuristicStyles.tableBodyCell}>{fNumber(row.minimumRepay)}</td>
//             <td style={futuristicStyles.tableBodyCell}>
//               {row.loan
//                 ? moment(new Date(row.repayDate)).format('MMM Do YY')
//                 : '-'}
//             </td>
//             {row.department.grossIncome === null ? (
//               <td style={futuristicStyles.tableBodyCell}>
//                 {row.loan && moment().isBefore(moment(row.repayDate))
//                   ? fNumber(
//                       parseInt(
//                         row.designation.perhrIncome * 8 * 20 -
//                           parseInt(row.minimumRepay) +
//                           parseInt(row.allowance)
//                       )
//                     )
//                   : fNumber(
//                       parseInt(
//                         row.department.perhrIncome * 8 * 20 +
//                           parseInt(row.allowance)
//                       )
//                     )}
//               </td>
//             ) : (
//               <td style={futuristicStyles.tableBodyCell}>
//                 {row.loan && moment().isBefore(moment(row.repayDate))
//                   ? fNumber(totalRemuneration - parseInt(row.minimumRepay)
//                     )
//                   : fNumber( totalRemuneration 
//                     )}
//               </td>
//             )}
//              <td style={futuristicStyles.tableBodyCell}>{row.bankName}</td>
//             <td style={futuristicStyles.tableBodyCell}>-</td>
//             <td style={futuristicStyles.tableBodyCell}>{row.accountNumber}</td>
//                   {/* <td
//                     data-label="overtime total"
//                     style={{ ...futuristicStyles.tableBodyCell }}
//                   >
//                     {toMoney(totalRemuneration)}
//                   </td> */}
//                 </tr>
//               );
//             })}

//             <tr>
//             <td colSpan="8" style={{ textAlign: 'right' }}> 
//               <strong>Total:</strong>
//             </td>
//             <td style={{ textAlign: 'center' }}>
//               {/* {toMoney(totalRemunerationForAll.toFixed(2)/2) } */}
//             </td>
//           </tr>

//           </tbody>
          
//         </table>
        
//       </div>
//       <br/>
//       {/* Pagination controls */}
//       <div>
//         <button
//           onClick={() => setPage(Math.max(0, page - 1))}
//           disabled={page === 0}
//         >
//           Previous
//         </button>
//         <span>
//           Page {page + 1} of {totalPages}
//         </span>
//         <button
//           onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
//           disabled={page === totalPages - 1}
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default function MainPage() {
//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center', // Horizontally center the content
//     justifyContent: 'center', // Vertically center the content
//     // height: '75vh', // Set the height of the container to full viewport height
//   };
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };   

//   return (
//     <Container>
//     <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
// <Typography variant="h4">Salary Calculator</Typography>

// <Link to="/new-employee">
// <Button
// variant="contained"
// style={{ backgroundColor: '#0096FF', color: 'white' }} // Set background color to blue and text color to white
 
// >

// Income Analytics          

// </Button>
// </Link>

// </Stack>
// <Scrollbar>
//       <SalaryCalculator drawer={toggleSidebar} />
//       </Scrollbar>
//           </Container>
//   );
// }
