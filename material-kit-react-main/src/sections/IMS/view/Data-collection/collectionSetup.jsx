 /* eslint-disable */
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const CollectPointForm = ({ onCreateCollectPoint }) => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [tag, setTag] = useState('');

  const handleCreateCollectPoint = () => {
    // Call a function to generate passcode (this can be an API call to the backend)
    const passcode = generatePasscode();
    
    // Create a collect point object
    const collectPoint = {
      employeeNumber,
      tag,
      passcode,
    };

    // Pass the collect point data to the parent component
    onCreateCollectPoint(collectPoint);
  };

  const generatePasscode = () => {
    // Implement passcode generation logic (e.g., random string or algorithm)
    // This is just a placeholder; implement a secure passcode generation logic
    return '123456';
  };

  return (
    <div>
      <TextField
        label="Employee Unique Number"
        value={employeeNumber}
        onChange={(e) => setEmployeeNumber(e.target.value)}
      />
      <TextField
        label="Tag (Project/Branch/Department)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <Button variant="contained" onClick={handleCreateCollectPoint}>
        Create Collection Point
      </Button>
    </div>
  );
};

export default CollectPointForm;
