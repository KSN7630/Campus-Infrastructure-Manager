import Room from "../models/Room.js"
import Building from "../models/Building.js";

import {createError} from "../utils/error.js";
import User from "../models/User.js";


export const createRoom  = async (req, res, next) =>{
    const buildingId = req.params.buildingId;
    console.log("Buildingid from createroom",buildingId)  
    try {
        const building= await Building.findById(buildingId);
        if(!building){
          return next(createError(404,"building not found"));
        }

        const newRoom = new Room({
          ...req.body,
          roomCode:req.body.roomNumber+"-"+req.body.roomDiv+"-"+building.buildingName,
          buildingId: buildingId, // Add buildingId to the room
          buildingName: building.buildingName, // Add buildingName to the room
          buildingType:building.buildingType
        });
        const savedRoom = await newRoom.save();
        console.log("SavedRoom from createroom",savedRoom);
        try{
            await Building.findByIdAndUpdate(buildingId ,
               {$push : {buildingRooms : savedRoom._id },
               $inc: { vacantRooms: 1 }, // Increment vacantRooms count
            });
        } catch (err){
            next(err);
        }
        // res.status(200).json(savedRoom)
        res.status(200).json({
          success: true,
          savedRoom,
        });
    }catch (err){
        next(err);
    }
};

// export const createRoomEnd  = async (buildingId,updatedObj) =>{
  
//   console.log("Buildingid from createRoomEnd",buildingId)
//   try {
//       const building= await Building.findById(buildingId);
//       if(!building){
//         return next(createError(404,"building not found"));
//       }
//       console.log("UpdatedObj from createRoomEnd",updatedObj)
//       console.log(typeof(updatedObj.roomNumber))
//       var d=updatedObj.roomNumber+"-"+updatedObj.roomDiv+"-"+building.buildingName;
//       console.log(d);
//       const newRoom = new Room({
//         roomCode:updatedObj.roomNumber+"-"+updatedObj.roomDiv+"-"+building.buildingName,
//         buildingId: buildingId, // Add buildingId to the room
//         buildingName: building.buildingName, // Addsssss buildingName to the room
//         updatedObj  
//       });
//       const savedRoom = await newRoom.save();
//       console.log("SavedRoom from createroom",savedRoom);
      
//       await Building.findByIdAndUpdate(buildingId ,
//           {$push : {buildingRooms : savedRoom._id },
//           $inc: { vacantRooms: 1 }, // Increment vacantRooms count
//       });
//       // } catch (err){
//       //     console.log(err)
//       // }
//       return savedRoom;
//   }catch (err){
//      console.log(err)
//   }
// };




//initial without room allocation logic
// export const updateRoom =async (req, res , next)=>{
//     try{
//         const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set:req.body}, {new : true})
//         res.status(200).json(updatedRoom)
//       }catch(err){
//       next(err)
//     }
// }

// room Curr Occu --> username hoga user ka
             //id se karenge

export const updateRoom = async (req, res, next) => {
    try {
      const { roomCurrOccu, ...others } = req.body;
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      
      if (req.body.roomCurrOccu) {
        const user = await User.findOne({ userName: req.body.roomCurrOccu });
        
        if (user) {
          const Roomallocation = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: { roomCurrOccu: user._id } },
            { new: true }
          );
         
          await User.findByIdAndUpdate(user._id , {$push : {allotedRooms : Roomallocation._id },});
          res.status(200).json(Roomallocation);
        } else {
          // User not found with the given username
          res.status(404).json({ error: 'User not found.' });
        }
      } else {
        res.status(200).json(updatedRoom);
      }
    } catch (err) {
      next(err);
    }
  };
  
//Not optimized 
// export const deleteRoom = async (req, res, next) => {
//       const buildingId = req.params.buildingId;
//       try {
//         const updatingBuilding = await Building.findById(buildingId);
//         if (!updatingBuilding) {
//           // Building not found with the given ID
//           return next(createError(404,"Building not found"));
//         }
//         updatingBuilding.buildingRooms.pull(req.params.id);
        

//         const deletingRoom = await Room.findByIdAndDelete(req.params.id);
    
//         if (!deletingRoom) {
//           // Room not found with the given ID
//           return next(createError(404,"Room not found"));
//         }
        
//         // Decrement the count based on the room status
//         if (deletingRoom.roomStatus === 'Vacant') {
//           updatingBuilding.vacantRooms -= 1;
//         } else if (deletingRoom.roomStatus === 'Occupied and Locked') {
//           updatingBuilding.occupiedRoomsLocked -= 1;
//         } else if (deletingRoom.roomStatus === 'Occupied and Open') {
//           updatingBuilding.occupiedRoomsOpen -= 1;
//         }
//         updatingBuilding.save();


