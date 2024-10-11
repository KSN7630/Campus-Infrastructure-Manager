import React from "react";
import { Link } from "react-router-dom";

export const hostelColumns = (handleDelete) => [
  {
    field: "buildingName",
    headerName: "Hostel Name",
    // width: 150,
    flex:1,
    renderCell: (params, forCSV) => {
      if (forCSV) {
        return params.row.buildingName;  // Return plain text for CSV
      }
      return (
        <div>
          <Link to={`/hostels/${params.row._id}`}>
            {params.row.buildingName}
          </Link>
        </div>
      );
    },
  },
  {
    field: "buildingDesc",
    headerName: "Hostel Description",
    // width: 170,
    flex:1.5,
  },
  {
    field: "total",
    headerName: "Total Rooms",
    // width: 150,
    flex:1,
  },
  {
    field: "occupiedRoomsLocked",
    headerName: "Occupied & Locked",
    // width: 150,
    flex:1,
  },
  {
    field: "occupiedRoomsOpen",
    headerName: "Occupied & Open",
    // width: 150,
    flex:1,
  },
  {
    field: "vacantRooms",
    headerName: "Vacant Rooms",
    // width: 150,
    flex:1,
  },
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/hostels/${params.row._id}`}
            
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id)}>Delete</div>
        </div>
      );
    },
  },
];


//////////////////////////////////     DEPARTMENT ///////////////////////////////////////////
export const departmentColumns = (handleDelete) => [
  {
    field: "buildingName",
    headerName: "Department Name",
    // width: 300,
    flex:2,
    renderCell: (params) => {
      return (
        <div>
          <Link to={`/departments/${params.row._id}`} >
            {params.row.buildingName}
          </Link>
        </div>
      );
    },
  },
  {
    field: "buildingDesc",
    headerName: "Department Description",
    // width: 230,
    flex:2,
  },
  {
    field: "total",
    headerName: "Total Offices",
    // width: 130,
    flex:1,
  },
  {
    field: "occupiedRoomsLocked",
    headerName: "Occupied Offices",
    // width: 130,
    flex:1,
  },
  {
    field: "vacantRooms",
    headerName: "Vacant Offices",
    // width: 130,
    flex:1,
  },
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/departments/${params.row._id}`}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id)}>Delete</div>
        </div>
      );
    },
  },
];


///////////////////////////////////  ACADEMIC BUILDINGS //////////////////////////////////////////
export const academicColumns = (handleDelete) => [
  {
    field: "buildingName",
    headerName: "Academic Builidng Name",
    // width: 220,
    flex:2,
    renderCell: (params) => {
      return (
        <div>
          <Link to={`/academics/${params.row._id}`}>
            {params.row.buildingName}
          </Link>
        </div>
      );
    },
  },
  {
    field: "buildingDesc",
    headerName: "Description",
    // width: 350,
    flex:3,
  },
  {
    field: "total",
    headerName: "Total Rooms",
    // width: 350,
    flex:2,
  },
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1.5,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/academics/${params.row._id}`}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id)}>Delete</div>
        </div>
      );
    },
  },
];


///////////////////////////////////////   BERMS    ////////////////////////////////////////////////
export const bermColumns = (handleDelete) => [
  {
    field: "buildingName",
    headerName: "Berm No.",
    // width: 180,
    flex:1,
    renderCell: (params) => {
      return (
        <div>
          <Link to={`/berms/${params.row._id}`} >
            {params.row.buildingName}
          </Link>
        </div>
      );
    },
  },
  {
    field: "buildingDesc",
    headerName: "Berm Description",
    // width: 290,
    flex:2,
  },
  {
    field: "total",
    headerName: "Total Offices",
    // width: 150,
    flex:1,
  },
  {
    field: "occupiedRoomsLocked",
    headerName: "Occupied Offices",
    // width: 150,
    flex:1,
  },
  {
    field: "vacantRooms",
    headerName: "Vacant Offices",
    // width: 150,
    flex:1,
  },
  
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/berms/${params.row._id}`}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id)}>Delete</div>
        </div>
      );
    },
  },
];


