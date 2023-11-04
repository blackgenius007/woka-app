   /* eslint-disable */
   import React, { useState,useEffect } from 'react';
   import {  useSelector } from 'react-redux';
   import Button from '@mui/material/Button';
   import Container from '@mui/material/Container';
   import Typography from '@mui/material/Typography';
   import TableContainer from '@mui/material/TableContainer';
   import Table from '@mui/material/Table';
   import Avatar from '@mui/material/Avatar';
   import TableBody from '@mui/material/TableBody';
   import TablePagination from '@mui/material/TablePagination';
   import Stack from '@mui/material/Stack';
   
 
   
   import { applyFilter, getComparator } from '../../../sections/user/utils';  
   
   import EmployeeTableRow from './employee-table-row';
   import EmployeeTableHead from './employee-table-head';
   import TableNoData from './table-no-data';
   
   export default function FilterableTable() {
     const [page, setPage] = useState(0);
     const [order, setOrder] = useState('asc');
     const [selected, setSelected] = useState([]);
     const [orderBy, setOrderBy] = useState('employeeName');
     const [filterName, setFilterName] = useState('');
     const [rowsPerPage, setRowsPerPage] = useState(5);
     const [openDialog, setOpenDialog] = useState(false);
     const [openEditDialog, setOpenEditDialog] = useState(false);
     const [selectedEmployee, setSelectedEmployee] = useState(null);
     const [isUploadVisible, setUploadVisible] = useState(false);
     const hiddenFileInput = React.useRef(null);
     const [resume, setResume] = useState({});
     const [url, setUrl] = useState({});
     const [uploadedFile, setUploadedFile] = useState({});
     const [preview, setPreview] = useState(false);
     const [avatar, setAvatar] = useState(false);

     const { employees, isLoading } = useSelector(
        (state) => state.employees
      );
       
        // const { role, email, ownerEmail } = useSelector(
        //     (state) => state.auth.user.data
        //   );
        
          const userEmail = role === 'owner' || role === 'admin' ? ownerEmail : email;
        
         
        
        
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
        
      
   
     const handleSort = (event, id) => {
       const isAsc = orderBy === id && order === 'asc';
       if (id !== '') {
         setOrder(isAsc ? 'desc' : 'asc');
         setOrderBy(id);
       }
     };
   
     const handleSelectAllClick = (event) => {
       if (event.target.checked) {
         const newSelecteds = employees.map((n) => n.employeeName);
         setSelected(newSelecteds);
         return;
       }
       setSelected([]);
     };
   
     const handleClick = (event, name) => {
       const selectedIndex = selected.indexOf(name);
       let newSelected = [];
       if (selectedIndex === -1) {
         newSelected = newSelected.concat(selected, name);
       } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1));
       } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1));
       } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(
           selected.slice(0, selectedIndex),
           selected.slice(selectedIndex + 1)
         );
       }
       setSelected(newSelected);
     };
   
     const handleChangePage = (event, newPage) => {
       setPage(newPage);
     };
   
     const handleChangeRowsPerPage = (event) => {
       setPage(0);
       setRowsPerPage(parseInt(event.target.value, 10));
     };
   
     const handleFilterByName = (event) => {
       setPage(0);
       setFilterName(event.target.value);
     };
   
     const dataFiltered = applyFilter({
       inputData: employees, // Replace with your employee data
       comparator: getComparator(order, orderBy), // You need to provide this function
       filterName,
     });
   
     const notFound = !dataFiltered.length && !!filterName;
   
     return (
       <Container>
         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
           <Typography variant="h4">Employees</Typography>
           <Button variant="contained" color="primary">
             New Employee
           </Button>
         </Stack>
   
         <TableContainer sx={{ overflow: 'unset' }}>
           <Table sx={{ minWidth: 800 }}>
             <EmployeeTableHead
               order={order}
               orderBy={orderBy}
               rowCount={employees.length}
               numSelected={selected.length}
               onRequestSort={handleSort}
               onSelectAllClick={handleSelectAllClick}
               headLabel={[
                 { id: 'employeeName', label: 'Name' },
                 { id: 'designation', label: 'Designation' },
                 { id: 'department', label: 'Department' },
                 { id: 'employeeCode', label: 'Employee Code' },
                 { id: 'sex', label: 'Sex' },
                 { id: 'bankName', label: 'Bank Name' },
                 { id: 'accountNumber', label: 'Account Number' },
                 { id: '', label: 'Action' },
               ]}
             />
             <TableBody>
               {dataFiltered
                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                 .map((row) => (
                   <EmployeeTableRow
                     key={row._id}
                     employeeName={row.employeeName}
                     designation={row.designation.designation}
                     department={row.department}
                     employeeCode={row.employeeCode}
                     sex={row.sex}
                     bankName={row.bankName}
                     accountNumber={row.accountNumber}
                     selected={selected.indexOf(row.employeeName) !== -1}
                     handleClick={(event) => handleClick(event, row.employeeName)}
                   />
                 ))}
               {notFound && <TableNoData query={filterName} />}
             </TableBody>
           </Table>
         </TableContainer>
   
         <TablePagination
           page={page}
           component="div"
           count={employees.length}
           rowsPerPage={rowsPerPage}
           onPageChange={handleChangePage}
           rowsPerPageOptions={[5, 10, 25]}
           onRowsPerPageChange={handleChangeRowsPerPage}
         />
       </Container>
     );
   }
   


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Dropdown from 'react-dropdown';

