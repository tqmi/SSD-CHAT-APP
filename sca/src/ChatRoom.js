import './ChatRoom.css'

import React, {useRef, useState} from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase,auth,firestore} from './firebase';
import {SignOut} from './Auth';

function ChatRoom(props) {
	
	const dummy = useRef();
	const topicsRef = firestore.collection('topics').doc(props.topicID);
	const [topicName,setTopicName] = useState();
	topicsRef.get().then(snap => setTopicName(snap.get('name')));
	const messagesRef = topicsRef.collection('messages');
	const query = messagesRef.orderBy('createdAt','desc').limit(25);
	const [messages] = useCollectionData(query, { idField: 'id' });
	const [formValue, setFormValue] = useState('');
  
	const sendMessage = async (e) => {
	  e.preventDefault();
  
	  const { uid, photoURL } = auth.currentUser;
  
	  await messagesRef.add({
		text: formValue,
		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		uid,
		photoURL
	  })
  
	  setFormValue('');
	  dummy.current.scrollIntoView({ behavior: 'smooth' });
	}
  
	return (<>
	<div className="App">
		<header>
			<h1>{topicName}</h1>
			<h2>{auth.currentUser.displayName}</h2>
			<SignOut />
		</header>
		<section>
			<main>
	
				{messages && messages.sort((a,b) => {
					if (a.createdAt < b.createdAt) return -1;
					if (a.createdAt > b.createdAt) return 1;
					return 0
				 }).map(msg => <ChatMessage key={msg.id} message={msg} />)}

				<span ref={dummy}></span>

			</main>

			<form onSubmit={sendMessage} className="message-form">

				<input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

				<button type="submit" disabled={!formValue}>SEND</button>

			</form>
		</section>
	</div>
	</>)
}

function ChatMessage(props) {
	const { text, uid, photoURL } = props.message;
  
	const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
	return (<>
	  <div className={`message ${messageClass}`}>
		<img src={photoURL || process.env.PUBLIC_URL +'/static/avatar.png'} />
		<p>{text}</p>
	  </div>
	</>)
  }

export default ChatRoom;
