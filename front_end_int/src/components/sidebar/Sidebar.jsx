import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search"
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LandscapeIcon from "@mui/icons-material/Landscape";
import UpdateIcon from "@mui/icons-material/Update"
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import WorkIcon from "@mui/icons-material/Work";
import HotelIcon from '@mui/icons-material/Hotel';
import BusinessIcon from '@mui/icons-material/Business';
import { Link, Navigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect } from "react";
import { logoutAction } from "../../actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);


  const dispatch=useDispatch();
  const { loading, error, user ,isAuthenticated } = useSelector((state) => state.userData);  
  const handleLogout = async () => {
      dispatch(logoutAction());
  };
  useEffect(() => {
    if(isAuthenticated === false ){
      Navigate("/login");
    }    
  }, [isAuthenticated]);

  

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">IITJ ADMIN</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <Link to="/plan" style={{ textDecoration: "none" }}>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Digital Map</span>
          </li>
          </Link>
          <Link to="/allsearch" style={{ textDecoration: "none" }}>
          <li>
            <SearchIcon className="icon" />
            <span>Smart Search</span>
          </li>
          </Link>
          <p className="title">Buildings</p>
          <Link to="/hostels" style={{ textDecoration: "none" }}>
            <li>
              <HotelIcon className="icon" />
              <span>Hostels</span>
            </li>
          </Link>
          <Link to="/departments" style={{ textDecoration: "none" }}>
            <li>
              <BusinessIcon className="icon" />
              <span>Departments</span>
            </li>
          </Link>
          <Link to="/academics" style={{ textDecoration: "none" }}>
            <li>
              <SchoolTwoToneIcon className="icon" />
              <span>Academic Buildings</span>
            </li>
          </Link>
          <Link to="/berms" style={{ textDecoration: "none" }}>
            <li>
              <LandscapeIcon className="icon" />
              <span>Berms</span>
            </li>
          </Link>
          <Link to="/adminblocks" style={{ textDecoration: "none" }}>
            <li>
              <WorkIcon className="icon" />
              <span>Admin Block</span>
            </li>
          </Link>
          <Link to="/residentialquarters" style={{ textDecoration: "none" }}>
            <li>
              <HotelIcon className="icon" />
              <span>Residential Quarters</span>
            </li>
          </Link>
          <Link to="/amenities" style={{ textDecoration: "none" }}>
            <li>
              <LocationCityIcon className="icon" />
              <span>Amenities</span>
            </li>
          </Link>
          <p className="title">USERS</p>

          

          <Link to="/userlist" style={{ textDecoration: "none" }}>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>User List</span>
          </li>
          </Link>
          <p className="title">SERVICE</p>
          <Link to="/userview" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <Link to="/update" style={{ textDecoration: "none" }}>
          <li>
            <UpdateIcon className="icon" />
            <span>Update Pass</span>
          </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
