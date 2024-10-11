import { STAT_DATA_REQUEST,STAT_DATA_SUCCESS,STAT_DATA_FAIL,CLEAR_ERRORS } from "../constants/statConstant";





export const statReducer = (state = { statdata:[]}, action) => {
  switch (action.type) {
      case STAT_DATA_REQUEST:
        return {
          loading: true,
          ...state,
          statdata:[],
        };
      case STAT_DATA_SUCCESS:
        return {
          loading: false,
          statdata: action.payload,
        };
  
      case STAT_DATA_FAIL:
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

