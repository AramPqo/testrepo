"use strict";
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
exports.__esModule = true;
exports.ServiceItemUpdateComponent = void 0;
var core_1 = require("@angular/core");
var service_item_model_1 = require("app/shared/model/service-item.model");
var ServiceItemUpdateComponent = /** @class */ (function () {
    function ServiceItemUpdateComponent(serviceItemService, activatedRoute, fb) {
        this.serviceItemService = serviceItemService;
        this.activatedRoute = activatedRoute;
        this.fb = fb;
        this.isSaving = false;
        this.editForm = this.fb.group({
            id: [],
            description: [],
            price: [],
            invoiceId: [],
            vatRate: []
        });
    }
    ServiceItemUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.data.subscribe(function (_a) {
            var serviceItem = _a.serviceItem, invoices = _a.invoices, appointments = _a.appointments;
            _this.invoices = invoices;
            _this.updateForm(serviceItem);
        });
    };
    ServiceItemUpdateComponent.prototype.updateForm = function (serviceItem) {
        this.editForm.patchValue({
            id: serviceItem.id,
            description: serviceItem.description,
            price: serviceItem.price,
            invoiceId: serviceItem.invoiceId,
            vatRate: serviceItem.vatRate
        });
    };
    ServiceItemUpdateComponent.prototype.previousState = function () {
        window.history.back();
    };
    ServiceItemUpdateComponent.prototype.save = function () {
        this.isSaving = true;
        var serviceItem = this.createFromForm();
        if (serviceItem.id !== undefined) {
            this.subscribeToSaveResponse(this.serviceItemService.update(serviceItem));
        }
        else {
            this.subscribeToSaveResponse(this.serviceItemService.create(serviceItem));
        }
    };
    ServiceItemUpdateComponent.prototype.createFromForm = function () {
        return __assign(__assign({}, new service_item_model_1.ServiceItem()), { id: this.editForm.get(['id']).value, description: this.editForm.get(['description']).value, price: this.editForm.get(['price']).value, invoiceId: this.editForm.get(['invoiceId']).value, vatRate: this.editForm.get(['vatRate']).value });
    };
    ServiceItemUpdateComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function () { return _this.onSaveSuccess(); }, function () { return _this.onSaveError(); });
    };
    ServiceItemUpdateComponent.prototype.onSaveSuccess = function () {
        this.isSaving = false;
        this.previousState();
    };
    ServiceItemUpdateComponent.prototype.onSaveError = function () {
        this.isSaving = false;
    };
    ServiceItemUpdateComponent = __decorate([
        core_1.Component({
            selector: 'jhi-service-item-update',
            templateUrl: './service-item-update.component.html'
        })
    ], ServiceItemUpdateComponent);
    return ServiceItemUpdateComponent;
}());
exports.ServiceItemUpdateComponent = ServiceItemUpdateComponent;
