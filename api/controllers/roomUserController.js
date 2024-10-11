import Room from "../models/Room.js"
import Building from "../models/Building.js";

import {createError} from "../utils/error.js";
import User from "../models/User.js";


//Not optimized -- may have bug while increasing counts
// export const addUserToRoom = async (req, res, next) => {
//     const roomId = req.params.id;
//     const userId = req.params.userId;
//     console.log("RoomId from addUserToRoom",roomId);
//     console.log("userId from addUserToRoom",userId);
     
//     try {
//       const existingRoom = await Room.findById(roomId);
//       console.log("Existing room data",existingRoom);
//       let oldStatus=existingRoom.roomStatus;
//       const updatedRoom = await Room.findByIdAndUpdate(
//         roomId,
//         { $addToSet: { roomCurrOccu: userId },
//          roomStatus: "Occupied and Locked"
//       },
//         { new: true }
//       );
  
//       if (!updatedRoom) {
//         return next(createError(404,"Room not found"));
//       }
  
//       const user = await User.findById(userId);
  
//       if (!user) {
//         return next(createError(404,"User not found"));
//       }
   
//       if (!user.allotedRooms.includes(roomId)) {
//         user.allotedRooms.push(roomId);
//         await user.save();
//       }


//       //Updating counts in building schema
//       //New status is always "Occupied and Locked"
//       const buildingId=updatedRoom.buildingId;
//       const building = await Building.findById(buildingId);
//       if (oldStatus === 'Occupied and Locked') {
//          console.log("");  //Nothing to do as status remained same
//       } else if (oldStatus === 'Occupied and Open') {
//         building.occupiedRoomsOpen -= 1;
//         building.occupiedRoomsLocked += 1;
//       } else if (oldStatus === 'Vacant') {
//         building.vacantRooms -= 1;
//         building.occupiedRoomsLocked += 1;
//       }
//       await building.save();

  
//       res.status(200).json(updatedRoom);
//     } catch (err) {
//       next(err);
//     }
//   };
  
// optimized function-working correctly
export const addUserToRoom = async (req, res, next) => {
  const roomId = req.params.id;
  const userId = req.params.userId;
  console.log("RoomId from addUserToRoom",roomId);
  console.log("userId from addUserToRoom",userId);
   
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: { allotedRooms: roomId },
      },
      { new: true }
    );
    if (!updatedUser) {
      return next(createError(404, "User not found"));
    }


    const notUpdatedRoom = await Room.findOneAndUpdate(
      { _id: roomId },
      {
        $addToSet: { roomCurrOccu: userId },
        $set: { roomStatus: "Occupied and Locked" },
        $pull: { personOnLeave: userId }
      }   //Returns old room status /room data
    );
    if (!notUpdatedRoom) {
      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { allotedRooms: roomId } }
      );
      return next(createError(404, "Room not found"));
    }
    

    const buildingId = notUpdatedRoom.buildingId;
    const building = await Building.findOneAndUpdate(
      { _id: buildingId },
      {
        $inc: {
          occupiedRoomsLocked: 1,
          ...(notUpdatedRoom.roomStatus === 'Occupied and Open' && { occupiedRoomsOpen: -1 }),
          ...(notUpdatedRoom.roomStatus === 'Vacant' && { vacantRooms: -1 }),
        }
      },
      { new: true }
    );
    if (!building) {
      // Revert the changes made to the roomCurrOccu array
      await Room.findOneAndUpdate(
        { _id: roomId },
        { $pull: { roomCurrOccu: userId } }
      );

      // Remove the added userId from the User
      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { allotedRooms: roomId } }
      );
      
      return next(createError(404, "Building not found"));
    }

  } catch (err) {
    next(err);
  }
  res.status(200).json("User has been added to room");
};
    

