import './TopicsList.css'

import React, { useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase,auth,firestore} from './firebase'

function TopicsList(props) {

    
    const topicsRef = firestore.collection('topics');
    const [query,setQuery] = useState(topicsRef.orderBy('name'));
    const [topics] = useCollectionData(query,{idField:'id'});
    const [searchValue,setSearchValue] = useState('');


    const searchTopic = async(e) => {
        e.preventDefault();
        setQuery(topicsRef.where('name','==',searchValue));
        setSearchValue('');
    }
    
    return (<>
        <header>
		      <h1>Topics</h1>			
		    </header>
        <div ClassName="topics">

        <form onSubmit={searchTopic}>

            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search" />

            <button type="submit" disabled={!searchValue}>SEARCH</button>

        </form>
            {topics && topics.map(topic =>{ return (
                <>
                    <Topic key={topic.id} switchTopic={props.switchTopic} Topic={topic}/>
                </>
            )})}
        </div>
    </>)

}



function Topic(props) {
    
    const {uid} = auth.currentUser;
    function switchTopic(topicID){
        props.switchTopic(topicID);
    }

    const subscribeToTopic = async(topicID) => {
        const topicRef = firestore.collection('topics').doc(topicID);
        await topicRef.update({subscribers: firebase.firestore.FieldValue.arrayUnion(uid)});
    }

    const unsubscribeToTopic = async(topicID) => {
        const topicRef = firestore.collection('topics').doc(topicID);
        await topicRef.update({subscribers: firebase.firestore.FieldValue.arrayRemove(uid)});
    }

    return (<>
        <button onClick={()=>switchTopic(props.Topic.id)}>{props.Topic.name}</button>

        {(props.Topic.subscribers && props.Topic.subscribers.includes(uid)) ? 
                        
            (<button onClick={()=>unsubscribeToTopic(props.Topic.id)}>unsubscribe</button>)
            
            : 
            
            (<button onClick={()=>subscribeToTopic(props.Topic.id)}>subscribe</button>)
        }

    </>)
}

export default TopicsList;