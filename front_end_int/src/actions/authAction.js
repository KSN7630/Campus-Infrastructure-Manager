import axios from "axios";
import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,
    LOAD_USER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS ,LOGOUT_SUCCESS,
    LOGOUT_FAIL,CLEAR_ERRORS 
    ,FORGET_PASSWORD_REQUEST,FORGET_PASSWORD_SUCCESS,FORGET_PASSWORD_FAIL
    ,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL} from "../constants/authConstant";


// Login
export const loginAction = (credentials) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });  
      const { data } = await axios.post("/auth/login",credentials);
      
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};  
  
//   // Register
//   export const register = (userData) => async (dispatch) => {
//     try {
//       dispatch({ type: REGISTER_USER_REQUEST });
  
//       const config = { headers: { "Content-Type": "multipart/form-data" } };
  
//       const { data } = await axios.post(`/api/v1/register`, userData, config);
  
//       dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
//     } catch (error) {
//       dispatch({
//         type: REGISTER_USER_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };
  
//   // Load User
//   export const loadUserAction = () => async (dispatch) => {
//     try {
//       dispatch({ type: LOAD_USER_REQUEST });
  
//       const { data } = await axios.get(`/api/v1/me`);
  
//       dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
//     } catch (error) {
//       dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
//     }
//   };
  
  // Logout User
  export const logoutAction = () => async (dispatch) => {
    try {
      console.log("Trying to log out")  
      const res = await axios.get('/auth/logout');
      console.log(res)
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
  };


// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/users/profile/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};  
  

// Forgot Password
export const forgotPasswordAction = (username) => async (dispatch) => {
  try {
    dispatch({ type: FORGET_PASSWORD_REQUEST });

    const { data } = await axios.get(`/auth/password/forgot?username=${username}`);

    dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password --not checked
export const resetPasswordAction = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};