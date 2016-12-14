import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import ChatService from "./chat.service";
import * as dialogs from "ui/dialogs";
import {RouterExtensions} from "nativescript-angular";

@Component({
  selector: "hkm-room-list",
  templateUrl: "room.list.component.html",
  styleUrls:['room.list.component.css']
})
export class RoomListComponent implements OnInit {
  rooms = [];

  constructor(private chatService: ChatService, private routerExtensions: RouterExtensions) {
  }


  ngOnInit(): void {
    this.chatService
      .allRooms()
      .subscribe((value) =>{
        console.log('>>>>>>>>>>>>>>>>>>>>> Vlaue', JSON.stringify(value, null, 2));

        this.rooms = Object.keys(value).map(k => value[k]);
      })
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
