import mongoose from 'mongoose';

const ActivitySchema= new mongoose.Schema({
    activityType: {           //1
        type : String,
        required: [true,"Please Enter Coming Inside Campus or Going Outside Campus"] ,
    },

    activityDate : {         //2
        type: Date,
        required: [true,"Please Enter Today's Date"],
        default:Date.now()
    },
    activityRemark : {         //2
        type: String,
        required: [true,"Please Enter Remark"],
    },
    clientOccupancyStatus:{
        type:String,
        required:[true,"Please Select Occupancy Status"]
    },
    buildingRoomName:{
        type:String,
        required:true
    }
});

export default mongoose.model("Activity" , ActivitySchema)
