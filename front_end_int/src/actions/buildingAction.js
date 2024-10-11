import axios from "axios";


import {ALL_BUILDING_REQUEST,ALL_BUILDING_SUCCESS,ALL_BUILDING_FAIL, CLEAR_ERRORS,
    ALL_ROOM_REQUEST,ALL_ROOM_SUCCESS,ALL_ROOM_FAIL,
    ALL_ROOM_VIEW_REQUEST, ALL_ROOM_VIEW_SUCCESS, ALL_ROOM_VIEW_FAIL



} from "../constants/buildingConstant"


export const getBuilding= (link)=>
    async (dispatch) => {
    try {
        dispatch({ type: ALL_BUILDING_REQUEST });

        const { data } = await axios.get(link);
       

        dispatch({
        type: ALL_BUILDING_SUCCESS,
        payload: data,
        });
    } catch (error) {
        dispatch({
        type: ALL_BUILDING_FAIL,
        payload: error.message,
        });
    }
};

//v1
// export const getRoom= (link)=>
//     async (dispatch) => {
//     try {
//         dispatch({ type: ALL_ROOM_REQUEST });

//         const { data } = await axios.get(link);
        
//         const fetchOccupierData = async () => {
//             const occupierIds = data.reduce((ids, item) => [...ids, ...item.roomCurrOccu], []);
//             console.log(occupierIds)
//             const occupierData = await Promise.all(
              
//               occupierIds.map((occupierId) => axios.get(`/users/${occupierId}`))
//             );
            
//             return occupierData.map((res) => res.data);
            
//         };
//         fetchOccupierData().then((occupierData) => {
//             console.log("occupierData")
//             console.log(occupierData)
//             const formattedData = data.map((item) => ({
//               ...item,
//               id: item._id,
//               userName: item.roomCurrOccu.map((occupierId) => {
//                 // Find the corresponding occupier information based on the ID
//                 const occupierInfo = occupierData.find((occupier) => occupier._id === occupierId);
//                 return occupierInfo ? occupierInfo.userName : ""; // Return the username or an empty string if not found
//               }),
//               fullName:item.roomCurrOccu.map((occupierId) => {
//                 // Find the corresponding occupier information based on the ID
//                 const occupierInfo = occupierData.find((occupier) => occupier._id === occupierId);
//                 return occupierInfo ? occupierInfo.fullName : ""; // Return the username or an empty string if not found
//               }),
//               allotedcount:item.roomCurrOccu.length+item.personOnLeave.length 
//             }));
//             console.log("formattedData")
//             console.log(formattedData)
            
//           })


//         dispatch({
//         type: ALL_ROOM_SUCCESS,
//         payload: formattedData,
//         });
//     } catch (error) {
//         dispatch({
//         type: ALL_ROOM_FAIL,
//         payload: error.response.data.message,
//         });
//     }
// };

//v2
// export const getRoom = (link) =>
//     async (dispatch) => {
//     try {
//         dispatch({ type: ALL_ROOM_REQUEST });

//         const { data } = await axios.get(link);
      

//         const fetchOccupierData = async () => {
//             const occupierIds = data.reduce((ids, item) => [...ids, ...item.roomCurrOccu], []);
//             const occupierData = await Promise.all(
//                 occupierIds.map((occupierId) => axios.get(`/users/${occupierId}`))
//             );
//             return occupierData.map((res) => res.data);
//         };

//         fetchOccupierData()
//       .then((occupierData) => {
//         const { formattedData, roomTitleCount ,occupancyCount } = data.reduce(
//           (result, item) => {
//             const roomNumber = item.roomNumber + (item.roomDiv === "-" || item.roomDiv === "None" ? "" : item.roomDiv);

//             result.formattedData.push({
//               ...item,
//               roomNumber,
//               id: item._id,
//               userName: item.roomCurrOccu.map((occupierId) => {
//                 const occupierInfo = occupierData.find((occupier) => occupier._id === occupierId);
//                 return occupierInfo ? occupierInfo.userName : "";
//               }),
//               fullName: item.roomCurrOccu.map((occupierId) => {
//                 const occupierInfo = occupierData.find((occupier) => occupier._id === occupierId);
//                 return occupierInfo ? occupierInfo.fullName : "";
//               }),
//               allotedcount: item.roomCurrOccu.length + item.personOnLeave.length,
//               floor: Math.floor(item.roomNumber / 100) - 1,
//             });