// import { ButtonBase } from '@mui/material';
// import TablePagination from '@mui/material/TablePagination';
// import {
//   retrieveAllEmployees,
//   retrieveEmployeeById,
//   updateEmployeeById,
//   deleteEmployeeById,
// } from '../../../Services/HR-Services/employeeSlice';
// import { Clear } from '@mui/icons-material';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import Dialog from '@mui/material/Dialog';
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
// import Edit from '@mui/icons-material/Edit';
// import Delete from '@mui/icons-material/Delete';
// import PropTypes from 'prop-types';
// import Avatar from '@mui/material/Avatar';
// import { Popup } from 'semantic-ui-react';
// // import face from '../../../../assets/face-0.jpg';
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

//  // Add futuristic styles here...
//  const futuristicStyles = {
//   tableContainer: {
//     background: '#222',
//     borderRadius: '10px',
//     padding: '1rem',
//   },
//   table: {
//     color: '#fff',
//     width: '100%',
//     borderCollapse: 'collapse',
//     textAlign: 'left',
//   },
//   tableHead: {
//     background: '#333',
//   },
//   tableHeadCell: {
//     padding: '0.5rem',
//   },
//   tableBodyRow: {
//     borderBottom: '1px solid #444',
//   },
//   tableBodyCell: {
//     padding: '0.5rem',
//   },
//   avatar: {
//     borderRadius: '50%',
//     width: '35px',
//     height: '35px',        
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
//     fontSize: '1.2rem',
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
//      const FilterableTable = () => {
//   const navigate = useNavigate();
//   const [selectOptions, setSelectOptions] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [name, setName] = useState('');
//   const [selectDept, setSelectDept] = useState([]);
//   const [department, setDepartment] = useState('');
//   const dispatch = useDispatch();
//   const [searched, setSearched] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [isUploadVisible, setUploadVisible] = useState(false);
//   const hiddenFileInput = React.useRef(null);
//   const [resume, setResume] = useState({});
//   const [url, setUrl] = useState({});
//   const [uploadedFile, setUploadedFile] = useState({});
//   const [preview, setPreview] = useState(false);
//   const [avatar, setAvatar] = useState(false);

 
//   const handleDepartmentView=()=>{
//     navigate(`/department-view/${department}`);
//   }

//   //fetch designation & department
//   useEffect(() => {
//     const fetchDesignation = async () => {
//       try {
//         const res = await axios.get(
//           `/api/v1/employee/designation/${user.data.email}`,
//           {
//             params: {
//               _limit: 100,
//             },
//           }
//         );

