import axios from "axios";
import Config from "../../utils/Config";
import { HOME_PAGE, LOGIN_SUCCESS, START_LOADER, STOP_LOADER } from "./type";
import Toast from 'react-native-toast-message';


export const validRegisterUser = (userid,password,key,deviceId) => (dispatch) => {

    dispatch({
        type: START_LOADER,
    });
    
    axios.get(Config.serverUrl+`ValidRegisterUser?userid=${userid}&password=${password}&key=${key}`
    )
    .then((res) => {
        const checkStatus = res.data.ValidRegisterUser.find(item => item.Status).Status;        
        if(checkStatus == 'active') {
            dispatch({
                type: HOME_PAGE,
                payload: res.data
            })
            dispatch(ValidEmployeeUser(userid,password,deviceId))
        }
        else {
            Alert.alert('Error','Invalid Key',[
                {text: 'OK'}
              ],{cancelable:true})
            dispatch({
                type: STOP_LOADER,
            });
        }  
    })
    .catch((err) => {
        dispatch({
            type: STOP_LOADER,
        });
        Toast.show({ type: 'error', text1:'Server Error. Please try again after sometime' });
    });
};

export const GetHomePageForEmployee = (userid) => (dispatch) => {
    dispatch({ type: START_LOADER });
    
    axios.get(Config.clientUrl+`GetHomePageForEmployee2?EmpCode=${userid}`)
    .then((res) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: [res.data.GetHomePageForEmployee,userid,isHod],
        });
        dispatch({ type: STOP_LOADER });         
    })
    .catch((err) => {
        Toast.show({ type: 'error', text1:'Server Error. Please try again after sometime' });
        dispatch({
            type: STOP_LOADER,
        });
    });
}
