import { UPDATE_USER } from './constraints';

export function updateUser(obj){
    return {
        type: UPDATE_USER,
        payload: obj
    }
}