//         if (res.data) {
//           const designationData = res.data;

//           // Map the designation data to an array of options
//           const designationOptions = designationData.map((designation) => ({
//             value: designation._id,
//             label: designation.designation,
//           }));

//           setSelectOptions(designationOptions);
//         }
//       } catch (error) {
//         console.error('Error fetching designation data:', error);
//       }
//     };

//     const fetchDepartmentData = async () => {
//       try {
//         // Map the department data to an array of options
//         const departmentOptions = user.data.departmentAdded.map(
//           (department, i) => ({
//             value: i,
//             label: department.replace(/\\/g, '').replace(/"/g, '').trim(),
//           })
//         );

//         setOptions(departmentOptions);
//       } catch (error) {
//         console.error('Error fetching department data:', error);
//       }
//     };

//     fetchDesignation();
//     fetchDepartmentData();
//   }, []);
//   const defaultOption = selectDept['Select Department'];
//   const defaultOption2 = selectOptions['Select Designation'];
//   const handleDepartmentChange = (e) => {
//     setDepartment(e.label);
//     console.log(e.label);
//   };

//   const { employees, isLoading, isError, message } = useSelector(
//     (state) => state.employees
//   );
//     const { user } = useSelector((state) => state.auth);
// console.log(employees);



//   // Photo onChanged function
//   const handleClick = (event) => {
//     hiddenFileInput.current.click();
//   };
//   const handleChange = (event) => {
//     const fileUploaded = event.target.files[0];
//     const url = URL.createObjectURL(fileUploaded);
//     setUrl(url);
//     setResume(fileUploaded);
//     console.log(fileUploaded.name);
//     console.log(fileUploaded);
//     console.log(resume);
//     setPreview(true);
//   };
//   // function to upload inmate picture
//   const onSubmitPhoto = async () => {
//     try {
//       if (resume) {
//         const formData = new FormData();
//         formData.append('image', resume, resume.name);

//         const response = await axios.post(
//           `/api/v1/images/${selectedEmployee._id}`,
//           formData
//         );
//         console.log('Server response:');
//         console.log(response.data);

//         // Handle success scenario
//         alert('Uploaded successfully');
//       } else {
//         alert('Please select an image');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Toggle function
//   const toggleUpload = () => {
//     setUploadVisible((prevState) => !prevState);
//   };

//   const requestSearch = (searchedVal) => {
//     setSearched(searchedVal);
//   };

//   const cancelSearch = () => {
//     setSearched('');
//   };

//   const { role, email, ownerEmail } = useSelector(
//     (state) => state.auth.user.data
//   );

//   const userEmail = role === 'owner' || role === 'admin' ? ownerEmail : email;
//   console.log(userEmail);

//   const calculateAge=(dateOfBirth)=>{
//     const today = new Date();
//     const birthDate = new Date(dateOfBirth);
  
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDifference = today.getMonth() - birthDate.getMonth();
  
//     if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
  
//     return age;
//   }


//   // retrieve all employee from API
//   useEffect(() => {
//     // Dispatch retrieveAllEmployee action
//     dispatch(retrieveAllEmployees(userEmail));
//   }, [dispatch, userEmail]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error: {message}</div>;
//   }

//   const filteredRows =
//     employees &&
//     employees.filter((row) => {
//       return Object.values(row).some((value) =>
//         String(value).toLowerCase().includes(searched.toLowerCase())
//       );
//     });

//   // function handles update
//   const handleUpdate = (employeeId) => {
//     navigate(`/employee-update/${employeeId}`);
//   };

//   // function handles delete
//   const handleDelete = (id) => {
//     dispatch(deleteEmployeeById(id));

//     // function opens Dialog
//   };
//   const handleOpenDialog = (employee) => {
//     // Open the dialog and pass the inmate data
//     setOpenDialog(true);
//     setSelectedEmployee(employee);
//   };

