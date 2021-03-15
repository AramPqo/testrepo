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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ServiceItemControlComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@ngx-formly/core");
var animations_1 = require("@angular/animations");
var uuid = require("uuid");
var forms_1 = require("@angular/forms");
var ServiceItemControlComponent = /** @class */ (function (_super) {
    __extends(ServiceItemControlComponent, _super);
    function ServiceItemControlComponent(serviceItemService, fb) {
        var _this = _super.call(this) || this;
        _this.serviceItemService = serviceItemService;
        _this.fb = fb;
        _this.editForm = _this.fb.group({
            id: [],
            description: [null, [forms_1.Validators.required]],
            price: [null, [forms_1.Validators.required]]
        });
        return _this;
    }
    ServiceItemControlComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.serviceItemService.query()
            .subscribe(function (res) {
            _this.items = res.body.filter(function (v) { return v.invoiceId === _this.field.defaultValue; });
            console.clear();
            console.log(_this.items);
        });
    };
    ServiceItemControlComponent.prototype.updateItem = function (item, index) {
        this.editForm.patchValue(item);
        this.changedItem = index;
    };
    ServiceItemControlComponent.prototype.save = function (item, index) {
        var _this = this;
        if (this.editForm.invalid)
            return;
        this.changedItem = null;
        if (this.getIsCreated(item.id)) {
            var serviceItem = this.editForm.value;
            serviceItem.invoiceId = this.field.defaultValue;
            this.serviceItemService.create(serviceItem)
                .subscribe(function (res) {
                _this.items.pop();
                _this.items.push(res.body);
                _this.editForm.reset();
            });
        }
        else {
            this.serviceItemService.update(__assign(__assign({}, item), this.editForm.value))
                .subscribe(function (res) {
                _this.items = __spreadArrays(_this.items.filter(function (v) { return v.id !== item.id; }), [res.body]);
                _this.editForm.reset();
            });
        }
    };
    ServiceItemControlComponent.prototype.createItem = function () {
        var id = "created-" + uuid.v4();
        this.items.push({ id: id, description: '', price: null });
        this.changedItem = this.items.length - 1;
        this.editForm.reset();
    };
    ServiceItemControlComponent.prototype.getStopPropagation = function (event) {
        event.stopPropagation();
    };
    ServiceItemControlComponent.prototype.removeItem = function (id, index) {
        var _this = this;
        if (this.changedItem === index) {
            this.changedItem = null;
            return;
        }
        if (this.getIsCreated(id)) {
            this.items = this.items.filter(function (v) { return v.id !== id; });
        }
        else {
            this.serviceItemService["delete"](id).subscribe(function () { return _this.items = _this.items.filter(function (v) { return v.id !== id; }); });
        }
        this.changedItem = null;
    };
    ServiceItemControlComponent.prototype.getIsCreated = function (id) {
        return typeof id === 'string' && id.slice(0, 7) === 'created';
    };
    ServiceItemControlComponent = __decorate([
        core_1.Component({
            selector: 'jhi-service-item-control',
            templateUrl: './service-item-control.component.html',
            styleUrls: ['./../../../entities/patient/patient-update.component.scss', './service-item-control.component.scss'],
            animations: [
                animations_1.trigger("collectionAnimation", [
                    animations_1.state("in", animations_1.style({ top: 0 })),
                    animations_1.transition(":enter", [animations_1.style({ top: -45, 'z-index': 0 }), animations_1.animate(0)]),
                    animations_1.transition(":leave", animations_1.animate(400, animations_1.style({ top: -45, 'z-index': 0 })))
                ])
            ]
        })
    ], ServiceItemControlComponent);
    return ServiceItemControlComponent;
}(core_2.FieldType));
exports.ServiceItemControlComponent = ServiceItemControlComponent;
