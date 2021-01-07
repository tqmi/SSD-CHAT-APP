import React, { Component } from 'react';
import {firebase,auth,firestore} from './firebase';
import './Auth.css';
function SignIn (){

	const signInWithGoogle = () => {
	  const provider = new firebase.auth.GoogleAuthProvider();
	  auth.signInWithPopup(provider);
	};
	  
	
	return (
		<div className="signin">
			<button onClick={signInWithGoogle}>Sign in with Google</button>
		</div>
	);
}
  
function SignOut (){
	
	return auth.currentUser && (
		<button className="signout" onClick={() => auth.signOut()}>Sign Out</button>
		);
	
}
  
export {SignIn,SignOut};