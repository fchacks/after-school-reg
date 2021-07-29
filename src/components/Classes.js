//const classList = document.getElementById('#class-list')
import React, {useRef, useState} from 'react'
import {Card,Button,Alert, Form} from 'react-bootstrap'
import {useAuth } from '../contexts/AuthContext.js'
import {Link, useHistory} from "react-router-dom"
import firebase from "firebase"
import {db} from "../firebase"

let classList = [];


function renderClass(doc){
    // let li  = document.createElement('li');
    // let title = document.createElement('span');
    // let description = document.createElement('span');

    // li.setAttribute('data-id', doc.id)
    // title.textContent = doc.data().title;
    // description.textContent = doc.data().description;

    // li.appendChild(title);
    // li.appendChild(description);

    let li = "dog"
    
    classList.push(li);

}

db.collection("classes").get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
        renderClass(doc)
    })
})


export default classList;

