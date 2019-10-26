import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import DashboardPage from '../Dashboard';
import * as ROUTES from '../../constants/routes';

const App = () => (
    <div>
        <Router>
            <Navigation />
            <hr />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
        </Router>
    </div>
);
export default App;