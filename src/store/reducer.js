import { createReducer } from 'redux-act';
import { persons, defaultPerson } from './mock';

import { 
    ADD_TO_MATCH,
    EDIT_PERSON,
    FETCH_PERSONS,
    FETCH_PERSONS_FAIL,
    FETCH_PERSONS_SUCCESS,
    FETCH_SINGLE_PERSON,
    FETCH_SINGLE_PERSON_FAIL,
    FETCH_SINGLE_PERSON_SUCCESS,
    REMOVE_FROM_MATCH,
    UPDATE_PERSON 
} from './types';

const apiStatus = {
    REQUESTED: 0,
    RECIVED: 1,
    FAIL: 2

}
// export const defaultPerson = {
//     "gender": "male",
//     "name": {
//       "title": "",
//       "first": "",
//       "last": "",
//     },
//     address: {
//         street: "stree",
//         city: "city",
//         state: "state"
//       },

//     "email": "",
//     "id": null,
//     "picture": {
//       "large": defaultPersonIMG,
//     }
// };

const initialState = {
    personsFetchStatus: null,
    personsInMatch:[ defaultPerson, defaultPerson], 
    personToEdit: null,
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
    [EDIT_PERSON]: (state, person) => {
        return {
            ...state,
            personToEdit: person
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
        const newPersons = [...state.persons, user]  
        const indexOfPerson = state.personsInMatch.findIndex(currUser => currUser.id === user.id);
        newPersonsInMatch[indexOfPerson] = defaultPerson;
        return {
            ...state,
            persons: newPersons,
            personsInMatch: newPersonsInMatch
        }
    },
    [UPDATE_PERSON]: (state, updatedPerson) => {
        console.log(updatedPerson)
        const newPersons = state.persons.filter( person => !(person.id === updatedPerson.id) );
        console.log(newPersons);
        newPersons.push(updatedPerson);
        return {
            ...state,
            persons: newPersons
        }
    }
}
, initialState);

const getUsers = state => state.persons;
const getPersonsInMatch = state => state.personsInMatch;
const getPersonsFetchStatus = state => state.personsFetchStatus;
const getPersonToEdit = state => state.personToEdit;

export const selectors = {
    getPersonsFetchStatus,
    getPersonsInMatch,
    getPersonToEdit,
    getUsers,
};


