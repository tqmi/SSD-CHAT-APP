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
        <div className= "header">
		      <h1>Topics</h1>			
		    </div>
        <div ClassName="allright">

        <form onSubmit={searchTopic}>

            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search" />

            <button type="submit" disabled={!searchValue}>Go</button>

        </form>
            <div className="topicList">
            {topics && topics.map(topic =>{ return (
                <>
                    <Topic key={topic.id} switchTopic={props.switchTopic} Topic={topic}/>
                </>
            )})}
            </div>
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
    <div className="topicButton">
        <button className="topButton" onClick={()=>switchTopic(props.Topic.id)}>{props.Topic.name}</button>

        {(props.Topic.subscribers && props.Topic.subscribers.includes(uid)) ? 
                        
            (<button className="topButton1" onClick={()=>unsubscribeToTopic(props.Topic.id)}> <img src="http://clipart-library.com/images/yikKedkjT.png"></img></button>)
            
            : 
            
            (<button className="topButton1" onClick={()=>subscribeToTopic(props.Topic.id)}><img src="http://clipart-library.com/img/2184482.png"></img></button>)
        }
    </div>
    </>)
}

export default TopicsList;