import { 
    GET_HOLIDAY_LIST,CLEAR_DATA, ERROR, GET_NBOARD, GET_NOTIFI, UPDT_NOTIFI, HOD_REPORTEE, 
    TCARD_ONLOAD, TCARD_SELF, DT_TCARD_SELF, GET_GRAPH, RG_DETAILS, RG_ITEMS, RG_LIST, PEND_COUNT, CANC_COUNT, HOD_PEND_COUNT, HOD_CANC_COUNT
} from '../actions/type';

const initialState = {
    holiday:null,
    notice:null,
    notify:null,
    hodreportee:null,
    tcardonload:null,
    dt_tcardself:null,
    graph:null,
    reglist:null,
    regitem:null,
    regdetail:null,
    pdcount:null,
    cancount:null,
    hodpdcount:null,
    hodcancount:null,
};

export default function (state = initialState, action) {
    switch (action.type) {        
        case GET_HOLIDAY_LIST:
            return {
                ...state,
                holiday: action.payload
            }
        case GET_NBOARD:
            return {
                ...state,
                notice: action.payload
            }
        case GET_NOTIFI:
            return {
                ...state,
                notify: action.payload
            }
        case HOD_REPORTEE:
            return {
                ...state,
                hodreportee: action.payload
            }
        case TCARD_ONLOAD:
        case TCARD_SELF:
            return {
                ...state,
                tcardonload: action.payload
            }
        case DT_TCARD_SELF:
            return {
                ...state,
                dt_tcardself: action.payload
            }  
        case GET_GRAPH:
            return {
                ...state,
                graph: action.payload
            }
        case UPDT_NOTIFI:
            return {
                ...state
            }
        case RG_LIST:
            return {
                ...state,
                reglist: action.payload
            }
        case RG_ITEMS:
            return {
                ...state,
                regitem: action.payload
            }
        case RG_DETAILS:
            return {
                ...state,
                regdetail: action.payload
            }
        case PEND_COUNT:
            return {
                ...state,
                pdcount: action.payload
            }
        case CANC_COUNT:
            return {
                ...state,
                cancount: action.payload
            }
        case HOD_PEND_COUNT:
            return {
                ...state,
                hodpdcount: action.payload
            }    
        case HOD_CANC_COUNT:
            return {
                ...state,
                hodcancount: action.payload
            }
        case CLEAR_DATA:
        case ERROR:
            return { 
                ...state,
            };
        default:
            return state;
    }
}