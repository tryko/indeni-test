import { createReducer } from 'redux-act';
import { users } from './mock';
import defaultPersonIMG from './../images/default_avatar.jpg';
import { 
    ADD_TO_MATCH,
    REMOVE_FROM_MATCH 
} from './types';

const apiStatus = {
    REQUESTED: 0,
    RECIVED: 1,
    FAIL: 2

}
const defaultPerson = {
    "gender": "male",
    "name": {
      "title": "",
      "first": "",
      "last": "",
    },
    "email": "",
    "id": {
      "value": null
    },
    "picture": {
      "large": defaultPersonIMG,
    }
};

const initialState = {
    personsInMatch:[ defaultPerson, defaultPerson], 
    users: users.results,
};

export default createReducer({
    [ADD_TO_MATCH]: (state, user) => {
        // replace the user in the appropriate position
        let newPersonsInMatch = [ ...state.personsInMatch ]; 
        const newUsers = state.users.filter( currUser => !(currUser.id.value === user.id.value) )
        // first person to be selected for match
        if(state.personsInMatch[0].id.value === null) { newPersonsInMatch[0] = user }
        // second person to be selected for match
        else if(state.personsInMatch[1].id.value === null) { newPersonsInMatch[1] = user; }
        
        else{ 
            // switch position 0 with 1, and replace position 1 with user
            newPersonsInMatch = [state.personsInMatch[1], user];
            // re insert the person 0 to users 
            newUsers.push(state.personsInMatch[0])
        }
        return {
            ...state,
            users: newUsers,
            personsInMatch: newPersonsInMatch
        }
    },
    [REMOVE_FROM_MATCH]: (state, user) => {
        const newPersonsInMatch = [ ...state.personsInMatch ];
        const newUsers = [...state.users, user]  
        const indexOfPerson = state.personsInMatch.findIndex(currUser => currUser.id.value === user.id.value);
        newPersonsInMatch[indexOfPerson] = defaultPerson;
        return {
            ...state,
            users: newUsers,
            personsInMatch: newPersonsInMatch
        }
    }
}
, initialState);

const getUsers = state => state.users;
const getPersonsInMatch = state => state.personsInMatch;

export const selectors = {
    getUsers,
    getPersonsInMatch
};


