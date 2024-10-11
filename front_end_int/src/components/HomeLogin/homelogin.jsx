import React, { useState, useEffect, useRef } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import './homelogin.css';


import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPasswordAction, loginAction } from '../../actions/authAction';


const Homelogin = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [usernameForget, setusernameForget] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [userInputCaptcha, setUserInputCaptcha] = useState('');
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const canvasRef = useRef(null);

  const [credentials, setCredentials] = useState({
    userName: "", 
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error, user ,isAuthenticated } = useSelector((state) => state.userData);
  const { loadingClient, errorClient, client ,isAuthenticatedClient } = useSelector((state) => state.clientData); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!captchaLoaded) {
      const canvas = canvasRef.current;
    
      try{
        const ctx = canvas.getContext('2d');
        initializeCaptcha(ctx);
      }
      catch(err){
        console.log(err);
        alert("Got error from captcha as ",err);
      }
    }
  }, [captchaLoaded]);

  useEffect(() => {
    if (showForgotPassword) {
      const canvas = canvasRef.current;
      try{
        const ctx = canvas.getContext('2d');
        initializeCaptcha(ctx);
      }
      catch(err){
        console.log(err);
        alert("Got error from captcha as ",err);
      }
      
    }
  }, [showForgotPassword]);


  useEffect(() => {
    if(error || errorClient){
      console.log(error);
      dispatch(clearErrors());
    }
    if(!loading && isAuthenticated && user.isAdmin){
      console.log("Navigated to homepage")
      navigate("/");
    }
    if(!loadingClient && isAuthenticatedClient && !client.isAdmin){
      console.log("Navigated to clientview")
      navigate("/client");
    }       
  }, [isAuthenticated,error,errorClient,isAuthenticatedClient]);

  const generateRandomChar = (min, max) =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

  const generateCaptchaText = () => {
    let captcha = '';
    for (let i = 0; i < 3; i++) {
      captcha += generateRandomChar(65, 90);
      captcha += generateRandomChar(97, 122);
      captcha += generateRandomChar(48, 57);
    }
    return captcha.split('').sort(() => Math.random() - 0.5).join('');
  };

  const drawCaptchaOnCanvas = (ctx, captcha) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
    const letterSpace = 150 / captcha.length;
    for (let i = 0; i < captcha.length; i++) {
      const xInitialSpace = 25;
      ctx.font = '20px Roboto Mono';
      ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
      ctx.fillText(
        captcha[i],
        xInitialSpace + i * letterSpace,
        Math.floor(Math.random() * 16 + 25),
        100
      );
    }
    setCaptchaLoaded(true);
  };

  const initializeCaptcha = (ctx) => {
    setUserInputCaptcha('');
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    drawCaptchaOnCanvas(ctx, newCaptcha);
  };

  const handleUserInputCaptchaChange = (e) => {
    setUserInputCaptcha(e.target.value);
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLoginSubmit = (e) => {
    if (!captchaLoaded) {
      alert('Please load the captcha.');
      return;
    }
    if (userInputCaptcha === captchaText) {
     
      e.preventDefault();
      console.log("credentials are",credentials);
      dispatch(loginAction(credentials));
    } else {
      alert('Incorrect captcha');
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      initializeCaptcha(ctx);
    }
  };


  const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log('Sending reset password link to:', usernameForget);
    // Close the modal
    setShowForgotPassword(false);
    // Clear the email input
    setusernameForget('');
    try {
      dispatch(forgotPasswordAction(usernameForget));
      alert("Check your email to get reset password link !!")
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="login-container">
      {/* New Navbar */}
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img src="/images/OIE_Background_Image.png" alt="IIT Jodhpur Logo" />
          </Link>
        </div>
        <div className="menu">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><a href="https://iitj.ac.in/infra/index.php?id=permanent_campus">Campus</a></li>
            <li><Link to="/login">Login</Link></li>
            <li><a href="https://iitj.ac.in/infra/offices/index.php?id=office_of_infrastructure_engineering">Office of Infrastructure</a></li>
          </ul>
        </div>
      </div>
      {/* Background image */}
      <div className="background-image" />
      {/* Login form */}
      <div className="overlay">
        <div className="login-form">
          <span className="close" onClick={() => window.location.href = "/"}>&times;</span>
          <h2>Login</h2>
          <form>
            <div className="form-group-homelogin">
              <label htmlFor="username">Username</label>
              <input type="text" id="userName" name="username" onChange={handleChange} required/>
            </div>
            <div className="form-group-homelogin">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={handleChange}  name="password" required/>
            </div>
            <div className="form-group-homelogin">
              <canvas ref={canvasRef} width="200" height="70" />
              <button className="button-homelogin" id="reload-button" onClick={() => initializeCaptcha(canvasRef.current.getContext('2d'))}>
                Reload
              </button>
            </div>
            <div className="form-group-homelogin">
              <input
                type="text"
                id="captcha"
                placeholder="Enter the text in the image"
                value={userInputCaptcha}
                onChange={handleUserInputCaptchaChange}
              />
            </div>
            <button className="button-homelogin" onClick={handleLoginSubmit}>Login</button>
          </form>
          <p>
            <button className="button-homelogin" onClick={() => setShowForgotPassword(true)}>Forgot password?</button>
          </p>
        </div>
      </div>
      {/* Forgot password modal */}
      {showForgotPassword && (
        <div className="modal-homelogin">
          <div className="modal-content">
            <span className="close" onClick={() => setShowForgotPassword(false)}>&times;</span>
            <h2>Forgot Password</h2>
            <p>Please enter your Username to receive a reset password link on email:</p>
            <div className="forgot-password-form">
              <input type="userameForget" value={usernameForget} onChange={(e) => setusernameForget(e.target.value)} placeholder="Enter your username" />
            </div>
            <div className="form-group-homelogin">
              <canvas ref={canvasRef} width="200" height="70" />
              <button className="button-homelogin" type="button-homelogin" id="reload-button" onClick={() => initializeCaptcha(canvasRef.current.getContext('2d'))}>
                Reload
              </button>
            </div>
            <div className="form-group-homelogin">
              <input
                type="text"
                id="captcha"
                placeholder="Enter the text in the image"
                value={userInputCaptcha}
                onChange={handleUserInputCaptchaChange}
              />
            </div>
            <button className="button-homelogin" onClick={handleForgotPassword}>Send Reset Link</button>
            <button className="button-homelogin" onClick={() => setShowForgotPassword(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homelogin;
