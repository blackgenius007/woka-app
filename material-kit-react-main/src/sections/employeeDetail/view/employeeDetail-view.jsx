   /* eslint-disable */


import React,{useState,useEffect} from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Button, Box } from '@mui/material';
import { retrieveEmployeeById } from 'src/Services/HR-Services/employeeSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import moment from 'moment'; 
import face from '/assets/images/avatars/avatar_25.jpg';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PaymentDetail from './paymentDetail';

const EmployeeProfileCard = () => {


  const dispatch = useDispatch();
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [openPayment, setOpenPayment] = useState(false);
  const [name, setName]= useState();
  const [location, setLocation]= useState();
  const [paycare, setPaycare]= useState();
 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = moment().format('YYYY-MM-DD');
        const response = await dispatch(retrieveEmployeeById(id));
        const employee = response.payload; // Access the employee details from the response payload
      
          setEmployeeData(employee);
    
         
        console.log(employee);
      } catch (err) {
        console.log('An error occurred!', err);
      }
    };

    fetchData();
  }, [dispatch, id]);



  // Sample attendance data for the chart
  const attendanceData = [
    {
      date: '2023-07-01',
      attendance: 100,
      sickDays: 6,
      absentDays: 1,
      vacationDays: 0,
      suspendedDays: 0,
    },
    {
      date: '2023-07-02',
      attendance: 90,
      sickDays: 0,
      absentDays: 1,
      vacationDays: 0,
      suspendedDays: 0,
    },
    // Add more data here...
  ];
  const handleEditClick = () => {
    // Handle edit click event
  };

  const handleEditRec = () => {
    // Handle edit recommendation event
  };

  const handleEditPersonal = () => {
    // Handle edit personal details event
  };
 const  handlePayment = (name,country,healthCare,iou,loan,benefitInKind) => {
  setName(name)
  setLocation(country)
  setPaycare(healthCare)
         setOpenPayment(true)

  }
  const  closehandlePayment = () => {
    setOpenPayment(false)
}


if (!employeeData || !employeeData.employee) {
  // If employeeData or employeeData.employee is not yet available, show a loading message or handle the case appropriately
  return <div>Loading...</div>;
}
              
  const { employeeName, department, createdAt,imagePath,designation,healthCare,loan,iou,benefitInKind, } = employeeData.employee;
  const { grossIncome, country } = designation;
console.log(employeeName, department, createdAt,designation)
console.log(grossIncome, country)
  return (
    <>
    <Card>
      <CardContent>
        {/* Avatar */}
        <Box display="flex" justifyContent="center" mb={3}>

        <div>
{imagePath ? ( <img
                  style={{ maxHeight: '200px' }}
                  src={imagePath}
                  rounded
                />):(  <img src={face}  style={{ maxHeight: '200px' }}  alt="" />)

                }
               
              </div>

          {/* <Avatar
            alt="Employee Avatar"
            src="path_to_avatar_image.jpg" // Replace with the actual path to the employee's avatar image
            style={{ width: 150, height: 150 }}
          /> */}
        </Box>

        {/* Buttons */}
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item>
            <Button variant="outlined" color="primary">
              Add Photo
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary">
              Personal
            </Button>
          </Grid>
          <Grid item>
            <Button  onClick={()=>handlePayment(employeeName,country,healthCare,loan,iou,benefitInKind) }  variant="outlined" color="primary">
              Renumeration
            </Button>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h2" mt={3}>
       {employeeName && employeeName}
        </Typography>
        {/* Add employee details here */}
        {/* e.g., Name, Designation, etc. */}

        {/* Attendance Chart */}
        <Box mt={3}>
          <Typography variant="h6" component="h3">
            Attendance Chart
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="attendance" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="sickDays" stroke="#82ca9d" />
              <Line type="monotone" dataKey="absentDays" stroke="#ffc658" />
              <Line type="monotone" dataKey="vacationDays" stroke="#ff6b81" />
              <Line type="monotone" dataKey="suspendedDays" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
    <PaymentDetail
      id={id}
     name={name}
     country={location}
     grossIncome={grossIncome}
     healthCare={healthCare}
     loan={loan}
     iou={iou}
     benefit={benefitInKind}
       open={openPayment}
           close={closehandlePayment}
    
        />
    </>
  );
}

export default EmployeeProfileCard;
 