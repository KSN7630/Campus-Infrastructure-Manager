import axios from "axios";
import {FORM_SUBMIT_REQUEST,FORM_SUBMIT_SUCCESS,FORM_SUBMIT_FAIL,CLEAR_ERRORS
  
} from "../constants/formConstant"


export const submitForm= (link,newData)=>
    async (dispatch) => {
    try {
        dispatch({ type: FORM_SUBMIT_REQUEST });
        console.log(link);
        console.log(newData);
        const { data } = await axios.post(link,newData);
        console.log("data from submitform",data);
       

        dispatch({
        type: FORM_SUBMIT_SUCCESS,
        payload: data,
        });
    } catch (error) {
        dispatch({
        type: FORM_SUBMIT_FAIL,
        payload: error.message,
        });
    }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
