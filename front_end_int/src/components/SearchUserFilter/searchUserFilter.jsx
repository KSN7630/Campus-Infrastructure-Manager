import React, { useState } from 'react';
import axios from 'axios';
import './searchUserFilter.css';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import Datatable from '../datatable/Datatable';
import { Link } from 'react-router-dom';
import AlertPopup from '../../components/AlertPopup/Alertpopup';

const UserFilter = ({ userId }) => {

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
    Username:'',
    Name:'',
    IsAdmin:'',
    Designation:'',
    JoiningDate:'',
    Email:''

  });

  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleFilter = async () => {
    try {
      const filteredValues = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );

      const queryParams = new URLSearchParams(filteredValues);

      const response = await axios.get(`/users/new/filter?${queryParams.toString()}`);
      console.log(response)
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error filtering rooms:', error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`users/${id}`);
      setFilteredUsers((prevList) => prevList.filter((item) => item._id !== id));
      handleShowAlert("success", "Done!", "User Deleted Successfully");
    } catch (err) {
      console.error("Error deleting data:", err);
      handleShowAlert("error", "Error Occurred !","Error Occured while deleting User.This may be due to unexpected changes.Please refresh page");
    }
  };
// };


  const columns = [
    {
      field: "userName",
      headerName: "User Name/Roll No",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Link to={`/userlist/${params.row._id}`}>
              {params.row.userName}
            </Link>
          </div>
        );
      }
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "personType",
      headerName: "Designation",
      flex: 1,
    },
    {
      field: "joiningDate",
      headerName: "Joining Date",
      flex: 1,
      valueGetter: (params) => {
        const dateData = params.row.joiningDate;
    
        // Convert date string to "YYYY-MM-DD" format
        const formattedDate = new Date(dateData).toISOString().split('T')[0];
    
        return formattedDate;
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex:1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
          <Link to={`/userlist/${params.row._id}`}
              onClick={() => console.log(params.row._id)}
              style={{ textDecoration: 'none' }}> 
              <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row._id)}>Delete</div>
        </div>
        );
      },
    }
  ];

  
  const rDesignaltionOptions = [
    { label: 'Designation', value: '' },
    { label: 'Student', value: 'Student' },
    { label: 'Faculty', value: 'Faculty' },
    { label: 'Staff', value: 'Staff' },
    { label: 'Other', value: 'Other' },
  ];

  const rIsAdminOptions = [
    { label: 'Role', value: '' },
    { label: 'Admin', value: 'true' },
    { label: 'Not Admin', value: 'false' },
  ];



  return (
    <div className="user-filter-container">
        <h2>Search User From Here</h2>
      <div className="filtered-inputs">
      <input
          className="user-filter-input"
          type="text"
          placeholder="User Name"
          value={filters.Username}
          onChange={(e) => setFilters({ ...filters, Username: e.target.value })}
        />
        <input
          className="user-filter-input"
          type="text"
          placeholder="Full Name"
          value={filters.Name}
          onChange={(e) => setFilters({ ...filters, Name: e.target.value })}
        />
        <Select
            id="statusSelect"
            options={rIsAdminOptions}
            value={rIsAdminOptions.find(option => option.value === filters.IsAdmin)}
            onChange={(selectedOption) => setFilters({ ...filters, IsAdmin: selectedOption.value })}
            className="react-select-container" // Add this class
            classNamePrefix="react-select"
          />
        <Select
            id="statusSelect"
            options={rDesignaltionOptions}
            value={rDesignaltionOptions.find(option => option.value === filters.Designation)}
            onChange={(selectedOption) => setFilters({ ...filters, Designation: selectedOption.value })}
            className="react-select-container" // Add this class
            classNamePrefix="react-select"
          />
        <DatePicker
          selected={filters.JoiningDate}
          onChange={(date) => setFilters({ ...filters, JoiningDate: date })}
          placeholderText="Joining Date"
          className="user-filter-input"
        />
        <input
          className="user-filter-input"
          type="text"
          placeholder="Email"
          value={filters.Email}
          onChange={(e) => setFilters({ ...filters, Email: e.target.value })}
        />
      </div>

      <div className="button-container">
        <button className="user-filter-button" onClick={handleFilter}>
          Apply Filters
        </button>
        <button
          className="user-filter-cancel-button"
          onClick={() =>
            setFilters({
                Username:'',
                Name:'',
                IsAdmin:'',
                Designation:'',
                JoiningDate:'',
                Email:''
            })
          }
        >
          Clear Filters
        </button>
      </div>
      <Datatable
            rows={filteredUsers}
            columns={columns}
            title="Filtered Users"
        />
        {/* Conditionally render the AlertPopup component */}
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

export default UserFilter;
