import './TopicsList.css'

import React from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase,auth,firestore} from './firebase'

function TopicsList(props) {

    const topicsRef = firestore.collection('topics');
    const query = topicsRef.orderBy('name');
    const [topics] = useCollectionData(query,{idField:'id'});
    const {uid} = auth.currentUser;

    function switchTopic(topicID){
        props.switchTopic(topicID);
    }

    const subscribeToTopic = async(topicID) => {
        const topicRef = topicsRef.doc(topicID);
        await topicRef.update({subscribers: firebase.firestore.FieldValue.arrayUnion(uid)});
    }

    const unsubscribeToTopic = async(topicID) => {
        const topicRef = topicsRef.doc(topicID);
        await topicRef.update({subscribers: firebase.firestore.FieldValue.arrayRemove(uid)});
    }

    return (<>
        <header>
		    <h1>SCA</h1>			
		</header>
        <main>
            {topics && topics.map(topic => (
                <>
                    <button key={topic.id} onClick={()=>switchTopic(topic.id)}>{topic.name}</button>
                    {(topic.subscribers && topic.subscribers.includes(uid)) ? 
                        
                        (<button onClick={()=>unsubscribeToTopic(topic.id)}>unsubscribe</button>)
                        
                        : 
                        
                        (<button onClick={()=>subscribeToTopic(topic.id)}>subscribe</button>)
                    }
                    
                </>
            ))}
        </main>
    </>)
}

export default TopicsList;