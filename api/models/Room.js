import mongoose from 'mongoose';

const RoomSchema= new mongoose.Schema({
    roomNumber : {
        type : Number,
        required: [true,"Please Enter Room Number"], 
    },
    roomDiv: {
        type: String,
        enum: ["A", "B", "C","D","E","W","N","S"," ","-"],
        default: " "
    },
    roomTitle : {          
        type: String,
        default: null
    },
    buildingId : {          
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    buildingName:{
        type: String, 
    },
    buildingType:{
        type: String, 
    },
    roomDesc : {
        type: String,
        default: null
    },
    roomCurrOccu:{
        type:[String],
        default: []
    },
    personOnLeave:{
        type: [String],
        default: [],
    },
    roomPrevOccu:{
        type: [String],
        default: [],
    },
    roomStatus:{
        type: String,
        enum: ['Occupied and Locked','Occupied and Open', 'Vacant'],
        default: 'Vacant',
        required: true,
    },
    roomCode:{
        type: String,
        required:true,
        unique:true,
    }
},{timestamps : true});
export default mongoose.model("Room" , RoomSchema)