import { createReducer } from 'redux-act';
import { users } from './mock';
import {} from './types';

const apiStatus = {
    REQUESTED: 0,
    RECIVED: 1,
    FAIL: 2

}

const initialState = {
    users: users.results
};

export default createReducer({
    
}
, initialState);

const getUsers = state => state.users;


export const selectors = {
    getUsers
};
