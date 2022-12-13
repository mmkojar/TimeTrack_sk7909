import { START_LOADER, STOP_LOADER } from '../actions/type';

const initialState = {
    isLoading:false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case START_LOADER:
            return {
                isLoading:true
            };
        case STOP_LOADER:
            return {
                isLoading:false
            };
        default:
            return state;
    }
}