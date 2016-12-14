import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import ChatService from "./chat.service";
import {PageRoute} from "nativescript-angular";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "hkm-room-chat",
  templateUrl: "room.chat.component.html",
  styleUrls: ['room.chat.component.css']
})
export class RoomChatComponent implements OnInit, AfterViewInit {
  roomId: number;
  room: Object;
  messages: Object = [];
  newMessage: any = "";
  @ViewChild('messageInput') messageInput: ElementRef;

  constructor(private chatService: ChatService, private pageRoute: PageRoute) {
  }


  ngOnInit(): void {
    // use switchMap to get the latest activatedRoute instance
    this.pageRoute
      .activatedRoute
      .switchMap(activatedRoute => activatedRoute.params)
      .forEach((params) => {
        this.roomId = +params['id'];
        this.room = this.chatService
          .getRoom(this.roomId);
        console.log('@@@@@@ Room @@@@@', JSON.stringify(this.room, null, 2));
        this.messages = this.chatService.getRoomMessages(this.roomId);
        console.log('@@@@@@ Message @@@@@', JSON.stringify(this.messages, null, 2));
      });
  }


  ngAfterViewInit(): void {
    // this.messageInput.nativeElement.focus();
  }

  addMessage() {
    console.log('############################ POLI ###########', 'HELLO');

    console.log('############################ POLI ###########', this.newMessage);
    this.chatService
      .addMessage(this.roomId, this.newMessage);
    this.newMessage = '';
  }
}