import './TopicsList.css'

import React from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase,auth,firestore} from './firebase'

function TopicsList(props) {

    const topicsRef = firestore.collection('topics');
    const query = topicsRef.orderBy('name');
    const [topics] = useCollectionData(query,{idField:'id'});

    
    return (<>
        
        <div ClassName="topics">
            {topics && topics.map(topic => (
                <>
                    <Topic key={topic.id} switchTopic={props.switchTopic} Topic={topic}/>
                </>
            ))}
        </div>
    </>)

}



function Topic(props) {

    function switchTopic(topicID){
        props.switchTopic(topicID);
    }
    return (
        <button onClick={()=>switchTopic(props.Topic.id)}>{props.Topic.name}</button>
    );
}

export default TopicsList;