import { combineReducers } from 'redux';
import { UPDATE_USER } from '../actions/constraints';

function user ( state = {}, action){
    switch(action.type){
        case UPDATE_USER:
            return {...state, ...action.payload}
        default:
            return state;
        }
}

const rootReducer = combineReducers({ user });

export default rootReducer;