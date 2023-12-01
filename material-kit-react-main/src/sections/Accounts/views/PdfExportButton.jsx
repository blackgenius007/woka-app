 /* eslint-disable */
import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import PropTypes from 'prop-types';

const PdfExportButton = ({ tableRef, filename }) => {
  const handleExportPDF = () => {
    const pdf = new jsPDF();
    const table = tableRef.current;
    
    // Set font size and style for the PDF
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    // Add content to the PDF using autotable
    pdf.autoTable({ html: table });

    // Save the PDF
    pdf.save(filename || 'table-export.pdf');
  };

  return (
    <button
    type="button"
    onClick={handleExportPDF}
    style={{
      color: '#ffffff',
      backgroundColor: '#E97451',
      border: 'none',
      cursor: 'pointer',
      padding: '8px', // Adjust the padding as needed
      fontSize: '12px', // Adjust the font size as needed
    }}
  >
    Export to PDF
  </button>
  
  );
};

// Add PropTypes for tableRef and filename
PdfExportButton.propTypes = {
  tableRef: PropTypes.shape({ current: PropTypes.any }), 
  filename: PropTypes.string,
};

export default PdfExportButton;
