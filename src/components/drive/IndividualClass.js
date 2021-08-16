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
import IndividualClassModal from './IndividualClassModal'

// import classes from "./TestClasses.js"

export default function IndividualClass({match}) {

    //get language from URL param
    const className = match.params.className;

    const [classes, setClasses] = useState([])
    const ID = []
    const [sessions, setSessions] = useState([])
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)

    //define current user
    const {currentUser} = useAuth();

    //target value selected from drop down menu of classes
    const [targetSession, setTargetSession] = useState("")

    //target value selected from drop down menu of classes
    const [targetStudent, setTargetStudent] = useState("")

    //for checkboxes for students
    // const [checked, setChecked] = React.useState(false);
    // const handleCheckChange = () => {
    //     setChecked(!checked);
    //   };

    //handle change in the drop down menu - set target to the event
    const handleSessionChange = e => {
        setTargetSession(e);
        console.log(e)
      }

      const handleStudentChange = e => {
        setTargetStudent(e);
        console.log(e)
      }


    const ref = firestore.collection("classes").where("name" , "==" , className).limit(1)
    var refSession = undefined;
    const refStudents = firestore.collection("users").where("parentID", "==", currentUser.uid)




    const [open, setOpen] = useState(false)
    function openModal(){
        setOpen(true)
    }
    function closeModal(){
        setOpen(false)
    }

    function getClasses(){
        setLoading(true)
        ref.onSnapshot((querySnapshot) =>{
            const items = [];

            //getting the id of every single item in the class ; 
            //this is pretty inefficient as we are treating it as an array when it is only one object
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
                ID.push(doc.id)


            })
            setClasses(items)

            console.log(ID[0])
            refSession = firestore.collection("sessions").where("classID" , "==" , ID[0])
            getSessions();


            setLoading(false)
        })
    }

    function getSessions(){
        setLoading(true)
        console.log("refsession state " + refSession)
        refSession.onSnapshot((querySnapshot) =>{
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc);
            })
            console.log("length: " + items.length)
            setSessions(items)
            setLoading(false)
        })
    }

    function getStudents(){
        setLoading(true)
        refStudents.onSnapshot((querySnapshot) =>{
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc);
            })
            console.log("length: " + items.length)
            setStudents(items)
            setLoading(false)
        })
    }



    //once the form is submitted
    function handleSubmit(e){

        e.preventDefault()
        // console.log("pooopp")

        firestore.collection("sessions").doc(targetSession.id).collection("students").doc(targetStudent.id).set({
            name: targetStudent.name1,
            id: targetStudent.id,
            

        })

        //Create session in firebase
        closeModal()
    }

    useEffect(() => {
        getClasses()
        getStudents()

    }, [])

    if (loading){
        return <h1>Loading...</h1>
    }


    return (
        <div>
            <Navbar/>

            <center><h2>{className}</h2>

            {classes.map((class1) => (
                    <div key = {class1.id}>
                    <p>Description: {class1.description}</p>
                    <p>Grade range: {class1.lowGrade} to {class1.highGrade}</p>
                    <p>Cost: {class1.cost}</p>

                </div>


            ))}



            {/* {classes[0].description} */}

            {/* <hr></hr> */}

            {/* <IndividualClassModal></IndividualClassModal> */}


            <Button onClick = {openModal} variant = "outline-success" size = "sm">
            Enroll in Session <FontAwesomeIcon icon = {faFolderPlus} />
            </Button>

            <Modal show = {open} onHide = {closeModal}>

                <Form onSubmit = {handleSubmit}>

                    <Form.Group>
                        <Form.Label>Sessions</Form.Label>

                        <Select value = {targetSession.name} onChange = {handleSessionChange}
                        
                        options = {sessions.map((current) => {
                            return {
                                label: current.data().endSessionDate.toDate()
                                 + " --- " + current.data().endSessionDate.toDate(),
                                id: current.id,
                            };
                        })}>
                             

                        </Select>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Enroll Students</Form.Label>

                        {/* <div>
                        <input type = "checkbox" checked = {checked} onChange = {handleCheckChange}/>

                        </div> */}
                        <Select value = {targetStudent.name} onChange = {handleStudentChange}
                        
                        options = {students.map((current) => {
                            return {
                                label: current.data().name,
                                name1: current.data().name,
                                id: current.id,
                            };
                        })}>
                             

                        </Select>

                             
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant = "secondary" onClick = {closeModal}>
                            Close
                        </Button>

                        <Button variant = "success" type = "submit">
                            Enroll Session
                        </Button>
                    </Modal.Footer>

                </Form>

                
            </Modal>


            </center>






        </div>
    )
}
