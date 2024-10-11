import axios from "axios";
import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,
    LOAD_USER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS ,LOGOUT_SUCCESS,
    LOGOUT_FAIL,CLEAR_ERRORS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL, 
  UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_RESET, CLIENT_DATA_FETCH_REQUEST, CLIENT_DATA_FETCH_SUCCESS, CLIENT_DATA_FETCH_FAIL, CLIENT_ACTIVITY_REQUEST, CLIENT_ACTIVITY_SUCCESS, CLIENT_ACTIVITY_FAIL} from "../constants/clientAuthConstant";


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
export const loadClient = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/users/profile/client`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.client });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};  

export const clientDataFetchAction = (roomsData) => async (dispatch) => {
  try {
    dispatch({ type: CLIENT_DATA_FETCH_REQUEST });

    const response=await axios.post(`/users/profile/roomDetails`,roomsData);
    const { dataAllotedRoomsCurr, dataAllotedRoomsPrev } = response.data;
  
    dispatch({ type: CLIENT_DATA_FETCH_SUCCESS, payload:{dataAllotedRoomsCurr,dataAllotedRoomsPrev}});
  } catch (error) {
    console.log(error.response.data.message )
    dispatch({ type: CLIENT_DATA_FETCH_FAIL, payload: error.response.data.message });
  }
};


export const clientActvAction = (statusObj,clientId,roomId,activity) => async (dispatch) => {
  try {
    dispatch({ type: CLIENT_ACTIVITY_REQUEST });

    await axios.put(`/userDashboard/${clientId}/${roomId}`, statusObj);
  
    await axios.post(`/activities/new/me`,activity);
  
    dispatch({ type: CLIENT_ACTIVITY_SUCCESS });
  } catch (error) {
    dispatch({ type: CLIENT_ACTIVITY_FAIL, payload: error.response.data.message });
  }
};


// Forgot Password
export const forgotPasswordAction = (username) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const { data } = await axios.get(`/auth/password/forgot?username=${username}`);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
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



// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const { data } = await axios.post(
      '/auth/update/password',
      passwords
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