///////////////////////////////####################################///////////////////////////////////
//                                Inside page descriptions Below                                    //
//////////////////////////////#####################################///////////////////////////////////

//////////                      Hostel Room Table                                    /////////////////
export const hostelroomColumns = (handleDelete) => [
  {
    field: "roomNumber",
    headerName: "Room Number",
    // width: 220,
    flex:1.5,
    renderCell: (params, forCSV) => {
      if (forCSV) {
        return params.row.roomNumber;  // Return plain text for CSV
      }
      return (
        <div>
          <Link to={`${window.location.pathname}/${params.row._id}`}>
            {params.row.roomNumber+ (params.row.roomDiv === "-" ? "" : params.row.roomDiv)}
          </Link>
        </div>
      );
    },
  },
  {
    field: "floor",
    headerName: "Floor",
    // width: 130,
    flex:1,
    valueGetter: (params) => {
      const roomNumber = Number(params.row.roomNumber);
      return isNaN(roomNumber) ? 0 : Math.floor(roomNumber / 100) - 1;
    },
  },
  {
    field: "allotedcount",
    headerName: "Alloted to No.",
    // width: 250,
    flex:1.5,
    valueGetter: (params) => {
      const roomCurrOccuLength = params.row.roomCurrOccu ? params.row.roomCurrOccu.length : 0;
      const personOnLeaveLength = params.row.personOnLeave ? params.row.personOnLeave.length : 0;
      return roomCurrOccuLength + personOnLeaveLength;
    },
  },
  {
    field: "roomStatus",
    headerName: "Occupancy Status",
    // width: 320,
    flex:2,
  },
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`${window.location.pathname}/${params.row._id}`}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id,window.location.pathname.split("/")[2])}>Delete</div>
        </div>
      );
    },
  },
];

//////////                                Department Room Table                                    /////////////////
export const departmentroomColumns = (handleDelete) => [
  
  {
    field: "roomNumber",
    headerName: "Office/Classroom/Lab No.",
    // width: 100,
    flex:1,
    renderCell: (params, forCSV) => {
      if (forCSV) {
        return params.row.roomNumber;  // Return plain text for CSV
      }
      return (
        <div>
          <Link to={`${window.location.pathname}/${params.row._id}`}>
            {params.row.roomNumber+ (params.row.roomDiv === "-" ? "" : params.row.roomDiv)}
          </Link>
        </div>
      );
    },
  },
  {
    field: "floor",
    headerName: "Floor",
    // width: 100,
    flex:1,
    valueGetter: (params) => {
      const roomNumber = Number(params.row.roomNumber);
      return isNaN(roomNumber) ? 0 : Math.floor(roomNumber / 100) - 1;
    },
  },
  {
    field: "roomTitle",
    headerName: "Office/Lab/Classroom Title",
    // width: 230,
    flex:1.5,
  },
  {
    field: "roomDesc",
    headerName: "Office/Classroom/Lab Desc.",
    // width: 290,
    flex:2,
  },
  {
    field: "roomStatus",
    headerName: "Occupancy Status",
    // width: 200,
    flex:1.5,
  },
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`${window.location.pathname}/${params.row._id}`}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id,window.location.pathname.split("/")[2])}>Delete</div>
        </div>
      );
    },
  },
];

