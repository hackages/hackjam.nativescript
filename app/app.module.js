"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var app_component_1 = require("./app.component");
var room_list_component_1 = require("./room.list.component");
var chat_service_1 = require("./chat.service");
var room_chat_component_1 = require("./room.chat.component");
var nativescript_angular_1 = require("nativescript-angular");
exports.routes = [
    { path: "", component: room_list_component_1.RoomListComponent },
    { path: "room/:id", component: room_chat_component_1.RoomChatComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent, room_list_component_1.RoomListComponent, room_chat_component_1.RoomChatComponent],
            bootstrap: [app_component_1.AppComponent],
            imports: [
                platform_1.NativeScriptModule,
                nativescript_angular_1.NativeScriptRouterModule,
                nativescript_angular_1.NativeScriptFormsModule,
                nativescript_angular_1.NativeScriptRouterModule.forRoot(exports.routes)
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [chat_service_1.default]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map