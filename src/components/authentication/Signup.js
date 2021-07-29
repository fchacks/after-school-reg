import React, {useRef, useState} from 'react'
import {Form, Button, Card,Alert} from 'react-bootstrap'
import {useAuth} from "../../contexts/AuthContext"
import {Link, useHistory} from "react-router-dom"
import firebase from 'firebase/app';
import {firestore} from "../../firebase"
import CenteredContainer from "./CenteredContainer"

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth(); 
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const auth = firebase.auth();
    const signInWithGoogle = () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    async function handleSubmit(e){
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match.")

        }

        try {
            setError("")
            setLoading(true)


            await signup(emailRef.current.value,passwordRef.current.value)


            //adds a document with the user id into users collection
            firestore.collection("users").doc(auth.currentUser.uid).set({
                email: emailRef.current.value,
            })

            history.push("/")


        }
        catch(e) {
            setError("Failed to create an account.")
        }
        setLoading(false)

    }


    async function handleGoogleSubmit(e){
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await signInWithGoogle();
            history.push("/")


        }
        catch(e){
            setError("Failed to create account.")
        }
        setLoading(false)
    }

    return (
        <CenteredContainer>
            <div>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4"> Sign up </h2>
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

                        <Form.Group id = "password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type = "password" ref={passwordConfirmRef} required></Form.Control>
                        </Form.Group>
                        
                        <Button disabled = {loading} className = "w-100" type = "submit">Sign up</Button>

                                    <p>
                                    <hr/>
                                    </p>


                        {/* <button onClick={signInWithGoogle} className = 'w-100' type = "submit">Sign up with Google</button> */}
                        <a id="google-button" class="btn btn-block btn-social btn-google" type = "submit" onClick = {handleGoogleSubmit}
                        disabled = {loading}>
                                <i class="fa fa-google"></i> Sign up with Google
                        </a>


                    </Form>
                </Card.Body>
            </Card>
            <div className = "w-100 text-center mt-2">
                Already have an account? <Link to = "/login">Log in</Link>
            </div>


        </div>

        </CenteredContainer>
        

    )
}
