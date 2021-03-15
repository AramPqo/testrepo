"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServiceItemComponent = void 0;
var core_1 = require("@angular/core");
var service_item_delete_dialog_component_1 = require("./service-item-delete-dialog.component");
var ServiceItemComponent = /** @class */ (function () {
    function ServiceItemComponent(serviceItemService, eventManager, modalService) {
        this.serviceItemService = serviceItemService;
        this.eventManager = eventManager;
        this.modalService = modalService;
        this.serviceItems = [];
        this.tableHeaders = [
            { columnsValue: 'id', fieldName: 'ID', width: '14%', sortable: true },
            { columnsValue: 'description', fieldName: 'Description', width: '14%', sortable: true },
            { columnsValue: 'price', fieldName: 'Price', width: '14%', sortable: true },
            { columnsValue: 'vatRate', fieldName: 'Vat Rate', width: '14%', sortable: true }
        ];
    }
    ServiceItemComponent.prototype.loadAll = function () {
        var _this = this;
        this.serviceItemService
            .query()
            .subscribe(function (res) { return _this.paginateServiceItems(res.body, res.headers); }, function (err) { return console.log(err); });
    };
    ServiceItemComponent.prototype.ngOnInit = function () {
        this.loadAll();
        this.registerChangeInServiceItems();
    };
    ServiceItemComponent.prototype.ngOnDestroy = function () {
        if (this.eventSubscriber) {
            this.eventManager.destroy(this.eventSubscriber);
        }
    };
    ServiceItemComponent.prototype.paginateServiceItems = function (data, headers) {
        if (data) {
            this.serviceItems = [];
            for (var i = 0; i < data.length; i++) {
                this.serviceItems.push(data[i]);
            }
        }
    };
    ServiceItemComponent.prototype.trackId = function (index, item) {
        return item.id;
    };
    ServiceItemComponent.prototype.registerChangeInServiceItems = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('serviceItemListModification', function () { return _this.loadAll(); });
    };
    ServiceItemComponent.prototype.deleteServiceItem = function (serviceItem) {
        var modalRef = this.modalService.open(service_item_delete_dialog_component_1.ServiceItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.serviceItem = serviceItem;
    };
    ServiceItemComponent.prototype.getSelectedData = function (data) {
        var _this = this;
        var deletedIds = Object.keys(data);
        var _loop_1 = function (i) {
            this_1.serviceItemService["delete"](parseInt(deletedIds[i])).subscribe(function (res) {
                if ((i + 1) === deletedIds.length) {
                    _this.loadAll();
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < deletedIds.length; i++) {
            _loop_1(i);
        }
    };
    ServiceItemComponent = __decorate([
        core_1.Component({
            selector: 'jhi-service-item',
            templateUrl: './service-item.component.html'
        })
    ], ServiceItemComponent);
    return ServiceItemComponent;
}());
exports.ServiceItemComponent = ServiceItemComponent;