//             // Count rooms by roomTitle
//             result.roomTitleCount[item.roomTitle] = (result.roomTitleCount[item.roomTitle] || 0) + 1;

//             if (item.roomStatus === "Vacant") {
//               result.occupancyCount.Vacant += 1;
//             } else if (item.roomStatus === "Occupied and Locked") {
//               result.occupancyCount.OccupiedAndLocked += 1;
//             } else if (item.roomStatus === "Occupied and Open") {
//               result.occupancyCount.OccupiedAndOpen += 1;
//             }
//             console.log(result);
//             return result;
//           },
//           { formattedData: [], roomTitleCount: {}, occupancyCount: { Vacant: 0, OccupiedAndLocked: 0, OccupiedAndOpen: 0 } }
//         );

//         dispatch({
//           type: ALL_ROOM_SUCCESS,
//           payload: {
//             formattedData,
//             roomTitleCount,
//             occupancyCount,


//           },
//         });
//         }).catch((error) => {
//             dispatch({
//                 type: ALL_ROOM_FAIL,
//                 payload: error.message,
//             });
//         });

//     } catch (error) {
//         dispatch({
//             type: ALL_ROOM_FAIL,
//             payload: error.message,
//         });
//     }
// };

//v3
export const getRoom = (link) =>
    async (dispatch) => {
    try {
        dispatch({ type: ALL_ROOM_REQUEST });
        const response= await axios.get(link);
        const roomData=response.data.roomData;
        const buildingData=response.data.buildingData;
       
        const { roomTitleCount, occupancyCount } = roomData.reduce(
          (result, item) => {
            // Count rooms by roomTitle
            result.roomTitleCount[item.roomTitle] = (result.roomTitleCount[item.roomTitle] || 0) + 1;
    
            const statusCountKey =
              item.roomStatus === "Vacant"
                ? "Vacant"
                : item.roomStatus === "Occupied and Locked"
                ? "OccupiedAndLocked"
                : "OccupiedAndOpen";
            result.occupancyCount[statusCountKey] += 1;
    
            return result;
          },
          {
            roomTitleCount: {},
            occupancyCount: { Vacant: 0, OccupiedAndLocked: 0, OccupiedAndOpen: 0 },
          }
        );

        dispatch({
          type: ALL_ROOM_SUCCESS,
          payload: {
            roomData,
            roomTitleCount,
            occupancyCount,
            buildingData
          },
        });
    } catch (error) {
        dispatch({
            type: ALL_ROOM_FAIL,
            payload: error.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};



// export const getRoomView = (link) =>
//     async (dispatch) => {
//     try {
//         dispatch({ type: ALL_ROOM_VIEW_REQUEST });

//         const fetchRoomData = async () => {
//             try {
//               const response = await axios.get(`/rooms/${roomId}`);
//               const roomData = response.data;
//               setFormValues(roomData);
      
//               // Fetch additional information for each occupant in roomCurrOccu list
//               const currOccupantFetchPromises = roomData.roomCurrOccu.map(async (occupantId) => {
//                 const occupantResponse = await axios.get(`/users/${occupantId}`);
//                 return occupantResponse.data;
//               });
      
//               const dataCurrOccupants = await Promise.all(currOccupantFetchPromises);
//               const mapdataCurrOccupants = dataCurrOccupants.map((occupant) => ({
//                 id: occupant._id, // Use _id as id
//                 ...occupant, // Spread the rest of the room properties
//               }));
//               setListCurrOccupants(mapdataCurrOccupants);
      
      
      
      
//               // Fetch additional information for each occupant in personOnLeave list
//               const occupantOnLeaveFetchPromises = roomData.personOnLeave.map(async (occupantId) => {
//                 const occupantResponse = await axios.get(`/users/${occupantId}`);
//                 return occupantResponse.data;
//               });
      
//               const dataOccupantsOnLeave = await Promise.all(occupantOnLeaveFetchPromises);
      
//               const mapdataOccupantsOnLeave = dataOccupantsOnLeave.map((occupant) => ({
//                 id: occupant._id, // Use _id as id
//                 ...occupant, // Spread the rest of the room properties
//               }));
//               setListOccupantsOnLeave(mapdataOccupantsOnLeave);
      
      
      
      
      
//               // Fetch additional information for each occupant in roomPrevOccu list
//               const prevOccupantFetchPromises = roomData.roomPrevOccu.map(async (occupantId) => {
//                 const occupantResponse = await axios.get(`/users/${occupantId}`);
//                 return occupantResponse.data;
//               });
      
//               const dataPrevOccupants = await Promise.all(prevOccupantFetchPromises);
      
//               const mapdataPrevOccupants = dataPrevOccupants.map((occupant) => ({
//                 id: occupant._id, // Use _id as id
//                 ...occupant, // Spread the rest of the room properties
//               }));
//               setListPrevOccupants(mapdataPrevOccupants);
//             } catch (error) {
//               console.error("Error fetching room data:", error);
//             }
//           };
      
//           fetchRoomData();

//             // Dispatch the action with formattedData inside the callback
//             dispatch({
//                 type: ALL_ROOM_VIEW_SUCCESS,
//                 payload: formattedData,
//             });
//         }catch((error) => {
//             dispatch({
//                 type: ALL_ROOM_VIEW_FAIL,
//                 payload: error.response.data.message,
//             });
//         });

//     }catch (error) {
//         dispatch({
//             type: ALL_ROOM_VIEW_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };



export const getRoomView = (roomId) => async (dispatch) => {
    try {
      dispatch({ type: ALL_ROOM_VIEW_REQUEST });

      const fetchRoomData = async () => {
        try {
          const response = await axios.get(`/rooms/${roomId}`);
          const roomData = response.data;
       
  
          // Fetch additional information for each occupant in roomCurrOccu list
          const currOccupantFetchPromises = roomData.roomCurrOccu.map(async (occupantId) => {
            const occupantResponse = await axios.get(`/users/${occupantId}`);
            return occupantResponse.data;
          });
  
          const dataCurrOccupants = await Promise.all(currOccupantFetchPromises);
          const mapdataCurrOccupants = dataCurrOccupants.map((occupant) => ({
            id: occupant._id, // Use _id as id
            ...occupant, // Spread the rest of the room properties
          }));
        
  
          // Fetch additional information for each occupant in personOnLeave list
          const occupantOnLeaveFetchPromises = roomData.personOnLeave.map(async (occupantId) => {
            const occupantResponse = await axios.get(`/users/${occupantId}`);
            return occupantResponse.data;
          });
  
          const dataOccupantsOnLeave = await Promise.all(occupantOnLeaveFetchPromises);
  
          const mapdataOccupantsOnLeave = dataOccupantsOnLeave.map((occupant) => ({
            id: occupant._id, // Use _id as id
            ...occupant, // Spread the rest of the room properties
          }));
       
          // Fetch additional information for each occupant in roomPrevOccu list
          const prevOccupantFetchPromises = roomData.roomPrevOccu.map(async (occupantId) => {
            const occupantResponse = await axios.get(`/users/${occupantId}`);
            return occupantResponse.data;
          });
  
          const dataPrevOccupants = await Promise.all(prevOccupantFetchPromises);
  
          const mapdataPrevOccupants = dataPrevOccupants.map((occupant) => ({
            id: occupant._id, // Use _id as id
            ...occupant, // Spread the rest of the room properties
          }));
       
         // Dispatch the action with formattedData inside the callback
        dispatch({
            type: ALL_ROOM_VIEW_SUCCESS,
            payload: {roomData,mapdataCurrOccupants,mapdataOccupantsOnLeave,mapdataPrevOccupants},
        });
        } catch (error) {
          console.error("Error fetching room data:", error);
        }
      };
      fetchRoomData();

      
    } catch (error) {
      console.error("Error in the outer try block:", error);
  
      dispatch({
        type: ALL_ROOM_VIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };