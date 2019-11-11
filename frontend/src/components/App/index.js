import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import LandingPage from '../Landing/Landing';
import LandingPage2 from '../Landing/Landing2';
import AddPage from '../Add/Add'
import BrowsePage from '../Dashboard/Browse';
import DetailsPage from '../Details/Details'
import DetailsPage2 from '../Details/Details2'
import Navbar from '../Navigation/Navbar';

import * as ROUTES from '../../constants/routes';
import FooterPage from "../Navigation/Footer";
import EditVehicle from "../EditVehicle/EditVehicle";

const App = () => (
    <div>
        <header>
            <Router>
                <Navbar />
                <br/><br/><br/>

                <Route exact path={ROUTES.LANDING} component={LandingPage2} />
                <Route path={ROUTES.BROWSE} component={BrowsePage} />
                <Route path={ROUTES.ADD} component={AddPage} />
                <Route path={ROUTES.EDIT_VEHICLE} component={EditVehicle} />
                <Route path={ROUTES.DETAILS} component={DetailsPage} />
                <Route path={ROUTES.DETAILS2} component={DetailsPage2} />



            </Router>
        </header>

    </div>
);
export default App;