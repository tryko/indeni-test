import { createAction } from 'redux-act';

import {
    ADD_TO_MATCH,
    REMOVE_FROM_MATCH
} from './types';

export const addToMatch = createAction(ADD_TO_MATCH, user  => user);
export const removeFromMatch = createAction(REMOVE_FROM_MATCH, user  => user);

