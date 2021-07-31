import React, {useState, useEffect} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons"
import {database} from '../../firebase'
import FormImpl from 'react-bootstrap/esm/Form'
import "react-datepicker/dist/react-datepicker.css";
import { useAuth} from "../../contexts/AuthContext";
import {firestore} from "../../firebase"
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Select from 'react-select'



export default function AddSession() {


    //classes from the database
    const [classes, setClasses] = useState([])

    //target value selected from drop down menu of classes
    const [target, setTarget] = useState("")

    //handle change in the drop down menu - set target to the event
    const handleChange = e => {
        setTarget(e);
        console.log(e)
      }

    const [loading, setLoading] = useState(false)
    const [startSessionDate, setStartSessionDate] = useState(new Date());
    const [endSessionDate, setEndSessionDate] = useState(new Date());


    //once the form is submitted
    function handleSubmit(e){

        e.preventDefault()

        //Create session in firebase
        database.sessions.add({
            startSessionDate: startSessionDate,
            endSessionDate: endSessionDate,
            name: target.label,
            classID: target.id,
            createdAt: database.getCurrentTimeStamp(),


        })
        closeModal()
    }

    //get classes from the database thru snapshot - we are pushing the entire doc to items[] so we can access doc.id
    function getClasses(){
        setLoading(true)
        database.classes.onSnapshot((querySnapshot) =>{
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc);
            })
            setClasses(items)
            setLoading(false)
        })
    }

    
    useEffect(() => {
        getClasses()
    }, [])

    const [open, setOpen] = useState(false)

    function openModal(){
        setOpen(true)
    }
    function closeModal(){
        setOpen(false)
    }

    return (
        <ul>

             <Button onClick = {openModal} variant = "outline-success" size = "sm">
            Add Session <FontAwesomeIcon icon = {faFolderPlus} />
            </Button>

            <Modal show = {open} onHide = {closeModal}>


                <Form onSubmit = {handleSubmit}>

                    <Form.Group>
                        <Form.Label>Class Selection </Form.Label>

                        <Select value = {target.name} onChange = {handleChange}
                        
                        options = {classes.map((current) => {
                            return {
                                label: current.data().name,
                                id: current.id,
                            };
                        })}>
                             

                        </Select>
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





                <Modal.Footer>
                        <Button variant = "secondary" onClick = {closeModal}>
                            Close
                        </Button>

                        <Button variant = "success" type = "submit">
                            Add Session
                        </Button>
                </Modal.Footer>

                </Form>



            </Modal>

        </ul>
    )
}
