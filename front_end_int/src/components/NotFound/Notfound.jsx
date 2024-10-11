import React from "react";
import "./Notfound.css";
import { Link } from "react-router-dom";


const NotFound = () => {
  return (
    <div className="PageNotFound">
   

      {/* <Typography>Page Not Found </Typography> */}
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;