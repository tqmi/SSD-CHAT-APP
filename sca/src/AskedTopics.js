import './AskedTopics.css'

import React, { useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase,auth,firestore} from './firebase'
import { SignOut } from './Auth';

function AskedTopicsList(props) {

    
    const topicsRef = firestore.collection('asked_topics');
    const query =topicsRef.orderBy('name');
    const [topics] = useCollectionData(query,{idField:'id'});


    
    return (<div className='App'>
        <header>
		      <h1>Asked Topics</h1>
			  <h2>{auth.currentUser.displayName}</h2>
			  <SignOut/>			
		</header>
		<section>
				{topics && topics.map(topic =>{ return (
					<>
						<AskedTopic Topic={topic}/>
					</>
				)})}
		</section>
    </div>)

}

function AskedTopic(props) {
	
	const createNewTopic = async(e) =>{
        e.preventDefault();
        const topicsRef = firestore.collection('topics');
		topicsRef.add({name:props.Topic.name,description:props.Topic.description,createdAt:firebase.firestore.FieldValue.serverTimestamp(),createdBy:auth.currentUser.uid});
		deleteSugestion();
    }

	const deleteSugestion = async(e) =>{
		const topicsRef = firestore.collection('asked_topics').doc(props.Topic.id);
		topicsRef.delete();
	}

    return (
	<div className="asked-topic">
		<div className="asked-topic-datarow">
			<div className = "asked-topic-lable">Name :</div>
			<div className = "asked-topic-value"> {props.Topic.name}</div>
		</div>
		<div className="asked-topic-datarow">
			<div className = "asked-topic-lable">Descriptions :</div>
			<div className = "asked-topic-value">{props.Topic.description}</div>
		</div>
		<div className="asked-topic-datarow">
			<button className = "ask-top-btn" onClick={createNewTopic}>Create</button>
			<button className = "ask-top-btn" onClick={deleteSugestion}>Delete</button>
		</div>
    </div>)
}

export default AskedTopicsList;