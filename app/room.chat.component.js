"use strict";
var core_1 = require("@angular/core");
var chat_service_1 = require("./chat.service");
var nativescript_angular_1 = require("nativescript-angular");
require("rxjs/add/operator/switchMap");
var RoomChatComponent = (function () {
    function RoomChatComponent(chatService, pageRoute) {
        this.chatService = chatService;
        this.pageRoute = pageRoute;
        this.messages = [];
        this.newMessage = "";
    }
    RoomChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        // use switchMap to get the latest activatedRoute instance
        this.pageRoute
            .activatedRoute
            .switchMap(function (activatedRoute) { return activatedRoute.params; })
            .forEach(function (params) {
            _this.roomId = +params['id'];
            _this.room = _this.chatService
                .getRoom(_this.roomId);
            console.log('@@@@@@ Room @@@@@', JSON.stringify(_this.room, null, 2));
            _this.messages = _this.chatService.getRoomMessages(_this.roomId);
            console.log('@@@@@@ Message @@@@@', JSON.stringify(_this.messages, null, 2));
        });
    };
    RoomChatComponent.prototype.ngAfterViewInit = function () {
        this.messageInput.nativeElement.focus();
    };
    RoomChatComponent.prototype.addMessage = function () {
        console.log('############################ POLI ###########', 'HELLO');
        console.log('############################ POLI ###########', this.newMessage);
        this.chatService
            .addMessage(this.roomId, this.newMessage);
        this.newMessage = '';
    };
    __decorate([
        core_1.ViewChild('messageInput'), 
        __metadata('design:type', core_1.ElementRef)
    ], RoomChatComponent.prototype, "messageInput", void 0);
    RoomChatComponent = __decorate([
        core_1.Component({
            selector: "hkm-room-chat",
            templateUrl: "room.chat.component.html",
        }), 
        __metadata('design:paramtypes', [chat_service_1.default, nativescript_angular_1.PageRoute])
    ], RoomChatComponent);
    return RoomChatComponent;
}());
exports.RoomChatComponent = RoomChatComponent;
//# sourceMappingURL=room.chat.component.js.map