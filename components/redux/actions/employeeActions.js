import axios from 'axios';
import { 
    START_LOADER, STOP_LOADER, GET_HOLIDAY_LIST, GET_NBOARD, GET_NOTIFI, UPDT_NOTIFI, 
    HOD_REPORTEE, TCARD_ONLOAD, TCARD_SELF, DT_TCARD_SELF, GET_GRAPH, RG_LIST, RG_ITEMS, 
    RG_DETAILS, PEND_COUNT, CANC_COUNT, HOD_PEND_COUNT, HOD_CANC_COUNT, PEND_LIST, 
    CANC_LIST, HOD_PEND_LIST, HOD_CANC_LIST, DETAIL_HOD_LIST, ATTEND_LOGS, INSERT_ATTEND, MARK_EMP_LOGS
} from './type';
import Config from '../../utils/Config';


export const getGraph = (empcode,month,year) => (dispatch) => {
    
    fetchAxios(dispatch,`GetGraphForSelectedMonthToEmployee?EmpCode=${empcode}&Month=${month}&Year=${year}`,GET_GRAPH);
}
export const getHolidaylist = (empcode) => (dispatch) => {
    dispatch({
        type: GET_HOLIDAY_LIST,
        payload: [],
    })
    fetchAxios(dispatch,`GetHolidayList?EmpCode=${empcode}`,GET_HOLIDAY_LIST);
}
export const getNoticeBoard = (empcode) => (dispatch) => {
    dispatch({
        type: GET_NBOARD,
        payload: [],
    })
    fetchAxios(dispatch,`NoticeBoard?EmpCode=${empcode}`,GET_NBOARD);
}
export const getNotification = (empcode) => (dispatch) => {
    dispatch({
        type: GET_NOTIFI,
        payload: [],
    })
    fetchAxios(dispatch,`GetNotificationsForEmployee?EmpCode=${empcode}`,GET_NOTIFI);
}
export const updateNotification = (empcode,id,isread,isdelete) => (dispatch) => {
    
    fetchAxios(dispatch,`GetNotificationsIDForEmployeeRead?EmpCode=${empcode}&Id=${id}&IsRead=${isread}&Isdelete=${isdelete}`,UPDT_NOTIFI);
}

//Mark Attendance
export const getTodaysAttLogs = (empcode) => (dispatch) => {
    
    dispatch({
        type: ATTEND_LOGS,
        payload: [],
    })
    fetchAxios(dispatch,`MarkMyAttendanceLogs?EmpCode=${empcode}`,ATTEND_LOGS);
}

export const getMarkEmpLogs = (empcode) => (dispatch) => {
    
    fetchAxios(dispatch,`GetMarkMyAttendanceForEmployee?EmpCode=${empcode}`,MARK_EMP_LOGS);
}

export const insertAttendance = (empcode,type,lang,lati,accuracy,pdate,remark,qrval) => (dispatch) => {
    
    fetchAxios(dispatch,`InsertMarkMyAttendance?EmpCode=${empcode}&Type=${type}&Lang=${lang}&Lat=${lati}&Accuracy=${accuracy}&PunchDate=${pdate}&Remark=${remark}&QrValue=${qrval}`,INSERT_ATTEND);
}

// TimeCard
export const getHodReportee = (empcode) => (dispatch) => {
    
    dispatch({
        type: HOD_REPORTEE,
        payload: [],
    })
    fetchAxios(dispatch,`GetHODReporteeList?EmpCode=${empcode}`,HOD_REPORTEE);
}
export const getTimeCardOnLoad = (empcode) => (dispatch) => {
    dispatch({
        type: TCARD_ONLOAD,
        payload: [],
    })
    fetchAxios(dispatch,`GetTimeCardPageLoad?EmpCode=${empcode}`,TCARD_ONLOAD);
}
export const getTimeCardSelfFilter = (empcode,fdate,tdate) => (dispatch) => {
    dispatch({
        type: TCARD_SELF,
        payload: [],
    })
    fetchAxios(dispatch,`GetTimeCardForSelf?EmpCode=${empcode}&FromDate=${fdate}&ToDate=${tdate}`,TCARD_SELF);
}
export const getDetailTimeCardForSelf = (empcode,tr_date) => (dispatch) => {
    dispatch({
        type: DT_TCARD_SELF,
        payload: [],
    })
    fetchAxios(dispatch,`GetDetailedTimeCardForSelf?EmpCode=${empcode}&Tr_date=${tr_date}`,DT_TCARD_SELF);
}

