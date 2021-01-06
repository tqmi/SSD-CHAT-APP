import './HomePage.css'

import React from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase,auth,firestore} from './firebase'

function HomePage(props) {

	const topicsRef = firestore.collection('topics');
	const {uid} = auth.currentUser;
    const query = topicsRef.where('subscribers','array-contains',uid);
    const [topics] = useCollectionData(query,{idField:'id'});
    

    function switchTopic(topicID){
        props.switchTopic(topicID);
    }

    return (<>
        <header>
		    <h1>HOME</h1>			
		</header>
        <main>
            {topics && topics.map(topic => (
                <>
                    <button key={topic.id} onClick={()=>switchTopic(topic.id)}>{topic.name}</button>
                </>
            ))}
        </main>
    </>)
}

export default HomePage;