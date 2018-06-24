import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      messages: [],
      activeRoom: ''
    }
    this.selectedRoom = this.selectedRoom.bind(this);
  }

  selectedRoom(room) {
    console.log(room);
    this.setState({ activeRoom: room });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <div>
          <RoomList  firebase={firebase} activeRoom={this.state.activeRoom} selectedRoom={this.selectedRoom} />
        </div>
        <div >
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        </div>

      </div>
    );
  }
}

export default App;
