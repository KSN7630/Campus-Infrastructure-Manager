import mongoose from 'mongoose';


const BuildingSchema= new mongoose.Schema({
    buildingType: {           //1
        type : String,
        required: [true,"Please Select Building Type"],
    },

    buildingName : {         //2
        type : String,
        required: [true,"Please Enter Building Name"],
        unique : true,
    },
    buildingRooms : {       //3
        type : [String],
        default:[],
    },
    buildingDesc : {        //4
        type : String,
        default:null,
    },
    vacantRooms:{
        type:Number,
        default:0,
    },
    occupiedRoomsLocked:{
        type:Number,
        default:0,
    },
    occupiedRoomsOpen:{
        type:Number,
        default:0,
    }
    
});

export default mongoose.model("Building" , BuildingSchema)