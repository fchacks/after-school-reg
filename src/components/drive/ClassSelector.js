import React, {useState, useEffect} from 'react'
import {database} from '../../firebase'
import Select from 'react-select'
import {Button, Modal, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Navbar from "./Navbar"

export default function ClassSelector() {

    //classes from the database
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(false)

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




    return (
        <div>
            <Navbar/>

                
                {classes.map((current) => 

                        <center>
                        <Link to = {"classes-" + (current.data().name)} className = "btn-lg">Details</Link>{current.data().name}</center>
                        
                )}

                
                

        </div>


    )
}
