import './Menu.css'

import React, { useRef, useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebase, auth, firestore } from './firebase'


function Menu(props) {

    return (
    <div className='App'>
        <header>
		    <h1>Menu</h1>			
		</header>
        {props.options && props.options.map(opt=><button onClick={()=> opt.action()}>{opt.name}</button>)}
    </div>
    );

}

export default Menu;