import React, {useState} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons"
import {database} from '../../firebase'
import FormImpl from 'react-bootstrap/esm/Form'
import "react-datepicker/dist/react-datepicker.css";
import { useAuth} from "../../contexts/AuthContext";


export default function AddClass() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [cost, setCost] = useState("")
    const [startSessionDate, setStartSessionDate] = useState(new Date());
    const [endSessionDate, setEndSessionDate] = useState(new Date());
    const {currentUser} = useAuth();

    function openModal(){
        setOpen(true)
    }
    function closeModal(){
        setOpen(false)
    }

    function handleSubmit(e){

        e.preventDefault()

        //Create folder in firebase
        database.classes.add({
            name: name,
            description: description,
            startSessionDate: startSessionDate,
            endSessionDate: endSessionDate,
            userId: currentUser.uid,
            createdAt: database.getCurrentTimeStamp(),

        })
        setName("")
        closeModal()
    }


    return (
        <ul>
            <Button onClick = {openModal} variant = "outline-success" size = "sm">
            Add Class <FontAwesomeIcon icon = {faFolderPlus} />
            </Button>

            <Modal show = {open} onHide = {closeModal}>
                <Form onSubmit = {handleSubmit}>
                    <Modal.Body>

                        {/* ClassName */}
                        <Form.Group>
                            <Form.Label>
                                Class Name
                            </Form.Label>

                            <Form.Control type = "text" required value = {name} 
                            onChange =  {e => setName(e.target.value)}/>

                        </Form.Group>

                        {/* Description */}
                        <Form.Group>
                            <Form.Label>
                            Description
                            </Form.Label>

                            <Form.Control type = "textarea" required value = {description} 
                            onChange =  {e => setDescription(e.target.value)}/>
                        </Form.Group>

                        {/* Session Dates */}
                        <Form.Group>
                            <Form.Label>
                                Session Dates
                            </Form.Label>
                            <p>Start
                            <DatePicker selected={startSessionDate} onChange={(date) => setStartSessionDate(date)} />
                            </p>

                            <p>End 
                            <DatePicker selected={endSessionDate} onChange={(date) => setEndSessionDate(date)} />
                            </p>
                        </Form.Group>

                        {/* Cost */}
                        <Form.Group>
                            <Form.Label>
                                Cost ($)
                            </Form.Label>
                            <Form.Control type = "number" required value = {cost} 
                            onChange =  {e => setCost(e.target.value)}/>
                        </Form.Group>

                    </Modal.Body>


                    <Modal.Footer>
                        <Button variant = "secondary" onClick = {closeModal}>
                            Close
                        </Button>

                        <Button variant = "success" type = "submit">
                            Add Class
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </ul>

    )
}
