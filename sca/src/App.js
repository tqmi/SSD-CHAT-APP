import React from 'react';
import './App.css';

import {firebase,auth,firestore} from './firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import Layout from './Layout';
import {SignIn,SignOut} from './Auth';
import ChatRoom from './ChatRoom';


function App() {

  const [user] = useAuthState(auth);

  return (
    <Layout center={user ? <ChatRoom topicID = 'test'/> : <SignIn />}/>
  );
}



export default App;
