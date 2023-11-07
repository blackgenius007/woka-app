/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, TextField,Form,Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import { registerEmployee } from '../../../Services/HR-Services/employeeSlice';
// import employeePic from '../../../../assets/employee.png';
import Dropdown from 'react-dropdown';
import axios from 'axios';
import 'react-dropdown/style.css';
import SetupDialog from './setupDialog';

function NewEmployeeFormView() {
  const { user } = useSelector((state) => state.auth);
  const departmentAdded = user && user.departmentAdded;
  const [selectOptions, setSelectOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [name, setName] = useState('');
  const [selectDept, setSelectDept] = useState([]);
  const [paySlip_id, setPayslip_id] = useState([]);
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  console.log(user);

  const [employee, setEmployeeData] = useState({
     sex: '',
    dateOfBirth: '',
    joinDate:'',
    employeeName: '',
    mobileNumber: '',
    email: '',
    address: '',
    bankName: '',
    accountNumber: '',
    nextOfKinName: '',
    nextOfKinRelationship: '',
    nextOfKinAddress: '',
    nextOfKinPhoneNumber: '',
  });

const{
  sex,
  dateOfBirth,
  joinDate,
  employeeName,
  mobileNumber,
  email,
  address,
  bankName,
  accountNumber,
  nextOfKinName,
  nextOfKinRelationship,
  nextOfKinAddress,
  nextOfKinPhoneNumber

}=employee
const ownerEmail=user.data.ownerEmail;
const employeeData={
  ownerEmail,
  department,
  designation,
  sex,
  dateOfBirth,
  joinDate,
  employeeName,
  mobileNumber,
  email,
  address,
  bankName,
  accountNumber,
  nextOfKinName,
  nextOfKinRelationship,
  nextOfKinAddress,
  nextOfKinPhoneNumber
}
  useEffect(() => {
    const fetchDesignation = async () => {
      try {
        const res = await axios.get(`https://woka-app.vercel.app/api/v1/employee/designation/${user.data.email}`, {
          params: {
            _limit: 100,
          },
        });

        if (res.data) {
          const designationData = res.data;

          // Map the designation data to an array of options
          const designationOptions = designationData.map((designation) => ({
            value: designation._id,
            label: designation.designation,
          }));

          setSelectOptions(designationOptions);
        }
      } catch (error) {
        console.error('Error fetching designation data:', error);
      }
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

    fetchDesignation();
    fetchDepartmentData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevState) => ({ ...prevState, [name]: value }));
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission reload
  
    // Handle form submission
    console.log(employee);
  
    const employeeId = user.data._id;
  
    // Dispatch registerEmployee action
    dispatch(registerEmployee({ employeeData, employeeId }));
  
    alert('Submission successful!');
  };

  const defaultOption = selectDept['Select Department'];
  const defaultOption2 = selectOptions['Select Designation'];
  const handleDepartmentChange = (e) => {
    setDepartment(e.label);
    console.log(e.label);
      };
       
  const handleDesigChange = (e) => {
    setDesignation(e.value);
setName(e.label)
    // setDesignation(e.label);
  };


 

      return (
    <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">New Employee Form</Typography>

        <Link to="/new-employee">
        <Button
        onClick={handleClickOpen}
  variant="contained"
  style={{ backgroundColor: '#0096FF', color: 'white' }} // Set background color to blue and text color to white
  startIcon={<Iconify icon="eva:plus-fill" />}
>

Setup Payment structure       

</Button>
</Link>

      </Stack>
      <Grid container spacing={2}>
        {/* Left column */}
        <Grid item xs={12} md={6}>
          {/* <Link to="/setup" style={{ textDecoration: 'none' }}>
            <Button   color="secondary" sx={{ mb: 2 }}>
              Back
            </Button>
          </Link> */}
       
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Dropdown
                  options={selectOptions}
                  onChange={handleDesigChange}
                  value={defaultOption2}
                  placeholder="Select a Designation"
                  style={{ marginBottom: '2rem', height: '10px' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Dropdown
                  options={options}
                  onChange={handleDepartmentChange}
                  value={null}
                  placeholder="Select a Department"
                  style={{ marginBottom: '2rem', height: '10px' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="sex"
                  label="Sex"
                  variant="outlined"
                  fullWidth
                  value={employee.sex}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="joinDate"
                  label="Employment date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={employee.joinDate }
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
                 </Grid>
                 <Grid item xs={12} sm={6}>
                <TextField
                  name="dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={employee.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
                 </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="employeeName"
                  label="Employee Name"
                  variant="outlined"
                  fullWidth
                  value={employee.employeeName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="mobileNumber"
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  value={employee.mobileNumber}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={employee.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={employee.address}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="bankName"
                  label="Bank Name"
                  variant="outlined"
                  fullWidth
                  value={employee.bankName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="accountNumber"
                  label="Account Number"
                  variant="outlined"
                  fullWidth
                  value={employee.accountNumber}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Next of Kin</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nextOfKinName"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={employee.nextOfKinName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nextOfKinRelationship"
                  label="Relationship"
                  variant="outlined"
                  fullWidth
                  value={employee.nextOfKinRelationship}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="nextOfKinAddress"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={employee.nextOfKinAddress}
                  onChange={handleInputChange}
                  required

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nextOfKinPhoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={employee.nextOfKinPhoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button
              type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                 
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        {/* Right column */}
        <Grid
          item
          xs={12}
          md={6}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <img
              src='https://img.freepik.com/free-vector/modern-business-team-working-open-office-space_74855-5541.jpg?w=1060&t=st=1699292229~exp=1699292829~hmac=178883d604b9327858122c666d6b07d95449a1a77fc20330d1fb0801eb7cd2fe'
              style={{ maxWidth: '65%', height: 'auto', margin: '0 auto' }}
              alt=""
            />
          </div>
        </Grid>
      </Grid>
      <SetupDialog  open={open} close={handleClose } />
    </Container>
  );
}

export default NewEmployeeFormView; 