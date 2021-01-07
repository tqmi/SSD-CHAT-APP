import './HomePage.css'

import React from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase,auth,firestore} from './firebase'
import { SignOut } from './Auth';
import { Topic } from './TopicsList';

function HomePage(props) {

	const topicsRef = firestore.collection('topics');
	const {uid} = auth.currentUser;
    const query = topicsRef.where('subscribers','array-contains',uid);
    const [topics] = useCollectionData(query,{idField:'id'});
    

    function switchTopic(topicID){
        props.switchTopic(topicID);
    }

    return (<div className="App">
        <header>
		    <h1>HOME</h1>
            <h2>{auth.currentUser.displayName}</h2>
            <SignOut/>			
		</header>
        <section>
            {topics && topics.map(topic => (
                <div className="topic-pres">
                    <Topic Topic={topic} switchTopic={switchTopic}/>
                    {topic.description && <p>{topic.description}</p>}
                </div>
            ))}
        </section>
    </div>)
}

export default HomePage;