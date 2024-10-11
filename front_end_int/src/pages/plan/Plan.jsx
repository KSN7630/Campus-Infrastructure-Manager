import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import "./Plan.scss";
import MapCursor from "../../components/MapCursor/MapCursor";

const Plan = () => {
  return (
    <div className="hostel-page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="datatable-container">
          <MapCursor />
        </div>
      </div>
    </div>
  );
};

export default Plan;