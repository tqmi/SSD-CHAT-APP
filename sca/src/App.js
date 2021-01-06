import React, { useState } from 'react';
import './App.css';

import {firebase,auth,firestore} from './firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import Layout from './Layout';
import {SignIn,SignOut} from './Auth';
import ChatRoom from './ChatRoom';
import TopicsList from './TopicsList';
import HomePage from './HomePage';


function App() {

  const [user] = useAuthState(auth);
  const [topic,setTopipc] = useState('test');
  const [mainPage,setMainPage] = useState(<HomePage switchTopic={switchTopic}/>);
  // console.log(user.uid);

  function switchTopic(newTopicID) {
    setMainPage(<ChatRoom topicID = {newTopicID}/>);
    setTopipc(newTopicID);
  }

  const addTopic = async() => {
    // e.preventDefault();
    await firestore.collection('topics').add({name:"testADD"});
  }

  const goHome = () => {
    setMainPage(<HomePage switchTopic={switchTopic}/>);
  }

  return (<>
    {user ? <Layout center={mainPage} right={<TopicsList switchTopic={switchTopic}/>} left={<button onClick={goHome}>Home</button>}/> : <SignIn/>} 
    </>
  );
}


export default App;
