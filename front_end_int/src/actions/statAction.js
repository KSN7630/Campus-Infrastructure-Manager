import { STAT_DATA_SUCCESS,STAT_DATA_REQUEST,STAT_DATA_FAIL,CLEAR_ERRORS } from "../constants/statConstant";
import axios from "axios";



export const getStatData= (link)=>
    async (dispatch) => {
    try {
        dispatch({ type: STAT_DATA_REQUEST });

        const { data } = await axios.get(link);
        console.log("data from getStatData",data);
        

        if (Array.isArray(data) && data.length > 0) {
            dispatch({
                type: STAT_DATA_SUCCESS,
                payload: data,
            });
        } else {
        //   seterr('Invalid occupancy data format');
        //   setData([]);
            dispatch({
                type: STAT_DATA_FAIL,
                payload:[],
            });
        }
        // dispatch({
        // type: STAT_DATA_SUCCESS,
        // payload: data,
        // });
    } catch (error) {
        dispatch({
        type: STAT_DATA_FAIL,
        payload: error.message,
        });
    }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
