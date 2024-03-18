import { LOGIN_SUCCESS, AUTH_ERROR, HOME_PAGE, EMPLOYEE_INFO, LOGOUT_SUCCESS, OTP_VALIDATE, LOCK_INPUT, SET_TIME, OTP_SESSION_TIME2, OTP_SESSION_TIME1 } from '../actions/type';

const initialState = {
    isAuthenticated: false,    
    logininfo:null,
    empinfo:null,
    hpsettings:null,
    otp:null,
    lock:null,
    settime:null,
    sessiontime1:null,
    sessiontime2:null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                logininfo:action.payload,
                isAuthenticated: true,
            };
        case OTP_VALIDATE:
            return {
                ...state,
                otp:action.payload,
            };
        case LOCK_INPUT:
            return {
                ...state,
                lock:action.payload,
            };  
        case SET_TIME:
            return {
                ...state,
                settime:action.payload,
            };  
        case OTP_SESSION_TIME1:
            return {
                ...state,
                sessiontime1:action.payload,
            }; 
        case OTP_SESSION_TIME2:
            return {
                ...state,
                sessiontime2:action.payload,
            };          
        case HOME_PAGE:
            return {
                ...state,
                hpsettings:action.payload
            }       
        case EMPLOYEE_INFO:
            return {
                ...state,
                empinfo:action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                state:undefined,
                isAuthenticated: false,
                // logininfo:null,
                // empinfo:null,
                // hpsettings:null                
            };
        default:
            return state;
    }
}