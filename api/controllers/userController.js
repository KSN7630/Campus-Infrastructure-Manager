import User from "../models/User.js";
import bcrypt from "bcryptjs"
import Room from "../models/Room.js"
import { createError} from "../utils/error.js";
import { sendToken } from "../utils/verifyToken.js";




export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password, ...rest } = req.body;

    // Retrieve the user from the database
    const user = await User.findById(id);
    if (!user) {
      return next(createError(404, "User not found."));
    }

    // Check if the user is authorized to update the information
    if (req.user.id !== id && !req.user.isAdmin) {
      return next(createError(403, "You are not authorized to update this user."));
    }

    // Only allow password change for authorized user
    if (req.user.id === id && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Only allow any information update for admin
    if (req.user.isAdmin) {
      // Update the user's information
      Object.assign(user, rest);
      
    }

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};




// export const deleteUser =async (req, res , next)=>{
//     try{
//         const userInfo = await User.findById(req.params.id);
//         if (!userInfo) {
//           return next(createError(404,"User not found"));
//         }
//         // Delete the user
//         const deletedUser = await User.findByIdAndDelete(req.params.id);
        
//         if (!deletedUser) {
//           return next(createError(400,"Failed to delete user"));
//         }

//         // Remove  the id  from the room associated with the user
//        const rooms = await Room.find();
//        const acIds = userInfo.activityList;
//        const deletePromises = acIds.map((acId) => {
//         deleteActivity({ params: { id: acId} }, res, next);
//       });
//        await Promise.all(deletePromises);
      
//       //  const deleteUserPromises = rooms.map(async (room) => {
//       //   room.roomCurrOccu.pull(req.params.id);
//       //   room.roomPrevOccu.pull(req.params.id);
//       //   room.personOnLeave.pull(req.params.id);
//       //   if(!room.roomCurrOccu.length){ room.roomStatus="Vacant"}
//       //   await room.save();
//       // });
      

//       const deleteUserPromises = rooms.map(async (room) => {
//         const roomIndex = rooms.indexOf(room);
  
//         // Remove the user ID from the arrays in memory
//         room.roomCurrOccu.pull(req.params.id);
//         room.roomPrevOccu.pull(req.params.id);
//         room.personOnLeave.pull(req.params.id);
  
//         // Check if roomCurrOccu is empty and update roomStatus
//         if (room.roomCurrOccu.length === 0) {
//           room.roomStatus = "Vacant";
//         }
  
//         // Save the updated room document
//         rooms[roomIndex] = await room.save();
//       });

//       await Promice.all(deleteUserPromises);
//       res.status(200).json("User and associated room information have been deleted");

//       // Promise.all(deleteUserPromises)
//       // .then((deletedBuilding) => {
//       //   if (!deletedBuilding) {
//       //     return next(createError(400, "Failed to delete the building"));
//       //   }
//       //   res.status(200).json("User and associated room information have been deleted");
//       // })
//       // .catch((err) => {
//       //   console.error(err);
//       //   next(err);
//       // });

//       }catch(err){
//       next(err)
//     }
// }


export const deleteUser = async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.params.id);
    if (!userInfo) {
      return next(createError(404, "User not found"));
    }

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return next(createError(400, "Failed to delete user"));
    }

    // Remove the user ID from room arrays using $pull
    await Room.updateMany(
      {
        $or: [
          { roomCurrOccu: req.params.id },
          { roomPrevOccu: req.params.id },
          { personOnLeave: req.params.id },
        ],
      },
      {
        $pull: {
          roomCurrOccu: req.params.id,
          roomPrevOccu: req.params.id,
          personOnLeave: req.params.id,
        },
      }
    );

    // Check if roomCurrOccu is empty and update roomStatus
    // await Room.updateMany(
    //   { roomCurrOccu: { $size: 0 } ,personOnLeave:{$size:0}},
    //   { $set: { roomStatus: "Vacant" } }
    // );
    await Room.updateMany(
      {},
      [
        {
          $set: {
            roomStatus: {
              $cond: [
                { $and: [{ $eq: [{ $size: "$roomCurrOccu" }, 0] }, { $eq: [{ $size: "$personOnLeave" }, 0] }] },
                "Vacant",
                {
                  $cond: [
                    { $eq: [{ $size: "$roomCurrOccu" }, 0] },
                    "Occupied and Open",
                    "Occupied and Locked"
                  ]
                }
              ]
            }
          }
        }
      ]
    );

    res.status(200).json("User and associated room information have been deleted");
  } catch (err) {
    next(err);
  }
};




//Get user detail
export const getUserMe =async (req, res , next)=>{
  try{
    console.log(req.user.id)
     const user= await User.findById(req.user.id);
     res.status(200).json({
      success:true,
      user,
     })
  }catch(error){
    next(error);
  }
}


//Get client detail
export const getClientMe =async (req, res , next)=>{
  try{
    console.log(req.user.id)
     const client= await User.findById(req.user.id).lean();;
   
     res.status(200).json({
      success:true,
      client
     })
  }catch(error){
    next(error);
  }
}

