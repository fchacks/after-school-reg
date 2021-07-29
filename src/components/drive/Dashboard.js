import React from 'react'
import Navbar from './Navbar'
import {Container} from 'react-bootstrap'
import AddClass from './AddClass'

export default function Dashboard() {
    return (
    <ul>

        <Navbar/>
        <Container fluid>
            <AddClass/>
        </Container>


    </ul>

        
    )
}
