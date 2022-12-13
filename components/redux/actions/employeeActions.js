import axios from 'axios';
import { 
    START_LOADER, STOP_LOADER, GET_HOLIDAY_LIST, GET_NBOARD, GET_NOTIFI, UPDT_NOTIFI, HOD_REPORTEE, TCARD_ONLOAD, TCARD_SELF, DT_TCARD_SELF
} from './type';
import Config from '../../utils/Config';

export const getHolidaylist = (empcode) => (dispatch) => {
    
    fetchAxios(dispatch,`GetHolidayList?EmpCode=${empcode}`,GET_HOLIDAY_LIST);
}

export const getNoticeBoard = (empcode) => (dispatch) => {
    
    fetchAxios(dispatch,`NoticeBoard?EmpCode=${empcode}`,GET_NBOARD);
}

export const getNotification = (empcode) => (dispatch) => {
    
    fetchAxios(dispatch,`GetNotificationsForEmployee?EmpCode=${empcode}`,GET_NOTIFI);
}

export const updateNotification = (empcode,id,isread,isdelete) => (dispatch) => {
    
    fetchAxios(dispatch,`GetNotificationsIDForEmployeeRead?EmpCode=${empcode}&Id=${id}&IsRead=${isread}&Isdelete=${isdelete}`,UPDT_NOTIFI);
}

export const getHodReportee = (empcode) => (dispatch) => {
    
    fetchAxios(dispatch,`GetHODReporteeList?EmpCode=${empcode}`,HOD_REPORTEE);
}

export const getTimeCardOnLoad = (empcode) => (dispatch) => {
    
    fetchAxios(dispatch,`GetTimeCardPageLoad?EmpCode=${empcode}`,TCARD_ONLOAD);
}

export const getTimeCardForSelf = (empcode,fdate,tdate) => (dispatch) => {
    
    fetchAxios(dispatch,`GetTimeCardForSelf?EmpCode=${empcode}&FromDate=${fdate}&ToDate=${tdate}`,TCARD_SELF);
}

export const getDetailTimeCardForSelf = (empcode,tr_date) => (dispatch) => {
    
    fetchAxios(dispatch,`GetDetailedTimeCardForSelf?EmpCode=${empcode}&Tr_date=${tr_date}`,DT_TCARD_SELF);
}

const fetchAxios = (dispatch,param,action) => {

    dispatch({
        type: START_LOADER,
    });
    axios.get(Config.clientUrl+param)
    .then((res) => {
        // console.log("res:",res.data);
        if(action !== UPDT_NOTIFI) {
            dispatch({
                type: action,
                payload: res.data,
            });
        }
        else {
            dispatch({
                type: action,
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