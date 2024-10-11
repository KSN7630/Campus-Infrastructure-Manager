import React, { useEffect, useState } from "react";
import "./userview.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {
  userroomcurrColumns,
  userroomcurrRows,
  userroomprevColumns,
  userroomprevRows,
  usertravelColumns,
  usertravelRows,
} from "../../datatablesource";
import { userInputs  as originalUserInputs} from "../../formSource";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MetaData from "../../components/layout/Metadata";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/layout/loader/Loader";
import { getUserView } from "../../actions/userActions";
import RoomFilter from "../../components/SearchRoomFilter/searchRoomFilter";
import AlertPopup from '../../components/AlertPopup/Alertpopup';

const handleuserroomcurrClick = (buildingname) => {
  console.log(`Clicked on buildingname: ${buildingname}`);
};

const handleuserroomprevClick = (buildingname) => {
  console.log(`Clicked on buildingname: ${buildingname}`);
};

const handleusertravelClick = (buildingname) => {
  console.log(`Clicked on buildingname: ${buildingname}`);
};


const userInputs = originalUserInputs.filter((input) => input.id !== "password");




const Userview = () => {

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
    isAdmin: "",
    personType: "",
    userName: "",
    fullName: "",
    email: "",
    personDesc: "",
    joiningDate: "",
    leavingDate:"",
    allotedRooms:[],
    prevAllotedRooms:[],
    activityList:[],
    dataAllotedRooms:[],
    dataPrevAllotedRooms:[],
    _id:""
  });

  const [editMode, setEditMode] = useState(false); // Add editMode state
  const [listCurrAllotedRoom, setListCurrAllotedRoom] = useState([]);
//////////////////////////////////////////////////////////////////////////////////
  const location=useLocation();
  console.log(location.pathname.split("/")[2])
  const userId = location.pathname.split("/")[2]; // Replace with the actual user ID

//  useEffect(() => {
//     // Fetch user data from the API and populate the form
//     const fetchUserData = async () => {
//       try {

//         // const response = await axios.get(`/users/${userId}`); // Replace with your API endpoint
//         // // const response = await axios.get(`/users/profile/me`); // Replace with your API endpoint
//         // const userData = response.data; // Assuming the response contains user data
//         // console.log(userData)
//         // // Update the form values with fetched data

//         let response;
//         let userData;
//         if (userId) {
//           response = await axios.get(`/users/${userId}`);
//            userData = response.data;
//         } else {
//           response = await axios.get(`/users/profile/me`);
//           userData = response.data.user;
//         }


//         setFormValues(userData);



//          // Fetch additional information for each room in currRoomAlloted list
//         const roomFetchPromises = userData.allotedRooms.map(async (roomId) => {
//           const roomResponse = await axios.get(`/rooms/${roomId}`); // Replace with your API endpoint for fetching room details
//           return roomResponse.data; // Assuming the response contains room data
//         });

//         const dataAllotedRooms = await Promise.all(roomFetchPromises);
//         const mappedRoomsAllotedData = dataAllotedRooms.map((room) => ({
//           id: room._id, // Use _id as id
//           ...room, // Spread the rest of the room properties
//           buildingName: room.buildingName || "Dummy", // Apply default if buildingName is undefined
//         }));
//         setListCurrAllotedRoom(mappedRoomsAllotedData);



//         // Fetch additional information for each room in prevRoomAlloted list
//         const prevRoomFetchPromises = userData.prevAllotedRooms.map(async (roomId) => {
//           const roomResponse = await axios.get(`/rooms/${roomId}`); // Replace with your API endpoint for fetching room details
//           return roomResponse.data; // Assuming the response contains room data
//         });

//         const dataAllotedPrevRooms = await Promise.all(prevRoomFetchPromises);
//         const mappedRoomPrevsAllotedData = dataAllotedPrevRooms.map((room) => ({
//           id: room._id, // Use _id as id
//           ...room, // Spread the rest of the room properties
//           buildingName: room.buildingName || "Dummy", // Apply default if buildingName is undefined
//         }));



//         // Fetch additional information for each room in Activity list
//         const activityFetchPromises = userData.activityList.map(async (acId) => {
//           const roomResponse = await axios.get(`/activities/${acId}`); // Replace with your API endpoint for fetching room details
//           return roomResponse.data; // Assuming the response contains room data
//         });

//         const dataActivity = await Promise.all(activityFetchPromises);
//         const mapActivities = dataActivity.map((activity) => ({
//           id: activity._id, // Use _id as id
//           ...activity, // Spread the rest of the room properties
//         }));
        

