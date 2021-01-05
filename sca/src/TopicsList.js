import './TopicsList.css'

import React from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase,auth,firestore} from './firebase'

function TopicsList(props) {

    const topicsRef = firestore.collection('topics');
    const query = topicsRef.orderBy('name');
    const [topics] = useCollectionData(query,{idField:'id'});

    function switchTopic(topicID){
        props.switchTopic(topicID);
    }

    return (<>
        
        <main>
            {topics && topics.map(topic => <button key={topic.id} onClick={()=>switchTopic(topic.id)}>{topic.name}</button>)}
        </main>
    </>)
}

export default TopicsList;