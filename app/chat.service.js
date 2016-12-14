"use strict";
var core_1 = require("@angular/core");
var ChatService = (function () {
    function ChatService() {
        this.user = {
            id: '',
            name: '',
            token: '',
            image: ''
        };
        // Some fake testing data
        this.rooms = [
            {
                id: 0,
                name: 'General',
                messages: [
                    {
                        id: 233,
                        author: {
                            image: 'adam.jpg',
                            name: 'Adam',
                        },
                        body: 'Hello Guys from Amsterdam!',
                        created_at: Date.now()
                    },
                    {
                        id: 2333,
                        author: {
                            image: 'ben.png',
                            name: 'Ben',
                        },
                        body: 'Hello Guys !',
                        created_at: Date.now()
                    },
                    {
                        id: 2335,
                        author: {
                            image: 'max.png',
                            name: 'Max',
                        },
                        body: 'Hello !',
                        created_at: Date.now()
                    }
                ]
            },
            {
                id: 1,
                name: 'General 2',
                messages: []
            }
        ];
    }
    ChatService.prototype.allRooms = function () {
        return this.rooms;
    };
    ChatService.prototype.getRoom = function (roomId) {
        for (var i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].id === parseInt(roomId)) {
                return this.rooms[i];
            }
        }
        return null;
    };
    ChatService.prototype.getRoomMessages = function (roomId) {
        var room = this.getRoom(roomId);
        return room.messages;
    };
    ChatService.prototype.addMessage = function (roomId, message) {
        this.getRoom(roomId)
            .messages.push({
            id: Math.floor(Math.random() * 100),
            author: {
                image: 'adam.jpg',
                name: 'Adam',
            },
            body: message,
            created_at: Date.now()
        });
    };
    ChatService.prototype.addRoom = function (roomName) {
        this.rooms.push({
            id: Math.floor(Math.random() * 100),
            name: roomName,
            messages: []
        });
    };
    ChatService.prototype.getUser = function () {
        return this.user;
    };
    ChatService.prototype.setUser = function (user) {
        this.user.name = user.name;
        this.user.image = user.image;
    };
    ChatService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ChatService);
    return ChatService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatService;
//# sourceMappingURL=chat.service.js.map