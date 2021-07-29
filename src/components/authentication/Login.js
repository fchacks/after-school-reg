import React, {useRef, useState, Component} from 'react'
import {Form, Button, Card,Alert} from 'react-bootstrap'
import {useAuth} from "../../contexts/AuthContext"
import {Link, useHistory} from "react-router-dom"
import firebase from "firebase/app";
import "firebase/auth";
import {db} from "../../firebase";
import CenteredContainer from "./CenteredContainer"


export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const adminRef = useRef();
    const {login} = useAuth(); 
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    const auth = firebase.auth();
    const signInWithGoogle = () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   // const roleRef = useRef();

    async function handleGoogleSubmit(e){
        e.preventDefault()

        try {
            setError("")
            setLoading(true)

            await signInWithGoogle();
            history.push("/")


        }
        catch(e){
            setError("Failed to log in.")
        }
        setLoading(false)
    }



    async function handleSubmit(e){
        e.preventDefault()


        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            history.push("/")

        }
        catch(e) {
            setError("Failed to log in.")
        }
        setLoading(false)

    }



    

    return (

    <CenteredContainer>
         <div>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4"> Log in </h2>
                    {error && <Alert variant = "danger">{error}</Alert>}
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref={emailRef} required/>
                        </Form.Group>

                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type = "password" ref={passwordRef} required/>
                        </Form.Group>
                        
                        <Button disabled = {loading} className = "w-100" type = "submit">Login</Button>

                    </Form>
                    <div className = "w-100 text-center mt-3">
                        <Link to = '/forgot-password'>Forgot password?</Link>
                    </div>
                    
                        <p>
                        <hr/>
                        </p>


                        {/* Google Submit. */}
                        <a id="google-button" class="btn btn-block btn-social btn-google" type = "submit" onClick = {handleGoogleSubmit}
                        disabled = {loading}>
                                <i class="fa fa-google"></i> Log in with Google
                        </a>
                </Card.Body>

            </Card>
            <div className = "w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign up</Link>
            </div>


        </div>

    </CenteredContainer>
       

    )
}
