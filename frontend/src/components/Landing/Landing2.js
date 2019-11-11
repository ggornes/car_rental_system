import React from 'react';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavItem,
    MDBNavLink,
    MDBContainer,
    MDBMask,
    MDBView,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline
} from 'mdbreact';


class Landing2 extends React.Component {
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
            <div>
                <header>




                    <MDBView src="https://www.proxcar.com/wp-content/uploads/2017/03/cras.jpg">
                        <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
                            <h2>g@round</h2>
                            <h5>Rental Management System</h5>
                            <br />
                            <p> </p>
                        </MDBMask>
                    </MDBView>
                </header>

                <main>
                    <MDBContainer className="text-center my-5">
                        <p align="justify"></p>
                    </MDBContainer>
                </main>
            </div>
        );
    }
}

export default Landing2;