"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.invoiceRoute = exports.InvoiceResolve = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var authority_constants_1 = require("app/shared/constants/authority.constants");
var user_route_access_service_1 = require("app/core/auth/user-route-access-service");
var invoice_model_1 = require("app/shared/model/invoice.model");
var invoice_component_1 = require("./invoice.component");
var invoice_update_component_1 = require("./invoice-update.component");
var InvoiceResolve = /** @class */ (function () {
    function InvoiceResolve(service, router) {
        this.service = service;
        this.router = router;
    }
    InvoiceResolve.prototype.resolve = function (route) {
        var _this = this;
        var id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(operators_1.flatMap(function (invoice) {
                if (invoice.body) {
                    return rxjs_1.of(invoice.body);
                }
                else {
                    _this.router.navigate(['404']);
                    return rxjs_1.EMPTY;
                }
            }));
        }
        return rxjs_1.of(new invoice_model_1.Invoice());
    };
    InvoiceResolve = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], InvoiceResolve);
    return InvoiceResolve;
}());
exports.InvoiceResolve = InvoiceResolve;
var PatientResolve = /** @class */ (function () {
    function PatientResolve(service) {
        this.service = service;
    }
    PatientResolve.prototype.resolve = function () {
        return this.service.query().pipe(operators_1.map(function (appointments) { return appointments.body; }));
    };
    PatientResolve = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], PatientResolve);
    return PatientResolve;
}());
var AppointmentResolve = /** @class */ (function () {
    function AppointmentResolve(service) {
        this.service = service;
    }
    AppointmentResolve.prototype.resolve = function () {
        return this.service.query().pipe(operators_1.map(function (appointments) { return appointments.body; }));
    };
    AppointmentResolve = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], AppointmentResolve);
    return AppointmentResolve;
}());
var TreatmentResolve = /** @class */ (function () {
    function TreatmentResolve(service) {
        this.service = service;
    }
    TreatmentResolve.prototype.resolve = function () {
        return this.service.query().pipe(operators_1.map(function (treatments) { return treatments.body; }));
    };
    TreatmentResolve = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], TreatmentResolve);
    return TreatmentResolve;
}());
exports.invoiceRoute = [
    {
        path: '',
        component: invoice_component_1.InvoiceComponent,
        data: {
            authorities: [authority_constants_1.Authority.USER],
            pageTitle: 'Invoice'
        },
        canActivate: [user_route_access_service_1.UserRouteAccessService]
    },
    {
        path: 'new',
        component: invoice_update_component_1.InvoiceUpdateComponent,
        resolve: {
            invoice: InvoiceResolve,
            patients: PatientResolve,
            appointments: AppointmentResolve,
            treatments: TreatmentResolve
        },
        data: {
            authorities: [authority_constants_1.Authority.USER],
            pageTitle: 'Invoice'
        },
        canActivate: [user_route_access_service_1.UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: invoice_update_component_1.InvoiceUpdateComponent,
        resolve: {
            invoice: InvoiceResolve,
            patients: PatientResolve,
            appointments: AppointmentResolve,
            treatments: TreatmentResolve
        },
        data: {
            authorities: [authority_constants_1.Authority.USER],
            pageTitle: 'Invoice'
        },
        canActivate: [user_route_access_service_1.UserRouteAccessService]
    },
];
