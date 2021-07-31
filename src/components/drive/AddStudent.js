import React, {useState} from 'react'
import {Button, Modal, Form, Alert} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons"
import {database} from '../../firebase'
import FormImpl from 'react-bootstrap/esm/Form'
import "react-datepicker/dist/react-datepicker.css";
import { useAuth} from "../../contexts/AuthContext";
import {firestore} from "../../firebase"

import AddFileButton from "./AddFileButton"



export default function AddStudent() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [medical, setMedical] = useState("")
    const {signup} = useAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [grade, setGrade] = useState("")
    const {currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function openModal(){
        setOpen(true)
    }
    function closeModal(){
        setOpen(false)
    }

    async function handleSubmit(e){

        e.preventDefault()

        if (password !== passwordConfirm){
            return setError("Passwords do not match.")

        }

        try {
            setError("")
            setLoading(true)
            // await signup(email,password)
            console.log("email: " + email + "   password: " + password)

            // doc(currentUser.uid).collection("children")

            firestore.collection("users").add({
                name: name,
                medical: medical,
                parentId: currentUser.uid,
                createdAt: database.getCurrentTimeStamp(),
                grade: grade,
                role: "student"
            })

        }
        catch(e) {
            setError("Failed to create an account.")
        }
        setLoading(false)

        //Add users to users collection in firebase
        
        setName("")
        closeModal()
    }


    return (
        <ul>
            <Button onClick = {openModal} variant = "outline-success" size = "sm">
            Add Child <FontAwesomeIcon icon = {faFolderPlus} />
            </Button>

            <Modal show = {open} onHide = {closeModal}>
                <Form onSubmit = {handleSubmit}>
                {error && <Alert variant = "danger">{error}</Alert>}
                    <Modal.Body>

                        {/* Student Name */}
                        <Form.Group>
                            <Form.Label>
                                Name
                            </Form.Label>

                            <Form.Control type = "text" required value = {name} 
                            onChange =  {e => setName(e.target.value)}/>

                        </Form.Group>

                        {/* email */}
                        <Form.Group>
                            <Form.Label>
                            Email
                            </Form.Label>

                            <Form.Control type = "textarea" required value = {email} 
                            onChange =  {e => setEmail(e.target.value)}/>
                        </Form.Group>

                        {/* password */}
                        <Form.Group>
                            <Form.Label>
                            Password
                            </Form.Label>

                            <Form.Control type = "password" required value = {password} 
                            onChange =  {e => setPassword(e.target.value)}/>
                        </Form.Group>

                        {/* Confirm password */}
                        <Form.Group>
                            <Form.Label>
                            Confirm Password
                            </Form.Label>

                            <Form.Control type = "password" required value = {passwordConfirm} 
                            onChange =  {e => setPasswordConfirm(e.target.value)}/>
                        </Form.Group>

                        {/* Grade */}
                        <Form.Group>
                            <Form.Label>
                            Grade
                            </Form.Label>

                            <Form.Control type = "integer" required value = {grade} 
                            onChange =  {e => setGrade(e.target.value)}/>
                        </Form.Group>

                        {/* Medical Notes */}
                        <Form.Group>
                            
                            <Form.Label>
                            Medical Notes 
                            
                            {/* We are not adding file for medical notes; just a text input */}
                            {/* <AddFileButton/> */}
                            </Form.Label>

                            <Form.Control type = "textarea" required value = {medical} 
                            onChange =  {e => setMedical(e.target.value)}/>

                            {/* <Form.Control type = "file" required value = {grade} 
                            onChange =  {e => setGrade(e.target.value)}/> */}
                        </Form.Group>
                            



                    </Modal.Body>


                    <Modal.Footer>
                        <Button variant = "secondary" onClick = {closeModal}>
                            Close
                        </Button>

                        <Button variant = "success" type = "submit">
                            Add Child
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </ul>

    )
}
