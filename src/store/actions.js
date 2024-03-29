import { createAction } from 'redux-act';

import {
    ADD_TO_MATCH,
    EDIT_PERSON,
    FETCH_PERSONS,
    FETCH_SINGLE_PERSON,
    REMOVE_FROM_MATCH,
    UPDATE_PERSON,
} from './types';

export const addToMatch = createAction(ADD_TO_MATCH, user  => user);
export const editPerson = createAction(EDIT_PERSON, user  => user);
export const fetchPersonsAction = createAction(FETCH_PERSONS);
export const fetchSinglePersonAction = createAction(FETCH_SINGLE_PERSON);
export const removeFromMatch = createAction(REMOVE_FROM_MATCH, user  => user);
export const updatePerson = createAction(UPDATE_PERSON, person => person);

