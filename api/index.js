import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import buildingsRoute from "./routes/buildings.js";
import roomsRoute from "./routes/rooms.js";
import statusRoute from "./routes/userRoomStatus.js"
import activityRoute from "./routes/activities.js";

import summeryRoute from "./routes/summery.js"


import cookieParser from "cookie-parser";



//Handling uncaught exception
process.on("uncaughtException",(err)=>{
   console.log(`Error: ${err.message}`);
   console.log(`Shutting down the server due to uncaught Exception`);
   process.exit(1);
})




const app = express()
dotenv.config()

mongoose.connect(process.env.MONGO);
var db=mongoose.connection;
// db.on('error' , console.error.bind(console , 'connection error'));   // //Unhandled Promise rejection
db.once('open' , function callback (){
    console.log("Database connected successfully");
})


mongoose.connection.on("disconnected" , () =>{
    console.log("mongoDB disconnected");
})

mongoose.connection.on("connected" , () =>{
    console.log("mongoDB connected");
})



// middle wares

app.use(cookieParser())
app.use(express.json())


app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/building",buildingsRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/userDashboard",statusRoute);
app.use("/api/activities",activityRoute);
app.use("/api/summery",summeryRoute);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

const server=app.listen(8900,()=>{
    console.log("Connected to bakend")
})




//Unhandled Promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection `);

    server.close(()=>{
        process.exit(1);
    })


})