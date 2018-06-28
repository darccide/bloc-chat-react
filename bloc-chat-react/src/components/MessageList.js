import React, { Component } from 'react';


var moment = require('moment');
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
     messages: [],
     username: '',
     content: '',
     sentAt: '',
     roomId: ''
};
this.messagesRef = this.props.firebase.database().ref('Messages');
};

componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
     });
};

handleMessage(e) {
  e.preventDefault();
  this.messagesRef.push({
    username: this.state.username,
    content: this.state.content,
    sentAt: this.state.sentAt,
    roomId: this.state.roomId
  });
  this.setState({
    username: '',
    content: '',
    sentAt: '',
    roomId: ''
  });
}

handleChange(e) {
  e.preventDefault();
  this.setState({
    username: !this.props.user ? 'Guest' : this.props.user.displayName,
    content: e.target.value,
    sentAt: moment().format('LT'),
    roomId: this.props.activeRoom.key
  })
}

render() {
    return (
      <section className="messages">
      <label>
        Messages:
      </label>
        <div className="message-list">
          {
            this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map( (message, index) => {
                return (
                <div key={index}>
                  {message.username}: {message.content} | Sent at: {message.sentAt}
                </div>
              )}
          )}
        </div>

        <form onSubmit={ (e) => this.handleMessage(e) }>
          <input type="text"
            value={ this.state.content }
            onChange={ (e) => this.handleChange(e) }
          />
          <input type="submit" value="Send"/>
        </form>
      </section>
    );
  }
}


export default MessageList;
