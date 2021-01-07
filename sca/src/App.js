import React, { useState } from 'react';
import './App.css';


import { firebase, auth, firestore } from './firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import Layout from './Layout';
import { SignIn, SignOut } from './Auth';
import ChatRoom from './ChatRoom';
import Menu from './Menu';
import TopicsList from './TopicsList';
import HomePage from './HomePage';
import NewTopic from './NewTopic'
import AskedTopicsList from './AskedTopics';
import AskNewTopic from './AskNewTopic';
import DeleteTopicList from './DeleteTopic';



function App() {

  const [user] = useAuthState(auth);
  const adminRef = firestore.collection('admins');
  const [topic,setTopipc] = useState('test');
  const [mainPage,setMainPage] = useState(<HomePage switchTopic={switchTopic}/>);
  const [admin,setAdmin] = useState(false);
  user && adminRef.where('uid','==',user.uid).get().then(snap => snap.empty || setAdmin(true));
  
  
  function switchTopic(newTopicID) {
    setMainPage(<ChatRoom topicID = {newTopicID}/>);
    setTopipc(newTopicID);
  }

  const askTopic = () => {
    setMainPage(<AskNewTopic/>)
  }

  const askedTopics = () =>{
    setMainPage(<AskedTopicsList/>)
  }

  const addTopic = () => {
    setMainPage(<NewTopic/>);
  }

  const goHome = () => {
    setMainPage(<HomePage switchTopic={switchTopic}/>);
  }

  const deleteTopic = () =>{
    setMainPage(<DeleteTopicList/>)
  }

  const basicMenu = [{name:'Home',action:goHome},{name:'Ask Topic',action:askTopic}]

  const MenuList = !admin ? basicMenu : basicMenu.concat( [{name:'Asked Topics',action:askedTopics} ,{name:'New Topic',action:addTopic},{name:'Delete Topic',action:deleteTopic}]);

  return (<>

    {user ? <Layout left={<Menu options={MenuList}/>} center={mainPage} right={<TopicsList switchTopic={switchTopic}/>}/> : <SignIn/>} 
    </>
  );
}


export default App;
