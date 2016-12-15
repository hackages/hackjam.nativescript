import {Injectable, NgZone} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {objectAssign} from "./utils";
import "rxjs/add/operator/map";
import {RoomMap, FirebaseChildEvent} from "./typing";
import {ProfileStorage} from "./services/profile.storage.service";
import Firebase = require("nativescript-plugin-firebase");


@Injectable()
export default  class ChatService {

  currentUserId: string;

  rooms$: BehaviorSubject<RoomMap> = new BehaviorSubject<RoomMap>({});
  user$: BehaviorSubject<{}> = new BehaviorSubject<{}>({});
  messages$: BehaviorSubject<{}> = new BehaviorSubject<{}>({});

  constructor(private ngZone: NgZone, private profileStorage: ProfileStorage) {


    Firebase
      .init({persist: false})
      .then(() => {

        this.profileStorage
          .readId()
          .then((currentUserId) => {
            console.log(" %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Reading from profile",
            currentUserId)
            this.currentUserId = currentUserId;

            if (!this.currentUserId) {
              this.createUser()
                .then((result: FirebaseChildEvent) => {
                  console.log(" %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Creating profile",
                    JSON.stringify(result,null,2))
                  this.profileStorage
                    .storeId(result.key)
                    .then(() => {
                      console.log(" %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Storing profile",
                        JSON.stringify(result,null,2))
                      this.currentUserId = result.key;
                      this.profileStorage
                        .readId()
                        .then((newRead) => {
                          console.log(" %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% New Reading from profile",
                            newRead)
                      });

                    })
                })
            }
          });


        Firebase.addChildEventListener((result: FirebaseChildEvent) => {
          this.ngZone.run(() => {
            this.addChildEvenListener(result, this.rooms$);
          });
        }, '/rooms');

        Firebase.addChildEventListener((result: FirebaseChildEvent) => {
          this.ngZone.run(() => {
            this.addChildEvenListener(result, this.user$);
          });
        }, '/users');

        Firebase.addChildEventListener((result: FirebaseChildEvent) => {
          this.ngZone.run(() => {
            this.addChildEvenListener(result, this.messages$);
          });
        }, '/messages');
      })
      .catch(()=>{});
  }


  addChildEvenListener(firebaseEvent: FirebaseChildEvent, localSubject$): void {
     // console.log('&&&&&&&&& Result &&&&&&&&&', JSON.stringify(firebaseEvent, null, 2));
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
    return this.rooms$.asObservable();
  }

  getRoom(roomId) {
    return this.rooms$.map(rooms => rooms[roomId]);
  }

  addRoom(roomName) {
    Firebase.push(
      '/rooms',
      {
        name: roomName
      }
    );

  }

  createUser() {
    return Firebase.push(
      '/users',
      {
        name: `Guest ${Math.floor(Math.random() * 100000)}`,
        image: 'https://api.adorable.io/avatars/253/ts'
      }
    );
  }

  getConnectedUser() {
    return this.getUserById(this.currentUserId)
  }

  getUsers() {
    return this.user$.asObservable();
  }

  getUserById(id) {
    return this.user$.map(users => users[id]);
  }

  setUser({name, image}) {
    return Firebase.update(`/users/${this.currentUserId}`, {
      name,
      image
    });
  }

  getRoomMessages(roomId): Observable<any[]> {
    return this.messages$
      .map((values) => {
        const messages = Object.keys(values)
          .map(k => values[k])
          .filter(m => m.roomId === roomId)
        return messages;
      });

  }

  addMessage(roomId, body) {
    return Firebase.push(
      `/messages`,
      {
        authorId: this.currentUserId,
        body: body,
        roomId: roomId
      }
    );

  }


}