import React from 'react'
import {faFileUpload} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useAuth} from '../../contexts/AuthContext'
import {storage} from "../../firebase"

export default function AddFileButton() {

    const {currentUser} = useAuth()

    function handleUpload(e){
        const file = e.target.files[0]
        if (file == null) return 
        
        const uploadTask = storage.ref(`/files/${currentUser.uid}/${file.name}`).put(file)
    }
    return (
        // <label className = "btn btn-outline-success btn-sm m-0 mr-2">
        //     <FontAwesomeIcon icon = {faFileUpload}/>
        //     <input type = "file" onChange = {handleUpload} style = {{opacity :0,
        //     position: "absolute", left: "-999px"}}></input>
        // </label>

        <input type = "file" onChange = {handleUpload} ></input>
    )
}
