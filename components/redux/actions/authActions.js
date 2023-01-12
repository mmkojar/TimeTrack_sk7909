import axios from 'axios';
import { START_LOADER, STOP_LOADER, LOGIN_SUCCESS, EMPLOYEE_INFO, HOME_PAGE, LOGOUT_SUCCESS } from './type';
import Config from '../../utils/Config';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const Toaster = (type,text) => {
    Toast.show({ type: type, text1:text });
}
const urlSuffix = 'TimetrackMobileAppService/';

export const validRegisterUser = (userid,password,key,deviceId,token) => (dispatch) => {

    dispatch({ type: START_LOADER });
    
    axios.get(Config.serverUrl+`ValidRegisterUser?userid=${userid}&password=${password}&key=${key}`
    )
    .then((res) => {
        
        const checkStatus = res.data.ValidRegisterUser.find(item => item.Status).Status;
        if(checkStatus == 'active') {
            const clientUrl = res.data.ValidRegisterUser.find(item => item.IP).IP.split(',');
            dispatch(ValidEmployeeUser(clientUrl,userid,password,key,deviceId,token))
        }
        else {
            Toaster('error','Invalid Key')
            dispatch({ type: STOP_LOADER });
        }
    })
    .catch((err) => {
        dispatch({ type: STOP_LOADER });
        Toaster('error','Server Error. Pleasse try again after sometime');
    });
};

export const ValidEmployeeUser = (url,userid,password,key,deviceId,token) => (dispatch) => {
   
    axios.get(url[0]+urlSuffix+`ValidEmployeeUser?userid=${userid}&password=${password}`
    )
    .then((res) => {
        if(res.data.Active == 'true') {
            dispatch(GetEmployeeDevice(url[0]+urlSuffix,userid,password,key,res.data.IsHod,deviceId,token))
        }
        else {
            Toaster('error','No User Found')
            dispatch({ type: STOP_LOADER });
        }
    })
    .catch((err) => {
        dispatch({ type: STOP_LOADER });
        dispatch(ValidEmployeeUser2(url[1]+urlSuffix,userid,password,key,deviceId,token))
        // Toaster('error','Server Error. Please try again after sometime');
    });
}

export const ValidEmployeeUser2 = (url,userid,password,key,deviceId,token) => (dispatch) => {
    
    axios.get(url+`ValidEmployeeUser?userid=${userid}&password=${password}`
    )
    .then((res) => {        
        if(res.data.Active == 'true') {
            dispatch(GetEmployeeDevice(url,userid,password,key,res.data.IsHod,deviceId,token))
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

export const GetEmployeeDevice = (url,userid,password,key,isHod,deviceId,token) => (dispatch) => {
    
    var deviceype = Platform.OS == 'ios' ? 'A' : 'A';
    axios.get(url+`GetEmployeeDevice?userid=${userid}&deviceid=${deviceId}&DeviceType=${deviceype}&TokenNumber=${token}`
    )
    .then((res) => {
        if(res.data.Active == 'Success') {
            const logincreds = {
                userid:userid,
                password:password,
                key:key,
                isHod:isHod,
                clientUrl:url
            }
            dispatch({
                type: LOGIN_SUCCESS,
                payload: logincreds,
            });
            storeUrlInAsync(url);
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

const storeUrlInAsync = async (url) => {
    const checkurl = await AsyncStorage.getItem('clientUrl');
    if(!checkurl) {
        await AsyncStorage.setItem('clientUrl',url)
    }
}

// HP Info
export const GetHPEmployeeDevice = (url,userid,deviceId,token) => (dispatch) => {
    
    if(token && deviceId) {
        var deviceype = Platform.OS == 'ios' ? 'A' : 'A';
        axios.get(url+`GetEmployeeDevice?userid=${userid}&deviceid=${deviceId}&DeviceType=${deviceype}&TokenNumber=${token}`
        )
        .then((res) => {
            if(res.data.Active !== 'Success') {
                Toaster('error',res.data.Active)
                setTimeout(() => {
                    dispatch(logoutAction());
                }, 2000);
            }
            dispatch({ type: STOP_LOADER });
        })
        .catch((err) => {
            Toaster('error','Server Error. Please try again after sometime');
            dispatch({ type: STOP_LOADER });
        });
    }
    
}
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

export const getHPEmployeeInfo = (url,userid) => (dispatch) => {

    dispatch({ type: START_LOADER });
    axios.get(url+`GetHomePageForEmployee2?EmpCode=${userid}`)
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
        AsyncStorage.removeItem('clientUrl')
        dispatch({
            type: LOGOUT_SUCCESS,
        });
        dispatch({ type: STOP_LOADER });
    } catch(err) {
        dispatch({ type: STOP_LOADER });
        Toaster('error','Server Error. Please try again after sometime');
    }    
};