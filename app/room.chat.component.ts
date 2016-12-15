import {Component, OnInit} from "@angular/core";
import ChatService from "./chat.service";
import {PageRoute} from "nativescript-angular";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "hkm-room-chat",
  templateUrl: "room.chat.component.html",
  styleUrls: ['room.chat.component.css']
})
export class RoomChatComponent implements OnInit {
  roomId: string;
  users: Object = {};
  room: Object = {
    name: 'Loading'
  };
  messages: Object = [];
  newMessage: any = "";

  constructor(private chatService: ChatService, private pageRoute: PageRoute) {
  }

  ngOnInit(): void {
    // use switchMap to get the latest activatedRoute instance
    this.pageRoute
      .activatedRoute
      .switchMap(activatedRoute => activatedRoute.params)
      .subscribe((params) => {
        this.roomId = params['id'];

        this.chatService
          .getRoom(this.roomId)
          .subscribe(value => this.room = value);
        this.chatService
          .getRoomMessages(this.roomId)
          .subscribe(values => this.messages = values);
        this.chatService
          .getUsers()
          .subscribe(values => this.users = values);
      });
  }

  addMessage() {
    this.chatService
      .addMessage(this.roomId, this.newMessage)
      .then(() => {
        this.newMessage = '';
      });
  }
}