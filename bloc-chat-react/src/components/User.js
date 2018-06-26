 import React, { Component } from 'react';

 class User extends Component {

   componentDidMount() {
     this.props.firebase.auth().onAuthStateChanged( user => {
       this.props.setUser(user);
     });
   }

   handleSignIn() {
     const provider = new this.props.firebase.auth.GoogleAuthProvider();
     this.props.firebase.auth().signInWithPopup( provider );
   }

   handleSignOut() {
     this.props.firebase.auth().signOut();
   }

render() {
    return (
      <section className="User">
      { this.props.user === null ? "Guest" : this.props.user.displayName }
      <button id="sign-in" onClick={ (e) => this.handleSignIn() }>
        Sign In
      </button>
      <button id="sign-out" onClick={ (e) => this.handleSignOut() }>
        Sign Out
      </button>
      </section>
    );
  }
}


export default User;
