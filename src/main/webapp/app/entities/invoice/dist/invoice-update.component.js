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
exports.InvoiceUpdateComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var invoice_model_1 = require("app/shared/model/invoice.model");
var InvoiceUpdateComponent = /** @class */ (function () {
    function InvoiceUpdateComponent(invoiceService, activatedRoute, fb) {
        this.invoiceService = invoiceService;
        this.activatedRoute = activatedRoute;
        this.fb = fb;
        this.isSaving = false;
        this.editForm = this.fb.group({
            id: [],
            invoiceNumber: [null, [forms_1.Validators.required]],
            recipientName: [null, [forms_1.Validators.required]],
            recipientCity: [null, [forms_1.Validators.required]],
            invoiceStatus: [null, [forms_1.Validators.required]],
            paymentType: [null, [forms_1.Validators.required]],
            paymentStatus: [null, [forms_1.Validators.required]],
            patientId: [],
            appointmentId: [null, [forms_1.Validators.required]],
            treatmentId: [null, [forms_1.Validators.required]],
            invoiceTotal: [null, [forms_1.Validators.required]]
        });
    }
    InvoiceUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.data.subscribe(function (_a) {
            var invoice = _a.invoice, patients = _a.patients, appointments = _a.appointments, treatments = _a.treatments;
            _this.patients = patients;
            _this.appointments = appointments;
            _this.treatments = treatments;
            _this.updateForm(invoice);
        });
    };
    InvoiceUpdateComponent.prototype.updateForm = function (invoice) {
        this.editForm.patchValue({
            id: invoice.id,
            invoiceNumber: invoice.invoiceNumber,
            recipientName: invoice.recipientName,
            recipientCity: invoice.recipientCity,
            invoiceStatus: invoice.invoiceStatus,
            paymentType: invoice.paymentType,
            paymentStatus: invoice.paymentStatus,
            patientId: invoice.patientId,
            appointmentId: invoice.appointmentId,
            treatmentId: invoice.treatmentId,
            invoiceTotal: invoice.invoiceTotal
        });
    };
    InvoiceUpdateComponent.prototype.previousState = function () {
        window.history.back();
    };
    InvoiceUpdateComponent.prototype.save = function () {
        this.isSaving = true;
        var invoice = this.createFromForm();
        if (invoice.id !== undefined) {
            this.subscribeToSaveResponse(this.invoiceService.update(invoice));
        }
        else {
            this.subscribeToSaveResponse(this.invoiceService.create(invoice));
        }
    };
    InvoiceUpdateComponent.prototype.createFromForm = function () {
        return __assign(__assign({}, new invoice_model_1.Invoice()), { id: this.editForm.get(['id']).value, invoiceNumber: this.editForm.get(['invoiceNumber']).value, recipientName: this.editForm.get(['recipientName']).value, recipientCity: this.editForm.get(['recipientCity']).value, invoiceStatus: this.editForm.get(['invoiceStatus']).value, paymentType: this.editForm.get(['paymentType']).value, paymentStatus: this.editForm.get(['paymentStatus']).value, patientId: this.editForm.get(['patientId']).value, appointmentId: this.editForm.get(['appointmentId']).value, treatmentId: this.editForm.get(['treatmentId']).value, invoiceTotal: this.editForm.get(['invoiceTotal']).value });
    };
    InvoiceUpdateComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function () { return _this.onSaveSuccess(); }, function () { return _this.onSaveError(); });
    };
    InvoiceUpdateComponent.prototype.onSaveSuccess = function () {
        this.isSaving = false;
        this.previousState();
    };
    InvoiceUpdateComponent.prototype.onSaveError = function () {
        this.isSaving = false;
    };
    InvoiceUpdateComponent = __decorate([
        core_1.Component({
            selector: 'jhi-invoice-update',
            templateUrl: './invoice-update.component.html'
        })
    ], InvoiceUpdateComponent);
    return InvoiceUpdateComponent;
}());
exports.InvoiceUpdateComponent = InvoiceUpdateComponent;
