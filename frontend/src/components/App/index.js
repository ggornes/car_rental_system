import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import LandingPage from '../Landing/Landing';
import AddPage from '../Add/Add'
import BrowsePage from '../Dashboard/Browse';

import * as ROUTES from '../../constants/routes';

const App = () => (
    <div>
        <Router>
            <Navigation />
            <hr />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.BROWSE} component={BrowsePage} />
            <Route path={ROUTES.ADD} component={AddPage} />

        </Router>
    </div>
);
export default App;