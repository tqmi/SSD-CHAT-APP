import './AskedTopics.css'

import React, { useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase,auth,firestore} from './firebase'

function AskedTopicsList(props) {

    
    const topicsRef = firestore.collection('asked_topics');
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
    
    return (<div className='App'>
        <header>
		      <h1>Asked Topics</h1>			
		    </header>
        <div ClassName="topics">

        {/* <form onSubmit={searchTopic}>

            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search" />

            <button type="submit">SEARCH</button>

        </form> */}
            {topics && topics.map(topic =>{ return (
                <>
                    <AskedTopic Topic={topic}/>
                </>
            )})}
        </div>
    </div>)

}

function AskedTopic(props) {
    
    

    return (
	<div>
		<p>Name : {props.Topic.name}</p>
		<p>Descriptions : {props.Topic.description}</p>
    </div>)
}

export default AskedTopicsList;