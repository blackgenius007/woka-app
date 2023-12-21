/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { authPortalAccess } from 'src/Services/HR-Services/employeeSlice';
import { authDataAccess } from 'src/Services/HR-Services/employeeSlice';
import { Link } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TaxCalculator from 'src/sections/employeeDetail/view/taxCalculator';
import { retrieveEmployeeById } from 'src/Services/HR-Services/employeeSlice';
import Swal from 'sweetalert2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import {
  Typography,
  Button,
  Grid,
  Container,
  Card,
  Box,
  CardMedia,
  Avatar,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  TextField,
  Popover,
} from '@mui/material';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import HomeIcon from '@mui/icons-material/Home';
import StorageIcon from '@mui/icons-material/Storage';
import DataIcon from '@mui/icons-material/DataUsage';

const EmployeePortal = () => {
  const dispatch = useDispatch();
  const { employees, isLoading } = useSelector((state) => state.employees);
  console.log(employees);
  const [isEditing, setIsEditing] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [employeeAccessData, setEmployeeAccessData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [defaultPopoverOpen, setDefaultPopoverOpen] = useState(false);
  const [additionalDataPopoverOpen, setAdditionalDataPopoverOpen] = useState(false);
  const [taxCalculatorPopoverOpen, setTaxCalculatorPopoverOpen] = useState(false);
  const [dataCode, setDataCode] = useState('');
  const [dataMessage, setDataMessage] = useState('');

  //Destructure employees from redux
  useEffect(() => {
    // Assuming employees is an array
    if (employees && employees.length === 1) {
      // Access the first (and only) employee in the array
      const firstEmployee = employees[0];

      // Destructure properties from the employee and set them in the component state
      setEmployeeAccessData({
        healthCare: firstEmployee.healthCare,
        designation: firstEmployee.designation,
        loan: firstEmployee.loan,
        IOU: firstEmployee.IOU,
        benefitInKind: firstEmployee.benefitInKind,
        businessName: firstEmployee.businessName,
        // Add other properties as needed
      });
    }
  }, [employees]);

  // console.log(employeeAccessData);
  const { healthCare, designation, loan, IOU, benefitInKind, businessName } =
    employeeAccessData || {};
  const { grossIncome, country } = designation || {};
  console.log(
    'destructure:',
    healthCare,
    designation,
    loan,
    IOU,
    benefitInKind,
    grossIncome,
    country
  );

  // Popover to for data code input
  const handleDefaultPopoverOpen = (event) => {
    setDefaultPopoverOpen(true);
    setAnchorEl(event.currentTarget);
  };

  //Close data code input Popover
  const handleDefaultPopoverClose = () => {
    setDefaultPopoverOpen(false);
  };

  const handleInputChange = (event) => {
    setDataCode(event.target.value);
  };

  const handleAdditionalDataPopoverClose = () => {
    setAdditionalDataPopoverOpen(false);
  };

  const handleSubmit = async () => {
    try {
      // Dispatch the authDataAccess action and wait for the response
      const response = await dispatch(authDataAccess(dataCode));

      // Check if the response is successful
      if (response.meta.requestStatus === 'fulfilled') {
        // If successful, set the additional data Popover to open
        setAdditionalDataPopoverOpen(true);
      } else {
        // If not successful, set the error message in the component state
        setDataMessage(response.payload.message); // Assuming the error message is available in the payload
      }

      // Close the default Popover
      handleDefaultPopoverClose();
    } catch (error) {
      // Handle any errors that might occur during the dispatch
      console.error('An error occurred during dataAccess dispatch:', error);
    }
  };

  // const handleTaxCalculatorPopoverOpen = (event) => {
  //   setTaxCalculatorPopoverOpen(true);
  //   setAnchorEl(event.currentTarget);
  // };

  const handleTaxCalculatorPopoverOpen = (event) => {
    // Now you can open the Tax Calculator Popover and pass required properties
    setTaxCalculatorPopoverOpen(true);
    setAnchorEl(event.currentTarget);
  };

  console.log('portal-body :', employeeData && employeeData);
  // ... (rest of the component)

  const handleTaxCalculatorPopoverClose = () => {
    setTaxCalculatorPopoverOpen(false);
  };

  const open = Boolean(anchorEl);

  //Access the portalCode from the Redux store
  const portalCode = useSelector((state) => state.auth.employeeCode.portalCode);
  const { isError, message } = useSelector((state) => state.employees);

  // portal code verification
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(authPortalAccess(portalCode));
        // Handle success case
      } catch (err) {
        // Access the error message
        if (err && err.message) {
          const errorResponseMessage = err.message;
          // Use errorResponseMessage as needed (e.g., show an alert)
          console.error(errorResponseMessage);
        }
      }
    };

    fetchData();
  }, [dispatch, portalCode]);
  console.log();
  useEffect(() => {
    // Check if there is an error and show a SweetAlert
    if (isError) {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK',
      }).then(() => {
        // Navigate back to the home page
        window.location.href = '/';
      });
    }
  }, [isError, message, Swal]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes to the database
    setIsEditing(false);
  };

  // Sample data for carousel advertisements
  const advertisements = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/youseful-apps/image/upload/v1656692114/cld-sample.jpg',
      alt: 'Ad 1',
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/youseful-apps/image/upload/v1702968350/mcdonald_iweq7v.webp',
      alt: 'Ad 2',
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/youseful-apps/image/upload/v1702968361/GLO_vyaejh.jpg',
      alt: 'Ad 3',
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000, // Adjusted speed for a slower transition
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // calculate Employee Renumerations
  const getPensionFund = (grossIncome) => {
    const basicSalaryPercentage = 0.15;
    const transportAllowancePercentage = 0.075;
    const housingAllowancePercentage = 0.075;

    const basicSalary = grossIncome * basicSalaryPercentage;
    const transportAllowance = grossIncome * transportAllowancePercentage;
    const housingAllowance = grossIncome * housingAllowancePercentage;

    const sumOfValues = basicSalary + transportAllowance + housingAllowance;
    const pension = (sumOfValues * 8) / 100;

    return pension;
  };
  const pensionFund = getPensionFund(grossIncome);

  //calculate consolidated salary
  const cra = 200000 + (20 / 100) * grossIncome;

  return (
    <>
      {employees &&
        employees.map((employeeData) => (
          <>
            <Box>
              {/* Navbar */}
              <AppBar position="static" color="transparent" elevation={0} sx={{ mb: -2 }}>
                <Toolbar>
                  <Avatar variant="rounded" sx={{ backgroundColor: 'white', marginRight: '8px' }}>
                    <IconButton color="primary">
                      <HomeIcon />
                    </IconButton>
                  </Avatar>
                  <Avatar
                    alt=""
                    src="https://res.cloudinary.com/youseful-apps/image/upload/v1702332939/front_unv6ak.png"
                    style={{ width: '50px', height: '50px' }}
                  />
                </Toolbar>
              </AppBar>

              {/* Hero Section */}
              <Box py={8} sm={6} md={8} lg={10} bgcolor="gray.100">
                <Container maxWidth="lg">
                  <Grid container spacing={8} alignItems="center">
                    {/* Left Section */}
                    <Grid item md={6} xs={12}>
                      <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                        {employeeData.employeeName} - {employeeData.department}
                      </Typography>

                      <Typography variant="body1" paragraph>
                        Made with 1 prompt using the new{' '}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                          href="https://huggingface.co/fblgit/una-cybertron-7b-v2-bf16"
                        >
                          {employeeData.joinDate}
                        </a>
                        .<br />
                        Sed rhoncus ante in risus viverra aliquam. Fusce ultrices tellus eu nisl
                        malesuada, vitae dapibus odio pulvinar. Integer a dui sed dolor cursus
                        ornare eget quis enim.
                      </Typography>
                      <Box>
                        <Button
                          onClick={handleTaxCalculatorPopoverOpen}
                          variant="contained"
                          color="primary"
                          size="large"
                          sx={{ marginRight: 2 }}
                        >
                          Payroll
                        </Button>

                        <Button
                          href="#"
                          variant="contained"
                          color="primary"
                          size="large"
                          sx={{ marginRight: 2 }}
                        >
                          Others
                        </Button>
                        <Button
                          href="#"
                          variant="contained"
                          size="large"
                          startIcon={<StorageIcon style={{ marginRight: '8px' }} />}
                          sx={{
                            backgroundColor: 'white',
                            color: '#00227b',
                          }}
                          onClick={handleDefaultPopoverOpen}
                        >
                          Data Access
                        </Button>
                      </Box>
                    </Grid>

                    {/* Right Section */}
                    <Grid item md={6} xs={12}>
                      <Card>
                        <div
                          style={{
                            width: '100%',
                            height: '300px',
                            overflow: 'hidden',
                            borderRadius: '8px',
                          }}
                        >
                          <Slider {...settings}>
                            {advertisements.map((ad) => (
                              <div key={ad.id}>
                                <img
                                  src={ad.image}
                                  alt={ad.alt}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                  }}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      </Card>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>
            {/* Data access Popover */}
            <Popover
              open={defaultPopoverOpen}
              anchorEl={anchorEl}
              onClose={handleDefaultPopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div style={{ padding: '16px', minWidth: '200px' }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 'lighter', fontSize: '1.2rem' }}
                >
                  Enter your Data collector access code
                </Typography>
                <input placeholder="Data Code" value={dataCode} onChange={handleInputChange} />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Submit
                </Button>
                {dataMessage && (
                  <Typography variant="body2" style={{ color: 'red', marginTop: '8px' }}>
                    {dataMessage}
                  </Typography>
                )}
              </div>
            </Popover>

            {/* Additional data Popover */}
            <Popover
              open={additionalDataPopoverOpen}
              anchorEl={anchorEl}
              onClose={handleAdditionalDataPopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <div style={{ padding: '16px' }}>
                <Typography variant="h6" gutterBottom>
                  {employeeAccessData.businessName} Data Collection Point
                </Typography>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <IconButton>
                    <InventoryIcon />
                  </IconButton>
                  <Typography variant="body1">Inventory Records</Typography>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton>
                    <EventIcon />
                  </IconButton>
                  <Typography variant="body1">Attendance Records</Typography>
                </div>
              </div>
            </Popover>
            {/* Tax Calculator Popover */}
            <Popover
              open={taxCalculatorPopoverOpen}
              onClose={handleTaxCalculatorPopoverClose}
              anchorReference="none"
              anchorEl={null}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TaxCalculator
                cra={cra}
                grossIncome={grossIncome}
                healthCare={healthCare}
                loan={loan}
                benefit={benefitInKind}
                pensionFund={pensionFund}
              />
            </Popover>
          </>
        ))}
    </>
  );
};

export default EmployeePortal;
