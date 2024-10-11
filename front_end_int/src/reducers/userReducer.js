import { ALL_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS,
   ALL_USER_VIEW_FAIL, ALL_USER_VIEW_REQUEST, ALL_USER_VIEW_SUCCESS, CLEAR_ERRORS } from "../constants/userConstant";





export const userReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USER_REQUEST:
          return {
            loading: true,
            users: [],
          };
        case ALL_USER_SUCCESS:
          return {
            loading: false,
            users: action.payload,
          
          };
        case ALL_USER_FAIL:
            return {
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
}



export const userViewerReducer = (state = { userContentData: [] }, action) => {
  switch (action.type) {
      case ALL_USER_VIEW_REQUEST:
        return {
          loading: true,
          // ...state,
          userContentData: [],
        };
      case ALL_USER_VIEW_SUCCESS:
        return {
          loading: false,
          userContentData: action.payload,
        };
  
      case ALL_USER_VIEW_FAIL:
          return {
          loading: false,
          error: action.payload,
          };
  
      case CLEAR_ERRORS:
        return {
          // ...state,
          error: null,
        };
      default:
        return state;
    }
}