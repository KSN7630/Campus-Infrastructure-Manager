import User from "../models/User.js";
import createError from "../utils/error.js"

import Activities from "../models/Activities.js";

export const createActivity = async (req, res, next) => {
    const userId = req.params.userId;
    const newActivity = new Activities(req.body);
    
    try {
        
        const user = await User.findById(userId);
        
        if (!user) {
            return next(createError(404,"User not found"))
        }

        const savedActivity = await newActivity.save();
        try{
            await User.findByIdAndUpdate(userId , 
            {   
                $push: {
                    activityList: {
                        $each: [newActivity._id],
                        $slice: -10
                      }
                }
            });
            
        } catch (err){
            next(err);
        }
        res.status(200).json(newActivity)
    }catch (err){
        next(err);
    }
};



// export const createActivity = async (req, res, next) => {
//     const userId = req.params.userId;
//     const newActivity = req.body; // Assuming the request body contains the activityType and activityDate
    
//     try {
//         const user = await User.findById(userId);
        
//         if (!user) {
//             return next(createError(404, "User not found"));
//         }

//         user.activityList.push(newActivity); // Add the new activity to the user's activityList array

//         // Limit the activityList array to store only the last 10 activities
//         if (user.activityList.length > 10) {
//             user.activityList = user.activityList.slice(-10);
//         }

//         await user.save();

//         res.status(200).json(newActivity);
//     } catch (err) {
//         next(err);
//     }
// };





export const createActivityForMe = async (req, res, next) => {
    const userId = req.user.id;
    const activityData = req.body; // Assuming the request body contains the activityType and activityDate
    if(activityData.activityType==='CHECK OUT'){
        if(activityData.activityRemark!='Other' || activityData.activityRemark!='Permanent Out' ){
            activityData.activityRemark='Going For Leave';
        }
    }
    else{
        if(activityData.activityRemark!='Other' || activityData.activityRemark!='Permanent Out' ){
            activityData.activityRemark='Coming From Leave';
        }
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        const newActivity = new Activities(activityData);
        await newActivity.save();
    
        await User.findByIdAndUpdate(userId , {$push : {activityList : newActivity._id }});
       
        res.status(200).json({success:true});
    } catch (err) {
        next(err);
    }
};


export const deleteActivity= async (req, res, next) => {
    const acId = req.params.id;

    try {
        await Activities.findByIdAndDelete(acId);

        res.status(200).json("Activity has been deleted");
    } catch (err) {
        next(err);
    }
};



export const getActivity= async (req, res, next) => {
    const acId = req.params.id;

    try {
        const act=await Activities.findById(acId);

        res.status(200).json(act);
    } catch (err) {
        next(err);
    }
};


export default createActivity;