//////////                                Academic Room Table                                    /////////////////
export const academicroomColumns = (handleDelete) => [
  {
    field: "roomNumber",
    headerName: "Room No.",
    // width: 100,
    flex:1,
    renderCell: (params, forCSV) => {
      if (forCSV) {
        return params.row.roomNumber;  // Return plain text for CSV
      }
      return (
        <div>
          <Link to={`${window.location.pathname}/${params.row._id}`} >
            {params.row.roomNumber+ (params.row.roomDiv === "-" ? "" : params.row.roomDiv)}
          </Link>
        </div>
      );
    },
  },
  {
    field: "floor",
    headerName: "Floor",
    // width: 100,
    flex:1,
    valueGetter: (params) => {
      const roomNumber = Number(params.row.roomNumber);
      return isNaN(roomNumber) ? 0 : Math.floor(roomNumber / 100) - 1;
    },
  },
  
  {
    field: "roomTitle",
    headerName: "Room Title",
    // width: 230,
    flex:2,
  },
  
  {
    field: "roomDesc",
    headerName: "Room Description",
    // width: 290,
    flex:2,
  },
  {
    field: "roomStatus",
    headerName: "Occupancy Status",
    // width: 200,
    flex:1.5,
  },
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`${window.location.pathname}/${params.row._id}`}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id,window.location.pathname.split("/")[2])}>Delete</div>
        </div>
      );
    },
  },
];

////////////////                      Berm Room Table                         ///////////////////////////////////
export const bermroomColumns = (handleDelete) => [
  {
    field: "roomNumber",
    headerName: "Office/Lab/Room No.",
    // width:200,
    flex:1,
    renderCell: (params, forCSV) => {
      if (forCSV) {
        return params.row.roomNumber;  // Return plain text for CSV
      }
      return (
        <div>
          <Link to={`${window.location.pathname}/${params.row._id}`} >
            {params.row.roomNumber+ (params.row.roomDiv === "-" ? "" : params.row.roomDiv)}
          </Link>
        </div>
      );
    },
  },
  {
    field: "floor",
    headerName:"Floor",
    // width: 150,
    flex:1,
    valueGetter: (params) => {
      const roomNumber = Number(params.row.roomNumber);
      return isNaN(roomNumber) ? 0 : Math.floor(roomNumber / 100) - 1;
    },
  },
  {
    field: "roomTitle",
    headerName: "Office/Lab/Room Title",
    // width: 270,
    flex:1.5,
  },
  // {
  //   field: "fullName",
  //   headerName: "Occupied By",
  //   width: 150,
  // },
  // {
  //   field: "userName",
  //   headerName: "Username",
  //   width: 150,
  // },
  {
    field: "roomDesc",
    headerName: "Office/Room Description",
    // width: 300,
    flex:2,
  },
  {
    field: "roomStatus",
    headerName: "Occupancy Status",
    // width: 300,
    flex:2,
  },
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`${window.location.pathname}/${params.row._id}`}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id,window.location.pathname.split("/")[2])}>Delete</div>
        </div>
      );
    },
  },
];


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////          END OF TABLE DESCRIPTION               /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////              USER LIST TABLE                     /////////////////////////////////

export const userlistColumns = (handleuserlistClick) => [
  {
    field: "userName",
    headerName: "Username",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          <Link to={`/userlist/${params.row._id}`} onClick={() => handleuserlistClick(params.row._id)}>
            {params.row.userName}
          </Link>
        </div>
      );
    },
  },
  {
    field: "fullName",
    headerName: "Name",
    width: 200,
  },
  // {
  //   field: "isAdmin",
  //   headerName: "IsAdmin",
  //   width: 200,
  // },
  {
    field: "personType",
    headerName: "Designation",
    width: 200,
  },
  {
    field: "joiningDate",
    headerName: "JoiningDate",
    width: 200,
    valueGetter: (params) => {
      const dateData = params.row.joiningDate;
  
      // Convert date string to "YYYY-MM-DD" format
      const formattedDate = new Date(dateData).toISOString().split('T')[0];
  
      return formattedDate;
    },
  },
];





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////                            USER VIEW TABLES                    ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////        ROOM ALLOTED TO THE USER  CURRENTLY            ////////////////////////////////////

