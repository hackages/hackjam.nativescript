import {Component, OnInit} from "@angular/core";
import ChatService from "./chat.service";
import {RouterExtensions} from "nativescript-angular";

@Component({
  selector: "hkm-profile",
  templateUrl: "profile.component.html",
  styles: [
    `
      .imageProfile{
          border-radius: 50;
          border-color:gray;
          border-width: 0.5;
           width:100;
           height:100; 
           margin:10;
           
      }
      
      .miniature{
           width:50;
           height:50; 
           border-radius: 25;
      }
    `
  ]
})
export class ProfileComponent implements OnInit {

  user = {
    name: '',
    image: ''
  };
  randomUrls = [];

  constructor(private chatService: ChatService, private routerExtensions: RouterExtensions) {
  }


  ngOnInit(): void {
    this.randomUrls = this.createRandomImageUrls();

    this.user.name = this.chatService.getUser().name || '';
    this.user.image = this.chatService.getUser().image || '~/images/base-profil.png';
  }

  onSave() {
    this.chatService.setUser(this.user);
    this.goBack();
  }

  goBack() {
    this.routerExtensions.back();
  }

  createRandomImageUrls() {
    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push(`https://robohash.org/${Math.floor(Math.random() * 5000)}?set=set${Math.floor(Math.random() * 3) + 1}`);
    }
    console.log('@@@@@@@@@@@@ URLS @@@@@@@@@@', result);
    return result;
  }

  setUserImage(url) {
    this.user.image = url;
  }
}
