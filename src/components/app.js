import React  from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './pages/Home'


const App = ({ classes }) => (
    <div className="">
    <Router>
        <Route exact path="/" component={Home}/>
        {/* <Route path="/favorites" component={Favorites}/> */}
    </Router>
    </div>
);

export default App;
