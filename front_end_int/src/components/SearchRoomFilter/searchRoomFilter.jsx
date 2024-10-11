// import React, { useState } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import './searchRoomFilter.css';

// const RoomFilter = ({ onSelectRoom }) => {
//   const [filters, setFilters] = useState({
//     RNo: '',
//     RDiv: '',
//     Bname: '',
//     Rtitle: '',
//     Rcode: '',
//   });

//   const [filteredRooms, setFilteredRooms] = useState([]);

//   const handleFilter = async () => {
//     try {
//       const filteredValues = Object.fromEntries(
//         Object.entries(filters).filter(([_, value]) => value !== '')
//       );

//       const queryParams = new URLSearchParams(filteredValues);

//       const response = await axios.get(`/rooms/new/search?${queryParams.toString()}`);
//       console.log(`/rooms/new/search?${queryParams.toString()}`)
//       setFilteredRooms(response.data);
//     } catch (error) {
//       console.error('Error filtering rooms:', error.message);
//     }
//   };

//   const handleSelectRoom = (selectedRoom) => {
//     onSelectRoom(selectedRoom);
//     setFilters({
//       RNo: '',
//       RDiv: '',
//       Bname: '',
//       Rtitle: '',
//       Rcode: '',
//     });
//     setFilteredRooms([]);
//   };



//   const handleAllotSelectedRoom = () => {
//     // Implement the logic to handle the allotment of the selected room
//     // You can use the selected room data from the state (filteredRooms)
//     // For example, you can make an API call to update the room allotment
//     console.log('Allot Selected Room:', filteredRooms);
//   };

//   const handleClearSelection = () => {
//     onSelectRoom(null); // Clear the selected room
//     setFilters({
//       RNo: '',
//       RDiv: '',
//       Bname: '',
//       Rtitle: '',
//       Rcode: '',
//     });
//     setFilteredRooms([]);
//   };

//   return (
//     <div className="room-filter-container">
//       <div className="filtered-inputs">
//         <input
//           className="room-filter-input"
//           type="text"
//           placeholder="Building Name"
//           value={filters.Bname}
//           onChange={(e) => setFilters({ ...filters, Bname: e.target.value })}
//         />
//         <input
//           className="room-filter-input"
//           type="text"
//           placeholder="Room Code"
//           value={filters.Rcode}
//           onChange={(e) => setFilters({ ...filters, Rcode: e.target.value })}
//         />
//         <input
//           className="room-filter-input"
//           type="text"
//           placeholder="Room Number"
//           value={filters.RNo}
//           onChange={(e) => setFilters({ ...filters, RNo: e.target.value })}
//         />
//         <input
//           className="room-filter-input"
//           type="text"
//           placeholder="Room Division"
//           value={filters.RDiv}
//           onChange={(e) => setFilters({ ...filters, RDiv: e.target.value })}
//         />
        
//         <input
//           className="room-filter-input"
//           type="text"
//           placeholder="Room Title"
//           value={filters.Rtitle}
//           onChange={(e) => setFilters({ ...filters, Rtitle: e.target.value })}
//         />
        
//       </div>

//       <div className="button-container">
//         <button className="room-filter-button" onClick={handleFilter}>
//           Apply Filters
//         </button>
//         <button
//           className="room-filter-cancel-button"
//           onClick={() =>
//             setFilters({
//               RNo: '',
//               RDiv: '',
//               Bname: '',
//               Rtitle: '',
//               Rcode: '',
//             })
//           }
//         >
//           Clear Filters
//         </button>
//       </div>

//       <Select
//         className="custom-select"
//         options={filteredRooms.map((room) => ({
//           label: `${room.buildingName} - ${room.roomNumber}-${room.roomDiv}-${room.roomTitle}-${room.roomStatus} ,RoomDesc-${room.roomDesc}`,
//           value: room,
//         }))}
//         onChange={(selectedOption) => handleSelectRoom(selectedOption.value)}
//       />
//       <button className="room-filter-button" onClick={handleAllotSelectedRoom}>
//           Allot Selected Room
//         </button>
//         <button className="room-filter-cancel-button" onClick={handleClearSelection}>
//           Clear Selection
//         </button>
//     </div>
//   );
// };

// export default RoomFilter;



import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './searchRoomFilter.css';

const RoomFilter = ({ userId }) => {
  const [filters, setFilters] = useState({
    RNo: '',
    RDiv: '',
    Bname: '',
    Rtitle: '',
    Rcode: '',
    Rstatus:'',
  });

  const [filteredRooms, setFilteredRooms] = useState([]);
  const [newSelectedRoom, setNewSelectedRoom] = useState(null);

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

  const handleSelectRoom = (selectedRoom) => {
    setNewSelectedRoom(selectedRoom);

    // Clear filters and rooms
    setFilters({
      RNo: '',
      RDiv: '',
      Bname: '',
      Rtitle: '',
      Rcode: '',
      Rstatus:'',
    });
    setFilteredRooms([]);
  };

  const handleAllotSelectedRoom = async () => {
    try {
      if (newSelectedRoom) {
        console.log('Allot Selected Room:', newSelectedRoom);
        const roomID = newSelectedRoom.value._id;
        const allotmentResponse = await axios.put(`/users/${userId}/addRoom/${roomID}`);
        console.log("Response after allocation ", allotmentResponse.data);
      }
    } catch (error) {
      console.error('Error allotting room:', error.message);
    }
  };

  const handleClearSelection = () => {
    setNewSelectedRoom(null);
    setFilters({
      RNo: '',
      RDiv: '',
      Bname: '',
      Rtitle: '',
      Rcode: '',
    });
    setFilteredRooms([]);
  };


  

  return (
    <div className="room-filter-container">
        <h2>Allot Room</h2>
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
          placeholder="Room Code"
          value={filters.Rcode}
          onChange={(e) => setFilters({ ...filters, Rcode: e.target.value })}
        />
        <input
          className="room-filter-input"
          type="text"
          placeholder="Room Number"
          value={filters.RNo}
          onChange={(e) => setFilters({ ...filters, RNo: e.target.value })}
        />
        <input
          className="room-filter-input"
          type="text"
          placeholder="Room Division"
          value={filters.RDiv}
          onChange={(e) => setFilters({ ...filters, RDiv: e.target.value })}
        />
        <input
          className="room-filter-input"
          type="text"
          placeholder="Room Title"
          value={filters.Rtitle}
          onChange={(e) => setFilters({ ...filters, Rtitle: e.target.value })}
        />
        <input
          className="room-filter-input"
          type="text"
          placeholder="Room Status"
          value={filters.Rstatus}
          onChange={(e) => setFilters({ ...filters, Rstatus: e.target.value })}
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
            })
          }
        >
          Clear Filters
        </button>
        <button className="room-filter-button" onClick={handleAllotSelectedRoom}>
          Allot Selected Room
        </button>
        <button className="room-filter-cancel-button" onClick={handleClearSelection}>
          Clear Selection
        </button>
      </div>

      <Select
        className="custom-select"
        options={filteredRooms.map((room) => ({
          label: `${room.buildingName} - ${room.roomNumber}-${room.roomDiv}-${room.roomTitle}-${room.roomStatus} ,RoomDesc-${room.roomDesc}`,
          value: room,
        }))}
        value={newSelectedRoom}
        onChange={handleSelectRoom}
      />
    </div>
  );
};

export default RoomFilter;
