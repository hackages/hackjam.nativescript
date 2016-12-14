import {Injectable} from "@angular/core";


interface User {
  id: string;
  name: string;
  token: string;
  image: string;
}

@Injectable()
export default  class ChatService {

  user: User = {
    id: '',
    name: '',
    token: '',
    image: ''
  };
  // Some fake testing data
  rooms = [
    {
      id: 0,
      name: 'General',
      messages: [
        {
          id: 233,
          author: {
            image: 'adam.jpg',
            name: 'Adam',
          },
          body: 'Hello Guys from Amsterdam!',
          created_at: Date.now()
        },
        {
          id: 2333,
          author: {
            image: 'ben.png',
            name: 'Ben',
          },
          body: 'Hello Guys !',
          created_at: Date.now()
        },
        {
          id: 2335,
          author: {
            image: 'max.png',
            name: 'Max',
          },
          body: 'Hello !',
          created_at: Date.now()
        }
      ]
    },
    {
      id: 1,
      name: 'General 2',
      messages: []
    }
  ];

  allRooms() {
    return this.rooms;
  }

  getRoom(roomId) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].id === parseInt(roomId)) {
        return this.rooms[i];
      }
    }
    return null;
  }

  getRoomMessages(roomId) {
    const room = this.getRoom(roomId);
    return room.messages;
  }

  addMessage(roomId, message) {
    this.getRoom(roomId)
      .messages.push({
      id: Math.floor(Math.random() * 100),
      author: {
        image: 'adam.jpg',
        name: 'Adam',
      },
      body: message,
      created_at: Date.now()
    })
  }

  addRoom(roomName) {
    this.rooms.push({
      id: Math.floor(Math.random() * 100),
      name: roomName,
      messages: []
    })

  }
  getUser(){
    return this.user;
  }
  setUser(user) {
    this.user.name = user.name;
    this.user.image = user.image;
  }
}