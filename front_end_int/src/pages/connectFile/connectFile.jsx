import React, { useState   } from 'react';
import axios from 'axios';
import XLSX from 'xlsx';
import './connectFile.scss';

const FileUploadComponent = ({linkData,placingOfData}) => {
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const convertExcelToJson = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const workbook = e.target.result;
        const jsonData = XLSX.read(workbook, { type: 'binary' });
        const sheetName = jsonData.SheetNames[0];
        const sheet = jsonData.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        resolve(parsedData);
      };

      reader.readAsBinaryString(file);
    });
  };
  

  
  const uploadRowToEndpoint = async (data, linkData) => {
    try {       
      console.log(linkData);
      await axios.post(linkData,data);
      
       
      console.log(`Row uploaded:`, data);
    } catch (error) {
      console.error('Error uploading row to the endpoint:', error.message);
    }
  };

  const handleUploadToDatabase = async () => {
    try {
      if (!file) {
        alert('Please select a file first.');
        return;
      }

      const jsonData = await convertExcelToJson(file);
      console.log(jsonData)
  
      console.log(linkData);
      if(placingOfData ==="particular"){
          console.log("PlacingData matched with perticular , now sending whole file to server")
          await uploadRowToEndpoint(jsonData,linkData);
      }
      else{ 
        for (const rowData of jsonData) {
          await uploadRowToEndpoint(rowData,linkData);
        }
      }

      alert('Data uploaded to MongoDB successfully!');
    } catch (error) {
      console.error('Error uploading data to MongoDB:', error.message);
      alert('Error uploading data to MongoDB. Please check the console for details.');
    }
  };
 
  return (
    <div className="connect-page">
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <div className="button-container">
        <button onClick={handleUploadToDatabase}>Upload to MongoDB</button>
      </div>
    </div>
  );
};

export default FileUploadComponent;
