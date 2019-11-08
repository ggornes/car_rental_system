import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import LandingPage from '../Landing/Landing';
import AddPage from '../Add/Add'
import BrowsePage from '../Dashboard/Browse';
import DetailsPage from '../Details/Details'
import DetailsPage2 from '../Details/Details2'
import Navbar from '../Navigation/Navbar';

import * as ROUTES from '../../constants/routes';

const App = () => (
    <div>
        <Router>
            <Navbar />
            <Navigation />
            <hr />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.BROWSE} component={BrowsePage} />
            <Route path={ROUTES.ADD} component={AddPage} />
            <Route path={ROUTES.DETAILS} component={DetailsPage} />
            <Route path={ROUTES.DETAILS2} component={DetailsPage2} />

        </Router>
    </div>
);
export default App;