//         setFormValues((prevValues) => ({
//           ...prevValues,
//           ...userData,
//           dataAllotedRooms:mappedRoomsAllotedData, // Add the fetched room data to the form values
//           dataPrevAllotedRooms:mappedRoomPrevsAllotedData,
//           dataActivities:mapActivities
//         }));
    
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [userId]);



  const dispatch = useDispatch();
  const { loading, error, userContentData= {} } = useSelector((state) => state.userContent);

  useEffect(() => {
    dispatch(getUserView(userId));
    // console.log(roomContentData)
  }, [dispatch]);

  useEffect(() => {
    if (userContentData) {
      const {userData,mappedRoomsAllotedData,mappedRoomPrevsAllotedData,mapActivities} = userContentData;
      
      if (userData) {
        // console.log("userData", userData);
        // const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
        const updatedFormValues = {
          ...formValues,
          joiningDate: formValues.joiningDate ? new Date(formValues.joiningDate).toISOString().split('T')[0] : null,
          leavingDate: formValues.leavingDate ? new Date(formValues.leavingDate).toISOString().split('T')[0] : null
        };
        console.log(updatedFormValues)
        setFormValues(updatedFormValues);
      }
      
      if(mappedRoomsAllotedData){
        setListCurrAllotedRoom(mappedRoomsAllotedData);
      }
      setFormValues((prevValues) => ({
          ...prevValues,
          ...userData,
          dataAllotedRooms:mappedRoomsAllotedData,
          dataPrevAllotedRooms:mappedRoomPrevsAllotedData,
          dataActivities:mapActivities
        }));
  
    }
  }, [userContentData]);
  ////////////////////////////////////////////////////////////////////////////////


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

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the API endpoint
      await axios.put(`/users/${userId}`, formValues); // Replace with your API endpoint

      // Update edit mode and display a success message
      setEditMode(false);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Display an error message to the user
      alert("An error occurred while submitting the form.");
    }
  };
  const handleEditClick = () => {
    setEditMode(true);
    console.log(formValues)
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };
  

  
  const handleRemove = async (id) => {
    try {
      await axios.put(`/users/${userId}/removeRoom/${id}`);
      // Fetch user data again to update the room list
      setListCurrAllotedRoom((prevList) => prevList.filter((item) => item.id !== id));
      handleShowAlert("success", "Done!", "User has been removed from current rooom successfully");
    } catch (error) {
      console.error("Error removing room:", error);
      // Display an error message to the user
      // next(error);
    }
  };

  


  return (
    <>
    <MetaData title="User-View"/>
    <>
    {
      loading ? (<Loader/>):(
    <div className="userview">
      <Sidebar />
      <div className="userviewContainer">
        <Navbar />
        <div className="top">
          <h1>User View</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              {/* Form Inputs */}
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  readOnly={!editMode}
                  style={{ display: "none" }}
                />
              </div>
              {userInputs.map((input ) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {/* Form Input Types */}
                  {input.type === "dropdown" ? (
                    <select
                      name={input.id}
                      value={formValues[input.id]}  
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
                  ) : input.type === "textarea" ? (
                    <textarea
                      name={input.id}
                      rows={4}
                      value={formValues[input.id]} 
                      onChange={handleInputChange}
                      placeholder={input.placeholder}
                      readOnly={!editMode}
                    />
                  ) : input.type === "date" ? (
                    <input
                      type="date"
                      name={input.id}
                      value={formValues[input.id]}  
                      onChange={handleInputChange}
                      readOnly={!editMode}
                    />
                  ) : (
                    <input
                      type={input.type}
                      name={input.id}
                      value={formValues[input.id]}  
                      onChange={handleInputChange}
                      placeholder={input.placeholder}
                      required={input.required}
                      readOnly={!editMode}
                    />
                  )}
                </div>
              ))}
              {/* <button type="submit">Send</button>
              <button type="submit">Edit</button> */}
              
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
          </div>
        </div>


        <div><RoomFilter  userId={formValues._id} /></div>
        {/* Table 1 */}
        {formValues.dataAllotedRooms ? (
          <Datatable
            title="Current User Rooms"
            columns={userroomcurrColumns(handleuserroomcurrClick,handleRemove)}
            rows={listCurrAllotedRoom}
          />
        ) : (
          <p>Loading room data...</p>
        )}

        {/* table 2 */}
        {formValues.dataPrevAllotedRooms ? (
          <Datatable
          title="Previous User Rooms"
          columns={userroomprevColumns(handleuserroomprevClick)}
          rows={formValues.dataPrevAllotedRooms}
          addNewLink="#"
          />
        ) : (
          <p>Loading room data...</p>
        )}
        {/* Table 3 */}
          {formValues.dataActivities ? (
            <Datatable
              title="User Travel History"
              columns={usertravelColumns(handleusertravelClick)}
              rows={formValues.dataActivities}
              addNewLink="#"
            />
          ) : (
            <p>Loading room data...</p>
          )}
        </div>
    </div>
    )}
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

export default Userview;


