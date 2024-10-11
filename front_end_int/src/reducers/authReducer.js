import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,
LOAD_USER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS ,LOGOUT_SUCCESS,
LOGOUT_FAIL,CLEAR_ERRORS 
,FORGET_PASSWORD_REQUEST,FORGET_PASSWORD_SUCCESS,FORGET_PASSWORD_FAIL
,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL} from "../constants/authConstant";

export const authenticationReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case LOAD_USER_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
        };
      case LOGIN_SUCCESS:
      case LOAD_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };
  
      case LOGOUT_SUCCESS:
        return {
          loading: false,
          user: null,
          isAuthenticated: false,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
  
      case LOAD_USER_FAIL:
        return {
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
  
      case LOGOUT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };


  export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case FORGET_PASSWORD_REQUEST:
      case RESET_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FORGET_PASSWORD_SUCCESS:
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
  
      case FORGET_PASSWORD_FAIL:
      case RESET_PASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };  
  