import axios from "axios";

import {ALL_SUMMARY_HOME_REQUEST,ALL_SUMMARY_HOME_SUCCESS, ALL_SUMMARY_HOME_FAIL,CLEAR_ERRORS} from "../constants/summeryConstant"


export const getHomeSummary= (link)=>
    async (dispatch) => {
    try {
        dispatch({ type: ALL_SUMMARY_HOME_REQUEST });

        const { data } = await axios.get(link);

        dispatch({
        type: ALL_SUMMARY_HOME_SUCCESS,
        payload: data,
        });
    } catch (error) {
        dispatch({
        type: ALL_SUMMARY_HOME_FAIL,
        payload: error.response.data.message,
        });
    }
};

