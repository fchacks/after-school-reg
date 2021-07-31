// TEST file for displaying classes - this is the format for active updating on the webpage

import React, {useState, useEffect} from 'react'
import {database} from '../../firebase'
import {firestore} from "../../firebase"


export default function TestClasses() {

    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(false)
    const ref  = firestore.collection("classes");
    console.log(ref)

    function getClasses(){
        setLoading(true)
        ref.onSnapshot((querySnapshot) =>{
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            })
            setClasses(items)
            setLoading(false)
        })
    }

    // second function we can use - this has no live updating
    // function getClasses2(){
    //     setLoading(true);
    //     ref.get().then((item => {
    //         const items = item.docs.map((doc) => doc.data());
    //         setClasses(items)
    //         setLoading(false)

    //     }))
    // }

    useEffect(() => {
        getClasses()
    }, [])

    if (loading){
        return <h1>Loading...</h1>
    }


    return (
        <div>
            <h1>Classes</h1>

            {classes.map((class1) => (
                <div key = {class1.id}>
                    <h2>{class1.name}</h2>
                    <p>{class1.description}</p>

                </div>
            ))}

            
        </div>
    );
}
