import {Injectable} from "@angular/core";


class User {

  static i: number = 0;

  constructor(name = "Guest", image = "https://api.adorable.io/avatars/253/st"){
    this.id = (User.i++).toString();
    this.name = name;
    this.image = image;
  }

  id: string;
  name: string;
  image: string;
}

@Injectable()
export default  class ChatService {

  socket: any;

  constructor(){
    // this.socket = SocketIO.connect('http://localhost:5000');
    // console.log(this.socket)
/*    this.socket.socket.on('all rooms', (data) => {
      this.rooms = data.rooms
    })*/
  }

  currentUserId: string = "0";

  users = [
    new User("Bob"),
    new User("Patrick", "https://api.adorable.io/avatars/253/ts")
  ];
  // Some fake testing data
  rooms = [
    {
      id: 0,
      name: 'General',
      messages: [
        {
          id: 233,
          authorId: '0',
          body: 'Hello Guys from Amsterdam!',
          created_at: Date.now()
        },
        {
          id: 2333,
          authorId: '1',
          body: 'Hello Guys !',
          created_at: Date.now()
        },
        {
          id: 2335,
          authorId: '0',
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

  getUserById(id){
    for(let user of this.users){
      if(user.id === id){
        console.log(user)
        return user
      }
    }
  }

  getRoomMessages(roomId) {
    const room = this.getRoom(roomId);
    return room.messages;
  }

  addMessage(roomId, message) {
    this.getRoom(roomId)
      .messages.push({
      id: Math.floor(Math.random() * 100),
      authorId: this.currentUserId,
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
    return this.getUserById(this.currentUserId)
  }
  setUser(user) {
    let tempUser = this.getUser()
    tempUser.image = user.image;
    tempUser.name = user.name;
  }
}