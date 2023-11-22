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
   import Dropdown from 'react-dropdown';
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
   
   const FilterableTable = ({ drawer }) => {
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
     const [isUploadVisible, setUploadVisible] = useState(false);
   
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
   
       // Call the function whenever search term or inmates data changes
       updateFilteredRows();
     }, [searched, employees]);
    
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
      <Dropdown options={options} onChange={handleDropdownChange} value={selectedOption} placeholder="Select a department" />

{/* Button */}
<Button variant="contained" color="primary">
  Your Button
</Button>
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
</div>;

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
         <FilterableTable drawer={toggleSidebar} />
         </TableContainer>
        </Scrollbar>
          </Container>
    

     
     );
   }
   
    


 