export const userroomcurrColumns = (handleuserroomcurrClick,handleRemoveUserFromRoom) => [
  {
    field: "buildingName",
    headerName: "Building Name",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          {/* {`/building/${params.row._id}`} */}
          <Link to={`/${params.row.buildingType.toLowerCase()+'s'}/${params.row.buildingId}`}  onClick={() => handleuserroomcurrClick(params.row._id)}>
            {params.row.buildingName}
          </Link>
        </div>
      );
    },
  },
  {
    field: "roomNumber",
    headerName: "Room Number",
    width: 200,
    renderCell: (params, forCSV) => {
      if (forCSV) {
        return params.row.roomNumber;  // Return plain text for CSV
      }
      return (
        <div>
          <Link to={`/${params.row.buildingType.toLowerCase()+'s'}/${params.row.buildingId}/${params.row._id}`}>
            {params.row.roomNumber+ (params.row.roomDiv === "-" ? "" : params.row.roomDiv)}
          </Link>
        </div>
      );
    },
  },
  {
    field: "floor",
    headerName: "Floor",
    width: 200,
    valueGetter: (params) => {
      const roomNumber = Number(params.row.roomNumber);
      return isNaN(roomNumber) ? 0 : Math.floor(roomNumber / 100) - 1;
    },
  },
  {
    field: "roomTitle",
    headerName: "Room Type",
    width: 200,
  },
  {
    field: "roomStatus",
    headerName: "Occupancy Status",
    width: 180,
  },  
  {
    field: "action",
    headerName: "Action",
    width: 130,

    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/${params.row.buildingType.toLowerCase()+'s'}/${params.row.buildingId}/${params.row._id}`}
              onClick={() => roompresentColumns(params.row._id)}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleRemoveUserFromRoom(params.row._id)}>Vacate</div>
        </div>
      );
    }
  }
];


//////////////////////////////////        ROOM ALLOTED TO THE USER  previously         ////////////////////////////////////

export const userroomprevColumns = (handleuserroomprevClick) => [
  {
    field: "buildingName",
    headerName: "Building Name",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          <Link to={`/${params.row.buildingType.toLowerCase()+'s'}/${params.row.buildingId}`}  onClick={() => handleuserroomprevClick(params.row._id)}>
            {params.row.buildingName}
          </Link>
        </div>
      );
    },
  },
  {
    field: "roomNumber",
    headerName: "Room Number",
    width: 200,
    renderCell: (params, forCSV) => {
      if (forCSV) {
        return params.row.roomNumber;  // Return plain text for CSV
      }
      return (
        <div>
          <Link to={`/${params.row.buildingType.toLowerCase()+'s'}/${params.row.buildingId}/${params.row._id}`}>
            {params.row.roomNumber+ (params.row.roomDiv === "-" ? "" : params.row.roomDiv)}
          </Link>
        </div>
      );
    }
  },
  {
    field: "floor",
    headerName: "Floor",
    width: 200,
    valueGetter: (params) => {
      const roomNumber = Number(params.row.roomNumber);
      return isNaN(roomNumber) ? 0 : Math.floor(roomNumber / 100) - 1;
    },
  },
  {
    field: "roomTitle",
    headerName: "Room Type",
    width: 200,
  },
  {
    field: "roomStatus",
    headerName: "Occupancy Status",
    width: 220,
  }, 
  {
    field: "action",
    headerName: "Action",
    width: 90,

    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/${params.row.buildingType.toLowerCase()+'s'}/${params.row.buildingId}/${params.row._id}`}
              onClick={() => roompresentColumns(params.row._id)}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
        </div>
      );
    }
  }
];

//////////////////////////////////        USER COMING IN AND GOING OUT RECORD TABLE        ///////////////////////////////////

