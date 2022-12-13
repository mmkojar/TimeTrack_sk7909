import { 
    GET_HOLIDAY_LIST,CLEAR_DATA, ERROR, GET_NBOARD, GET_NOTIFI, UPDT_NOTIFI, HOD_REPORTEE, TCARD_ONLOAD, TCARD_SELF, DT_TCARD_SELF
} from '../actions/type';

const initialState = {
    holiday:null,   
    notice:null,
    notify:null,
    hodreportee:null,
    tcardonload:null,
    tcardself:null,
    dt_tcardself:null,
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
            return {
                ...state,
                tcardonload: action.payload
            } 
        case TCARD_SELF:
            return {
                ...state,
                tcardself: action.payload
            }
        case DT_TCARD_SELF:
            return {
                ...state,
                dt_tcardself: action.payload
            }   
        case UPDT_NOTIFI:
            return {
                ...state
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