import {Injectable, NgZone} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {objectAssign} from "./utils";
import Firebase = require("nativescript-plugin-firebase");

class User {

  static i: number = 0;

  constructor(name = "Guest", image = "https://api.adorable.io/avatars/253/st") {
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
  config = {
    databaseURL: "https://hackages-messenger.firebaseio.com/",
  };
  firebaseQueryOptions = {
    orderBy: {
      type: Firebase.QueryOrderByType.CHILD,
      value: 'since'
    }
  };
  currentUserId: string = "0";
  
  users = [
    new User("Bob"),
    new User("Patrick", "https://api.adorable.io/avatars/253/ts")
  ];
  rooms$: BehaviorSubject<{}> = new BehaviorSubject<{}>({});

  constructor(private ngZone: NgZone) {
    Firebase
      .init({persist: false})
      .then(() => {
        Firebase.addChildEventListener((result: any) => {
          this.ngZone.run(() => {
            this.queryRoomsEvenListener(result, this.rooms$);
          });
        }, '/rooms');
      });
  }


  queryRoomsEvenListener(firebaseEvent, localSubject$) {
    console.log('&&&&&&&&& Result &&&&&&&&&', JSON.stringify(firebaseEvent, null, 2));
    const currentValue = localSubject$.getValue();

    switch (firebaseEvent.type) {
      case "ChildAdded":
      case "ChildChanged":
          localSubject$.next(objectAssign({}, currentValue, {[firebaseEvent.key]: firebaseEvent.value}));
        break;
      case "ChildRemoved":
          const copy = objectAssign({}, currentValue);
          delete copy[firebaseEvent.key];
          localSubject$.next(copy);
        break;

    }
  }

  allRooms() {
    return this.rooms$;
  }

  getRoom(roomId) {
    return this.rooms$.map(rooms => rooms[roomId]);
  }

  getUserById(id) {
    for (let user of this.users) {
      if (user.id === id) {
        console.log(user)
        return user
      }
    }
  }

  getRoomMessages(roomId) {
    const room = this.getRoom(roomId);
    return null;
  }

  addMessage(roomId, message) {
    // this.getRoom(roomId)
    //   .messages.push({
    //   id: Math.floor(Math.random() * 100),
    //   authorId: this.currentUserId,
    //   body: message,
    //   created_at: Date.now()
    // })
  }

  addRoom(roomName) {
    Firebase.push(
      '/rooms',
      {
        name:roomName
      }
    );

  }

  getUser() {
    return this.getUserById(this.currentUserId)
  }

  setUser(user) {
    let tempUser = this.getUser()
    tempUser.image = user.image;
    tempUser.name = user.name;
  }
}