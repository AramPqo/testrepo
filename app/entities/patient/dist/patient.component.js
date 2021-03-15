"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PatientComponent = void 0;
var core_1 = require("@angular/core");
var patient_delete_dialog_component_1 = require("./patient-delete-dialog.component");
var moment = require("moment");
var PatientComponent = /** @class */ (function () {
    function PatientComponent(patientService, eventManager, modalService, parseLinks, route) {
        this.patientService = patientService;
        this.eventManager = eventManager;
        this.modalService = modalService;
        this.parseLinks = parseLinks;
        this.route = route;
        this.patients = [];
        this.routeUrl = 'patients';
        this.resizableColData = { width: 'auto', index: null };
        this.tableHeaders = [
            { columnsValue: 'id', fieldName: 'ID', width: '14%', sortable: true },
            { columnsValue: 'firstName', fieldName: 'Name', width: '14%', sortable: true },
            { columnsValue: 'dateOfBirth', fieldName: 'Date Of Birth', width: '14%', sortable: true },
            { columnsValue: 'phone', fieldName: 'Phone Number', width: '14%', sortable: true },
            { columnsValue: 'nextAppointment', fieldName: 'Next Appointment', width: '14%', sortable: true }
        ];
        this.patients = [];
        this.links = {
            last: 0
        };
    }
    PatientComponent.prototype.loadAll = function () {
        var _this = this;
        this.patientService
            .query()
            .subscribe(function (res) { return _this.paginatePatients(res.body, res.headers); }, function (err) { return console.log(err); });
    };
    PatientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var appointments = _a.appointments;
            _this.appointments = appointments;
            _this.loadAll();
        });
        this.registerChangeInPatients();
    };
    PatientComponent.prototype.getFilteredValue = function (patients) {
        if (patients.length) {
            this.patients = patients;
        }
        else {
            this.loadAll();
        }
    };
    PatientComponent.prototype.registerChangeInPatients = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('patientListModification', function () { return _this.loadAll(); });
    };
    PatientComponent.prototype.deletePatient = function (patient) {
        var modalRef = this.modalService.open(patient_delete_dialog_component_1.PatientDeleteDialogComponent, { size: 'md', backdrop: 'static' });
        modalRef.componentInstance.patient = patient;
    };
    PatientComponent.prototype.getSelectedData = function (data) {
        var _this = this;
        var deletedIds = Object.keys(data);
        var _loop_1 = function (i) {
            this_1.patientService["delete"](parseInt(deletedIds[i])).subscribe(function (res) {
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
    PatientComponent.prototype.ngOnDestroy = function () {
        if (this.eventSubscriber) {
            this.eventManager.destroy(this.eventSubscriber);
        }
    };
    PatientComponent.prototype.createValidDate = function (value, format) {
        return moment.isMoment(value) ? value.format(format) : moment(value).format(format);
    };
    PatientComponent.prototype.paginatePatients = function (data, headers) {
        if (data) {
            this.patients = [];
            var _loop_2 = function (i) {
                var appointment = this_2.appointments.find(function (v) { return data[i].id === v.id; });
                data[i].dateOfBirth ? data[i].dateOfBirth = this_2.createValidDate(data[i].dateOfBirth, 'DD.MM.YYYY') : '-';
                appointment.startDate ? data[i]['nextAppointment'] = this_2.createValidDate(appointment.startDate, 'DD.MM.YYYY HH:mm') : '-';
                this_2.patients.push(data[i]);
            };
            var this_2 = this;
            for (var i = 0; i < data.length; i++) {
                _loop_2(i);
            }
        }
    };
    PatientComponent = __decorate([
        core_1.Component({
            selector: 'jhi-patient',
            templateUrl: './patient.component.html',
            styleUrls: ['./patient.component.scss']
        })
    ], PatientComponent);
    return PatientComponent;
}());
exports.PatientComponent = PatientComponent;
