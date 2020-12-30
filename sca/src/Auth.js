import React, { Component } from 'react';
import {firebase,auth,firestore} from './firebase';
import './Auth.css';
class SignIn extends Component{

	signInWithGoogle = () => {
	  const provider = new firebase.auth.GoogleAuthProvider();
	  auth.signInWithPopup(provider);
	};
	  
	render(){
		return (
		<>
			<button className="sign-in" onClick={this.signInWithGoogle}>Sign in with Google</button>
			<p>Do not violate the community guidelines or you will be banned for life!</p>
		</>
		);
	}
}
  
class SignOut extends Component{
	render() {
		return auth.currentUser && (
			<button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
		  );
	}
	
}
  
export {SignIn,SignOut};