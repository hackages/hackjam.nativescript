"use strict";
var core_1 = require("@angular/core");
var chat_service_1 = require("./chat.service");
var RoomListComponent = (function () {
    function RoomListComponent(chatService) {
        this.chatService = chatService;
    }
    RoomListComponent.prototype.ngOnInit = function () {
    };
    RoomListComponent = __decorate([
        core_1.Component({
            selector: "hkm-room-list",
            templateUrl: "room.list.component.html",
        }), 
        __metadata('design:paramtypes', [chat_service_1.default])
    ], RoomListComponent);
    return RoomListComponent;
}());
exports.RoomListComponent = RoomListComponent;
//# sourceMappingURL=chat.component.js.map