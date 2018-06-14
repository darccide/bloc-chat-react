import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rooms: []
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');
   }

   componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = { name: snapshot.val(), key: snapshot.key }
       this.setState({ rooms: this.state.rooms.concat( room ) });
     });
   }

    render() {
      return (
        <section className="rooms">
        {
            this.state.rooms.map( (room, key) => {
              return (
                <div key={room.key}>
                {room.name}
                </div>
              )
            })
        }
        </section>
      );
    }

}

export default RoomList;
