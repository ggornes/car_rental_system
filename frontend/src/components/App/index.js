import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage2 from '../Landing/Landing2';
import AddPage from '../Add/Add'
import BrowsePage from '../Dashboard/Browse';
import DetailsPage3 from '../Details/Details3'
import Navbar from '../Navigation/Navbar';
import * as ROUTES from '../../constants/routes';
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
                <Route path={ROUTES.DETAILS3} component={DetailsPage3} />
            </Router>
        </header>

    </div>
);
export default App;