// optimized function-- working correctly
export const removeUserFromRoom = async (req, res, next) => {
  const roomId = req.params.id;
  const userId = req.params.userId;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        $pull: { roomCurrOccu: userId },
        $push: {
          roomPrevOccu: {
            $each: [userId],
            $slice: -10
          }
        }
      },
      { new: true }
    );

    if (!updatedRoom) {
       return next(createError(404,"Room not found"));
    }

    // Remove room ID from user's allotedRooms array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { allotedRooms: roomId },
        $push: {
          prevAllotedRooms: {
            $each: [roomId],
            $slice: -10
          }
        },
    
      },
      { new: true }
    );

    if (!updatedUser) {
      await Room.findByIdAndUpdate(
        roomId,
        {
          $addToSet: { roomCurrOccu: userId },
          $pull: {
            roomPrevOccu: userId
          }
        },
        { new: true }
      );
      return next(createError(404,"User not found"));
    }

    const oldStatus = updatedRoom.roomStatus;
    const newStatus =
      updatedRoom.roomCurrOccu.length > 0
        ? "Occupied and Locked"
        : updatedRoom.personOnLeave.length > 0
        ? "Occupied and Open"
        : "Vacant";

    if (oldStatus !== newStatus) {
      // Update room status only if there is a change
      updatedRoom.roomStatus = newStatus;
      await updatedRoom.save();
  
      const changes = {
        "Occupied and Locked": { decrement: 0, increment: 0 },
        "Occupied and Open": { decrement: 0, increment: 0 },
        "Vacant": { decrement: 0, increment: 0 }
      };
      
      changes[oldStatus].decrement = 1;
      changes[newStatus].increment = 1;

      await Building.findOneAndUpdate(
        { _id: updatedRoom.buildingId },
        {
          $inc: {
            occupiedRoomsLocked: changes["Occupied and Locked"].increment - changes["Occupied and Locked"].decrement,
            occupiedRoomsOpen: changes["Occupied and Open"].increment - changes["Occupied and Open"].decrement,
            vacantRooms: changes["Vacant"].increment - changes["Vacant"].decrement
          }
        },
        { new: true });

      // Update room status
      updatedRoom.roomStatus = newStatus;
      await updatedRoom.save();
    }

    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// optimized function--I think cheked it
