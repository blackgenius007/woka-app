/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import employeeServices from 'src/Services/HR-Services/employeeServices';
import { useNavigate } from 'react-router-dom';

const EmployeeUpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    employeeNumber: '',
    bankName: '',
    accountDetail: '',
    allowance: '',
    overtime: '',
    address: '',
    nextName: '',
    nextAddress: '',
    nextNumber: '',
    nextRelationship: '',
  });

  const handleBackButtonClick = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await employeeServices.retrieveEmployee(id);
        console.log('response from front:', response);
        setEmployee(response);
  
        // This is where state is being updated
        setFormData({
          employeeName: response.employeeName,
          department: response.department,
          employeeNumber: response.employeeNumber,
          origin: response.origin,
          address: response.address,
          bankName: response.bankName,
          overtime: response.overtime,
          allowance: response.allowance,
          nextName: response.nextName,
          nextAddress: response.nextAddress,
          nextNumber: response.nextNumber,
          nextRelationship: response.nextRelationship,
          accountDetail: response.accountDetail,
        });
      } catch (error) {
        console.error('Error retrieving employee:', error);
      }
    };
  
    fetchEmployee();
  }, [id]);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call your update API endpoint with the updated form data
      await employeeServices.updateEmployee(id, formData);

      // Handle successful update
      console.log('Employee updated successfully!');
    } catch (error) {
      // Handle error
      console.error('Error updating employee:', error);
    }
  };

  return (
    <>
    
    

    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Update - {formData.employeeName}
      </Typography>

      {employee ? (
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="employeeName"
            value={formData.employeeName}
            onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Department"
            name="department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contact"
            name="employeeNumber"
            value={formData.employeeNumber}
            onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Bank Name"
            name="bankName"
            value={formData.bankName}
            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Allowance"
            name="allowance"
            value={formData.allowance}
            onChange={(e) => setFormData({ ...formData, allowance: e.target.value })}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Overtime"
            name="overtime"
            value={formData.overtime}
            onChange={(e) => setFormData({ ...formData, overtime: e.target.value })}
            margin="normal"
          />
          {/* Next of Kin Section */}
          <Typography variant="h6" gutterBottom>
            Next of Kin
          </Typography>
          <TextField
            fullWidth
            label="Next of Kin"
            name="nextName"
            value={formData.nextName}
            onChange={(e) => setFormData({ ...formData, nextName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address "
            name="nextAddress"
            value={formData.nextAddress}
            onChange={(e) => setFormData({ ...formData, nextAddress: e.target.value })}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Contact"
            name="nextNumber"
            value={formData.nextNumber}
            onChange={(e) => setFormData({ ...formData, nextNumber: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Relationship"
            name="nextRelationship"
            value={formData.nextRelationship}
            onChange={(e) => setFormData({ ...formData, nextRelationship: e.target.value })}
            margin="normal"
          />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBackButtonClick}
            sx={{ mt: 2, ml: 2 }}
          >
            Back
          </Button>
        </form>
      ) : (
        <Typography>Loading employee data...</Typography>
      )}
    </Box>
    
    </>
    
  );
};

export default EmployeeUpdateForm;
