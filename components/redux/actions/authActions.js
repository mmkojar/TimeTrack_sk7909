import axios from 'axios';
import { Alert, Platform } from 'react-native';
import { START_LOADER, STOP_LOADER, LOGIN_SUCCESS } from './type';
import Config from '../../utils/Config';

//  ------Login Action------
export const validRegisterUser = (userid,password,key) => (dispatch) => {

    dispatch({
        type: START_LOADER,
    });
    
    axios.get(Config.serverUrl+`ValidRegisterUser?userid=${userid}&password=${password}&key=${key}`
    )
    .then((res) => {
        const checkStatus = res.data.ValidRegisterUser.find(item => item.Status).Status;
        // console.log(checkStatus);
        if(checkStatus == 'active') {
            dispatch(ValidEmployeeUser(userid,password))
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
        alert(err);
    });
};

export const ValidEmployeeUser = (userid,password) => (dispatch) => {

    axios.get(Config.clientUrl+`ValidEmployeeUser?userid=${userid}&password=${password}`
    )
    .then((res) => {
        // console.log(res.data);
        if(res.data.Active == 'true') {
            var deviceype = Platform.OS == 'ios' ? 'I' : 'A';
            var deviceId = 'sss';
            var token = 'token';
            dispatch(GetEmployeeDevice(userid,deviceId,deviceype,token,res.data.IsHod))
        }
        else {
            Alert.alert('Error','No User Found',[
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
        alert(err);
    });
}

export const GetEmployeeDevice = (userid,deviceId,deviceype,token,isHod) => (dispatch) => {
    axios.get(Config.clientUrl+`GetEmployeeDevice?userid=${userid}&deviceid=${deviceId}&DeviceType=${deviceype}&TokenNumber=${token}`
    )
    .then((res) => {
        console.log("GetEmployeeDevice:",res.data);
        if(res.data.Active == 'Success') {
            dispatch(GetHomePageForEmployee(userid,isHod));
        }
        else {
            Alert.alert('Error',res.data.Active,[
                {text: 'OK'}
              ],{cancelable:true})
            dispatch({
                type: STOP_LOADER,
            });
        }
    })
    .catch((err) => {
        alert(err);
    });
}

export const GetHomePageForEmployee = (userid,isHod) => (dispatch) => {
    axios.get(Config.clientUrl+`GetHomePageForEmployee2?EmpCode=${userid}`)
    .then((res) => {
        console.log("GetHomePageForEmployee:",res.data.GetHomePageForEmployee);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: [res.data.GetHomePageForEmployee,userid,isHod],
        });
        dispatch({
            type: STOP_LOADER,
        });
         /* if(res.data.status === "true") {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            AsyncStorage.setItem('userId',res.data.data.user_id);
        }
        if(res.data.status === "false") {
            dispatch({
                type: LOGIN_FAIL,
            });
        } */
    })
    .catch((err) => {
        alert(err);
    });
}
