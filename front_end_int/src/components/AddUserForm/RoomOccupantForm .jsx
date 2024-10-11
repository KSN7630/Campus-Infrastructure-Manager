// RoomOccupantForm.js

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { debounce } from 'lodash'; // Import debounce from lodash
import './RoomOccupantForm.css';

const RoomOccupantForm = ({ onSubmit,roomId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOptions, setUserOptions] = useState([]);

  // Debounce the fetchUsers function
  const debouncedFetchUsers = debounce(async () => {
    try {
      if (!searchTerm) {
        setUserOptions([]);
        return;
      }

      const response = await axios.get(`/users/new/search?q=${searchTerm}`);
      const users = response.data;
      const options = users.map((user) => ({
        value: user._id,
        label: `${user.fullName} (${user.userName}) email=${user.email}` ,
      }));
      console.log(options)
      setUserOptions(options);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, 300); // Adjust the delay as needed (300 milliseconds in this example)

  useEffect(() => {
    debouncedFetchUsers(); // Call the debounced function
  }, [searchTerm]);

  const handleSearchInputChange = (inputValue) => {
    console.log("Input Value:", inputValue);
    setSearchTerm(inputValue);
  };

  const handleUserSelect = (selectedOption) => {
    setSelectedUser(selectedOption);
  };

  const handleAddOccupant = async () => {
    try {
      if (selectedUser) {
        // Call the onSubmit function with the selected user
        onSubmit(selectedUser);

        // Clear the search term after adding the occupant
        setSearchTerm("");

        const userId=selectedUser.value;
    
        const response = await axios.put(`/rooms/${roomId}/add/${userId}`);
        console.log('User added to room:', response.data);
      }
    } catch (error) {
      console.error('Error adding user to room:', error.message);
    }
  };

  const handleClearOccupant = () => {
    setSearchTerm("");
    setSelectedUser(null);
  };

  return (
    <div className="add-occupant-popup">
      {/* Render search input */}
      <div className="formInput">
        <label>Add New User:</label>
        <Select
          options={userOptions}
          value={selectedUser}
          onChange={handleUserSelect}
          onInputChange={handleSearchInputChange}
          isSearchable
          placeholder="Write Username and Click on Add button"
        />
      </div>
      {/* Render Add and Clear buttons */}
      <div className="button-group">
        <button type="button" onClick={handleAddOccupant}>
          Add
        </button>
        <button type="button" onClick={handleClearOccupant}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default RoomOccupantForm;




