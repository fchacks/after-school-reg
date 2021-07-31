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
    const [capacity, setCapacity] = useState("")
    const [lowGrade, setLowGrade] = useState("")
    const [highGrade, setHighGrade] = useState("")
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
            userId: currentUser.uid,
            createdAt: database.getCurrentTimeStamp(),
            cost: cost,
            capacity: capacity,
            availableSeats: capacity,
            lowGrade: lowGrade,
            highGrade: highGrade,



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

                        {/* Cost */}
                        <Form.Group>
                            <Form.Label>
                                Cost ($)
                            </Form.Label>
                            <Form.Control type = "number" required value = {cost} 
                            onChange =  {e => setCost(e.target.value)}/>
                        </Form.Group>

                        {/* Max Capacity */}
                        <Form.Group>
                            <Form.Label>
                                Max Capacity
                            </Form.Label>
                            <Form.Control type = "number" required value = {capacity} 
                            onChange =  {e => setCapacity(e.target.value)}/>
                        </Form.Group>

                        {/* Grades */}
                        <Form.Group>
                            <Form.Label>
                                Grade Range
                            </Form.Label>
                            <p>Low <input type = "number" required value = {lowGrade}
                            onChange = {e => setLowGrade(e.target.value)}/></p>

                            <p>High <input type = "number" required value = {highGrade}
                            onChange = {e => setHighGrade(e.target.value)}/></p>

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
