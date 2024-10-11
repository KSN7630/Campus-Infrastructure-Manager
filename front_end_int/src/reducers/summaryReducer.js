import {ALL_SUMMARY_HOME_REQUEST,ALL_SUMMARY_HOME_SUCCESS, ALL_SUMMARY_HOME_FAIL,CLEAR_ERRORS
  
} from "../constants/summeryConstant"




export const summaryHomeReducer = (state = { summaryHome: {}}, action) => {
  switch (action.type) {
      case ALL_SUMMARY_HOME_REQUEST:
        return {
          loading: true,
          ...state,
          summaryHome: {},
        };
      case ALL_SUMMARY_HOME_SUCCESS:
        return {
          loading: false,
          summaryHome: action.payload,
        };
  
      case ALL_SUMMARY_HOME_FAIL:
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