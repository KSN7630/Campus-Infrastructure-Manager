import axios from "axios";
import { ALL_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, ALL_USER_VIEW_FAIL, ALL_USER_VIEW_REQUEST, ALL_USER_VIEW_SUCCESS } from "../constants/userConstant";



export const getUsers= (link)=>
    async (dispatch) => {
    try {
        dispatch({ type: ALL_USER_REQUEST });

        const { data } = await axios.get(link);

        dispatch({
        type: ALL_USER_SUCCESS,
        payload: data,
        });
    } catch (error) {
        dispatch({
        type: ALL_USER_FAIL,
        payload: error.response.data.message,
        });
    }
};



export const getUserView = (userId) => async (dispatch) => {
    try {
      dispatch({ type: ALL_USER_VIEW_REQUEST });

      const fetchUserData = async () => {
        try {
          let response;
          let userData;
          if (userId) {
            response = await axios.get(`/users/${userId}`);
             userData = response.data;
          } else {
            response = await axios.get(`/users/profile/me`);
            userData = response.data.user;
          }
        //   setFormValues(userData);------------------------------------------------------------
  
           // Fetch additional information for each room in currRoomAlloted list
          const roomFetchPromises = userData.allotedRooms.map(async (roomId) => {
            const roomResponse = await axios.get(`/rooms/${roomId}`); // Replace with your API endpoint for fetching room details
            return roomResponse.data; // Assuming the response contains room data
          });
  
          const dataAllotedRooms = await Promise.all(roomFetchPromises);
          const mappedRoomsAllotedData = dataAllotedRooms.map((room) => ({
            id: room._id, // Use _id as id
            ...room, // Spread the rest of the room properties
            buildingName: room.buildingName || "Dummy", // Apply default if buildingName is undefined
            floor:Math.floor(room.roomNumber / 100) - 1,
          }));
        //   setListCurrAllotedRoom(mappedRoomsAllotedData);-----------------------------------------------------
  
          // Fetch additional information for each room in prevRoomAlloted list
          const prevRoomFetchPromises = userData.prevAllotedRooms.map(async (roomId) => {
            const roomResponse = await axios.get(`/rooms/${roomId}`); // Replace with your API endpoint for fetching room details
            return roomResponse.data; // Assuming the response contains room data
          });
  
          const dataAllotedPrevRooms = await Promise.all(prevRoomFetchPromises);
          const mappedRoomPrevsAllotedData = dataAllotedPrevRooms.map((room) => ({
            id: room._id, // Use _id as id
            ...room, // Spread the rest of the room properties
            buildingName: room.buildingName || "Dummy", // Apply default if buildingName is undefined
            floor:Math.floor(room.roomNumber / 100) - 1,
          }));
  
          // Fetch additional information for each room in Activity list
          const activityFetchPromises = userData.activityList.map(async (acId) => {
            const roomResponse = await axios.get(`/activities/${acId}`); // Replace with your API endpoint for fetching room details
            return roomResponse.data; // Assuming the response contains room data
          });
  
          const dataActivity = await Promise.all(activityFetchPromises);
          const mapActivities = dataActivity.map((activity) => ({
            id: activity._id, // Use _id as id
            ...activity, // Spread the rest of the room properties
          }));
          
      
        dispatch({
            type: ALL_USER_VIEW_SUCCESS,
            payload: {userData,mappedRoomsAllotedData,mappedRoomPrevsAllotedData,mapActivities},
        });
      
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUserData();
   
    } catch (error) {
      console.error("Error in the outer try block:", error);
  
      dispatch({
        type: ALL_USER_VIEW_FAIL,
        payload: error.response.data.message,
      });
    }
};