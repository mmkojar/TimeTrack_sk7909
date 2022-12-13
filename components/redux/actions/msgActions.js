import { GET_MSG, CLEAR_MSG } from './type';

export const returnMsg = (msg, status ) => {
    return {
        type: GET_MSG,
        payload: { msg, status }
    }
}

export const clearMsg = () => {
    return {
        type: CLEAR_MSG,
    }
}