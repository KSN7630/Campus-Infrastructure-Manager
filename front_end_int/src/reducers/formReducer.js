import {FORM_SUBMIT_REQUEST,FORM_SUBMIT_SUCCESS,FORM_SUBMIT_FAIL,CLEAR_ERRORS
  
  } from "../constants/formConstant"

  export const formSubmitReducer = (state = { form: {}}, action) => {
    switch (action.type) {
        case FORM_SUBMIT_REQUEST:
          return {
            loading: true,
            ...state,
            form: {},
          };
        case FORM_SUBMIT_SUCCESS:
          return {
            loading: false,
            form: action.payload,
          };
    
        case FORM_SUBMIT_FAIL:
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