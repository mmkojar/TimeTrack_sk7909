import { HOME_PAGE } from "../actions/type";

const initialState = {
    hpsettings:null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case HOME_PAGE:
            return {
                ...state,
                hpsettings:action.payload
            }
        default:
            return state;
    }
}