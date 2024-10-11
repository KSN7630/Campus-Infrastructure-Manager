// import React from "react";
// import "./widget2.scss";
// import { Link } from "react-router-dom";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";



// const Widget2 = ({ type, dataCount }) => {
//   console.log(dataCount)

//   let linkPath = ""; 
//   let data;
//   switch (type) {
//         case "hostels":
//         data = {
//           title: "Total Hostels",
//           type: "Hostels",
//           isMoney: false,
//           linkText: "See Summery",
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
//         break; 
//         case "departments":
//         data = {
//         title: "Total Departments",
//         type:"Departments",
//         isMoney: false,
//         linkText: "See Summery",
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
//         break;  
//         case "academic_buildings":
//         data = {
//         title: "Total Academic Buildings",
//         type:"Academic Buildings",
//         isMoney: false,
//         linkText: "See Summery",
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
//         break;  
//         case "berms":
//         data = {
//           title: "Total Berms",
//           type:"Berms",
//           isMoney: false,
//           linkText: "See Summery",
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
//         break;  
//         case "admin_block":
//           data = {
//             title: "Total Blocks",
//             type:"Admin Blocks",
//             isMoney: false,
//             linkText: "See Summery",
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
//           break;    
//         case "residential_quarters":
//             data = {
//               title: "Total Residential Quarters",
//               type:"Residential Quarters",
//               isMoney: false,
//               linkText: "See Summery",
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
//           break; 
//         case "amenities":
//             data = {
//               title: "Total Amenities",
//               type:"Amenities",
//               isMoney: false,
//               linkText: "See Summery",
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
//             break;                                                                 
//         default:
//       break;
//   }

//   return (
//     <>
//     <div className={`widget2`} >
//       <div className="left">
//         <span className="title">{data.type}</span>
//         <span className="counter">{data.title}:{dataCount?.total}</span>
//         <span className="counter">Total Rooms:{dataCount?.totalRooms}</span>
//         <span className="counter">Vacant :{dataCount?.vacantRooms}</span>
//         <span className="counter">Occupied & Locked:{dataCount?.occupiedRoomsLocked}</span> 
//         <span className="counter">Occupied & Open :{dataCount?.occupiedRoomsOpen}</span>
//         <Link to={linkPath} className="link">{data.linkText}</Link>
//       </div>
//       <div className="right">
//         {data.icon}
//       </div>
//     </div>

//     </>
//   );
// };

// export default Widget2;


import React, { useState } from "react";
import "./widget2.scss";
import { Link } from "react-router-dom";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { PieChart } from 'react-minimal-pie-chart';




const Widget2 = ({ type, dataCount }) => {
  console.log(dataCount)

  let linkPath = ""; 
  let data;
  switch (type) {
        case "hostels":
        data = {
          title: "Total Hostels",
          type: "Hostels",
          isMoney: false,
          linkText: "See Summery",
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
        break; 
        case "departments":
        data = {
        title: "Total Departments",
        type:"Departments",
        isMoney: false,
        linkText: "See Summery",
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
        linkPath = "/departments"; 
        break;  
        case "academic_buildings":
        data = {
        title: "Total Academic Buildings",
        type:"Academic Buildings",
        isMoney: false,
        linkText: "See Summery",
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
        linkPath = "/academics"; 
        break;  
        case "berms":
        data = {
          title: "Total Berms",
          type:"Berms",
          isMoney: false,
          linkText: "See Summery",
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
        linkPath = "/berms";
        break;  
        case "admin_block":
          data = {
            title: "Total Blocks",
            type:"Admin Blocks",
            isMoney: false,
            linkText: "See Summery",
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
          linkPath = "/adminblocks";  
          break;    
        case "residential_quarters":
            data = {
              title: "Total Residential Quarters",
              type:"Residential Quarters",
              isMoney: false,
              linkText: "See Summery",
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
          linkPath = "/residentialquarters";  
          break; 
        case "amenities":
            data = {
              title: "Total Amenities",
              type:"Amenities",
              isMoney: false,
              linkText: "See Summery",
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
            linkPath = "/amenities"; 
            break;                                                                 
        default:
      break;
  }
  
  

  const piedata = [
    dataCount?.vacantRooms && { title: 'Vacant', value: dataCount?.vacantRooms, color: '#CDDC39' }, // Lime
    dataCount?.occupiedRoomsLocked && { title: 'Occupied & Locked', value: dataCount?.occupiedRoomsLocked, color: '#FF9800' }, // Orange
    dataCount?.occupiedRoomsOpen &&  { title: 'Occupied & Open', value: dataCount?.occupiedRoomsOpen, color: '#FFEB3B' }, // Yellow
  ].filter(Boolean);

  
  return (
    <>
    <div className={`widget2`} >
      <div className="left">
        <span className="title">{data.type}</span>
        <span className="counter">{data.title}:{dataCount?.total}</span>
        <span className="counter">Total Rooms:{dataCount?.totalRooms}</span>
        <span className="counter">Vacant :{dataCount?.vacantRooms}</span>
        <span className="counter">Occupied & Locked:{dataCount?.occupiedRoomsLocked}</span> 
        <span className="counter">Occupied & Open :{dataCount?.occupiedRoomsOpen}</span>
        <Link to={linkPath} className="link">{data.linkText}</Link>       
      </div>
      <div className="right">
        <PieChart data={piedata} startAngle={0}  number animate={true} animationDuration={500} animationEasing={"ease-in"} reveal={905} viewBoxSize={[100,150] } label={({ dataEntry }) =>`${Math.round(dataEntry.percentage)} %`}
        />


      </div>
    </div>

    </>
  );
};


export default Widget2;

