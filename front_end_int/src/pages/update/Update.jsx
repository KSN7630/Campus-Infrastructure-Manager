// Update.jsx
import React, { useState } from 'react';
import './update.scss';
import axios from 'axios';
import MetaData from '../../components/layout/Metadata';

const Update = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setIsPasswordUpdated(false);
      return;
    }
  
    try {
      const response = await axios.post('/auth/update/password', {
        
        currentPassword,
        newPassword,
        confirmPassword
      });
  
      if (response.status === 200) {
        setIsPasswordUpdated(true);
      } else {
        setIsPasswordUpdated(false);
        // Handle and display error message from the backend
        // For example: setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setIsPasswordUpdated(false);
      // Set a general error message for network or server issues
      // For example: setErrorMessage('An error occurred while updating the password.');
    }
  };
  

  return (
    <>
    <MetaData title="Update-Password"/>
      <div className="update-password-form">
        <h2>Update Password</h2>
        {isPasswordUpdated && <p className="success-message">Password updated successfully!</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Update Password</button>
        </form>
      </div>
    </>
  );
};

export default Update;

