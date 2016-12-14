import {Component, OnInit} from "@angular/core";
import ChatService from "./chat.service";
import * as dialogs from "ui/dialogs";
import {RouterExtensions} from "nativescript-angular";

@Component({
  selector: "hkm-room-list",
  templateUrl: "room.list.component.html",
})
export class RoomListComponent implements OnInit {

  constructor(private chatService: ChatService, private routerExtensions: RouterExtensions) {
  }


  ngOnInit(): void {

  }

  onAddRoom() {
    // inputType property can be dialogs.inputType.password or dialogs.inputType.text.
    dialogs.prompt({
      title: "Create a new room",
      okButtonText: "Save",
      cancelButtonText: "Cancel",
      defaultText: "",
      inputType: dialogs.inputType.text
    }).then(({result, text}) => {
      console.log("Dialog result: " + result + ", text: " + text);

      if (result && text) {
        this.chatService.addRoom(text);
      }
    });
  }
  onItemTap(args){
    this.routerExtensions.navigate(["/room", this.chatService.allRooms()[args.index].id]);
  }
  goToProfile() {
    this.routerExtensions.navigate(["/profile"], {
      transition: {
        name: "slideRight",
        curve: "linear"
      }
    });
  }
}
