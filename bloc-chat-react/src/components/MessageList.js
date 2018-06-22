import React, { Component } from 'react';


class MessageList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      messages: []
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
   }

   componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = { name: snapshot.val().name, key: snapshot.key }
       this.setState({ messages: this.state.messages.concat( message ) });
     });
   }

   handleChange(e) {
     this.setState({ message: e.target.value });
   }

   handleSubmit(e) {
     e.preventDefault();
     if (this.state.message) {
     this.messagesRef.push({
       username: this.state.username,
       content: this.state.message,
       sentAt: Date.now(),
       roomId: this.state.activeRoom.name
     })
     this.setState({ message: ''});
   }

   render() {
     return (
       <section className="messages">

         <label>
          Messages:
         </label>

         <div className="message-list">
         {
           this.state.rooms.map( (message, index) => {
             return (
               <div key={index}>
                 {message.username} : {message.content} : {message.sentAt} : {message.roomId}
               </div>
             )
           })
         }
         </div>
         <form onSubmit={ (e) => this.handleSubmit(e) }>
           <input
             type="text"
             value={ this.state.message }
             onChange={ this.handleChange.bind(this) }
           />
           <button type="submit" value="Submit" />
         </form>
       </section>
     );
   }

}

export default MessageList;
