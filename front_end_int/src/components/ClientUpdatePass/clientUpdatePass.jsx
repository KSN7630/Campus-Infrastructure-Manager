// Update.jsx
import React, { useEffect, useState } from 'react';
import './clientUpdatePass.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/clientAuthAction';
import Loader from '../layout/loader/Loader';



const ClientUpdatePass = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch=useDispatch();
  const {loading,isUpdated,error}=useSelector((state) => state.clientUpPassword);
  
  useEffect(()=>{
    if(error){
      dispatch(clearErrors());
    }
      
  },[error]);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      //add error handler
      //add error handler
      return;
    }
  
    try {
      const passwords={currentPassword,newPassword,confirmPassword};
      console.log(passwords);
      dispatch(updatePassword(passwords));
  
    } catch (error) {
      console.error('Error updating password:', error);
      dispatch(clearErrors());
    }
  };
  

  return (
    <>
    {
      loading ? (<Loader/>):(
    <div className="update-password-page">
      <div className="update-password-form">
        <h2>Update Password</h2>
        {(isUpdated === true ) && <p className="success-message">Password updated successfully!</p>}
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
    </div>
     )
    }
    </>
  );
};

export default ClientUpdatePass;
