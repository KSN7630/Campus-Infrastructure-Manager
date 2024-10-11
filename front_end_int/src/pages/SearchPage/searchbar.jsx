import React from 'react';
import TransitionAlerts from '../../components/AlertComponent/AlertBox';
import UserFilter from '../../components/SearchUserFilter/searchUserFilter';
import FilterRooms from '../../components/filterRoomReport/filterRoomReport';
import MetaData from '../../components/layout/Metadata';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './searchbar.css'; 

const Searchbar = () => {
  
  return (
    <>
      <MetaData title="Home" />
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="search-section">
            <TransitionAlerts alert="Welcome to Digital Occupancy Map, IIT Jodhpur, Rajasthan" />
            <TransitionAlerts alert="Apply different filters and get data" />
            <div className="filter-section">
              <h2>Room Filters</h2>
              <FilterRooms />
            </div>
            <div className="filter-section">
            <TransitionAlerts alert="Apply different filters and get data of Users" />
              <h2>User Filters</h2>
              
              <UserFilter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
