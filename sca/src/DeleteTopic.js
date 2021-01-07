import './DeleteTopic.css'

import React, { useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase,auth,firestore} from './firebase'
import { SignOut } from './Auth';

function DeleteTopicList(props) {

    
    const topicsRef = firestore.collection('topics');
    const query =topicsRef.orderBy('name');
    const [topics] = useCollectionData(query,{idField:'id'});


    
    return (<div className='App'>
        <header>
		      <h1>Delete Topic</h1>
			  <h2>{auth.currentUser.displayName}</h2>
			  <SignOut/>			
		</header>
		<section>
				{topics && topics.map(topic =>{ return (
					<>
						<DeleteTopic Topic={topic}/>
					</>
				)})}
		</section>
    </div>)

}

function DeleteTopic(props) {
	

	const deleteTopic = async(e) =>{
		const topicsRef = firestore.collection('topics').doc(props.Topic.id);
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
			<button className = "ask-top-btn" onClick={deleteTopic}>Delete</button>
		</div>
    </div>)
}

export default DeleteTopicList;