"use strict";
var core_1 = require("@angular/core");
var chat_service_1 = require("./chat.service");
var nativescript_angular_1 = require("nativescript-angular");
var ProfileComponent = (function () {
    function ProfileComponent(chatService, routerExtensions) {
        this.chatService = chatService;
        this.routerExtensions = routerExtensions;
        this.user = {
            name: '',
            image: ''
        };
        this.randomUrls = [];
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.randomUrls = this.createRandomImageUrls();
        this.user.name = this.chatService.getUser().name || '';
        this.user.image = this.chatService.getUser().image || '~/images/base-profil.png';
    };
    ProfileComponent.prototype.onSave = function () {
        this.chatService.setUser(this.user);
        this.goBack();
    };
    ProfileComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    ProfileComponent.prototype.createRandomImageUrls = function () {
        var result = [];
        for (var i = 0; i < 10; i++) {
            result.push("https://robohash.org/" + Math.floor(Math.random() * 5000) + "?set=set" + (Math.floor(Math.random() * 3) + 1));
        }
        console.log('@@@@@@@@@@@@ URLS @@@@@@@@@@', result);
        return result;
    };
    ProfileComponent.prototype.setUserImage = function (url) {
        this.user.image = url;
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: "hkm-profile",
            templateUrl: "profile.component.html",
            styles: [
                "\n      .imageProfile{\n          border-radius: 50;\n          border-color:gray;\n          border-width: 0.5;\n           width:100;\n           height:100; \n           margin:10;\n           \n      }\n      \n      .miniature{\n           width:50;\n           height:50; \n           border-radius: 25;\n      }\n    "
            ]
        }), 
        __metadata('design:paramtypes', [chat_service_1.default, nativescript_angular_1.RouterExtensions])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map