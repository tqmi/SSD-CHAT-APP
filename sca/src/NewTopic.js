import './NewTopic.css'

import React, { useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase,auth,firestore} from './firebase'
import { SignOut } from './Auth';

function NewTopic(props) {
    
    const [name,setName] = useState('');
    const [desc,setDesc] = useState('');


    const createNewTopic = async(e) =>{
        e.preventDefault();
        const topicsRef = firestore.collection('topics');
        topicsRef.add({name:name,description:desc,createdAt:firebase.firestore.FieldValue.serverTimestamp(),createdBy:auth.currentUser.uid});

        setName('');
        setDesc('');
    }

    return (<div className="App">
        <header>
		    <h1>New Topic</h1>
            <h2>{auth.currentUser.displayName}</h2>
            <SignOut/>			
		</header>
        <section>
            <form onSubmit={createNewTopic} className='create-topic-form'>
                <h1>Create New Topic</h1>
				{/* <label>Name :</label> */}
                <input type='text' id="name" name='name' placeholder='Topic Name' value={name} onChange={(e)=>setName(e.target.value)}/>
				{/* <label>Description :</label> */}
                <textarea type='text' id='desc' name='desc' placeholder='Description' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                <button type="submit" disabled={!name}>Create</button>
			</form>
        </section>
    </div>)
}

export default NewTopic;