// const handleLinkClick = (event, id,grossIncome) => {

//   event.stopPropagation(); // Prevent event propagation to parent elements
//   navigate(`/employee-detail/${id}`);
// };

// // const closeEditClick = () => {
//   //   setOpenEditDialog(false);
//   // };

//   const handleCloseDialog = () => {
//     // Close the dialog
//     setOpenDialog(false);
//     setSelectedEmployee(null);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const startIndex = page * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedRows = filteredRows.slice(startIndex, endIndex);

//   return (
//     <>
//      <div
//   style={{
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }}
// >
//   <TextField
//     value={searched}
//     onChange={(e) => requestSearch(e.target.value)}
//     label="Search database"
//     variant="outlined"
//     size="small"
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           {searched && (
//             <IconButton onClick={() => requestSearch('')}>
//               <Clear />
//             </IconButton>
//           )}
//         </InputAdornment>
//       ),
//     }}
//   />
      
//   <Dropdown
//     options={options}
//     onChange={handleDepartmentChange}
//     value={null}
//     placeholder="Select a Department"
//     style={{ marginBottom: '2rem', marginLeft: '1rem' }}
//   />

//   <Button  onClick={(e)=>handleDepartmentView(e)} variant="contained" color="primary">
//     Go
//   </Button>
// </div>
//       <br />
//       <div style={futuristicStyles.tableContainer}>
//         <table style={futuristicStyles.table}>
//           <thead style={futuristicStyles.tableHead}>
//             <tr>
//               <th style={futuristicStyles.tableHeadCell}>
//                 <small>
//                   <i>Click on employee name for details</i>
//                 </small>
//               </th>
//               <th style={futuristicStyles.tableHeadCell}></th>
//               <th style={futuristicStyles.tableHeadCell}>Designation</th>
//               <th style={futuristicStyles.tableHeadCell}>Department</th>
//               <th style={futuristicStyles.tableHeadCell}>Employee Code</th>
//               <th style={futuristicStyles.tableHeadCell}>Sex</th>
//               <th style={futuristicStyles.tableHeadCell}>Bank Name</th>
//               <th style={futuristicStyles.tableHeadCell}>Account Number</th>
//               <th style={futuristicStyles.tableHeadCell}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedRows.map((row) => (
//               <tr key={row.id} style={futuristicStyles.tableBodyRow}>
//                 <td style={futuristicStyles.tableBodyCell}>
//                   <img
//                     src={row.imagePath}
//                     alt=""
//                     style={futuristicStyles.avatar}
//                   />
//                 </td>
//                 <td style={futuristicStyles.tableBodyCell}>
//                   <button
//                     onClick={() => handleOpenDialog(row)}
//                     style={futuristicStyles.link}
//                   >
//                     {row.employeeName}
//                   </button>
//                 </td>
//                 <td style={futuristicStyles.tableBodyCell}>
//                   {row.designation.designation}
//                 </td>
//                 <td style={futuristicStyles.tableBodyCell}>
//                   {row.department}
//                 </td>
//                 <td style={futuristicStyles.tableBodyCell}>
//                   {row.employeeCode}
//                 </td>
//                 <td style={futuristicStyles.tableBodyCell}>{row.sex}</td>
//                 <td style={futuristicStyles.tableBodyCell}>
//                   {row.bankName}
//                 </td>
//                 <td style={futuristicStyles.tableBodyCell}>
//                   {row.accountNumber}
//                 </td>
//                 <td style={futuristicStyles.tableBodyCell}>
//                   <span
//                     style={{
//                       ...futuristicStyles.actionIcons,
//                       color: '#00aaff',
//                     }}
//                     onClick={() => handleUpdate(row._id)}
//                   >
//                     <Edit />
//                   </span>
//                   <span
//                     style={{
//                       ...futuristicStyles.actionIcons,
//                       color: '#ff0000',
//                     }}
//                     onClick={() => handleDelete(row._id)}
//                   >
//                     <Delete />
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedEmployee && (
//         <div>
//           <BootstrapDialog
//             onClose={handleCloseDialog}
//             aria-labelledby="customized-dialog-title"
//             open={openDialog}
//           >
//             <BootstrapDialogTitle
//               id="customized-dialog-title"
//               onClose={handleCloseDialog}
//             >
//               {selectedEmployee.employeeName}
//             </BootstrapDialogTitle>
//             <DialogContent dividers>
//               <Box display="flex" alignItems="center" marginBottom={2}>
//                 <Avatar
//                   alt={selectedEmployee.employeeName}
//                   src={selectedEmployee.imagePath}
//                   sx={{ width: 100, height: 100, marginRight: 2 }}
//                 />
//                 <Box>
//                   <Typography
//                     variant="body1"
//                     gutterBottom
//                     style={{ color: 'grey' }}
//                   >
//                     Age: {calculateAge(selectedEmployee.dateOfBirth)}
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     gutterBottom
//                     style={{ color: 'grey' }}
//                   >
//                     Status: {selectedEmployee.complainStatus}
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     gutterBottom
//                     style={{ color: 'grey' }}
//                   >
//                     Join Date: {selectedEmployee.joinDate}
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     gutterBottom
//                     style={{ color: 'grey' }}
//                   >
//                     Employee Nos: {selectedEmployee.employeeCode}
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     gutterBottom
//                     style={{ color: 'grey' }}
//                   >
//                     Gender: {selectedEmployee.sex}
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     gutterBottom
//                     style={{ color: 'grey' }}
//                   >
//                     Mobile Number: {selectedEmployee.mobileNumber}
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     gutterBottom
//                     style={{ color: 'grey' }}
//                   >
//                     Email: {selectedEmployee.email}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Typography
//                 variant="body2"
//                 gutterBottom
//                 style={{ color: 'grey' }}
//               >
//                 {selectedEmployee.description}
//               </Typography>
//             </DialogContent>
//             <DialogActions>
//              <ButtonGroup>
//              {user.data.role === 'owner' || user.data.role === 'admin' ? (
//   <Button
  
//     onClick={(event) => handleLinkClick(event, selectedEmployee._id,selectedEmployee.designation.grossIncome)}
//   >
//     Admin
//   </Button>
// ) : (
//   ''
// )}
//                <Button onClick={toggleUpload}>Upload Inmate Photo</Button>
//               </ButtonGroup> 
//             </DialogActions>
//             {isUploadVisible && (
//               <Box
//                 display="flex"
//                 flexDirection="column"
//                 alignItems="center"
//                 mt={2}
//               >

//                 <IconButton onClick={handleClick}>
//                   <Popup
//                     trigger={
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="icon icon-tabler icon-tabler-upload"
//                         width="45"
//                         height="45"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="#9e9e9e"
//                         fill="none"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                         <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
//                         <polyline points="7 9 12 4 17 9" />
//                         <line x1="12" y1="4" x2="12" y2="16" />
//                       </svg>
//                     }
//                     position="bottom center"
//                   >
//                     Upload existing picture
//                   </Popup>
//                 </IconButton>
//                 <label>
//                   {preview ? (
//                     <img src={url} width="80px" height="80px" alt="" />
//                   ) : (
//                     ''
//                     // <img src={face} width="80px" height="80px" alt="" />
//                   )}
//                   <input
//                     type="file"
//                     name="images"
//                     accept=".jpg,.png,.jpeg"
//                     ref={hiddenFileInput}
//                     onChange={handleChange}
//                     style={{ display: 'none' }}
//                   />
//                 </label>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={onSubmitPhoto}
//                 >
//                   Submit
//                 </Button>
//               </Box>
//             )}
//           </BootstrapDialog>
//         </div>
//       )}
//     </>
//   );
// };

// export default function EmployeeView() {
//   return (
//     <div>
//       <FilterableTable />
//     </div>
//   );
// }
