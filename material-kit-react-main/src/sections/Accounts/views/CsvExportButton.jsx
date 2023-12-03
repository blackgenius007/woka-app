import React from 'react';
import { CSVLink } from 'react-csv';
import Button from '@mui/material/Button';

const CsvExportButton = ({ data, filename }) => {
  return (
    <CSVLink data={data} filename={filename}>
      <Button>
        Export to CSV
      </Button>
    </CSVLink>
  );
};

export default CsvExportButton;
