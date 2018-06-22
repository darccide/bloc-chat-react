import React, { Component } from 'react';


class RoomList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');
   }

   componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = { name: snapshot.val().name, key: snapshot.key }
       this.setState({ rooms: this.state.rooms.concat( room ) });
     });
   }

   handleAddRoom(e) {
     this.setState({ newRoomName: e.target.value })
   }

   handleSubmit(newRoomName, e) {
     e.preventDefault();
     if (!this.state.newRoomName) { return }
     this.roomsRef.push({
       name: newRoomName,
       key: this.state.rooms.length
     })
     const newRoom = { name: this.state.newRoomName };
     this.setState({ rooms: [...this.state.rooms, newRoom], newRoom: '' })
     this.setState({ newRoomName: ''})
   }

    render() {
      return (
        <section className="rooms">

          <label>
            Rooms:
          </label>

          <div className="room-list">
          {
            this.state.rooms.map( (room, index) => {
              return (
                <div key={index} onClick={ () => this.props.selectedRoom(room) }>
                  {room.name}
                </div>
              )
            })
          }
          </div>
          <form onSubmit={ (e) => this.handleSubmit(this.state.newRoomName, e) }>
            <input
              type="text"
              value={ this.state.newRoomName }
              onChange={ this.handleAddRoom.bind(this) }
            />
            <input type="submit" value="Create Room" />
          </form>
        </section>
      );
    }

}

export default RoomList;
