"use strict";
var core_1 = require("@angular/core");
var chat_service_1 = require("./chat.service");
var dialogs = require("ui/dialogs");
var RoomListComponent = (function () {
    function RoomListComponent(chatService) {
        this.chatService = chatService;
    }
    RoomListComponent.prototype.ngOnInit = function () {
    };
    RoomListComponent.prototype.onAddRoom = function () {
        var _this = this;
        // inputType property can be dialogs.inputType.password or dialogs.inputType.text.
        dialogs.prompt({
            title: "Create a new room",
            okButtonText: "Save",
            cancelButtonText: "Cancel",
            defaultText: "",
            inputType: dialogs.inputType.text
        }).then(function (_a) {
            var result = _a.result, text = _a.text;
            console.log("Dialog result: " + result + ", text: " + text);
            if (result && text) {
                _this.chatService.addRoom(text);
            }
        });
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
//# sourceMappingURL=room.list.component.js.map