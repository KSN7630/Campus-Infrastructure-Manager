
import React, { useState } from 'react';
import axios from 'axios';
import './forgot.scss';


const Forgot = () => {
  const [userName, setUserName] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log(userName)
    try {
      const link=`/auth/password/forgot?username=${userName}`;
      console.log(link);
      const res = await axios.get(`/auth/password/forgot?username=${userName}`);
  
      // Handle the response from the backend as needed
      console.log(res.data); // You can show a success message to the user
    } catch (err) {
      console.error(err);
    }
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  return (
    <div className="form-gap">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <h3><i className="fa fa-lock fa-4x"></i></h3>
                  <h2 className="text-center">Forgot Password?</h2>
                  <p>You can reset your password here.</p>
                  <div className="panel-body">
                    <form id="register-form" role="form" autoComplete="off" className="form" method="post">
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                          <input
                            id="userName"
                            name="userName"
                            placeholder="Username"
                            className="form-control"
                            type="text"
                            value={userName}
                            onChange={handleUserNameChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                      <input
                        name="recover-submit"
                        className="btn btn-lg btn-primary btn-block"
                        value="Reset Password"
                        type="submit"
                        onClick={handleForgotPassword}
                      />
                      </div>
                      <input type="hidden" className="hide" name="token" id="token" value="" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
