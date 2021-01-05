import React, { useState } from 'react';
import './App.css';

import {firebase,auth,firestore} from './firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import Layout from './Layout';
import {SignIn,SignOut} from './Auth';
import ChatRoom from './ChatRoom';


function App() {

  const [user] = useAuthState(auth);
  const [topic,setTopipc] = useState('test');

  function changeTopic(newTopic) {
    setTopipc('GA5IELF7WGa2IQSx64sP');
  }

  return (<>
    {user ? <Layout center={<ChatRoom topicID = {topic}/>} left={<button onClick = {changeTopic}>change</button>}/> : <SignIn/>} 
    </>
  );
}



export default App;
