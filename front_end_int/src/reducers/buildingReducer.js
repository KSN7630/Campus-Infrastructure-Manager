import {ALL_BUILDING_REQUEST,ALL_BUILDING_SUCCESS,ALL_BUILDING_FAIL, CLEAR_ERRORS,
  ALL_ROOM_REQUEST,ALL_ROOM_SUCCESS,ALL_ROOM_FAIL, ALL_ROOM_VIEW_REQUEST, ALL_ROOM_VIEW_SUCCESS, ALL_ROOM_VIEW_FAIL


} from "../constants/buildingConstant"


export const buidingReducer = (state = { buildings: [] }, action) => {
    switch (action.type) {
        case ALL_BUILDING_REQUEST:
          return {
            loading: true,
            buildings: [],
          };
        case ALL_BUILDING_SUCCESS:
          return {
            loading: false,
            buildings: action.payload,
            // buildingCount: action.payload.productsCount,
          };
    
        case ALL_BUILDING_FAIL:
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




export const roomReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
      case ALL_ROOM_REQUEST:
        return {
          loading: true,
          ...state,
          rooms: [],
        };
      case ALL_ROOM_SUCCESS:
        return {
          loading: false,
          rooms: action.payload,
        };
  
      case ALL_ROOM_FAIL:
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



export const roomViewerReducer = (state = { roomContentData: [] }, action) => {
  switch (action.type) {
      case ALL_ROOM_VIEW_REQUEST:
        return {
          loading: true,
          // ...state,
          roomContentData: [],
        };
      case ALL_ROOM_VIEW_SUCCESS:
        return {
          loading: false,
          roomContentData: action.payload,
        };
  
      case ALL_ROOM_VIEW_FAIL:
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








