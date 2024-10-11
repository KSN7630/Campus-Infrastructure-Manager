// import React, { useState } from "react";
// import "./widget.scss";
// import { Link } from "react-router-dom";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SchoolIcon from "@mui/icons-material/School";
// import HotelIcon from "@mui/icons-material/Hotel";
// import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
// import { Button } from "@mui/material";


// const Widget = ({ type,dataCount ,vacantData, occData,openData  }) => {
//   console.log(dataCount)

//   let linkPath = ""; 
//   let data;
//   let OccupancyLink="";
//   switch (type) {
//         case "users":
//       data = {
//         title: "Total Student/Faculty/Staff/Others",
//         isMoney: false,
//         linkText: "See all users",
//         icon: (
//           <PersonOutlinedIcon
//             className="icon"
//             style={{
//               color: "crimson",
//               backgroundColor: "rgba(255, 0, 0, 0.2)",
//             }}
//           />
//         ),
//       };
//       linkPath = "/hostels"; 
//       OccupancyLink="/amenities";
//       break;
//         case "buildings":
//       data = {
//         title: "Total Buildings",
//         isMoney: false,
//         // linkText: "View all hostels",
//         icon: (
//           <HotelIcon
//             className="icon"
//             style={{
//               backgroundColor: "rgba(218, 165, 32, 0.2)",
//               color: "goldenrod",
//             }}
//           />
//         ),
//       };
//       linkPath = "/hostels"; 
//       OccupancyLink="/amenities";
//       break; 
//         case "rooms":
//       data = {
//         title: "Total Rooms",
//         isMoney: false,
//         icon: (
//           <AddHomeWorkIcon
//             className="icon"
//             style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
//           />
//         ),
//       };
//       linkPath = "/hostels"; 
//       OccupancyLink="/amenities";
//       break;
//         case "hostels":
//         data = {
//           title: "Total Hostels",
//           isMoney: false,
//           linkText: "See Summery",
//           OccupancyText:"See Occupancy",
//           icon: (
//             <PersonOutlinedIcon
//               className="icon"
//               style={{
//                 color: "crimson",
//                 backgroundColor: "rgba(255, 0, 0, 0.2)",
//               }}
//             />
//           ),
//         };
//         linkPath = "/hostels"; 
//         OccupancyLink="/amenities"; 
//         break; 
//         case "departments":
//         data = {
//         title: "Total Departments",
//         isMoney: false,
//         linkText: "See Summery",
//         OccupancyText:"See Occupancy",
//         icon: (
//         <PersonOutlinedIcon
//           className="icon"
//           style={{
//             color: "crimson",
//             backgroundColor: "rgba(255, 0, 0, 0.2)",
//           }}
//         />
//         ),
//         };
//         linkPath = "/departments"; 
//         OccupancyLink="/amenities"; 
//         break;  
//         case "academic_buildings":
//         data = {
//         title: "Total Academic Buil.",
//         isMoney: false,
//         linkText: "See Summery",
//         OccupancyText:"See Occupancy",
//         icon: (
//           <PersonOutlinedIcon
//             className="icon"
//             style={{
//               color: "crimson",
//               backgroundColor: "rgba(255, 0, 0, 0.2)",
//             }}
//           />
//         ),
//         };
//         linkPath = "/academics"; 
//         OccupancyLink="/amenities"; 
//         break;  
//         case "berms":
//         data = {
//           title: "Total Berms",
//           isMoney: false,
//           linkText: "See Summery",
//           OccupancyText:"See Occupancy",
//           icon: (
//             <PersonOutlinedIcon
//               className="icon"
//               style={{
//                 color: "crimson",
//                 backgroundColor: "rgba(255, 0, 0, 0.2)",
//               }}
//             />
//           ),
//         };
//         linkPath = "/berms";
//         OccupancyLink="/amenities"; 
//         break;  
//         case "admin_block":
//           data = {
//             title: "Admin Blocks",
//             isMoney: false,
//             linkText: "See Summery",
//             OccupancyText:"See Occupancy",
//             icon: (
//               <PersonOutlinedIcon
//                 className="icon"
//                 style={{
//                   color: "crimson",
//                   backgroundColor: "rgba(255, 0, 0, 0.2)",
//                 }}
//               />
//             ),
//           };
//           linkPath = "/adminblocks"; 
//           OccupancyLink="/amenities"; 
//           break;    
//         case "residential_quarters":
//             data = {
//               title: "Residential Quarters",
//               isMoney: false,
//               linkText: "See Summery",
//               OccupancyText:"See Occupancy",
//               icon: (
//                 <PersonOutlinedIcon
//                   className="icon"
//                   style={{
//                     color: "crimson",
//                     backgroundColor: "rgba(255, 0, 0, 0.2)",
//                   }}
//                 />
//               ),
//             };
//           linkPath = "/residentialquarters"; 
//           OccupancyLink="/amenities"; 
//           break; 
//         case "amenities":
//             data = {
//               title: "Amenities",
//               isMoney: false,
//               linkText: "See Summery",
//               OccupancyText:"See Occupancy",
//               icon: (
//                 <PersonOutlinedIcon
//                   className="icon"
//                   style={{
//                     color: "crimson",
//                     backgroundColor: "rgba(255, 0, 0, 0.2)",
//                   }}
//                 />
//               ),
//             };
//             linkPath = "/amenities"; 
//             OccupancyLink="/amenities"; 
//             break;    
                                                                
//         default:
//       break;
//   }

//   return (
//     <>
//     <div className={`widget`} >
//       <div className="left">
//         <span className="title">{data.title}</span>
//         <span className="counter">Total :{dataCount}</span>
//         <span className="counter">Total :{vacantData}</span>
//         <span className="counter">Total :{occData}</span>
//         <span className="counter">Total :{openData}</span>
//         <Link to={linkPath} className="link">{data.linkText}</Link>
//       </div>
//       <div className="right">
//         {data.icon}
//       </div>
//     </div>

//     </>
//   );
// };

// export default Widget;



import React from "react";
import "./widget.scss";
import { Link } from "react-router-dom";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import HotelIcon from "@mui/icons-material/Hotel";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";



const Widget = ({ type,dataCount}) => {
  console.log(dataCount)

  let linkPath = ""; 
  let data;
  let OccupancyLink="";
  switch (type) {
        case "users":
      data = {
        title: "Total Student/Faculty/Staff/Others",
        isMoney: false,
        linkText: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      linkPath = "/hostels"; 
      OccupancyLink="/amenities";
      break;
        case "buildings":
      data = {
        title: "Total Buildings",
        isMoney: false,
        // linkText: "View all hostels",
        icon: (
          <HotelIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      linkPath = "/hostels"; 
      OccupancyLink="/amenities";
      break; 
        case "rooms":
      data = {
        title: "Total Rooms",
        isMoney: false,
        icon: (
          <AddHomeWorkIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      linkPath = "/hostels"; 
      OccupancyLink="/amenities";
      break;                                                  
        default:
      break;
  }

  return (
    <>
    <div className={`widget`} >
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">Total :{dataCount}</span>
        <Link to={linkPath} className="link">{data.linkText}</Link>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
    </>
  );
};

export default Widget;