export const usertravelColumns = (handleusertravelClick) => [
  
  {
    field: "activityDate",
    headerName: "Date",
    width: 200,
    valueGetter: (params) => {
      const dateData = params.row.activityDate;
    
      // Convert date string to "YYYY-MM-DD hh:mm" format
      const date = new Date(dateData);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}  ${hours}:${minutes}`;

      return formattedDate;
  
      // return formattedDate;
    },
  },
  {
    field: "activityType",
    headerName: "User activity",
    width: 250,
    renderCell: (params) => {
      return (
        <div>
          <Link to="#" onClick={() => handleusertravelClick(params.row.activityType)}>
            {params.row.activityType}
          </Link>
        </div>
      );
    },
  },
  {
    field: "activityRemark",
    headerName: "Remark",
    width: 250,
  },
  ,
  {
    field: "buildingRoomName",
    headerName: "Building-Room No.",
    width: 290,
  },
  {
    field: "clientOccupancyStatus",
    headerName: "Occupancy Status",
    width: 300,
  },
];



////////////////////////////////                       ROOM CURRENT OCCUPIER               ///////////////////////////////////

export const roompresentColumns = (handleroompresentClick,handleRemoveUserFromRoom) => [
  {
    field: "userName",
    headerName: "Username",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          <Link to={`/userlist/${params.row._id}`} onClick={() => handleroompresentClick(params.row._id)}>
            {params.row.userName}
          </Link>
        </div>
      );
    },
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 330,
  },
  // {
  //   field: "isAdmin",
  //   headerName: "IsAdmin",
  //   width: 200,
  // },
  {
    field: "personType",
    headerName: "Designation",
    width: 190,
  },
  {
    field: "joiningDate",
    headerName: "JoiningDate",
    width: 200,
    valueGetter: (params) => {
      const dateData = params.row.joiningDate;
      // Convert date string to "YYYY-MM-DD" format
      const formattedDate = new Date(dateData).toISOString().split('T')[0];
      return formattedDate;
    },
  },{
    field: "action",
    headerName: "Action",
    width: 130,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/userlist/${params.row._id}`} onClick={() => handleroompresentClick(params.row._id)} style={{ textDecoration: 'none' }}>
          <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleRemoveUserFromRoom(params.row._id)}>Vacate</div>
        </div>
      );
    }}]




////////////////////////////////                       ROOM ABSENT OCCUPIER               ///////////////////////////////////
export const roomabsentColumns = (handleroomabsentClick) => [
  {
    field: "userName",
    headerName: "Username",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          <Link to={`/userlist/${params.row._id}`} onClick={() => handleroomabsentClick(params.row.userName)}>
            {params.row.userName}
          </Link>
        </div>
      );
    },
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 330,
  },
  // {
  //   field: "isAdmin",
  //   headerName: "IsAdmin",
  //   width: 200,
  // },
  {
    field: "personType",
    headerName: "Designation",
    width: 190,
  },
  {
    field: "joiningDate",
    headerName: "JoiningDate",
    width: 200,
    valueGetter: (params) => {
      const dateData = params.row.joiningDate;
      // Convert date string to "YYYY-MM-DD" format
      const formattedDate = new Date(dateData).toISOString().split('T')[0];
      return formattedDate;
    },
  },{
    field: "action",
    headerName: "Action",
    width: 130,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/userlist/${params.row._id}`} onClick={() => handleroomabsentClick(params.row.userName)} style={{ textDecoration: 'none' }}>
          <div className="viewButton">View</div>
          </Link>
        </div>
      );
    }}]


////////////////////////////////                       ROOM ABSENT OCCUPIER               ///////////////////////////////////
export const roomprevColumns = (handleroomprevClick) => [
  {
    field: "userName",
    headerName: "Username",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          <Link to={`/userlist/${params.row._id}`} onClick={() => handleroomprevClick(params.row.userName)}>
            {params.row.userName}
          </Link>
        </div>
      );
    },
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 330,
  },
  // {
  //   field: "isAdmin",
  //   headerName: "IsAdmin",
  //   width: 200,
  // },
  {
    field: "personType",
    headerName: "Designation",
    width: 290,
  },
  {
    field: "joiningDate",
    headerName: "JoiningDate",
    width: 200,
    valueGetter: (params) => {
      const dateData = params.row.joiningDate;
      // Convert date string to "YYYY-MM-DD" format
      const formattedDate = new Date(dateData).toISOString().split('T')[0];
      return formattedDate;
    },
  },{
    field: "action",
    headerName: "Action",
    width: 130,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/userlist/${params.row._id}`} onClick={() => handleroomprevClick(params.row.userName)} style={{ textDecoration: 'none' }}>
          <div className="viewButton">View</div>
          </Link>
        </div>
      );
    }}]




///////////////////////////////////////   Admin Block    ////////////////////////////////////////////////
export const adminblockcolumns = (handleDelete) => [
  {
    field: "buildingName",
    headerName: "Block Name",
    // width: 220,
    flex:2,
    renderCell: (params) => {
      return (
        <div>
          <Link to={`/adminblocks/${params.row._id}`}>
            {params.row.buildingName}
          </Link>
        </div>
      );
    },
  },
  {
    field: "buildingDesc",
    headerName: "Block Description",
    // width: 250,
    flex:2,
  },
  {
    field: "total",
    headerName: "Total Offices",
    // width: 150,
    flex:1,
  },
  {
    field: "occupiedRoomsLocked",
    headerName: "Occupied Offices",
    // width: 150,
    flex:1,
  },
  {
    field: "vacantRooms",
    headerName: "Vacant Offices",
    // width: 150,
    flex:1,
  },
  
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/adminblocks/${params.row._id}`}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id)}>Delete</div>
        </div>
      );
    },
  },
];



export const adminblockroomColumns = (handleDelete) => [
  {
    field: "roomNumber",
    headerName: "Office No.",
    // width: 120,
    flex:1,
    renderCell: (params, forCSV) => {
      if (forCSV) {
        return params.row.roomNumber;  // Return plain text for CSV
      }
      return (
        <div>
          <Link to={`${window.location.pathname}/${params.row._id}`}>
            {params.row.roomNumber+ (params.row.roomDiv === "-" ? "" : params.row.roomDiv)}
          </Link>
        </div>
      );
    },
  },
  {
    field: "floor",
    headerName:"Floor",
    // width: 100,
    flex:1,
    valueGetter: (params) => {
      const roomNumber = Number(params.row.roomNumber);
      return isNaN(roomNumber) ? 0 : Math.floor(roomNumber / 100) - 1;
    },
  },
  {
    field: "roomTitle",
    headerName: "Office Title",
    // width: 230,
    flex:1,
  },
  // {
  //   field: "fullName",
  //   headerName: "Occupier Name",
  //   // width: 250,
  //   flex:2,
  // },
  // {
  //   field: "userName",
  //   headerName: "Username",
  //   width: 150,
  // },
  {
    field: "roomDesc",
    headerName: "Office Description",
    width: 300,
  },
  {
    field: "roomStatus",
    headerName: "Occupancy Status",
    // width: 220,
    flex:1,
  },
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`${window.location.pathname}/${params.row._id}`}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id,window.location.pathname.split("/")[2])}>Delete</div>
        </div>
      );
    },
  },
];



//////////////////////////////////////  Residential Block /////////////////////////////////////////////


export const residentialquartercolumns = (handleDelete) => [
  {
    field: "buildingName",
    headerName: "Quarter Type",
    // width: 220,
    flex:2,
    renderCell: (params) => {
      return (
        <div>
          <Link to={`/residentialquarters/${params.row._id}`} >
            {params.row.buildingName}
          </Link>
        </div>
      );
    },
  },
  {
    field: "buildingDesc",
    headerName: "Flat Description",
    // width: 250,
    flex:2,
  },
  {
    field: "total",
    headerName: "Total Flats",
    // width: 150,
    total:1,
  },
  {
    field: "occupiedRoomsLocked",
    headerName: "Occupied Flats",
    // width: 150,
    flex:1,
  },
  {
    field: "vacantRooms",
    headerName: "Vacant Flats",
    // width: 150,
    flex:1,
  },
  
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/residentialquarters/${params.row._id}`}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id)}>Delete</div>
        </div>
      );
    },
  },
];

