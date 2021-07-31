import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function NavbarComponent() {
    return (

        <Navbar bg = 'light' expand = "sm">

            <Navbar.Brand as = {Link} to = "/">
                Fox Chapel PTO
            </Navbar.Brand>

            <Nav>
                <Nav.Link as = {Link} to = "/user">
                    Profile
                </Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link as = {Link} to = "/classes">
                    Classes
                </Nav.Link>
            </Nav>

        </Navbar>
        

    )
}
