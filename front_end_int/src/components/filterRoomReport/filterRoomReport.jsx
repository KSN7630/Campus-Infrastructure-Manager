import React, { useState } from 'react';
import axios from 'axios';
import './filterRoomReport.css';
import Select from 'react-select';
import Datatable from '../datatable/Datatable';
import AlertPopup from '../../components/AlertPopup/Alertpopup';
import { Link } from 'react-router-dom';


const FilterRooms = ({ userId }) => {
  
    //Alert Notification usestate and function starts
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error"); // Default severity
  const [alertTitle, setAlertTitle] = useState("Error Occurred");
  const [alertMessage, setAlertMessage] = useState("");

  const handleShowAlert = (severity, title, message) => {
    setAlertSeverity(severity);
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertOpen(true);
  };
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  //Alert Notification usestate and functions ends



  const [filters, setFilters] = useState({
    RNo: '',
    RDiv: '',
    Bname: '',
    Rtitle: '',
    Rcode: '',
    Rstatus:'',
    Rkeyword:''
  });

  const [filteredRooms, setFilteredRooms] = useState([]);

  const handleFilter = async () => {
    try {
      const filteredValues = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );

      const queryParams = new URLSearchParams(filteredValues);

      const response = await axios.get(`/rooms/new/search?${queryParams.toString()}`);
      setFilteredRooms(response.data);
    } catch (error) {
      console.error('Error filtering rooms:', error.message);
    }
  };


  const rStatusOptions = [
    { label: 'Room Status', value: '' },
    { label: 'Occupied and Locked', value: 'Occupied and Locked' },
    { label: 'Occupied and Open', value: 'Occupied and Open' },
    { label: 'Vacant', value: 'Vacant' },
  ];

  const rRoomDiv = [
    { label: "Div", value: '' },
    { label: "None", value: 'None' },
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: "D", value: 'D' },
    { label: "E", value: 'E' },
    { label: "W", value: 'W' },
    { label: "N", value: 'N' },
    { label: "S", value: 'S' },
  ];

  const rRoomTitleOptions = [
    { label: "Room Title", value: '' },
    { label: "Store Room", value: 'Store Room' },
    { label: 'Reasearch Laboratory', value: 'Reasearch Laboratory' },
    { label: 'Classroom', value: 'Classroom' },
    { label: 'Auditorioum', value: 'Auditorioum' },
    { label: "Meeting Room", value: 'Meeting Room' },
    { label: "Faculty Office", value: 'Faculty Office' },
    { label: "Staff Office", value: 'Staff Office' },
    { label: "Student Room", value: 'Student Room' },
    { label: "Common Room", value: 'Common Room' },
    { label: "TV Room", value: 'TV Room' },
    { label: "2-BHK", value: '2-BHK' },
    { label: "Department Office", value: 'Department Office' },
    { label: "Discussion Room", value: 'Discussion Room' },
    { label: "Badminton Court", value: 'Badminton Court' },
    { label: "TableTennis Court", value: 'TableTennis Court' },

    
  ];
  const handleDelete = async (id,path) => {
    try {
      console.log("Path:",path);
      let roomdeletelink=`/rooms/${id}/${path}`
      console.log("Room Delete Link ",roomdeletelink);
      await axios.delete(roomdeletelink);
      setFilteredRooms((prevList) => prevList.filter((item) => item._id !== id));
      console.log("Invoking handleshowalert")
      handleShowAlert("success", "Done!", "Room Deleted Successfully and Room Record has been removed from occupiers data");
    } catch (err) {
      console.error("Error deleting data:", err);
      handleShowAlert("error", "Error Occured!", err);
    }
  };

  const columns = [
    {
      field: "buildingName",
      headerName: "Building Name",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Link to={`/${params.row.buildingType.toLowerCase()+'s'}/${params.row.buildingId}`} >
              {params.row.buildingName}
            </Link>
          </div>
        );
      },
    },
    {
      field: "roomNumber",
      headerName: "Room Number",
      flex: 1,
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
      headerName: "Room Title",
      flex: 1,
    },
    {
      field: "roomStatus",
      headerName: "Room Status",
      flex: 1,
    },
    // {
    //   field: "roomDesc",
    //   headerName: "Room Description",
    //   flex: 1,
    // },
    {
      field: "action",
      headerName: "Action",
      flex:1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${params.row.buildingType.toLowerCase()+'s'}/${params.row.buildingId}`}
              onClick={() => console.log(params.row._id)}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">Visit</div>
            </Link>
            <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id,params.row.buildingId)}
              >
                Delete
              </div>
          </div>
        );
      },
    }
  ];

  
  return (
    <div className="room-filter-container">
      <h2>Find Room Details</h2>
      <div className="filtered-inputs">
        <input
          className="room-filter-input"
          type="text"
          placeholder="Building Name"
          value={filters.Bname}
          onChange={(e) => setFilters({ ...filters, Bname: e.target.value })}
        />
        <input
          className="room-filter-input"
          type="text"
          placeholder="Room Number"
          value={filters.RNo}
          onChange={(e) => setFilters({ ...filters, RNo: e.target.value })}
        />
        
        <Select
            id="statusSelect"
            options={rRoomDiv}
            value={rRoomDiv.find(option => option.value === filters.RDiv)}
            onChange={(selectedOption) => setFilters({ ...filters, RDiv: selectedOption.value })}
            className="react-select-container" // Add this class
            classNamePrefix="react-select"
          />
    

        <Select
            id="statusSelect"
            options={rRoomTitleOptions}
            value={rRoomTitleOptions.find(option => option.value === filters.Rtitle)}
            onChange={(selectedOption) => setFilters({ ...filters, Rtitle: selectedOption.value })}
            className="react-select-container" // Add this class
            classNamePrefix="react-select"
          />
        <Select
            id="statusSelect"
            options={rStatusOptions}
            value={rStatusOptions.find(option => option.value === filters.Rstatus)}
            onChange={(selectedOption) => setFilters({ ...filters, Rstatus: selectedOption.value })}
            className="react-select-container" // Add this class
            classNamePrefix="react-select"
          />  
      </div>
      <div className="filtered-inputs">
         <input
          className="room-filter-input"
          type="text"
          placeholder="Search keyword"
          value={filters.Rkeyword}
          onChange={(e) => setFilters({ ...filters, Rkeyword: e.target.value })}
        />
      </div>

      <div className="button-container">
        <button className="room-filter-button" onClick={handleFilter}>
          Apply Filters
        </button>
        <button
          className="room-filter-cancel-button"
          onClick={() =>
            setFilters({
              RNo: '',
              RDiv: '',
              Bname: '',
              Rtitle: '',
              Rcode: '',
              Rstatus:'',
            })
          }
        >
          Clear Filters
        </button>
      </div>
        <Datatable
            columns={columns}
            rows={filteredRooms}
            title="Filtered Rooms"
        />
        {alertOpen && (
          <AlertPopup
            open={alertOpen}
            onClose={handleCloseAlert}
            severity={alertSeverity}
            title={alertTitle}
            message={alertMessage}
          />
        )}
    </div>
  );
};

export default FilterRooms;
