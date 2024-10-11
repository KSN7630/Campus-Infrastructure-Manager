import React, {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './clientView.scss';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { clearErrors, clientActvAction, clientDataFetchAction, logoutAction } from '../../actions/clientAuthAction';
import Loader from '../../components/layout/loader/Loader';





const ClientView = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate(); // Access the navigate function
  const { loadingClient, errorClient, client ,isAuthenticatedClient } = useSelector((state) => state.clientData); 
  const { loadings, errors, dataOfRooms } = useSelector((state) => state.clientRoomData); 

const [isEditing, setIsEditing] = useState(false);

const [listCurrAllotedRoom, setListCurrAllotedRoom] = useState([]);
const [listPrevAllotedRoom,setListPrevAllotedRoom]=useState([]);  //newly added test


const [occupancyStatus,setOccupancyStatus]=useState("");
const [movement,setMovement]=useState("");
const [remark,setRemark]=useState("");  

const handleOccupancyChange = async (newStatus) => {
  setOccupancyStatus(newStatus);
};
const handleMovementChange = async (newMovement) => {
  setMovement(newMovement);
};
const handleRemark = async (newRemark) => {
  setRemark(newRemark);
};


// Print function

const handlePrint = () => {
  window.print();
};


const handleSave = async (roomId,clientId,buildingName,roomNumber,roomDiv) => {
  console.log(roomId);
  const roomUpdatedStatus = occupancyStatus;
  setIsEditing(false);
  try {
    const statusObj={roomStatus: roomUpdatedStatus};
    const activity={
      activityType: movement,
      activityRemark:remark,
      clientOccupancyStatus:roomUpdatedStatus,
      buildingRoomName:buildingName+"-"+roomNumber+roomDiv
    };

    dispatch(clientActvAction(statusObj,clientId,roomId,activity));
    window.location.reload();
  } catch (errorClient) {
    dispatch(clearErrors());
  }
}


  //gives correct room status for perticular client
const statusGiver=(room,userId)=>{

  let flag="f";
  for(const id of room.roomCurrOccu){
  
    if(id===userId){
      return "Occupied and Locked";
    }
  }
  if(flag==="f"){
    for(const id of room.personOnLeave){
      console.log(id);
      console.log(userId);
      if(id===userId){
        return "Occupied and Open";
      }
    }
  }
  return "Vacant";
}




useEffect(() => {
    
    if(client){
      dispatch(clientDataFetchAction({allotedRooms:client.allotedRooms,prevAllotedRooms:client.prevAllotedRooms}));
    }
    if(errorClient || errors){
      dispatch(clearErrors())
    }
}, [client,errorClient,errors]);


useEffect(() => {
  try {
    if(dataOfRooms){
      setListCurrAllotedRoom(dataOfRooms.dataAllotedRoomsCurr);
      setListPrevAllotedRoom(dataOfRooms.dataAllotedRoomsPrev);
    }
  } catch (errorClient) {
    dispatch(clearErrors());
  }
}, [dataOfRooms]);

//works correctly
const handleEditToggle = (roomId) => {
  setListCurrAllotedRoom((prevRooms) =>
    prevRooms.map((room) =>
      room._id === roomId ? { ...room, isEditing: !room.isEditing } : room
    )
  );
};


//Logs out user  -- works correctly
const handleLogout = async () => {
  dispatch(logoutAction());
  navigate('/');
};

  return (
    <>
    {
      (loadingClient || loadings) ? (<Loader/>):(
    <div className="user-view">
      <div className="profile-info">
        <h2>User Profile - Indian Institute of Technology, Jodhpur</h2>
        <div className="info-row">
          <label>Full Name</label>
          <span>{client.fullName}</span>
        </div>
        <div className="info-row">
          <label>Username</label>
          <span>{client.userName}</span>
        </div>
        <div className="info-row">
          <label>Email</label>
          <span>{client.email}</span>
        </div>
        <div className="info-row">
          <label>Joining Date</label>
          <span>{client.joiningDate}</span>
        </div>
        <div className="info-row">
          <label>Batch of 20XX (In Case of Student)</label>
          <span>{(client.personType==="Student")?client.leavingDate:"-"}</span>
        </div>
      </div>

      <div className="room-table">
        <h3>Current Room Allotted</h3>
        <table>
          <thead>
            <tr>
              <th>Building/Hostel</th>
              <th>Room No.</th>
              <th>Occupancy Status</th>
              <th>Movement</th>
              <th>Remark</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

          {client && listCurrAllotedRoom && listCurrAllotedRoom.map((room) => (
            <tr key={room._id}>
              <td>{room.buildingName}</td>
              <td>{room.roomNumber+room.roomDiv}</td>
              <td>
                {room.isEditing ? (
                  <select onChange={(e) => handleOccupancyChange(e.target.value)}>
                    <option value="">Select</option>
                    <option value="Occupied and Locked">Occupied & Locked</option>
                    <option value="Occupied and Open">Occupied & Open</option>
                    <option value="Vacant">Vacant</option>
                  </select>
                ) : (
                  <span>{statusGiver(room,client._id)}</span>
                )}
              </td>
              <td>
                {room.isEditing ? (
                  <select onChange={(e) => handleMovementChange(e.target.value)}>
                    <option value="">Select</option>
                    <option value="CHECK IN">CHECK IN</option>
                    <option value="CHECK OUT">CHECK OUT</option>
                  </select>
                ) : (
                  <span>{statusGiver(room,client._id) ==="Occupied and Locked"?"On Campus":((statusGiver(room,client._id)==="Occupied and Open"?"Outside Campus":"Vacant"))}</span>
                )}
              </td>
              <td>
                {room.isEditing ? (
                  <select onChange={(e) => handleRemark(e.target.value)}>
                    <option value="">Select</option>
                    <option value="Going For Leave">GOING FOR LEAVE</option>
                    <option value="Permanent Out">PERMANENT OUT</option>
                    <option value="Coming From Leave">COMING FROM LEAVE</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <span>{statusGiver(room,client._id) ==="Occupied and Locked"?"On Campus":((statusGiver(room,client._id)==="Occupied and Open"?"Outside Campus":"Vacant"))}</span>
                )}
              </td>
              <td>
                {room.isEditing ? (
                  <>
                    <button onClick={() => handleSave(room._id,client._id,room.buildingName,room.roomNumber,room.roomDiv)}>Save</button>
                    <button onClick={() => handleEditToggle(room._id)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditToggle(room._id)}>Edit</button>
                )}
                
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <div className="room-table">
        <h3>Previous Room Allotted</h3>
        <table>
          <thead>
            <tr>
              <th>Building/Hostel</th>
              <th>Room No.</th>
            </tr>
          </thead>
          <tbody>
            {client && listPrevAllotedRoom && listPrevAllotedRoom.map((room) => (
              <tr
                key={room._id}
              >
                <td>{room.buildingName}</td>
                <td>{room.roomNumber+room.roomDiv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="print-button">
        <button onClick={handlePrint}>Print</button>
      </div>
      <div className="update-password">
         <Link to="/updateclipass">
           <button >Update Password</button>
         </Link>
       </div>
      <div className="logout-buttons">
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
    )
    }

  
    </>
  );
  
};

export default ClientView;









