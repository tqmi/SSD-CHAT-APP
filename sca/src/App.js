import React from 'react';
import './App.css';

import {firebase,auth,firestore} from './firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import Layout from './Layout';
import {SignIn,SignOut} from './Auth';
import ChatRoom from './ChatRoom';
import TopicsList from './TopicsList';


function App() {

  const [user] = useAuthState(auth);

  return (
    <Layout center={<div className="App">
    <header>
      <h1>SCA</h1>
      <SignOut />
    </header>

    <section>
      {user ? <ChatRoom /> : <SignIn />}
    </section>

  </div>}

    right={<div className="App">
    <header>
      <h1>Topics</h1>
      
    </header>

    <body>
      { <TopicsList /> }
      </body>

  </div>}/>

  
  )
}

export default App;