//         // Find all users and update their room arrays
//         const users = await User.find();
//         const updatePromises = users.map(async (user) => {
//           user.allotedRooms.pull(req.params.id);
//           user.prevAllotedRooms.pull(req.params.id);
//           await user.save();
//         });
        
//         await Promise.all(updatePromises);
          
//         res.status(200).json("Room has been deleted");
    
//       } catch (err) {
//         next(err);
//       }
//     }


//Optimized function -- working properly without bug--tested on 2 buildings with 2 rooms
export const deleteRoom = async (req, res, next) => {
  const buildingId = req.params.buildingId;
  const roomId=req.params.id;
  try{
    const deletingRoom = await Room.findByIdAndDelete(roomId);
    // Room not found with the given ID
    console.log(deletingRoom);
    if (!deletingRoom) { return next(createError(404, "Room not found")); }

    let userIdsInRoom=[];
    deletingRoom.roomCurrOccu.map((user) => userIdsInRoom.push(user));
    deletingRoom.personOnLeave.map((user) => userIdsInRoom.push(user));
    deletingRoom.roomPrevOccu.map((user) => userIdsInRoom.push(user));

    await User.updateMany(
      {
        $or: [
          { allotedRooms: roomId },
          { prevAllotedRooms: roomId }
        ]
      },
      {
        $pull: {
          allotedRooms: roomId,
          prevAllotedRooms: roomId
        }
      },
      { multi: true }
    );

    const updatedBuilding = await Building.findOneAndUpdate(
      { _id: buildingId },
      {
        $pull: { buildingRooms: roomId },
        $inc: {
          vacantRooms: deletingRoom.roomStatus === 'Vacant' ? -1 : 0,
          occupiedRoomsLocked: deletingRoom.roomStatus === 'Occupied and Locked' ? -1 : 0,
          occupiedRoomsOpen: deletingRoom.roomStatus === 'Occupied and Open' ? -1 : 0
        }
      },
      { new: true } // Return the updated document
    );

    // Building not found with the given ID
    if (!updatedBuilding) { return next(createError(404, "Building not found")); }
    res.status(200).json("Room has been deleted");

  }catch(err){
    console.log(err)
    next(err);
  }
}

//Used for deleting building previously -- but no use now
// export const deleteRoomForBuilding = async (req, res, next) => {
//     try {
//       const deletingRoom = await Room.findByIdAndDelete(req.params.id);
  
//       if (!deletingRoom) {return next(createError(404,"Room not found"));}

      
//         // Find all users and update their room arrays
//       const users = await User.find();
//       const updatePromises = users.map(async (user) => {
//         user.allotedRooms.pull(req.params.id);
//         user.prevAllotedRooms.pull(req.params.id);
//         await user.save();
//       });
      
//       await Promise.all(updatePromises);
        
//       res.status(200).json("Room has been deleted");
  
//     } catch (err) {
//       next(err);
//     }
// }    



  


export const getRoom =async (req, res , next)=>{
    try{
        const room = await Room.findById(req.params.id)
        if(!room){
          return next(createError(404,"room not found"));
        }
        res.status(200).json(room)    // if successful , return building room
      }catch(err){
      next(err)
    }
}
export const getRoomsCount =async (req, res , next)=>{
  try{
      const roomsCount = await Room.countDocuments();
      res.status(200).json(roomsCount)    // if successful , return
    }catch(err){
    next(err)
  }
}
export const getRooms =async (req, res , next)=>{
    try{
        const rooms = await Room.find()
        res.status(200).json(rooms)    // if successful , return building rooms all
      }catch(err){
      next(err)
    }
}



export const filterRooms = async (req, res, next) => {
  try {
    // Extract filter parameters from the request query
    const { RNo, RDiv ,Rtitle,Bname,Rcode,Rstatus,Rkeyword} = req.query;

    // Construct the filter object based on the provided parameters
    const filter = {};

    if (RNo) {
      filter.roomNumber = RNo;
    }

    if (RDiv) {
      filter.roomDiv = RDiv;
    }

    if (Bname) {
      filter.buildingName = Bname;
    }

    if (Rtitle) {
      filter.roomTitle = new RegExp(Rtitle, 'i');
    }

    if (Rcode) {
      filter.roomCode = Rcode;
    }
    if(Rstatus){
      filter.roomStatus=Rstatus;
    }
    if(Rkeyword){
      console.log("")
    }

    // Use the filter object to query the database
    const rooms = await Room.find(filter);

    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error filtering rooms:', error);
    next(error);
  }
};


