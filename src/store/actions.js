import { createAction } from 'redux-act';

import {
    SEARCH,
} from './types';

export const searchAction = createAction(SEARCH, ( searchInput = 'tel' ) =>  searchInput);

