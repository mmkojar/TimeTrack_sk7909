import { LOGIN_SUCCESS, AUTH_ERROR } from '../actions/type';

const initialState = {
    isAuthenticated: false,    
    empcode:null,
    user: null,
    isHod:null
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
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                userid:null,
                user:null,
            };
        default:
            return state;
    }
}