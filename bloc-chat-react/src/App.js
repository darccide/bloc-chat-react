import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

var config = {
    apiKey: "AIzaSyAkFaY2483qdN8POYlDRWwBnAU8SqDmqwQ",
    authDomain: "bloc-chat-react-1.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-1.firebaseio.com",
    projectId: "bloc-chat-react-1",
    storageBucket: "bloc-chat-react-1.appspot.com",
    messagingSenderId: "496017182197"
  };
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <RoomList  firebase={firebase} />
      </div>
    );
  }
}

export default App;
