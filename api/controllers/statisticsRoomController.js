import Room from "../models/Room.js"
import Statistics from "../models/Statistics.js";
// Function to fetch the total number of rooms from the database
export const getTotalRoomsFromDatabase = async (req, res, next) => {
  try {
    const totalRooms = await Room.countDocuments();
    console.log(totalRooms)
    // res.json({ totalRooms });
    return totalRooms;
  } catch (error) {
    
    console.error('Error fetching total rooms from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' }); 
    return 0;
  }
}

// Function to fetch the number of occupied rooms from the database
export const getOccupiedAndLockedRoomsFromDatabase = async (req, res, next) => {
  try {
    const occupiedAndLockedRooms = await Room.countDocuments({ roomStatus: 'Occupied and Locked' });
    // res.json({ occupiedAndLockedRooms });
    return occupiedAndLockedRooms;
  } catch (error) {
    console.error('Error fetching occupied rooms from the database:', error);
    // res.status(500).json({ error: 'Internal Server Error' }); 
    return 0; // Return a default value or handle the error as needed
  }
}


// Function to fetch the number of occupied rooms from the database
export const getOccupiedAndOpenRoomsFromDatabase = async (req, res, next) => {
    try {
      const occupiedAndOpenRooms = await Room.countDocuments({ roomStatus: 'Occupied and Open' });
      // res.json({ occupiedAndOpenRooms });
      return occupiedAndOpenRooms;
    } catch (error) {
      console.error('Error fetching occupied rooms from the database:', error);
      // res.status(500).json({ error: 'Internal Server Error' }); 
      return 0; // Return a default value or handle the error as needed
    }
}


// Function to fetch the number of occupied rooms from the database
export const getVacantRoomsFromDatabase = async (req, res, next) =>  {
    try {
      const vacantRooms = await Room.countDocuments({ roomStatus: 'Vacant' });
      // res.json({ vacantRooms });
      return occupiedAndOpenRooms;
    } catch (error) {
      console.error('Error fetching occupied rooms from the database:', error);
      // res.status(500).json({ error: 'Internal Server Error' }); 
      return 0; // Return a default value or handle the error as needed
    }
}

/////////////////////////////////////////////////////////////////////////////////////////

// Function to get occupancy data within a date range
export async function getOccupancyDataInRange(startDate, endDate) {
    try {
      const occupancyData = await Statistics.find({
        date: {
          $gte: new Date(startDate), // Greater than or equal to startDate
          $lte: new Date(endDate),   // Less than or equal to endDate
        },
      });
  
      return occupancyData;
    } catch (error) {
      console.error('Error fetching occupancy data within date range:', error);
      throw error;
    }
}    


export const getTestOccupancyDataInRange = async (req, res,next) => {
  try {
    const { startDate, endDate } = req.query;
    const occupancyData = await getOccupancyDataInRange(startDate, endDate);
    res.json(occupancyData);
  } catch (error) {
    console.error('Error fetching occupancy data within date range:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    // next(err);
  }
};



//////////////////////////////////////////////////////////////////////////////
// export const occupancyUpdateData = async (req, res) =>{
//     try {
//       const { startDate, endDate } = req.query;
  
//       // Perform validation of startDate and endDate here if needed
  
//       const occupancyData = await getOccupancyDataInRange(startDate, endDate);
  
//       // Calculate counts for different occupancy types
//       const occupiedAndOpenCount = occupancyData.filter((entry) => entry.roomStatus === 'Occupied and Open').length;
//       const occupiedAndLockedCount = occupancyData.filter((entry) => entry.roomStatus === 'Occupied and Locked').length;
//       const vacantCount = occupancyData.filter((entry) => entry.roomStatus === 'Vacant').length;
  
//       res.json({
//         occupancyData,
//         occupiedAndOpenCount,
//         occupiedAndLockedCount,
//         vacantCount,
//       });
//     } catch (error) {
//       console.error('Error fetching occupancy data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }  

  
  
 