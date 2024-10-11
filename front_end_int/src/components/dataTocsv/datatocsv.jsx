// ExportToCSV.js
import React from 'react';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';



const extractValue = (row, column) => {
  if (column.renderCell) {
    return column.renderCell({ row }, true);
  } else if (column.field === "userName") {
  
    const userNameData = row["Occupied By"]; // Assuming "Occupied By" contains the userName data
    return Array.isArray(userNameData) ? userNameData.map(item => item.name).join(', ') : userNameData;
  } else if (Array.isArray(row[column.field])) {
   
    const arrayData = row[column.field];
    if (arrayData.every(item => item && typeof item === 'object')) {
    
      const names = arrayData.map(item => item.name);
      return names.length > 0 ? names.join(', ') : 'No Names';
    } else {
      const values = arrayData.map(item => item && item.toString().replace(/"/g, ''));
      return values.join(', ');
    }
  } else {
    const value = row[column.field];
    return value && typeof value === 'string' ? value.replace(/"/g, '') : value;
  }
};


const ExportToCSV = ({ data, headers, filename }) => {
  // Map CSV headers based on the provided column configuration
  if (!data) {
    return null;
  }

  const csvHeaders = headers.map(column => column.headerName);

  // Map CSV data based on the provided column configuration
  const csvData = data.map(row =>
    headers.map(column => {
      const value = column.renderCell ? column.renderCell({ row }, true) : extractValue(row, column);
      return value === undefined || value === null ? '' : value;
    })
  );

  
  // Convert to CSV string using papaparse
  const csvString = Papa.unparse({
    fields: csvHeaders,
    data: csvData,
    quotes: false, // Disable automatic quoting
  });


  const linkStyle = {
    textDecoration: 'none',
    color: '#000', // Black text color
    background: '#fff', // White background color
    padding: '8px 16px',  // Adjusted padding with quotation marks
    border: '1px solid rgb(255, 255, 255)',  // Optional: Add border for styling
    borderRadius: '4px',  // Optional: Add border-radius for rounded corners
    cursor: 'pointer',
    fontSize: '13px', // Adjust the font size as needed
    fontWeight: 16,
  };
  

  return (
    <CSVLink className='csvdatabutton' data={csvString} filename={filename} style={linkStyle}>
      Export to CSV
    </CSVLink>
  );
};

export default ExportToCSV;
