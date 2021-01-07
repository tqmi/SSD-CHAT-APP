import './Menu.css'

import React, { useRef, useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebase, auth, firestore } from './firebase'


function Menu(props) {


    return (<>
    
        <div className="header">
            <h1> Menu </h1>
        </div>
       
        
        {props.options && props.options.map(opt=><button className="myButton" onClick={()=> opt.action()}>{opt.name}</button>)}
     
    </>);


}

export default Menu;