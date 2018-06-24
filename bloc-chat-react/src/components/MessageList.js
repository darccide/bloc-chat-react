import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
     messages: []
};
this.messagesRef = this.props.firebase.database().ref('Messages');
};

componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      console.log(message);
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
      console.log(this.state.messages);
     });
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
      </section>
    )
  }
}


export default MessageList;
