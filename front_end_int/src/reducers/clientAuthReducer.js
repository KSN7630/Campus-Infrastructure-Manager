import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,
    LOAD_USER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS ,LOGOUT_SUCCESS,
    LOGOUT_FAIL,CLEAR_ERRORS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CLIENT_DATA_FETCH_REQUEST,
    CLIENT_DATA_FETCH_SUCCESS,
    CLIENT_DATA_FETCH_FAIL,
    CLIENT_ACTIVITY_REQUEST,
    CLIENT_ACTIVITY_SUCCESS,
    CLIENT_ACTIVITY_FAIL,
   } from "../constants/clientAuthConstant";
    
export const ClientAuthenticationReducer = (state = { client: {} }, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case LOAD_USER_REQUEST:
        return {
          loadingClient: true,
          isAuthenticatedClient: false,
        };
      case LOGIN_SUCCESS:
      case LOAD_USER_SUCCESS:
        return {
          ...state,
          loadingClient: false,
          isAuthenticatedClient: true,
          client: action.payload,
        };
  
      case LOGOUT_SUCCESS:
        return {
          loadingClient: false,
          client: null,
          isAuthenticatedClient: false,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          loadingClient: false,
          isAuthenticatedClient: false,
          client: null,
          errorClient: action.payload,
        };
  
      case LOAD_USER_FAIL:
        return {
          loadingClient: false,
          isAuthenticatedClient: false,
          client: null,
          errorClient: action.payload,
        };
  
      case LOGOUT_FAIL:
        return {
          ...state,
          loadingClient: false,
          errorClient: action.payload,
        };  
      case CLEAR_ERRORS:
        return {
          ...state,
          errorClient: null,
        };
  
      default:
        return state;
    }
  };

  export const clientDataFetchReducer = (state = { dataOfRooms: {} }, action) => {
    switch (action.type) {
      case CLIENT_DATA_FETCH_REQUEST:
        return {
          loadings: true
        };
      case CLIENT_DATA_FETCH_SUCCESS:
        return {
          ...state,
          loadings: false,
          dataOfRooms: action.payload,
        };
  
      case CLIENT_DATA_FETCH_FAIL:
        return {
          ...state,
          loadings: false,
          errors: action.payload,
        };

      case CLEAR_ERRORS:
        return {
          ...state,
          errors: null,
        };
  
      default:
        return state;
    }
  };  

  
export const clientActivityReducer = (state = {actv: {}}, action) => {
  switch (action.type) {
    case CLIENT_ACTIVITY_REQUEST:
      return {
        loadingActv: true
      };
    case CLIENT_ACTIVITY_SUCCESS:
      return {
        ...state,
        loadingActv: false,
      };

    case CLIENT_ACTIVITY_FAIL:
      return {
        ...state,
        loadingActv: false,
        errorActv: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errorActv: null,
      };

    default:
      return state;
  }
};   


export const updatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
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
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
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