import { createLogic } from 'redux-logic';
import axios from 'axios';

import {
   CURRENT_CONDITION_FOR_SELECTED,
   CURRENT_CONDITION_FOR_SELECTED_FAIL,
   CURRENT_CONDITION_FOR_SELECTED_SUCCESS,
   FORECAST_FOR_SELECTED,
   FORECAST_FOR_SELECTED_SUCCESS,
   FORECAST_FOR_SELECTED_FAIL,
   SEARCH,
   SEARCH_FAIL,
   SEARCH_SUCCESS
} from './types';

const API_KEY = 'iGu8h2qOJPijHqrowDb1UvwFud7DLWio'
const autoCompleteURL = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete'

const currentConditionURL = 'https://dataservice.accuweather.com/currentconditions/v1/';
const forecastForSelectedURL = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/'

const searchLogic = createLogic({
    type: [
        SEARCH
    ],
    processOptions:{
      dispatchReturn: true,
      failType: SEARCH_FAIL,
      successType: SEARCH_SUCCESS,
    },

    process({ action }) {
      if( action.payload === '') return [];
      return axios.get(`${autoCompleteURL}?apikey=${API_KEY}&q=${action.payload}`)
         .then(resp =>  resp.data)
    },
});

const currentConditionForSelectedLogic = createLogic({
    type:CURRENT_CONDITION_FOR_SELECTED,
    processOptions:{
       dispatchReturn: true,
       failType: CURRENT_CONDITION_FOR_SELECTED_FAIL,
       successType: CURRENT_CONDITION_FOR_SELECTED_SUCCESS,
    },
    process({ getState ,action }){
        const locationKey = action.payload.Key
        return axios.get(`${currentConditionURL}${locationKey}?apikey=${API_KEY}`)
              .then(resp => resp.data)
    }
 });

const forecastForSelectedLogic = createLogic({
   type: FORECAST_FOR_SELECTED,
   processOptions:{
      dispatchReturn: true,
      failType: FORECAST_FOR_SELECTED_FAIL,
      successType: FORECAST_FOR_SELECTED_SUCCESS,
   },
   process({ getState, action }){
        const locationKey = action.payload.Key
        return axios.get(`${forecastForSelectedURL}${locationKey}?apikey=${API_KEY}&metric=true`)
         .then(resp => resp.data)
   }
});

export default [
   searchLogic,
   currentConditionForSelectedLogic,
   forecastForSelectedLogic,
];
 