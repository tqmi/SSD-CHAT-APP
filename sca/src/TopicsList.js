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
        console.log(searchValue.length);
        if(searchValue.length == 0){
            setQuery(topicsRef.orderBy('name'));
        }
        else{
            setQuery(topicsRef.where('name','==',searchValue));
        }
        setSearchValue('');
    }
    

    return (
    <div className="App">
        <header>
		    <h1>Topics</h1>			
		</header>
        <section>
            <div className="allright">

                <form onSubmit={searchTopic} className="topic-form">

                    <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search" className="topic-search-bar"/>
                    <button type="submit" className="topic-search-button">
                        <svg width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>

                </form> 
                
                <div className="topicList">
                    {topics && topics.map(topic =>{ return (
                        <>
                            <Topic key={topic.id} switchTopic={props.switchTopic} Topic={topic}/>
                        </>
                    )})}
                </div>
            </div>
        </section>
    </div>);

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
    <div className="topicButtonGroup">
        <button className="topButton" onClick={()=>switchTopic(props.Topic.id)}>{props.Topic.name}</button>

        {(props.Topic.subscribers && props.Topic.subscribers.includes(uid)) ? 
                        
            (<button className="topButton subscribeButton" onClick={()=>unsubscribeToTopic(props.Topic.id)}>
                <svg width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" className='subscribed-icon'>
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            </button>)
            
            : 
            
            (<button className="topButton subscribeButton" onClick={()=>subscribeToTopic(props.Topic.id)}>
                <svg width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" className='unsubscribed-icon'>
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            </button>)
        }
    </div>
    </>)
}

export default TopicsList;
export {Topic};