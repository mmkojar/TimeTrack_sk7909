import { THEME_SETTINGS } from "../actions/type";

const initialState = {
    settings:[]
}

export default function (state= initialState, action) {
    switch (action.type) {
        case THEME_SETTINGS:
            return {
                ...state,
                settings:action.payload
            }
        default:
            return state
    }
}