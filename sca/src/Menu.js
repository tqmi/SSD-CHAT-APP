import './Menu.css'

import React, { useRef, useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebase, auth, firestore } from './firebase'


function Menu() {

    return (<>

        <div class="container">
            <ul class="icon-menu">
            
                <li class="icon-box home">
                <i class="fas fa-home"></i> <a href="#">
                        <h2>Home</h2></a>
                </li>


                <li class="icon-box design">
                    <i class="fa fa-paint-brush fa-4x"></i> <a href="#">
                        <h2>Design</h2></a>
                </li>


                <li class="icon-box coding">
                    <i class="fa fa-code fa-4x"></i> <a href="#">
                        <h2>Coding</h2></a>
                </li>


                <li class="icon-box shop">
                    <i class="fa fa-shopping-cart fa-4x"></i> <a href="#">
                        <h2>Shop</h2></a>
                </li>

                


            </ul>


            
        </div>
    </>);

}

export default Menu;