import './Menu.css'

import React, { useRef, useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebase, auth, firestore } from './firebase'


function Menu() {

    return (<>
        <a href="#" class="myButton">HOME</a><br /><br />
        <a href="#" class="myButton">Button 1</a><br/><br />
        <a href="#" class="myButton">Button 2</a><br/><br />
    </>);

}

export default Menu;