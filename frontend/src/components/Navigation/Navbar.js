import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";

import {Link} from 'react-router-dom';
import * as ROUTES from "../../constants/routes";


class NavbarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    render() {
        return (

            <MDBNavbar color="indigo" dark expand="md" fixed="top">
                <MDBNavbarBrand href="/">
                    <strong className="white-text">g@round</strong>
                </MDBNavbarBrand>
                {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
                <MDBCollapse isOpen={this.state.collapse} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active>
                            <MDBNavLink to={ROUTES.LANDING}>Home</MDBNavLink>
                        </MDBNavItem>

                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <span className="mr-2">Vehicles</span>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem ><Link to={ROUTES.BROWSE}>Browse</Link></MDBDropdownItem>
                                    <MDBDropdownItem><Link to={ROUTES.ADD}>Add new</Link></MDBDropdownItem>

                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>

                    </MDBNavbarNav>
                    <MDBNavbarNav right>

                        <MDBNavItem>
                            <MDBFormInline waves>
                                <div className="md-form my-0">
                                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                                </div>
                            </MDBFormInline>
                        </MDBNavItem>

                    </MDBNavbarNav>
                </MDBCollapse>
        </MDBNavbar>

        );
    }
}

export default NavbarPage;