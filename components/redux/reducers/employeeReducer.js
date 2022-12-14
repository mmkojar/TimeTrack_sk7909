import { 
    GET_HOLIDAY_LIST,CLEAR_DATA, ERROR, GET_NBOARD, GET_NOTIFI, UPDT_NOTIFI, HOD_REPORTEE, 
    TCARD_ONLOAD, TCARD_SELF, DT_TCARD_SELF, GET_GRAPH, RG_DETAILS, RG_ITEMS, RG_LIST, PEND_COUNT, 
    CANC_COUNT, HOD_PEND_COUNT, HOD_CANC_COUNT, CANC_LIST, HOD_PEND_LIST, HOD_CANC_LIST, PEND_LIST, 
    DETAIL_HOD_LIST, ATTEND_LOGS, INSERT_ATTEND, MARK_EMP_LOGS, 
    GET_EMP_HOLIDAY, APP_ACTIONS, GET_EMP_WFH, GET_EMP_LWP, GET_EMP_LEAVE, GET_EMP_OD, GET_EMP_MANUAL, GET_EMP_COFF, GET_EMP_SL, LEAVE_ACTION, LEAVE_BAL, MARK_ATT_DETAILS
} from '../actions/type';

const initialState = {
    holiday:null, notice:null, notify:null, hodreportee:null, tcardonload:null, dt_tcardself:null, graph:null, attlogs:null, markemplogs:null, markattdetail:null,
    reglist:null, regitem:null, regdetail:null, pdcount:null, cancount:null, hodpdcount:null, hodcancount:null, pdlist:null, canlist:null, 
    hodpdlist:null, hodcanlist:null, detailhodlist:null, leavebal:null,empleave:null,empod:null,empmanual:null,empmanualdate:null,empcoff:null,empsl:null,
    empholiday:null, empwfh:null, emplwp:null,
};

export default function (state = initialState, action) {
    switch (action.type) {        
        case GET_HOLIDAY_LIST: return {...state, holiday: action.payload }
        case GET_NBOARD: return {...state, notice: action.payload }
        case GET_NOTIFI: return {...state, notify: action.payload }
        case GET_GRAPH: return { ...state, graph: action.payload }
        // TimeCard
        case TCARD_ONLOAD:
        case TCARD_SELF: return {...state, tcardonload: action.payload }
        case DT_TCARD_SELF: return { ...state, dt_tcardself: action.payload }
        case HOD_REPORTEE: return {...state, hodreportee: action.payload }
        // Attendance
        case ATTEND_LOGS: return { ...state, attlogs: action.payload }
        case MARK_EMP_LOGS: return { ...state, markemplogs: action.payload }    
        case MARK_ATT_DETAILS: return { ...state, markattdetail: action.payload }    
        case INSERT_ATTEND:
        case LEAVE_ACTION:
        case UPDT_NOTIFI: return { ...state }
        // App Register
        case RG_LIST: return { ...state, reglist: action.payload }
        case RG_ITEMS: return { ...state, regitem: action.payload }
        case RG_DETAILS: return { ...state, regdetail: action.payload }
        // Pending Applications
        case PEND_COUNT: return { ...state, pdcount: action.payload }
        case CANC_COUNT: return { ...state, cancount: action.payload }
        case HOD_PEND_COUNT: return { ...state, hodpdcount: action.payload }
        case HOD_CANC_COUNT: return { ...state, hodcancount: action.payload }
        case PEND_LIST: return { ...state, pdlist: action.payload }
        case CANC_LIST: return { ...state, canlist: action.payload }
        case HOD_PEND_LIST: return { ...state, hodpdlist: action.payload }    
        case HOD_CANC_LIST: return { ...state, hodcanlist: action.payload }
        case DETAIL_HOD_LIST: return { ...state, detailhodlist: action.payload }
        // Applications
        case APP_ACTIONS: return { ...state }
        case GET_EMP_LEAVE: return { ...state, empleave: action.payload }
        case LEAVE_BAL: return { ...state, leavebal: action.payload }
        case GET_EMP_OD: return { ...state, empod: action.payload }
        case GET_EMP_MANUAL: return { ...state, empmanual: action.payload }        
        case GET_EMP_COFF: return { ...state, empcoff: action.payload }
        case GET_EMP_LWP: return { ...state, emplwp: action.payload }
        case GET_EMP_SL: return { ...state, empsl: action.payload }
        case GET_EMP_WFH: return { ...state, empwfh: action.payload }
        case GET_EMP_HOLIDAY: return { ...state, empholiday: action.payload }
        // case INS_EMP_HOLIDAY:
        case CLEAR_DATA:
        case ERROR: return {...state};
        default:
            return state;
    }
}