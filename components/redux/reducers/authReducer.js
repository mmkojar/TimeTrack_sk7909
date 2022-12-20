import { LOGIN_SUCCESS, AUTH_ERROR, HOME_PAGE } from '../actions/type';

const initialState = {
    isAuthenticated: false,    
    empcode:null,
    user: null,
    isHod:null,
    homepage:null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user:action.payload[0],
                empcode:action.payload[1],
                isHod:action.payload[2],
                isAuthenticated: true,
            };
        case HOME_PAGE:
            return {
                ...state,
                homepage:action.payload
            }    
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                empcode:null,
                user: null,
                isHod:null,
                homepage:null,
            };
        default:
            return state;
    }
}