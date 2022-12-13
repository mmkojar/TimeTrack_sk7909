import { combineReducers } from 'redux';
import authReducer from './authReducer';
import msgReducer from './msgReducer';
import employeeReducer from './employeeReducer';
import loaderReducer from './loaderReducer';
import themeReducer from './themeReducer';

export default combineReducers({
    auth: authReducer,
    employee: employeeReducer,
    msg: msgReducer,
    loader: loaderReducer,
    theme:themeReducer
});