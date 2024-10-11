import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import necessary components

import './login.scss';
import MetaData from '../../components/layout/Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginAction } from '../../actions/authAction';
import AlertPopup from '../../components/AlertPopup/Alertpopup';

const Login = () => {
  const [credentials, setCredentials] = useState({
    userName: "", 
    password: "",
  });

  //Alert Notification usestate and function starts
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error"); // Default severity
  const [alertTitle, setAlertTitle] = useState("Error Occurred");
  const [alertMessage, setAlertMessage] = useState("");

  const handleShowAlert = (severity, title, message) => {
    setAlertSeverity(severity);
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertOpen(true);
  };
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  //Alert Notification usestate and functions ends

  const dispatch = useDispatch();
  const { loading, error, user ,isAuthenticated } = useSelector((state) => state.userData);  
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
 

  const handleClick=async (e)=>{
    e.preventDefault();
    // console.log("credentials are",credentials);
    dispatch(loginAction(credentials));
  }

  useEffect(() => {
    if(error){
      console.log("checking alertopen :",alertOpen);
      handleShowAlert("error", "Error Occured:", error)
      console.log(error);
      console.log("Ask for clering errors");
      dispatch(clearErrors());
    }
    if(!loading && isAuthenticated && user.isAdmin){
      console.log("Navigated to homepage")
      navigate("/");
    }    
  }, [isAuthenticated,error]);




  return (
    <div class="Special">
      <MetaData title="Login"/>
      <header className="container">
        <nav className="flex items-center justify-center">
          <div className="left flex">
            <img src="https://iitj.ac.in/uploaded_docs/IITJ%20Logo__big.jpg" alt="IITJ Logo" />
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="https://iitj.ac.in/infra/offices/index.php?id=photo_gallery&office_val=office_of_infrastructure_engineering">About Office of Estate</a></li>
              <li><a href="https://management.ind.in/forum/attachments/f2/19545d1436008378-iit-jodhpur-campus-master-plan-campus-master-plan-indian-institute-technology-jodhpur.pdf">Infrastructure at IITJ</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input type="text"
              placeholder="Username" 
              id="userName" 
              onChange={handleChange}
              required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" 
              placeholder="Password" 
              id="password"
              onChange={handleChange}
              required/>
            <label>Password</label>
          </div>
          <Link to="/" onClick={handleClick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </Link>
          <Link to="/forgot" className="forgot-password" >
            Forgot Password?
          </Link>
        </form>
      </div>

      <footer>
        Copyright &copy; Indian Institute of Technology Jodhpur | All rights reserved
      </footer>
    </div>
  );
};

export default Login;

