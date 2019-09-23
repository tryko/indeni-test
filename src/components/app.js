import React  from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home'
import Edit from './pages/Edit'


const App = ({ classes }) => (
    <div className="">
    <Router>
        <Route exact path="/" component={Home}/>
        <Route path="/edit" component={Edit} />
    </Router>
    </div>
);

export default App;
