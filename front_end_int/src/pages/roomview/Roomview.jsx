import React, { useEffect, useState } from "react";
import "./roomview.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";

import {
  roompresentColumns,
  roomabsentColumns,
  roomprevColumns,
} from "../../datatablesource";
import { roomInputs } from "../../formSource";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MetaData from "../../components/layout/Metadata";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/layout/loader/Loader";
import { getRoomView } from "../../actions/buildingAction";
import RoomOccupantForm from "../../components/AddUserForm/RoomOccupantForm ";
import UserFilter from "../../components/SearchUserFilter/searchUserFilter";
import AlertPopup from '../../components/AlertPopup/Alertpopup';


const handleroompresentClick = (username) => {
  console.log(`Clicked on username: ${username}`);
};

const handleroomabsentClick = (username) => {
  console.log(`Clicked on username: ${username}`);
};

const handleroomprevClick = (username) => {
  console.log(`Clicked on username: ${username}`);
};

const Roomview = () => {


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

  const [file, setFile] = useState("");
  const [formValues, setFormValues] = useState({
    roomNumber: "",
    roomStatus: "",
    roomTitle: "",
    roomCurrOccu: [],
    personOnLeave: [],
    roomPrevOccu: [],
    buildingName:"",
  });
  
  const [listCurrOccupants, setListCurrOccupants] = useState([]);
  const [listOccupantsOnLeave, setListOccupantsOnLeave] = useState([]);
  const [listPrevOccupants, setListPrevOccupants] = useState([]);




 /////////////////////////////////////////////////////////////////////////////////////////////////
  const [editMode, setEditMode] = useState(false); // Add editMode state

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const location = useLocation();
  const roomId = location.pathname.split("/")[3];

  const dispatch = useDispatch();
  const { loading, error, roomContentData= {} } = useSelector((state) => state.roomContent);
  
  

  useEffect(() => {
    dispatch(getRoomView(roomId));
  }, [dispatch]);

  useEffect(() => {
    if (roomContentData) {
      const { roomData, mapdataCurrOccupants, mapdataOccupantsOnLeave, mapdataPrevOccupants } = roomContentData;
      
      if (roomData) {
        console.log("roomData", roomData);
        setFormValues(roomData);
      }
      
      if(mapdataCurrOccupants){
        setListCurrOccupants(mapdataCurrOccupants);
      }
      if(mapdataOccupantsOnLeave){
        setListOccupantsOnLeave(mapdataOccupantsOnLeave);
      }
      if(mapdataPrevOccupants){
        setListPrevOccupants(mapdataPrevOccupants);  
      }
  
    }
  }, [roomContentData]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the API endpoint
      await axios.put(`/rooms/${roomId}`, formValues); // Replace with your API endpoint

      // Update edit mode and display a success message
      setEditMode(false);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Display an error message to the user
      
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
    console.log(formValues);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleRemoveUserFromRoom = async (userId) => {
    try {
      const res=await axios.put(`/rooms/${roomId}/remove/${userId}`);
      setListCurrOccupants((prevList) => prevList.filter((item) => item.id !== userId));
      handleShowAlert("success", "Done!", "User has been removed from current rooom successfully");
    } catch (error) {
      handleShowAlert("error", "Error Occurred !",
     "Error Occured while removing user from room.This may be due to unexpected changes in database.Please refresh page to see changes");
    }
  };

  const renderInput = (input) => {
  if (input.type === 'dropdown') {
    return (
      <select
        name={input.id}
        value={formValues[input.id] === 'None' || formValues[input.id] === '-' ? ' ' : formValues[input.id]}
        onChange={handleInputChange}
        disabled={!editMode}
      >
        <option value="">{input.placeholder}</option>
        {input.options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else if (input.type === 'textarea') {
    return (
      <textarea
        name={input.id}
        rows={4}
        value={formValues[input.id]}
        onChange={handleInputChange}
        placeholder={input.placeholder}
        readOnly={!editMode}
      />
    );
  } else if (input.type === 'date') {
    return (
      <input
        type="date"
        name={input.id}
        value={formValues[input.id]}
        onChange={handleInputChange}
        readOnly={!editMode}
      />
    );
  } else {
    return (
      <input
        type={input.type}
        name={input.id}
        value={formValues[input.id]}
        onChange={handleInputChange}
        placeholder={input.placeholder}
        required={input.required}
        readOnly={!editMode}
      />
    );
  }
};

  return (
    <>
    <MetaData title="Room-View"/>
    <>
    {
      loading ? (<Loader/>):(
    <div className="userview">
      <Sidebar />
      <div className="userviewContainer">
        <Navbar />
        <div className="top">
          <h1>Room View</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form className="formdata" onSubmit={handleSubmit}>

                    <div className="formInputRow">
                      {roomInputs.slice(0, 3).map((input) => (
                        <div className="formInput" key={input.id}>
                          <label>{input.label}</label>
                          {renderInput(input)}
                        </div>
                      ))}
                    </div>
                    <div className="formInputRow">
                      {roomInputs.slice(3, 6).map((input) => (
                        <div className="formInput" key={input.id}>
                          <label>{input.label}</label>
                          {renderInput(input)}
                        </div>
                      ))}
                    </div>
              
              <div className="button-group">
                <button type="submit" disabled={!editMode}>
                  Save
                </button>
                {editMode ? (
                  <button type="button" onClick={handleCancelClick}>
                    Cancel
                  </button>
                ) : (
                  <button type="button" onClick={handleEditClick}>
                    Edit
                  </button>
                )}
        
            </div>
            
            </form>
                    {/* Table 1 */}
                {listCurrOccupants ? (
                  <Datatable
                    title="Current Occupier"
                    columns={roompresentColumns(handleroompresentClick,handleRemoveUserFromRoom)}
                    rows={listCurrOccupants}

                  />
                ) : (
                  <p>Loading occupant data...please wait</p>
                )}

                {/* Table 2 */}
                {listOccupantsOnLeave ? (
                  <Datatable
                    title="Occupier on Leave"
                    columns={roomabsentColumns(handleroomabsentClick)}
                    rows={listOccupantsOnLeave}

                  />
                ) : (
                  <p>Loading occupant data...please wait</p>
                )}

                {/* Table 3 */}
                {listPrevOccupants ? (
                  <Datatable
                    title="Previous Occupier"
                    columns={roomprevColumns(handleroomprevClick)}
                    rows={listPrevOccupants}
                  />
                ) : (
                  <p>Loading occupant data...please wait</p>
                )}
          </div>
        </div>
      </div>
     </div>
     
     )
    }
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
    </> 
  </>
  );
};

export default Roomview;









