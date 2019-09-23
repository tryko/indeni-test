import { createReducer } from 'redux-act';
import { persons } from './mock';
import defaultPersonIMG from './../images/default_avatar.jpg';
import { 
    ADD_TO_MATCH,
    FETCH_PERSONS,
    FETCH_PERSONS_FAIL,
    FETCH_PERSONS_SUCCESS,
    FETCH_SINGLE_PERSON,
    FETCH_SINGLE_PERSON_FAIL,
    FETCH_SINGLE_PERSON_SUCCESS,
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
    "id": null,
    "picture": {
      "large": defaultPersonIMG,
    }
};

const initialState = {
    personsFetchStatus: null,
    personsInMatch:[ defaultPerson, defaultPerson], 
    persons: persons.results,
};

export default createReducer({
    [ADD_TO_MATCH]: (state, user) => {
        // replace the user in the appropriate position
        let newPersonsInMatch = [ ...state.personsInMatch ]; 
        const newUsers = state.persons.filter( currUser => !(currUser.id === user.id) )
        // first person to be selected for match
        if(state.personsInMatch[0].id === null) { newPersonsInMatch[0] = user }
        // second person to be selected for match
        else if(state.personsInMatch[1].id === null) { newPersonsInMatch[1] = user; }
        
        else{ 
            // switch position 0 with 1, and replace position 1 with user
            newPersonsInMatch = [state.personsInMatch[1], user];
            // re insert the person 0 to persons 
            newUsers.push(state.personsInMatch[0])
        }
        return {
            ...state,
            persons: newUsers,
            personsInMatch: newPersonsInMatch
        }
    },
    [FETCH_PERSONS]: (state) => {
        return {
            ...state,
            personsFetchStatus: apiStatus.REQUESTED
        }
    },
    [FETCH_PERSONS_FAIL]: (state) => {
        return {
            ...state,
            personsFetchStatus: apiStatus.FAIL
        }
    },
    [FETCH_PERSONS_SUCCESS]: (state, persons) => {
        return {
            ...state,
            persons: persons,
            personsFetchStatus: apiStatus.RECIVED
        }
    },
    [FETCH_SINGLE_PERSON_SUCCESS]: (state, person) => {
        return {
            ...state,
            persons: [...state.persons, person]
        }
    },
    [REMOVE_FROM_MATCH]: (state, user) => {
        const newPersonsInMatch = [ ...state.personsInMatch ];
        const newUsers = [...state.persons, user]  
        const indexOfPerson = state.personsInMatch.findIndex(currUser => currUser.id === user.id);
        newPersonsInMatch[indexOfPerson] = defaultPerson;
        return {
            ...state,
            persons: newUsers,
            personsInMatch: newPersonsInMatch
        }
    }
}
, initialState);

const getUsers = state => state.persons;
const getPersonsInMatch = state => state.personsInMatch;
const getPersonsFetchStatus = state => state.personsFetchStatus;

export const selectors = {
    getUsers,
    getPersonsInMatch,
    getPersonsFetchStatus
};


