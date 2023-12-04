 /* eslint-disable */
import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Iconify from '@iconify/react';
import Button from '@mui/material/Button';

const ExportToExcelButton = ({ tableRef }) => {
  const handleExportToExcel = () => {
    const table = tableRef.current;

    // Create a worksheet
    const ws = XLSX.utils.table_to_sheet(table);

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Convert the workbook to a data URL
    const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'blob' });

    // Save the data URL as a file
    saveAs(blob, 'exported_data.xlsx');
  };

  return (
    <Button onClick={handleExportToExcel}>
      <Iconify icon="vscode-icons:file-type-excel2" width="45" height="45" />
    </Button>
  );
};

export default ExportToExcelButton;
