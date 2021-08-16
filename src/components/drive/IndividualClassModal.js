import React, {useState, useEffect} from 'react'
import Navbar from "./Navbar"
import {firestore} from "../../firebase"
import {Button, Modal, Form} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons"
import FormImpl from 'react-bootstrap/esm/Form'
import "react-datepicker/dist/react-datepicker.css";
import { useAuth} from "../../contexts/AuthContext";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Select from 'react-select'

// import classes from "./TestClasses.js"

export default function IndividualClassModal() {

    // Modal stuff
    const [open, setOpen] = useState(false)
    function openModal(){
        setOpen(true)
    }
    function closeModal(){
        setOpen(false)
    }





     //once the form is submitted
     function handleSubmit(e){

        e.preventDefault()

    }

    return (
        <div>

                <Form onSubmit = {handleSubmit}>

                    <Form.Group>
                        <Form.Label>Sessions</Form.Label>

                        <Select>
                             

                        </Select>
                    </Form.Group>
                </Form>


        </div>
    )
}
