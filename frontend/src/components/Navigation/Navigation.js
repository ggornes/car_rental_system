import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.BROWSE}>Browse</Link>
            </li>
            <li>
                <Link to={ROUTES.ADD}>Add</Link>
            </li>
            <li>
                <Link to={ROUTES.DETAILS}>Details</Link>
            </li>

        </ul>
    </div>
);

export default Navigation;