export const getClientRoomDetails =async (req, res , next)=>{
  try{
     const {allotedRooms,prevAllotedRooms}=req.body;
     const curRoomAlloted=allotedRooms || [];
     const prevRoomAlloted=prevAllotedRooms || [] ;

     const roomFetchPromises = curRoomAlloted.map(async (roomId) => {
      const roomDataCurr = await Room.findById(roomId, { buildingName: 1, buildingType: 1,personOnLeave: 1,roomCurrOccu : 1 ,roomNumber : 1,roomDiv:1,_id:1});
      return roomDataCurr;
     });
     const roomPrevFetchPromises = prevRoomAlloted.map(async (roomId) => {
      const roomDataPrev = await Room.findById(roomId, { buildingName: 1, roomNumber : 1,roomDiv:1,_id:1});
      return roomDataPrev;
     });
  
     const dataAllotedRoomsCurr = await Promise.all(roomFetchPromises);
     const dataAllotedRoomsPrev = await Promise.all(roomPrevFetchPromises);


     res.status(200).json({
      success:true,
      dataAllotedRoomsCurr,
      dataAllotedRoomsPrev
     })
  }catch(error){
    next(error);
  }
}



//Update user password
export const updateUserPass =async (req, res , next)=>{
  const user= await User.findById(req.user.id).select("+password");

  const isPasswordCorrect =bcrypt.compareSync(req.body.oldPassword , user.password); // true
  if(!isPasswordCorrect) return next(createError(401,"Old password is incorrect !"))

  if(req.body.newPassword != req.body.confirmPassword) {
    return next(createError(400,"Password does not match"))
  }

  user.password=req.body.newPassword;
  await user.save();

  sendToken(user,200,res);
}


//Update user profile
export const updateProfile =async (req, res , next)=>{
  
  const newUserData={
    name:req.body.name,
    email:req.body.email,
  }
  //we will add cloudinary later
  const user=await User.findByIdAndUpdate(req.user.id , newUserData, {
    new: true,
    runValidators:true,
    useFindAndModify:false,
  })
  res.status(200).json({
    success:true,
  })
}


//Update user role
export const updateUserRole =async (req, res , next)=>{
  
  const newUserData={
    name:req.body.name,
    email:req.body.email,
    role:req.body.isAdmin,
  }
  //we will add cloudinary later
  const user=await User.findByIdAndUpdate(req.user.id , newUserData, {
    new: true,
    runValidators:true,
    useFindAndModify:false,
  })
  res.status(200).json({
    success:true,
  })
}





//For admin
export const getUser =async (req, res , next)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
          return next(createError(404,"User not found"));
        }
        res.status(200).json(user)    // if successful , return hotel 
      }catch(err){
      next(err)
    }
}

export const getUsers =async (req, res , next)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)    // if successful , return hotel 
      }catch(err){
      next(err)
      }
}



// export const searchUser=async (req,res,next)=>{
//     try{
//       const { q } = req.query;

//       if (!q) {
//         return res.status(400).json({ message: 'Search query is required.' });
//       }
  
//       // Use a regex to perform a case-insensitive search on the user's name field
//       const regex = new RegExp(q, 'i');
//       const users = await User.find({ userName: regex });
//       console.log("Users from searchResult: ",users);
  
//       res.status(200).json(users);

//     }catch(err){
//       next(err);
//     }
// }


export const searchUser = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    // Use a regex to perform a case-insensitive search on multiple fields
    const regex = new RegExp(q, 'i');
    const users = await User.find({
      $or: [
        { userName: regex },
        { fullName: regex },
        { email:regex}
    
        // { additionalField: regex }, // Add more fields if needed
      ],
    }).select('userName fullName email personType');

    res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    next(error);
  }
};


// export const FilterUser = async (req, res, next) => {
//   try {
//     // Extract filter parameters from the request query
//     const { Username,Name,IsAdmin,Designation,JoiningDate,Email} = req.query;

//     // Construct the filter object based on the provided parameters
//     const filter = {};
    

//     if (Username) {
//       filter.userName = new RegExp(Username, 'i');
//     }

//     if (Name) {
//       filter.fullName = new RegExp(Name, 'i');
//     }

//     if (IsAdmin) {
//       filter.isAdmin = new RegExp(IsAdmin, 'i');
//     }

//     if (Designation) {
//       filter.personType = new RegExp(Designation, 'i');
//     }

//     if (JoiningDate) {
//       filter.joiningDate = JoiningDate;
//     }
//     if(Email){
//       filter.email=Email;
//     }
//     // console.log(filter);

//     // Use the filter object to query the database
//     const users = await User.find(filter);

//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error filtering Users:', error);
//     next(error);
//   }
// };


export const FilterUser = async (req, res, next) => {
  try {
    // Extract filter parameters from the request query
    const { Username, Name, IsAdmin, Designation, JoiningDate, Email, page = 1, limit = 10, sortField, sortOrder } = req.query;

    // Construct the filter object based on the provided parameters
    const filter = {};

    if (Username) {
      filter.userName = new RegExp(Username, 'i');
    }

    if (Name) {
      filter.fullName = new RegExp(Name, 'i');
    }

    if (IsAdmin) {
      filter.isAdmin = IsAdmin;
    }

    if (Designation) {
      filter.personType = Designation;
    }

    if (JoiningDate) {
      // Check if JoiningDate is not an empty string
      if (JoiningDate.trim() !== '') {
        const parsedDate = new Date(JoiningDate);
        filter.joiningDate = { $gte: parsedDate };
      }
    }

    if (Email) {
      filter.email = Email;
    }

    // Apply sorting
    const sortOptions = {};
    if (sortField) {
      sortOptions[sortField] = sortOrder === 'desc' ? -1 : 1;
    }

    // Use the filter object to query the database with pagination and sorting
    const users = await User.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    res.status(200).json(users);
  } catch (error) {
    console.error('Error filtering Users:', error);
    next(error);
  }
};
