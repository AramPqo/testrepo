"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InvoiceControlDialogComponent = void 0;
var core_1 = require("@angular/core");
var InvoiceControlDialogComponent = /** @class */ (function () {
    function InvoiceControlDialogComponent(activeModal) {
        this.activeModal = activeModal;
        this.updateEmit = new core_1.EventEmitter();
    }
    InvoiceControlDialogComponent.prototype.ngOnInit = function () {
        // debugger;
    };
    InvoiceControlDialogComponent.prototype.onSubmit = function () {
    };
    InvoiceControlDialogComponent.prototype.close = function () {
        this.activeModal.dismiss();
    };
    __decorate([
        core_1.Output()
    ], InvoiceControlDialogComponent.prototype, "updateEmit");
    InvoiceControlDialogComponent = __decorate([
        core_1.Component({
            templateUrl: './invoice-control-dialog.component.html',
            styleUrls: ['./invoice-control-dialog.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], InvoiceControlDialogComponent);
    return InvoiceControlDialogComponent;
}());
exports.InvoiceControlDialogComponent = InvoiceControlDialogComponent;
