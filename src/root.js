import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './styles/reset.css';

import App from './components/app';

const Root = () => 
{
   return (
        <Provider store={ store }>
            <App/>
        </Provider>
    )
;}

export default Root;
