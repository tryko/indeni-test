import { createLogic } from 'redux-logic';
import axios from 'axios';

import {
   FETCH_PERSONS,
   FETCH_PERSONS_FAIL,
   FETCH_PERSONS_SUCCESS,
   FETCH_SINGLE_PERSON,
   FETCH_SINGLE_PERSON_FAIL,
   FETCH_SINGLE_PERSON_SUCCESS,
} from './types';

const API_KEY = 'V2CT-5W20-06DN-DUNM'
const personsURL = `https://randomapi.com/api/wvx7bfsv?key=${API_KEY}`;

const fetchPersons = createLogic({
   type: [
      FETCH_PERSONS
   ],
   processOptions:{
     dispatchReturn: true,
     failType: FETCH_PERSONS_FAIL,
     successType: FETCH_PERSONS_SUCCESS,
   },

   process({ action }) {
      console.log(action.payload)
   //   if( action.payload === '') return [];
     return axios.get(personsURL)
        .then(resp =>  {console.log(resp.data.results[0].persons);return resp.data.results[0].persons})
   },
});

const fetchSinglePerson = createLogic({
   type: [
       FETCH_SINGLE_PERSON
   ],
   processOptions:{
     dispatchReturn: true,
     failType: FETCH_SINGLE_PERSON_FAIL,
     successType: FETCH_SINGLE_PERSON_SUCCESS,
   },

   process({ action }) {
      console.log('ff')
     if( action.payload === '') return [];
     return axios.get(personsURL)
        .then(resp =>  {console.log(resp.data.results[0].singlePerson);return resp.data.results[0].singlePerson})
   },
});

// const currentConditionForSelectedLogic = createLogic({
//     type:CURRENT_CONDITION_FOR_SELECTED,
//     processOptions:{
//        dispatchReturn: true,
//        failType: CURRENT_CONDITION_FOR_SELECTED_FAIL,
//        successType: CURRENT_CONDITION_FOR_SELECTED_SUCCESS,
//     },
//     process({ getState ,action }){
//         const locationKey = action.payload.Key
//         return axios.get(`${currentConditionURL}${locationKey}?apikey=${API_KEY}`)
//               .then(resp => resp.data)
//     }
//  });

// const forecastForSelectedLogic = createLogic({
//    type: FORECAST_FOR_SELECTED,
//    processOptions:{
//       dispatchReturn: true,
//       failType: FORECAST_FOR_SELECTED_FAIL,
//       successType: FORECAST_FOR_SELECTED_SUCCESS,
//    },
//    process({ getState, action }){
//         const locationKey = action.payload.Key
//         return axios.get(`${forecastForSelectedURL}${locationKey}?apikey=${API_KEY}&metric=true`)
//          .then(resp => resp.data)
//    }
// });

export default [
   // searchLogic,
   // currentConditionForSelectedLogic,
   // forecastForSelectedLogic,
   fetchPersons,
   fetchSinglePerson,
];
 