// App Register
export const getRegisterList = (empcode) => (dispatch) => {
    dispatch({
        type: RG_LIST,
        payload: [],
    })
    fetchAxios(dispatch,`RegisterSortingList`,RG_LIST);
}
export const getRegisterItems = (path,empcode) => (dispatch) => {
    
    dispatch({
        type: RG_ITEMS,
        payload: [],
    })
    fetchAxios(dispatch,`${path}?EmpCode=${empcode}`,RG_ITEMS);
}
export const getRegisterDetails = (path,empcode,id) => (dispatch) => {
    dispatch({
        type: RG_DETAILS,
        payload: [],
    })
    fetchAxios(dispatch,`${path}?EmpCode=${empcode}&ID=${id}`,RG_DETAILS);
}

// pending Application
export const getPendingCount = (path,empcode) => (dispatch) => {
    /* dispatch({
        type: PEND_COUNT,
        payload: [],
    }) */
    fetchAxios(dispatch,`${path}?EmpCode=${empcode}`,PEND_COUNT);
}
export const getCancelCount = (path,empcode) => (dispatch) => {
    /* dispatch({
        type: CANC_COUNT,
        payload: [],
    }) */
    fetchAxios(dispatch,`${path}?EmpCode=${empcode}`,CANC_COUNT);
}
export const getHODPendingCount = (path,empcode) => (dispatch) => {
    /* dispatch({
        type: HOD_PEND_COUNT,
        payload: [],
    }) */
    fetchAxios(dispatch,`${path}?EmpCode=${empcode}`,HOD_PEND_COUNT);
}
export const getHODCancelCount = (path,empcode) => (dispatch) => {
    /* dispatch({
        type: HOD_CANC_COUNT,
        payload: [],
    }) */
    fetchAxios(dispatch,`${path}?EmpCode=${empcode}`,HOD_CANC_COUNT);
}

export const getPendingList = (path,empcode,ltype) => (dispatch) => {
    dispatch({
        type: PEND_LIST,
        payload: [],
    })
    fetchAxios(dispatch,`${path}?EmpCode=${empcode}&AppType=${ltype}`,PEND_LIST);
}
export const getCancelList = (path,empcode,ltype) => (dispatch) => {
    dispatch({
        type: CANC_LIST,
        payload: [],
    })
    fetchAxios(dispatch,`${path}?EmpCode=${empcode}&AppType=${ltype}`,CANC_LIST);
}
export const getHODPendingList = (path,empcode,ltype) => (dispatch) => {
    dispatch({
        type: HOD_PEND_LIST,
        payload: [],
    })
    fetchAxios(dispatch,`${path}?EmpCode=${empcode}&AppType=${ltype}`,HOD_PEND_LIST);
}
export const getHODCancelList = (path,empcode,ltype) => (dispatch) => {
    dispatch({
        type: HOD_CANC_LIST,
        payload: [],
    })
    fetchAxios(dispatch,`${path}?EmpCode=${empcode}&AppType=${ltype}`,HOD_CANC_LIST);
}

export const getDetailHODList = (empcode,Id,ltype) => (dispatch) => {
    dispatch({
        type: DETAIL_HOD_LIST,
        payload: [],
    })
    fetchAxios(dispatch,`GETDetailedHODApplicationList?EmpCode=${empcode}&Id=${Id}&AppType=${ltype}`,DETAIL_HOD_LIST);
}

const fetchAxios = (dispatch,param,action) => {
    
    dispatch({
        type: START_LOADER,
    });
    axios.get(Config.clientUrl+param)
    .then((res) => {
        if(action !== UPDT_NOTIFI || action !== INSERT_ATTEND) {
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