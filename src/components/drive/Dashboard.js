import React from 'react'
import Navbar from './Navbar'
import {Container} from 'react-bootstrap'
import AddClass from './AddClass'
import AddStudent from "./AddStudent"
import AddSession from "./AddSession"

export default function Dashboard() {
    return (
    <div>

        <Navbar/>
        <Container fluid>
            <AddClass/>
            <AddSession/>
            <AddStudent/>
            
        </Container>


    </div>

        
    )
}