export const residentialquarterroomColumns = (handleDelete) => [
  {
    field: "roomNumber",
    headerName: "Flat No.",
    // width: 120,
    flex:1,
    renderCell: (params, forCSV) => {
      if (forCSV) {
        return params.row.roomNumber;  // Return plain text for CSV
      }
      return (
        <div>
          <Link to={`${window.location.pathname}/${params.row._id}`} >
            {params.row.roomNumber+ (params.row.roomDiv === "-" ? "" : params.row.roomDiv)}
          </Link>
        </div>
      );
    },
  },
  {
    field: "floor",
    headerName:"Floor",
    // width: 100,
    flex:1,
    valueGetter: (params) => {
      const roomNumber = Number(params.row.roomNumber);
      return isNaN(roomNumber) ? 0 : Math.floor(roomNumber / 100) - 1;
    },
  },
  {
    field: "roomTitle",
    headerName: "Flat Title",
    // width: 220,
    flex:1,
  },
  // {
  //   field: "fullName",
  //   headerName: "Occupier Name",
  //   // width: 250,
  //   flex:1.5,
  // },
  // {
  //   field: "userName",
  //   headerName: "Username",
  //   width: 150,
  // },
  {
    field: "roomDesc",
    headerName: "Flat Description",
    // width: 250,
    flex:1.5
  },
  {
    field: "roomStatus",
    headerName: "Occupancy Status",
    // width: 230,
    flex:1.5,
  },
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`${window.location.pathname}/${params.row._id}`}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id,window.location.pathname.split("/")[2])}>Delete</div>
        </div>
      );
    },
  },
];



//////////////////////////////////////  Amenities  /////////////////////////////////////////////


export const amenitiescolumns = (handleDelete) => [
  {
    field: "buildingName",
    headerName: "Amenity Name",
    // width: 450,
    flex:2,
    renderCell: (params) => {
      return (
        <div>
          <Link to={`/amenities/${params.row._id}`}>
            {params.row.buildingName}
          </Link>
        </div>
      );
    },
  },
  // {
  //   field: "total",
  //   headerName: "Total Areas",
  //   width: 200,
  // },
  // {
  //   field: "OccupiedAdminBlockOffices",
  //   headerName: "Occupied Flats",
  //   width: 200,
  // },
  // {
  //   field: "VacantAdminBlockOffices",
  //   headerName: "Vacant Flats",
  //   width: 200,
  // },
  {
    field: "buildingDesc",
    headerName: "Amenity Description",
    // width: 470,
    flex:2,
  },
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/amenities/${params.row._id}`}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id)}>Delete</div>
        </div>
      );
    },
  },
];

export const amenitiescolumnsroomColumns = (handleDelete) => [
  {
    field: "roomNumber",
    headerName: "Area No.",
    // width: 200,
    flex:1.5,
    renderCell: (params, forCSV) => {
      if (forCSV) {
        return params.row.roomNumber;  // Return plain text for CSV
      }
      return (
        <div>
          <Link to={`${window.location.pathname}/${params.row._id}`} >
            {params.row.roomNumber+ (params.row.roomDiv === "-" ? "" : params.row.roomDiv)}
          </Link>
        </div>
      );
    },
  },
  {
    field: "floor",
    headerName:"Floor",
    // width: 100,
    flex:1,
    valueGetter: (params) => {
      const roomNumber = Number(params.row.roomNumber);
      return isNaN(roomNumber) ? 0 : Math.floor(roomNumber / 100) - 1;
    },
  },
  {
    field: "roomTitle",
    headerName: "Area Title",
    // width: 320,
    flex:1.5,
  },
  // {
  //   field: "fullName",
  //   headerName: "Occupied By",
  //   width: 150,
  // },
  // {
  //   field: "userName",
  //   headerName: "Username",
  //   width: 100,
  // },
  {
    field: "roomDesc",
    headerName: "Area Description",
    // width: 250,
    flex:1.5
  },
  {
    field: "roomStatus",
    headerName: "Occupancy Status",
    // width: 300,
    flex:1.5,
  },
  {
    field: "action",
    headerName: "Action",
    // width: 130,
    flex:1,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`${window.location.pathname}/${params.row._id}`}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id,window.location.pathname.split("/")[2])}>Delete</div>
        </div>
      );
    },
  },
];