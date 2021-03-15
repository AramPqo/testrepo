"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.serviceItemRoute = exports.ServiceItemResolve = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var authority_constants_1 = require("app/shared/constants/authority.constants");
var user_route_access_service_1 = require("app/core/auth/user-route-access-service");
var service_item_model_1 = require("app/shared/model/service-item.model");
var service_item_component_1 = require("./service-item.component");
var service_item_detail_component_1 = require("./service-item-detail.component");
var service_item_update_component_1 = require("./service-item-update.component");
var ServiceItemResolve = /** @class */ (function () {
    function ServiceItemResolve(service, router) {
        this.service = service;
        this.router = router;
    }
    ServiceItemResolve.prototype.resolve = function (route) {
        var _this = this;
        var id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(operators_1.flatMap(function (serviceItem) {
                if (serviceItem.body) {
                    return rxjs_1.of(serviceItem.body);
                }
                else {
                    _this.router.navigate(['404']);
                    return rxjs_1.EMPTY;
                }
            }));
        }
        return rxjs_1.of(new service_item_model_1.ServiceItem());
    };
    ServiceItemResolve = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], ServiceItemResolve);
    return ServiceItemResolve;
}());
exports.ServiceItemResolve = ServiceItemResolve;
var InvoiceResolve = /** @class */ (function () {
    function InvoiceResolve(service) {
        this.service = service;
    }
    InvoiceResolve.prototype.resolve = function () {
        return this.service.query().pipe(operators_1.map(function (treatments) { return treatments.body; }));
    };
    InvoiceResolve = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], InvoiceResolve);
    return InvoiceResolve;
}());
exports.serviceItemRoute = [
    {
        path: '',
        component: service_item_component_1.ServiceItemComponent,
        data: {
            authorities: [authority_constants_1.Authority.USER],
            pageTitle: 'medappointApp.serviceItem.home.title'
        },
        canActivate: [user_route_access_service_1.UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: service_item_detail_component_1.ServiceItemDetailComponent,
        resolve: {
            serviceItem: ServiceItemResolve
        },
        data: {
            authorities: [authority_constants_1.Authority.USER],
            pageTitle: 'medappointApp.serviceItem.home.title'
        },
        canActivate: [user_route_access_service_1.UserRouteAccessService]
    },
    {
        path: 'new',
        component: service_item_update_component_1.ServiceItemUpdateComponent,
        resolve: {
            serviceItem: ServiceItemResolve,
            invoices: InvoiceResolve
        },
        data: {
            authorities: [authority_constants_1.Authority.USER],
            pageTitle: 'medappointApp.serviceItem.home.title'
        },
        canActivate: [user_route_access_service_1.UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: service_item_update_component_1.ServiceItemUpdateComponent,
        resolve: {
            serviceItem: ServiceItemResolve,
            invoices: InvoiceResolve
        },
        data: {
            authorities: [authority_constants_1.Authority.USER],
            pageTitle: 'medappointApp.serviceItem.home.title'
        },
        canActivate: [user_route_access_service_1.UserRouteAccessService]
    },
];