export const addRoomToUser = async (req, res, next) => {
  const userId = req.params.id;
  const roomId = req.params.roomId;

  try {

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { allotedRooms: roomId }
      },
      { new: true }
    );
    
    if (!user) {
      return next(createError(404,"User not found"));
    } 


    const notUpdatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $addToSet: { roomCurrOccu: userId } ,
        roomStatus: "Occupied and Locked"
    },
    );
    if (!notUpdatedRoom) {
      return next(createError(404,"Room not found"));
    }
    let oldStatus=notUpdatedRoom.roomStatus;
    let newStatus="Occupied and Locked";
    const buildingId=notUpdatedRoom.buildingId;
    const changes = {
      "Occupied and Locked": { decrement: 0, increment: 1 },
      "Occupied and Open": { decrement: 0, increment: 0 },
      "Vacant": { decrement: 0, increment: 0 }
    };
    changes[oldStatus].decrement = 1;
    // changes[newStatus].increment = 1;

    await Building.findByIdAndUpdate(
      buildingId,
      {
        $inc: {
          occupiedRoomsLocked: changes["Occupied and Locked"].increment - changes["Occupied and Locked"].decrement,
          occupiedRoomsOpen: changes["Occupied and Open"].increment - changes["Occupied and Open"].decrement,
          vacantRooms: changes["Vacant"].increment - changes["Vacant"].decrement
        }
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};



//Optimized and working fine --checked properly
export const removeRoomFromUser = async (req, res, next) => {
  const userId = req.params.id;
  const roomId = req.params.roomId;
  

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        $pull: { roomCurrOccu: userId },
        $push: {
          roomPrevOccu: {
            $each: [userId],
            $slice: -10
          }
        }
      },
      { new: true }
    );

    if (!updatedRoom) {
       return next(createError(404,"Room not found"));
    }

    // Remove room ID from user's allotedRooms array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { allotedRooms: roomId },
        $push: {
          prevAllotedRooms: {
            $each: [roomId],
            $slice: -10
          }
        },
    
      },
      { new: true }
    );

    if (!updatedUser) {
      await Room.findByIdAndUpdate(
        roomId,
        {
          $addToSet: { roomCurrOccu: userId },
          $pull: {
            roomPrevOccu: userId
          }
        },
        { new: true }
      );
      return next(createError(404,"User not found"));
    }

    const oldStatus = updatedRoom.roomStatus;
    const newStatus =
      updatedRoom.roomCurrOccu.length > 0
        ? "Occupied and Locked"
        : updatedRoom.personOnLeave.length > 0
        ? "Occupied and Open"
        : "Vacant";

    if (oldStatus !== newStatus) {
      // Update room status only if there is a change
      updatedRoom.roomStatus = newStatus;
      await updatedRoom.save();
  
      const changes = {
        "Occupied and Locked": { decrement: 0, increment: 0 },
        "Occupied and Open": { decrement: 0, increment: 0 },
        "Vacant": { decrement: 0, increment: 0 }
      };
      
      changes[oldStatus].decrement = 1;
      changes[newStatus].increment = 1;

      await Building.findOneAndUpdate(
        { _id: updatedRoom.buildingId },
        {
          $inc: {
            occupiedRoomsLocked: changes["Occupied and Locked"].increment - changes["Occupied and Locked"].decrement,
            occupiedRoomsOpen: changes["Occupied and Open"].increment - changes["Occupied and Open"].decrement,
            vacantRooms: changes["Vacant"].increment - changes["Vacant"].decrement
          }
        },
        { new: true });

      // Update room status
      updatedRoom.roomStatus = newStatus;
      await updatedRoom.save();
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
  


  /******************************************************************************************************************************* */
  /*                        User Room status                                                                                       */           
  /******************************************************************************************************************************* */


  
//REcent before adding counts
  // export const roomStatusUser = async (req, res, next) => {
  //   const roomId = req.params.roomId;
  //   const userId = req.params.userId;
  //   const roomStatus = req.body.roomStatus;
  
  //   try {
  //     // Find the user
  //     const user = await User.findById(userId);
  //     if (!user) {
  //       return next(createError(404,"User not found"));
  //     }
  
  //     let updatedRoom;
      
  //     try {
  //       if (roomStatus === 'Occupied and Open') {
  //         updatedRoom = await Room.findByIdAndUpdate(
  //           roomId,
  //           {
  //             $pull: { roomCurrOccu: userId },
  //             $addToSet: { personOnLeave: userId },
  //           },
  //           { new: true }
  //         );
  //         user.leavingDate=new Date();
  //       } else if (roomStatus === 'Occupied and Locked') {
  //         updatedRoom = await Room.findByIdAndUpdate(
  //           roomId,
  //           {
  //             $addToSet: { roomCurrOccu: userId },
  //             $pull: { personOnLeave: userId },
  //           },
  //           { new: true }
  //         );
  //         user.leavingDate=null;
  //       } else if (roomStatus === 'Vacant') {
  //         updatedRoom = await Room.findByIdAndUpdate(
  //           roomId,
  //           {
  //             $pull: {
  //               roomCurrOccu: userId,
  //               personOnLeave: userId
  //             },
  //             $push:{
  //               roomPrevOccu:userId
  //             }
  //           },
  //           { new: true }
  //         );
  
  //         user.allotedRooms.pull(roomId);
  //         user.prevAllotedRooms.push(roomId);
          
  //       }
  //       await user.save();
  
  //       let updatedRoomStatus = '';
  //       if (updatedRoom.roomCurrOccu.length > 0) {
  //         updatedRoomStatus = 'Occupied and Locked';
  //       } else if (
  //         updatedRoom.personOnLeave.length > 0 &&
  //         updatedRoom.roomCurrOccu.length === 0
  //       ) {
  //         updatedRoomStatus = 'Occupied and Open';
  //       } else if (
  //         updatedRoom.roomCurrOccu.length === 0 &&
  //         updatedRoom.personOnLeave.length === 0
  //       ) {
  //         updatedRoomStatus = 'Vacant';
  //       }
        
  //       if (updatedRoomStatus) {
  //         updatedRoom.roomStatus = updatedRoomStatus;
  //         await updatedRoom.save();
  //       }
  //     } catch (roomErr) {
  //       // Handle individual room update error
  //       console.error(`Error updating room ${roomId}: ${roomErr.message}`);
  //       next(roomErr);
  //     }
  
  //     // Send the updated user as the response
  //     res.json(user);
  //   } catch (userErr) {
  //     // Handle any errors
  //     console.error(`Error updating room status for user ${userId}: ${userErr.message}`);
  //     next(userErr);
  //   }
  // };
  

 //hold 
 export const roomStatusUser = async (req, res, next) => {
    const roomId = req.params.roomId;
    const userId = req.params.userId;
    const roomStatus = req.body.roomStatus;
  
    try {
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        return next(createError(404, "User not found"));
      }
  
      let updatedRoom;
  
      try {
        // Fetch the existing room status
        const existingRoom = await Room.findById(roomId);
        console.log("Existing Room Data",existingRoom)
        const oldRoomStatus = existingRoom.roomStatus;
        console.log("Old room status",oldRoomStatus);
  
        if (roomStatus === 'Occupied and Open') {
          updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            {
              $pull: { roomCurrOccu: userId },
              $addToSet: { personOnLeave: userId },
            },
            { new: true }
          );
          user.leavingDate = new Date();
        } else if (roomStatus === 'Occupied and Locked') {
          updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            {
              $addToSet: { roomCurrOccu: userId },
              $pull: { personOnLeave: userId },
            },
            { new: true }
          );
          user.leavingDate = null;
        } else if (roomStatus === 'Vacant') {
          updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            {
              $pull: {
                roomCurrOccu: userId,
                personOnLeave: userId,
              },
              $push: {
                roomPrevOccu: userId,
              },
            },
            { new: true }
          );
  
          user.allotedRooms.pull(roomId);
          user.prevAllotedRooms.push(roomId);
        }
        await user.save();
  
        let updatedRoomStatus = '';
        if (updatedRoom.roomCurrOccu.length > 0) {
          updatedRoomStatus = 'Occupied and Locked';
        } else if (
          updatedRoom.personOnLeave.length > 0 &&
          updatedRoom.roomCurrOccu.length === 0
        ) {
          updatedRoomStatus = 'Occupied and Open';
        } else if (
          updatedRoom.roomCurrOccu.length === 0 &&
          updatedRoom.personOnLeave.length === 0
        ) {
          updatedRoomStatus = 'Vacant';
        }
        
        var updatedRoomData={};
        if (updatedRoomStatus) {
          updatedRoom.roomStatus = updatedRoomStatus;
          updatedRoomData=await updatedRoom.save();
  
          // Get buildingId from the updated room
          const buildingId = updatedRoom.buildingId;
  
          // Update building count based on room status
          const building = await Building.findById(buildingId);
  
          // Decrement count for the old room status
          if (oldRoomStatus === 'Occupied and Locked') {
            building.occupiedRoomsLocked -= 1;
          } else if (oldRoomStatus === 'Occupied and Open') {
            building.occupiedRoomsOpen -= 1;
          } else if (oldRoomStatus === 'Vacant') {
            building.vacantRooms -= 1;
          }
  
          // Increment count for the new room status
          if (updatedRoomStatus === 'Occupied and Locked') {
            building.occupiedRoomsLocked += 1;
          } else if (updatedRoomStatus === 'Occupied and Open') {
            building.occupiedRoomsOpen += 1;
          } else if (updatedRoomStatus === 'Vacant') {
            building.vacantRooms += 1;
          }
  
          await building.save();
        }
      } catch (roomErr) {
        // Handle individual room update error
        console.error(`Error updating room ${roomId}: ${roomErr.message}`);
        next(roomErr);
      }
  
      // res.json({user,updatedRoomData});
      res.json({success:true});   //updated on 16-02-2024
    } catch (userErr) {
      next(userErr);
    }
  };

  
  
