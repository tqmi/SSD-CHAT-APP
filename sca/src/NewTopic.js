import './NewTopic.css'

import React, { useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase,auth,firestore} from './firebase'

function NewTopic(props) {

	// const topicsRef = firestore.collection('topics');
	// const {uid} = auth.currentUser;
    // const query = topicsRef.where('subscribers','array-contains',uid);
    // const [topics] = useCollectionData(query,{idField:'id'});
    
    const [name,setName] = useState('');
    const [desc,setDesc] = useState('');

    const createNewTopic = async(e) =>{
        e.preventDefault();

        const topicsRef = firestore.collection('topics');
        topicsRef.add({name:name,description:desc});

        setName('');
        setDesc('');
    }

    return (<div className="App">
        <header>
		    <h1>New Topic</h1>			
		</header>
        <main>
            <form onSubmit={createNewTopic} className='topic-form'>
				<label>Name :</label><input type='text' id="name" name='name' placeholder='Topic Name' value={name} onChange={(e)=>setName(e.target.value)}/>
				<label>Description :</label><input type='text' id='desc' name='desc' placeholder='Description' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                <button type="submit" disabled={!name}>Create</button>
			</form>
        </main>
    </div>)
}

export default NewTopic;