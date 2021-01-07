import './AskNewTopic.css'

import React, { useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase,auth,firestore} from './firebase'

function AskNewTopic(props) {

	// const topicsRef = firestore.collection('topics');
	// const {uid} = auth.currentUser;
    // const query = topicsRef.where('subscribers','array-contains',uid);
    // const [topics] = useCollectionData(query,{idField:'id'});
    
    const [name,setName] = useState('');
    const [desc,setDesc] = useState('');

    const askNewTopic = async(e) =>{
        e.preventDefault();
        const { uid } = auth.currentUser;
        const topicsRef = firestore.collection('asked_topics');
        topicsRef.add({name:name,description:desc,createdAt:firebase.firestore.FieldValue.serverTimestamp(),createdBy:uid});

        setName('');
        setDesc('');
    }

    return (<div className="App">
        <header>
		    <h1>Ask Topic</h1>			
		</header>
        <main>
            <form onSubmit={askNewTopic} className='topic-form'>
				<label>Name :</label><input type='text' id="name" name='name' placeholder='Topic Name' value={name} onChange={(e)=>setName(e.target.value)}/>
				<label>Description :</label><input type='text' id='desc' name='desc' placeholder='Description' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                <button type="submit" disabled={!name}>Create</button>
			</form>
        </main>
    </div>)
}

export default AskNewTopic;