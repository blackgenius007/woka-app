/* eslint-disable */
 import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import moment from 'moment';

const PdfExportButton = ({ tableRef, filename }) => {
  const handleExportPDF = () => {
    const pdf = new jsPDF();
    const table = tableRef.current;

    // Set font size and style for the PDF
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    // Position variables for manual content placement
    let yPosition = 20; // Adjust the starting Y position

    // Add content to the PDF manually
    pdf.text(`Salary Schedule for ${currentMonth } `, 14, yPosition);
    yPosition += 10; // Adjust Y position for the next element

    // Iterate over each row in the HTML table
    table.querySelectorAll('tr').forEach((row) => {
      // Iterate over each cell in the row
      row.querySelectorAll('td, th').forEach((cell, index) => {
        // Adjust X position based on the cell index
        const xPosition = index * 40; // Adjust this based on your layout

        // Add the cell content to the PDF
        pdf.text(cell.innerText, 14 + xPosition, yPosition);
      });

      yPosition += 10; // Adjust Y position for the next row
    });

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







// /* eslint-disable */
// import React from 'react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import Button from '@mui/material/Button';
// import PropTypes from 'prop-types';
// import moment from 'moment';

// // {exportMode ? <caption>{user.businessName} Salary Schedule for {currentMonth }  </caption> : ''} 

// const PdfExportButton = ({ tableRef, filename }) => {
//   const currentMonth = moment().format('MMMM YYYY');
//   const handleExportPDF = () => {
//     const pdf = new jsPDF();
//     const table = tableRef.current;
    
//     // Set font size and style for the PDF
//     pdf.setFontSize(12);
//     pdf.setFont('helvetica', 'normal');

//     // Add heading to the PDF
//     pdf.text(`Salary Schedule for ${currentMonth } `, 20, 20); // Adjust position and text as needed

//     // Add content to the PDF using autotable
//     pdf.autoTable({ html: table, startY: 30 }); // Adjust startY based on heading height

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

 