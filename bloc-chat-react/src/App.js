import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
  constructor(props){
    super(props);
    this.state = {
      activeRoom: "",
      user:""
    };
  }

  changeActiveRoom(room){
    this.setState({ activeRoom: room })

  }

  setUser(user) {
    this.setState({ user: user });

  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
          <div>
            <div className="rooms-list">
                <h3>Rooms:</h3>
              <div>
                <RoomList
                  firebase={firebase}
                  activeRoom={ this.state.activeRoom }
                  changeActiveRoom={ (room) => this.changeActiveRoom(room) }
                />
            </div>
            </div>
            <div className="message-list">
              <div>
              <MessageList
                firebase={firebase}
                activeRoom={ this.state.activeRoom }
                user={ this.state.user }
              />
              <User
                firebase={ firebase }
                user={ this.state.user }
                setUser={ (user) => this.setUser(user) }
              />
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
