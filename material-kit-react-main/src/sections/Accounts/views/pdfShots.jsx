 // PdfExportButton.js
import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
    <button onClick={handleExportPDF}>
      Export to PDF
    </button>
  );
};

export default PdfExportButton;