// export const roomuserdataEnd=async(req,res,next)=>{
//   try{
//     const obj=req.body;
//     const updated={};
//     obj.map((item)=>{
//         if(item!=type){
//           updated.set(item.value)
//         }
//     })

//     const buildingId = req.params.buildingId;

//     const room = await createRoom(buildingId,obj);


//     if(!room){
//       return next(createError(404,"room not found"));
//     }
//     res.status(200).json(room)    // if successful , return building room
//   }catch(err){
//   next(err)
// }

// }



// export const roomuserdataEnd = async (req, res, next) => {
//   try {
//     const obj = req.body;
//     const buildingId = req.params.buildingId;
//     console.log("Bld Id",buildingId )
//     console.log(req);
//     const updatedobj = {};
//     console.log("OBJ is ",obj);

//     for (const item of obj) {
//       if (item.key !== 'roomCurrOccu') {
//         updatedobj[item.key] = item.value;
//       }
//     }

//     // Assuming 'roomCurrOcc' is a key in obj
//     const roomCurrOcc = obj.find(item => item.key === 'roomCurrOccu') || { usernames: [] };
   

//     // Assuming roomCurrOcc is an array of usernames
//     const usernames = roomCurrOcc ? roomCurrOcc.usernames : [];

//     // Find corresponding MongoDB IDs for usernames
//     const userIds = await User.find({ userName: { $in: usernames } }).distinct('_id');

//     // Replace usernames with MongoDB IDs in the updatedobj
//     // updatedobj.roomCurrOcc = { value: 'roomCurrOcc', usernames: userIds };
//     const userIdArray=userIds;
    
//     const room = await createRoom(buildingId, updatedobj);

//     if (!room) {
//       return next(createError(404, "Room not found"));
//     }
//     await Promise.all(userIdArray.map(async (id, index) => {
//       const allot = await addUserToRoom({ id: room.id, userId: id });
//     }));
    

//     res.status(200).json(room); // if successful, return building room
//   } catch (err) {
//     console.error('Error in roomuserdataEnd:', err);
//     next(err);
//   }
// };

// export const roomuserdataEnd = async (req, res, next) => {
//   try {
//     console.log("Started from roomuserdataEnd");
//     const obj = req.body;
//     const buildingId = req.params.buildingId;

//     console.log("Building Id", buildingId);
//     console.log("OBJ is ", obj);

//     const updatedobj = {};

//     for (const item of obj) {
//       if (item.key !== 'roomCurrOccu') {
//         updatedobj[item.key] = item.value;
//       }
//     }

//     // Assuming 'roomCurrOccu' is a key in obj
//     const roomCurrOcc = obj.find(item => item.key === 'roomCurrOccu');
//     const usernames = roomCurrOcc ? JSON.parse(roomCurrOcc.value) : [];

//     // Replace usernames with MongoDB IDs in the updatedobj
//     updatedobj.roomCurrOccu = usernames;

//     const room = await createRoom(buildingId, updatedobj);

//     if (!room) {
//       return next(createError(404, "Room not found"));
//     }

//     await Promise.all(usernames.map(async id => {
//       const allot = await addUserToRoom({ id: room.id, userId: id });
//     }));

//     res.status(200).json(room); // if successful, return building room
//   } catch (err) {
//     console.error('Error in roomuserdataEnd:', err);
//     next(err);
//   }
// };


//Not optimized and have some errors
// export const roomuserdataEnd = async (req, res, next) => {
//   try {
//     const obj = req.body;
//     const buildingId = req.params.buildingId;


//     console.log("Building Id", buildingId);
//     console.log("OBJ is ", obj);


//     const inputsting=obj.roomCurrOccu;
//     console.log(inputsting)
//     const updatedobj = {};

//     for (const item of Object.entries(obj)) {
//       const [key, value] = item;
//       console.log("Key ",key );
//       console.log("Value ",value);
      
//       if (key === 'roomNumber') {
//         console.log("RoomNumber is ", value);
//         updatedobj[key] = parseInt(value,10);
//       }
//       if (key !== 'roomCurrOccu' && key!=='roomNumber') {
//         updatedobj[key] = value;
//       }
      
//     }
//     console.log("Updated Object",updatedobj);
//     const jsonString = inputsting.replace(/'/g, '"').replace(/([a-zA-Z0-9_]+)/g, '"$1"');
//     const stringArray = JSON.parse(jsonString);
//     console.log(stringArray);

