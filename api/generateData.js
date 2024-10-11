import mongoose from 'mongoose';
import Statistics from './models/Statistics.js';

const atlasURL = 'mongodb+srv://oiaa0392:oiaa0392@officeofinfraproject.ce9mhya.mongodb.net/OfficeOfInfraProject_Kartik?retryWrites=true&w=majority';

// MongoDB Atlas connection URL
// const atlasURL = 'mongodb+srv://oiaa0392:oiaa0392@officeofinfraproject.ce9mhya.mongodb.net/OfficeOfInfraProject_Kartik?retryWrites=true&w=majority'; // Replace with your Atlas URL, username, password, and database name


function generateRandomData(date) {
  const totalRooms = 500;
  const occupiedAndLockedRooms = Math.floor(Math.random() * totalRooms);
  const occupiedAndOpenRooms = Math.floor(Math.random() * (totalRooms - occupiedAndLockedRooms));
  const vacantRooms = totalRooms - occupiedAndLockedRooms - occupiedAndOpenRooms;

  return {
    date,
    totalRooms,
    occupiedAndLockedRooms,
    occupiedAndOpenRooms,
    vacantRooms,
  };
}

async function generateAndInsertDummyData() {
  try {
    await mongoose.connect(atlasURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas');

    const startDate = new Date('2023-09-15');
    const endDate = new Date('2023-09-24');

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dataForDay = generateRandomData(currentDate);

      // Check if a document with the same date already exists
      const existingData = await Statistics.findOne({ date: dataForDay.date });

      if (existingData) {
        // Update the existing document
        await Statistics.updateOne({ _id: existingData._id }, dataForDay);
        console.log(`Updated data for date: ${dataForDay.date}`);
      } else {
        // Insert a new document
        await Statistics.create(dataForDay);
        console.log(`Inserted data for date: ${dataForDay.date}`);
      }

      // Increment the current date by one day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log('Data insertion completed.');

  } catch (error) {
    console.error('Error generating and inserting dummy data:', error);
  } finally {
    mongoose.disconnect();
  }
}

generateAndInsertDummyData();
