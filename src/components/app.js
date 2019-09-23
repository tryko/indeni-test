import React  from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './pages/Home'


const App = ({ classes }) => (
    <div className="">
    <Router>
        <Route exact path="/" component={Home}/>
    </Router>
    </div>
);

export default App;