//     var localReq = {
//       params: {
//         buildingId: buildingId,
//       },
//       body: updatedobj,
//     };
  
//     var localRes = {
//       status: function (statusCode) {
//         return this;
//       },
//       json:async function (data) {
//         console.log(stringArray)
//         const users = await User.find({ userName: { $in: stringArray } });
//         const userIds = users.map(user => user._id);
//         // const userIds = await User.find({ userName: { $in: stringArray } }).select("_id");
//         // console.log(userIds);
//         await Promise.all(userIds.map(async id => {
//           var reqlocal = {
//             params: {
//               id: data.savedRoom._id,
//               userId: id
//             }
//           };
//           var reslocal = {
//             status: function (statusCode) {
//               return this;
//             },
//             json: function (data) {
//               res.status(200).json({success:true});
//               return data;
//             },
            
//           };
//           var next = (err) => {
//             if (err) {
//               console.error('Error in createRoomWrapper:', err);
            
//             }
//           }; 
//           const allot = await addUserToRoom(reqlocal,reslocal,next);
//           }));
//         return data; 
//       },
//     };
    
//     var next = (err) => {
//       if (err) {
//         console.error('Error in createRoomWrapper:', err);
//       }
//     };  
//     const room = await createRoom(localReq,localRes,next);
//   } catch (err) {
//     console.error('Error in roomuserdataEnd:', err);
//     next(err);
//   }
// };

//optimized function-- works accurately --tested on 160 rooms data
export const roomuserdataEnd = async (req, res, next) => {
  try {
    const fullObj = req.body;
    const buildingId = req.params.buildingId;

    let userIdArr=[];
    for (const obj of fullObj) {
      for (const item of Object.entries(obj)) {
        const [key, value] = item;      
        if (key === 'roomNumber') {
          obj[key] = parseInt(value,10);
        }
        if (key !== 'roomCurrOccu' && key!=='roomNumber') {
          obj[key] = value;
        }
        if(key ==='roomCurrOccu'){
          const jsonString = value.replace(/'/g, '"').replace(/([a-zA-Z0-9_]+)/g, '"$1"');
          const stringArray = JSON.parse(jsonString);  
          obj[key]=stringArray;
          userIdArr.push(...stringArray);
        }
      }
    }

    // console.log("UpdatedObj",fullObj)

    const users = await User.find({ userName: { $in: userIdArr } });
    const userDictionary = {};
    users.forEach(user => {
      userDictionary[user.userName] = user._id;
    });
    // console.log("UserDictionary",userDictionary)

    
    const building=await Building.findById(buildingId);
    const failedUserUpdates = [];
    
    for (const row of fullObj) {
      const arr=row.roomCurrOccu;
      const arrRow = arr.map((key) => {
        return userDictionary[key];
      });
      row.roomCurrOccu=arrRow;
      row.roomStatus= arrRow.length>0?"Occupied and Locked":"Vacant";
      const newRoom = new Room({
        ...row,
        roomCode:row.roomNumber+"-"+row.roomDiv+"-"+building.buildingName,
        buildingId: buildingId, // Add buildingId to the room
        buildingName: building.buildingName, // Add buildingName to the room
        buildingType:building.buildingType
      });
      const savedRoom = await newRoom.save();
      // console.log("SavedRoom from createroom",savedRoom);
      
      if(row.roomStatus==="Vacant"){
        building.vacantRooms=building.vacantRooms+1;
      }
      else if(row.roomStatus==="Occupied and Locked"){
        building.occupiedRoomsLocked=+building.occupiedRoomsLocked+1;
      }
      building.buildingRooms.push(savedRoom._id);

      const  updatedUserAcknow= await User.updateMany(
        { _id: { $in: arrRow } },
        { $push: { allotedRooms: savedRoom._id } }
      );

      if (!updatedUserAcknow.acknowledged || updatedUserAcknow.matchedCount !== arrRow.length) {  
        arrRow.forEach((userId) => {
          const userData = {
            userId: userId,
            roomNumber: savedRoom.roomNumber, // Assuming savedRoom has a roomNumber property
          };
          failedUserUpdates.push(userData);
        });    
        return next(createError(500, "Update operation failed"));
      }

    }  
    const savedBuilding=await building.save();
    // console.log(savedBuilding);
    res.status(200).json({failedUserUpdates});
  } catch (err) { 
    console.error('Error in roomuserdataEnd:', err);
    next(err);
  }
};