import { LOGIN_SUCCESS, AUTH_ERROR, HOME_PAGE, EMPLOYEE_INFO, LOGOUT_SUCCESS, OTP_VALIDATE } from '../actions/type';

const initialState = {
    isAuthenticated: false,    
    logininfo:null,
    empinfo:null,
    hpsettings:null,
    otp:null,
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