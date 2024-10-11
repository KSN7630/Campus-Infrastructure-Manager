import Building from "../models/Building.js"
import Room from "../models/Room.js"

import createError from "../utils/error.js"
import User from "../models/User.js"

export const createBuilding = async (req,res,next)=>{
    const newBuilding= new Building(req.body)
    try{
      const savedBuilding= await newBuilding.save();
      res.status(200).json(savedBuilding)
    }catch(err){
       next(err);
    }  
}


export const updateBuilding = async (req,res,next)=>{
    try{
        const updatedBuilding= await Building.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedBuilding)
    }catch(err){
       next(err);
    }  
}








//Working but with bug and not optimized
// export const deleteBuilding = async (req, res, next) => {
//   const buildingId = req.params.id;
//   try {
//     const building = await Building.findById(req.params.id);
    
//     // If building not found, return an error
//     if (!building) {
//       return next(createError(404, "Building not found"));
//     }
//     // Get the room IDs from the building
//     const roomIds = building.buildingRooms;
    
//     // Delete the rooms associated with the building
//     const deletePromises = roomIds.map((roomId) => {
//       deleteRoomForBuilding({ params: { id: roomId} }, res, next);
//     });

//      Promise.all(deletePromises)
//       .then(() => {
//         return Building.findByIdAndDelete(buildingId);
//       })
//       .then((deletedBuilding) => {
//         if (!deletedBuilding) {
//           return next(createError(400, "Failed to delete the building"));
//         }
//         res.status(200).json("Building and associated rooms deleted successfully");
//       })
//       .catch((err) => {
//         console.error(err);
//         next(err);
//       });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };


//Optimized function -- working correctly checked 2 times on data of 160 rooms and 4 occupiers
export const deleteBuilding = async (req, res, next) => {
  const buildingId = req.params.id;
  try {
    const building = await Building.findById(req.params.id);
    if (!building) {
            return next(createError(404, "Building not found"));
    }
    let userIdsInRoom=[];
    let roomIds=building.buildingRooms;
    const deletePromises = roomIds.map(async (roomId) => {
            const deletingRoom = await Room.findByIdAndDelete(roomId);
            if (!deletingRoom) {return next(createError(404,"Room not found"));}
            deletingRoom.roomCurrOccu.map((user) => userIdsInRoom.push(user));
            deletingRoom.personOnLeave.map((user) => userIdsInRoom.push(user));
            deletingRoom.roomPrevOccu.map((user) => userIdsInRoom.push(user));
    });
    await Promise.all(deletePromises);
    await User.updateMany(
      {
        $or: [
          { allotedRooms: { $in: roomIds } },
          { prevAllotedRooms: { $in: roomIds } }
        ]
      },
      {
        $pull: {
          allotedRooms: { $in: roomIds },
          prevAllotedRooms: { $in: roomIds }
        }
      },
      { multi: true }
    );
    await Building.findByIdAndDelete(buildingId)
    res.status(200).json("Building and associated rooms have been deleted");
  }catch(err){
    next(err);
  }
}


export const getBuilding = async (req,res,next)=>{
    try{
        const building= await Building.findById(req.params.id)
        if (!building) {
          return next(createError(404,"Building not found"));
        }
        res.status(200).json(building)
        //Get the room IDs from the building
        const roomIds = building.buildingRooms;
        
    }catch(err){
       next(err);
    }  
}

// export const getAllBuilding = async (req,res,next)=>{
//     try{
//         const buildingType=req.query.buildingType;
//         let buildings;
//         if(req.query.buildingType){
//            buildings= await Building.find({buildingType})
//         }
//         else{
//           buildings= await Building.find()
//         }
        
//         const buildingsCount=await Building.countDocuments();  //new added
//         res.status(200).json(
//           buildings) //new added
//     }catch(err){
//        next(err);
//     }  
// }


export const getAllBuilding = async (req, res, next) => {
  try {
    const buildingType = req.query.buildingType;
    let filter = {};

    if (buildingType) {
      filter.buildingType = buildingType;
    }

    // Find all buildings that match the filter
    const buildings = await Building.find(filter).exec();

    if (!buildings || buildings.length === 0) {
      console.log('No buildings found.');
      return res.status(200).json([]); // Return an empty array if no buildings found
    }

    // Get the building IDs
    const buildingIds = buildings.map((building) => building._id);

    // Find room counts for each building
    const roomCounts = await Room.aggregate([
      {
        $match: {
          buildingId: { $in: buildingIds },
          roomStatus: { $in: ['Occupied and Locked', 'Occupied and Open', 'Vacant'] },
        },
      },
      {
        $group: {
          _id: '$buildingId',
          vacantRooms: {
            $sum: { $cond: [{ $eq: ['$roomStatus', 'Vacant'] }, 1, 0] },
          },
          occupiedAndOpenRooms: {
            $sum: { $cond: [{ $eq: ['$roomStatus', 'Occupied and Open'] }, 1, 0] },
          },
          occupiedAndLockedRooms: {
            $sum: { $cond: [{ $eq: ['$roomStatus', 'Occupied and Locked'] }, 1, 0] },
          },
        },
      },
    ]);

    // Create a dictionary for efficient lookup of room counts
    const roomCountsDict = {};
    roomCounts.forEach((count) => {
      roomCountsDict[count._id.toString()] = count;
    });

    // Merge room counts with building data
    const buildingsWithCounts = buildings.map((building) => ({
      ...building.toJSON(),
      roomCounts: roomCountsDict[building._id.toString()] || {
        vacantRooms: 0,
        occupiedAndOpenRooms: 0,
        occupiedAndLockedRooms: 0,
      },
    }));

    res.status(200).json(buildingsWithCounts);
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getRoomInBuilding = async (req,res,next)=>{
  try{
      // const buildingType=req.query.buildingType;
      const buildingId=req.params.buildingId
   
      
      const buildingData= await Building.findById(buildingId);
      if (!buildingData) {
        return next(createError(404,"Building not found"));
      }
      const roomsInBuilding=buildingData.buildingRooms;
      // Create an array of promises to fetch room information for each roomId
      const roomInfoPromises = roomsInBuilding.map(async (roomId) => {
        const roomInfo = await Room.findById(roomId); // Assuming you have a Room model
        return roomInfo;
      });

      // Wait for all promises to resolve and get the room information
      const roomData = await Promise.all(roomInfoPromises);
      
      res.status(200).json({roomData,buildingData})
  }catch(err){
     next(err);
  }  
}






