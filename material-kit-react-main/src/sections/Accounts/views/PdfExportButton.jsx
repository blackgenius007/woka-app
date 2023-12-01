/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import moment from 'moment';

// {exportMode ? <caption>{user.businessName} Salary Schedule for {currentMonth }  </caption> : ''} 

const PdfExportButton = ({ tableRef, filename }) => {
  const { user } = useSelector((state) => state.auth);
  const currentMonth = moment().format('MMMM YYYY');
  const handleExportPDF = () => {
    const pdf = new jsPDF();
    const table = tableRef.current;
    
    // Set font size and style for the PDF
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    // Add heading to the PDF
    pdf.text(`${user.businessName} Salary Schedule for ${currentMonth } `, 20, 20); // Adjust position and text as needed

    // Add content to the PDF using autotable
    pdf.autoTable({ html: table, startY: 30 }); // Adjust startY based on heading height

    // Save the PDF
    pdf.save(filename || 'salary.pdf');
  };

  return (
    <Button
    type="button"
    onClick={handleExportPDF}
    style={{
      backgroundColor: '#E97451',
      color: '#ffffff', // Set font color to white
    }}
  >
    Export to PDF
  </Button>
  
  );
};

// Add PropTypes for tableRef and filename
PdfExportButton.propTypes = {
  tableRef: PropTypes.shape({ current: PropTypes.any }), 
  filename: PropTypes.string,
};

export default PdfExportButton;



















//  /* eslint-disable */
// import React from 'react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import Button from '@mui/material/Button';
// import PropTypes from 'prop-types';

// const PdfExportButton = ({ tableRef, filename }) => {
//   const handleExportPDF = () => {
//     const pdf = new jsPDF();
//     const table = tableRef.current;
    
//     // Set font size and style for the PDF
//     pdf.setFontSize(12);
//     pdf.setFont('helvetica', 'normal');

//     // Add content to the PDF using autotable
//     pdf.autoTable({ html: table });

//     // Save the PDF
//     pdf.save(filename || 'salary.pdf');
//   };

//   return (
//     <Button
//     type="button"
//     onClick={handleExportPDF}
//     style={{
//       backgroundColor: '#E97451',
//       color: '#ffffff', // Set font color to white
//     }}
//   >
//     Export to PDF
//   </Button>
  
//   );
// };

// // Add PropTypes for tableRef and filename
// PdfExportButton.propTypes = {
//   tableRef: PropTypes.shape({ current: PropTypes.any }), 
//   filename: PropTypes.string,
// };

// export default PdfExportButton;
