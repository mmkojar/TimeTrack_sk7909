import { GET_MSG, CLEAR_MSG } from '../actions/type';

const initialState = {
    msg: null,
    status: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MSG:
            return {
                msg: action.payload.msg,
                status: action.payload.status
            };
        case CLEAR_MSG:
            return {
                msg: null,
                status: null
            };
        default:
            return state;
    }
}