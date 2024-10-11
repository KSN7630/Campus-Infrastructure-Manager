import { GoogleSpreadsheet } from 'google-spreadsheet';
import { register } from './authController';

export const importDataFromGoogleSheets = async (req,res,next)=>{
  try {
    // Access Google Sheets Data and Validate Structure
    const doc = new GoogleSpreadsheet('YOUR_SPREADSHEET_ID');
    await doc.useServiceAccountAuth({
      client_email: 'YOUR_CLIENT_EMAIL',
      private_key: 'YOUR_PRIVATE_KEY',
    });
    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = doc.sheetsByIndex[0]; // assuming data is in the first sheet
    await sheet.loadHeaderRow(); // loads the header row for validation

    // Validate Header Names
    const headerRow = sheet.headerValues;
    const requiredFields = ["userName",	"fullName",	"email"	,"password"	,"personDesc","personType"];
    const missingFields = requiredFields.filter(field => !headerRow.includes(field));

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields in the Excel sheet: ${missingFields.join(', ')}`);
    }

    // Loop Over Data and Push to MongoDB
    const rows = await sheet.getRows();
    for (const row of rows) {
      // Validate Data Fields
      const missingDataFields = requiredFields.filter(field => !(field in row));
      if (missingDataFields.length > 0) {
        console.error(`Error: Missing data fields for ${row['Student Name']}: ${missingDataFields.join(', ')}`);
        continue; // Skip this row and proceed with the next one
      }

      try {
        register(row._rawData);
        console.log(`Data for ${row['Student Name']} successfully pushed to backend.`);
      } catch (error) {
        console.error(`Error pushing data for ${row['Student Name']}:`, error.message);
      }
    }

    console.log('Data imported successfully.');
  } catch (error) {
    console.error('Error importing data:', error.message);
    throw error; // Propagate the error to the calling code
  }
}

// Call the function to start the process
importDataFromGoogleSheets();
