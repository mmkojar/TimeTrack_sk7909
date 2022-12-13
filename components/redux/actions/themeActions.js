import axios from "axios";
import { THEME_SETTINGS, START_LOADER ,STOP_LOADER } from "./type";
import Config from "../../utils/Config";

const api_url = Config.api_url;

const config = {
    headers: {
    "Access-Control-Allow-Origin": "*",
    'encryptedd':'api-token'
}}

export const getSettings = () => (dispatch) => {

    // dispatch({
    //     type: START_LOADER,
    // });
    axios.get(api_url+'settings/', config)
    .then((res) => {
        // console.log(res.data.data);
        if(res.data && res.data.status === "true") {
            dispatch({
                type: THEME_SETTINGS,
                payload: res.data.data,
            });
        }
        else {
            dispatch({
                type: action,
                payload: [],
            });  
        }
        dispatch({
            type: STOP_LOADER,
        });
    })
    .catch((err) => {        
        dispatch({
            type: STOP_LOADER,
        });
        alert(err);
    });
}