import axios from 'axios';
import { START_LOADER, STOP_LOADER, LOGIN_SUCCESS, EMPLOYEE_INFO, HOME_PAGE, LOGOUT_SUCCESS } from './type';
import Config from '../../utils/Config';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Toaster = (type,text) => {
    Toast.show({ type: type, text1:text });
}

export const validRegisterUser = (userid,password,key,deviceId,deviceype,token) => (dispatch) => {

    dispatch({ type: START_LOADER });

    axios.get(Config.serverUrl+`ValidRegisterUser?userid=${userid}&password=${password}&key=${key}`
    )
    .then((res) => {
        const checkStatus = res.data.ValidRegisterUser.find(item => item.Status).Status;        
        if(checkStatus == 'active') {            
            dispatch(ValidEmployeeUser(userid,password,key,deviceId,deviceype,token))
        }
        else {
            Toaster('error','Invalid Key')
            dispatch({ type: STOP_LOADER });
        }  
    })
    .catch((err) => {
        dispatch({ type: STOP_LOADER });
        Toaster('error','Server Error. Please try again after sometime');
    });
};

export const ValidEmployeeUser = (userid,password,key,deviceId,deviceype,token) => (dispatch) => {
   
    axios.get(Config.clientUrl+`ValidEmployeeUser?userid=${userid}&password=${password}`
    )
    .then((res) => {        
        if(res.data.Active == 'true') {
            dispatch(GetEmployeeDevice(userid,password,key,res.data.IsHod,deviceId,deviceype,token))
        }
        else {
            Toaster('error','No User Found')
            dispatch({ type: STOP_LOADER });
        }
    })
    .catch((err) => {
        dispatch({ type: STOP_LOADER });
        Toaster('error','Server Error. Please try again after sometime');
    });
}

export const GetEmployeeDevice = (userid,password,key,isHod,deviceId,deviceype,token) => (dispatch) => {
    // console.log(userid,password,key,isHod,deviceId,deviceype,token);
    axios.get(Config.clientUrl+`GetEmployeeDevice?userid=${userid}&deviceid=${deviceId}&DeviceType=${deviceype}&TokenNumber=${token}`
    )
    .then((res) => {
        if(res.data.Active == 'Success') {
            const logincreds = {
                userid:userid,
                password:password,
                key:key,
                isHod:isHod
            }
            dispatch({
                type: LOGIN_SUCCESS,
                payload: logincreds,
            });
        }
        else {
            Toaster('error',res.data.Active)            
        }
        dispatch({ type: STOP_LOADER });
    })
    .catch((err) => {
        Toaster('error','Server Error. Please try again after sometime');
        dispatch({ type: STOP_LOADER });
    });
}

// HP Info
export const getHomePageInfo = (userid,password,key) => (dispatch) => {

    dispatch({ type: START_LOADER });
    axios.get(Config.serverUrl+`ValidRegisterUser?userid=${userid}&password=${password}&key=${key}`)
    .then((res) => {        
        const result = {
            homepagesetts:res.data.HomepageSettings,
            validreguser:res.data.ValidRegisterUser
        }
        dispatch({
            type: HOME_PAGE,
            payload: result
        })  
        dispatch({ type: STOP_LOADER });
    })
    .catch((err) => {
        dispatch({ type: STOP_LOADER });
        Toaster('error','Server Error. Please try again after sometime');
    });
};


export const getHPEmployeeInfo = (userid) => (dispatch) => {

    dispatch({ type: START_LOADER });
    axios.get(Config.clientUrl+`GetHomePageForEmployee2?EmpCode=${userid}`)
    .then((res) => {
        dispatch({
            type: EMPLOYEE_INFO,
            payload: res.data.GetHomePageForEmployee
        })
        dispatch({ type: STOP_LOADER });
    })
    .catch((err) => {
        Toaster('error','Server Error. Please try again after sometime');
        dispatch({ type: STOP_LOADER });
    });
}

//logout
export const logoutAction = () => (dispatch) => {
    
    dispatch({
        type: START_LOADER,
    });    
    try {
        AsyncStorage.removeItem('root')
        dispatch({
            type: LOGOUT_SUCCESS,
        });
        dispatch({ type: STOP_LOADER });
    } catch(err) {
        dispatch({ type: STOP_LOADER });
        Toaster('error','Server Error. Please try again after sometime');
    }    
};