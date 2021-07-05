import React, {useRef, useState} from 'react'
import {Card,Button,Alert, Form} from 'react-bootstrap'
import {useAuth } from '../contexts/AuthContext.js'
import {Link, useHistory} from "react-router-dom"
import firebase from "firebase"
const functions = firebase.functions();




export default function Dashboard() {

    //use setAdmin to change state of admin
    const [admin,setAdmin] = useState(true)

    const [error,setError] = useState("")
    const {currentUser, logout} = useAuth();
    const history = useHistory();
    const adminRef = useRef();

    //if currentUser is an admin then setAdmin to true
    if (currentUser){
        currentUser.getIdTokenResult().then(idTokenResult =>{
            console.log(idTokenResult.claims);
            currentUser.admin = idTokenResult.claims.admin;
            setAdmin(currentUser.admin)
            console.log("Admin: ", currentUser.admin)
        })
    }

    
    
    async function handleLogout(){
        setError("")
        try {
            await logout();
            history.push("/login")
        }
        catch{
            setError("Failed to log out")
        }
    }



    // submitting as an admin, console logs the result.
    async function adminForm(e){
        e.preventDefault();
        const adminEmail = adminRef.current.value;
        const addAdminRole = functions.httpsCallable("addAdminRole");
        addAdminRole({ email: adminEmail }).then(result =>{
        console.log(result)
        })

    }


    

    return (
        <>

        <Card>
            <Card.Body>
                <h2 className = "text-center mb-4"> Profile </h2>
                {error && <Alert variant = "danger">{error}</Alert>}
                <strong>Email: </strong> {currentUser.email}
                <Link to = "/update-profile" className = "btn btn-primary w-100 mt-3">Update Profile</Link>
            </Card.Body>    
            
            
            
            {/* Below is for submitting an admin; not the final form; only available to admins*/}

            {admin && <hr></hr>}

            {admin && <Card.Body>

                <Form.Group id = "admin-email" class = "admin-actions">
                                <Form.Control  class = "admin-actions"
                                placeholder = "User email" ref = {adminRef} required/>
                </Form.Group>

                <Button className = "w-100" type = "submit" onClick = {adminForm}>Make Admin</Button>

            </Card.Body>}
        </Card>




        <div className = "w-100 text-center mt-2">
            <Button variant = "link" onClick = {handleLogout}>Log out</Button>
        </div>

        </>
    )
}
