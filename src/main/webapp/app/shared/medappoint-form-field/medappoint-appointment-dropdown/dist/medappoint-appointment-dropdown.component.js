"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MedappointAppointmentDropdownComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@ngx-formly/core");
var MedappointAppointmentDropdownComponent = /** @class */ (function (_super) {
    __extends(MedappointAppointmentDropdownComponent, _super);
    function MedappointAppointmentDropdownComponent(appointmentService) {
        var _this = _super.call(this) || this;
        _this.appointmentService = appointmentService;
        _this.itemId = '';
        _this.activeItem = { startDate: null, endDate: null };
        return _this;
    }
    MedappointAppointmentDropdownComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemId = this.field.defaultValue;
        this.appointmentService.query()
            .subscribe(function (res) {
            _this.items = res.body;
            if (_this.itemId) {
                var item = _this.items.find(function (v) { return v.id === _this.itemId; }) ? _this.items.find(function (v) { return v.id === _this.itemId; }) : null;
                _this.activeItem = item;
            }
        });
    };
    MedappointAppointmentDropdownComponent.prototype.getItem = function (item, index) {
        this.selectedItem = index;
        this.activeItem = item;
        this.itemId = item.id;
    };
    MedappointAppointmentDropdownComponent = __decorate([
        core_1.Component({
            selector: 'jhi-medappoint-appointment-dropdown.component',
            templateUrl: './medappoint-appointment-dropdown.component.html',
            styleUrls: ['./../medappoint-dropdown/medappoint-dropdown.component.scss']
        })
    ], MedappointAppointmentDropdownComponent);
    return MedappointAppointmentDropdownComponent;
}(core_2.FieldType));
exports.MedappointAppointmentDropdownComponent = MedappointAppointmentDropdownComponent;
