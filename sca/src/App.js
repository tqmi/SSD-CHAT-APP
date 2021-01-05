import React, { useState } from 'react';
import './App.css';

import {firebase,auth,firestore} from './firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import Layout from './Layout';
import {SignIn,SignOut} from './Auth';
import ChatRoom from './ChatRoom';
import TopicsList from './TopicsList';


function App() {

  const [user] = useAuthState(auth);
  const [topic,setTopipc] = useState('test');

  function switchTopic(newTopicID) {
    setTopipc(newTopicID);
  }


  return (<>
    {user ? <Layout center={<ChatRoom topicID = {topic}/>} right={<TopicsList switchTopic={switchTopic}/>}/> : <SignIn/>} 
    </>
  );
}


export default App;
