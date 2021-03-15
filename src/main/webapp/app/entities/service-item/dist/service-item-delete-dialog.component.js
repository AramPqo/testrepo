"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServiceItemDeleteDialogComponent = void 0;
var core_1 = require("@angular/core");
var ServiceItemDeleteDialogComponent = /** @class */ (function () {
    function ServiceItemDeleteDialogComponent(serviceItemService, activeModal, eventManager) {
        this.serviceItemService = serviceItemService;
        this.activeModal = activeModal;
        this.eventManager = eventManager;
    }
    ServiceItemDeleteDialogComponent.prototype.cancel = function () {
        this.activeModal.dismiss();
    };
    ServiceItemDeleteDialogComponent.prototype.confirmDelete = function (id) {
        var _this = this;
        this.serviceItemService["delete"](id).subscribe(function () {
            _this.eventManager.broadcast('serviceItemListModification');
            _this.activeModal.close();
        });
    };
    ServiceItemDeleteDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './service-item-delete-dialog.component.html'
        })
    ], ServiceItemDeleteDialogComponent);
    return ServiceItemDeleteDialogComponent;
}());
exports.ServiceItemDeleteDialogComponent = ServiceItemDeleteDialogComponent;
