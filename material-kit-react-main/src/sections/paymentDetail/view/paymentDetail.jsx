/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Button, Box } from '@mui/material';
import Payroll from './payroll';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { retrieveEmployeeById } from 'src/Services/HR-Services/employeeSlice';
import TaxCalculator from 'src/sections/employeeDetail/view/taxCalculator';
 

export default function PaymentDetail() {
  const dispatch = useDispatch();
  // Use useParams to get the parameters from the URL
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [openPayment, setOpenPayment] = useState(false);

  const handlePayment = (name, country, healthCare, iou, loan, benefitInKind) => {
    setName(name);
    setLocation(country);
    setPaycare(healthCare);
    setOpenPayment(true);
  };
  const closehandlePayment = () => {
    setOpenPayment(false);
  };

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

  if (!employeeData || !employeeData.employee) {
    // If employeeData or employeeData.employee is not yet available, show a loading message or handle the case appropriately
    return <div>Loading...</div>;
  }

  const {
    employeeName,
    department,
    createdAt,
    imagePath,
    designation,
    healthCare,
    loan,
    iou,
    minimumRepay,
    benefitInKind,
    employeeCode,
    address,
    dateOfBirth,
    sex,
    repayDate,
    nextOfKinRelationship,
    accountNumber,
    bankName,
    nextOfKinName,
    nextOfKinAddress,
    nextOfKinPhoneNumber,
  } = employeeData.employee;
  const { grossIncome, country } = designation;


  
  return (
    <div>
     <
      TaxCalculator
      
      />  
    </div>
  );
}
,













// /* eslint-disable */
// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, Typography, Grid, Avatar, Button, Box } from '@mui/material';
// import Payroll from './payroll';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
// import moment from 'moment';
// import { retrieveEmployeeById } from 'src/Services/HR-Services/employeeSlice';

 

// export default function PaymentDetail() {
//   const dispatch = useDispatch();
//   // Use useParams to get the parameters from the URL
//   const { id } = useParams();
//   const [employeeData, setEmployeeData] = useState(null);
//   const [openPayment, setOpenPayment] = useState(false);

//   const handlePayment = (name, country, healthCare, iou, loan, benefitInKind) => {
//     setName(name);
//     setLocation(country);
//     setPaycare(healthCare);
//     setOpenPayment(true);
//   };
//   const closehandlePayment = () => {
//     setOpenPayment(false);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const date = moment().format('YYYY-MM-DD');
//         const response = await dispatch(retrieveEmployeeById(id));
//         const employee = response.payload; // Access the employee details from the response payload

//         setEmployeeData(employee);

//         console.log(employee);
//       } catch (err) {
//         console.log('An error occurred!', err);
//       }
//     };

//     fetchData();
//   }, [dispatch, id]);

//   if (!employeeData || !employeeData.employee) {
//     // If employeeData or employeeData.employee is not yet available, show a loading message or handle the case appropriately
//     return <div>Loading...</div>;
//   }

//   const {
//     employeeName,
//     department,
//     createdAt,
//     imagePath,
//     designation,
//     healthCare,
//     loan,
//     iou,
//     minimumRepay,
//     benefitInKind,
//     employeeCode,
//     address,
//     dateOfBirth,
//     sex,
//     repayDate,
//     nextOfKinRelationship,
//     accountNumber,
//     bankName,
//     nextOfKinName,
//     nextOfKinAddress,
//     nextOfKinPhoneNumber,
//   } = employeeData.employee;
//   const { grossIncome, country } = designation;


  
//   return (
//     <div>
//       <Button
//         onClick={() => handlePayment(employeeName, country, healthCare, loan, iou, benefitInKind)}
//         variant="outlined"
//         color="primary"
//       >
//         Renumeration
//       </Button>
//       <Payroll
//         id={id}
//         name={name}
//         country={location}
//         grossIncome={grossIncome}
//         healthCare={healthCare}
//         loan={loan}
//         iou={iou}
//         benefit={benefitInKind}
//         open={openPayment}
//         close={closehandlePayment}
//       />
//     </div>
//   );
// }
