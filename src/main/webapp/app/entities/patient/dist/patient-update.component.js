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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.PatientUpdateComponent = void 0;
var core_1 = require("@angular/core");
var form_fields_1 = require("./../../shared/util/form-fields");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var forms_1 = require("@angular/forms");
var moment = require("moment");
var lodash = require("lodash");
var uuid = require("uuid");
var input_constants_1 = require("app/shared/constants/input.constants");
var patient_model_1 = require("app/shared/model/patient.model");
var location_model_1 = require("app/shared/model/location.model");
var patient_control_dialog_component_1 = require("./patient-control-dialog/patient-control-dialog.component");
var animations_1 = require("@angular/animations");
var PatientUpdateComponent = /** @class */ (function () {
    function PatientUpdateComponent(patientService, locationService, insurerService, countryService, injector, userService, appointmentService, remarkService, activatedRoute, fb, modalService) {
        this.patientService = patientService;
        this.locationService = locationService;
        this.insurerService = insurerService;
        this.countryService = countryService;
        this.injector = injector;
        this.userService = userService;
        this.appointmentService = appointmentService;
        this.remarkService = remarkService;
        this.activatedRoute = activatedRoute;
        this.fb = fb;
        this.modalService = modalService;
        this.isSaving = false;
        this.isFormValid = false;
        this.location = new location_model_1.Location;
        this.insurers = [];
        this.remarks = [];
        this.appointments = [];
        this.appointmentList = [];
        this.countries = [];
        this.editForm = this.fb.group({
            id: [],
            firstName: [null, [forms_1.Validators.required]],
            lastName: [null, [forms_1.Validators.required]],
            title: [],
            gender: [null, [forms_1.Validators.required]],
            dateOfBirth: [null, [forms_1.Validators.required]],
            email: [null, [forms_1.Validators.required, forms_1.Validators.email]],
            phone: [null, [forms_1.Validators.required]],
            mobile: [null, [forms_1.Validators.required]],
            language: [],
            insuranceNumber: [],
            occupation: [],
            employer: [],
            initialDiagnose: [],
            locationId: [],
            insurerId: [null, [forms_1.Validators.required]],
            location: this.fb.group({
                id: [],
                streetAddress: [null, [forms_1.Validators.required]],
                postalCode: [null, [forms_1.Validators.required]],
                city: [null, [forms_1.Validators.required]],
                state: [null, [forms_1.Validators.required]],
                countryId: [null, [forms_1.Validators.required]]
            })
        });
    }
    PatientUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        (_a = this.editForm.get('location')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(function (values) {
            console.log(values, 'xxxxxx');
        });
        this.locationForm = this.editForm.get('location');
        this.activatedRoute.data.subscribe(function (_a) {
            var patient = _a.patient, locations = _a.locations, insurers = _a.insurers, remarks = _a.remarks, countries = _a.countries, appointments = _a.appointments, users = _a.users, invoices = _a.invoices;
            if (!patient.id) {
                var today = moment().startOf('day');
                patient.dateOfBirth = today;
            }
            else {
                _this.remarks = remarks.filter(function (remark) { return remark.patientId === patient.id; });
                _this.appointments = appointments.filter(function (appointment) { return appointment.patientId === patient.id; });
                _this.invoices = invoices.filter(function (invoice) { return invoice.patientId === patient.id; });
            }
            _this.appointmentList = appointments;
            _this.countries = countries;
            _this.insurers = insurers;
            _this.users = users;
            _this.getPatientControl();
            _this.updateForm(patient);
        }), form_fields_1.FormFields.invoice;
    };
    PatientUpdateComponent.prototype.getPatientControl = function () {
        this.patientControls = [
            {
                title: 'Remark', controlName: 'remarks', isShowTime: false, service: 'RemarkService', control: this.getPatientControls(this.remarks, 'createdAt', 'content'), fields: form_fields_1.FormFields.remark
            },
            { title: 'Appointment', controlName: 'appointments', isShowTime: true, service: 'AppointmentService', control: this.getPatientControls(this.appointments, 'startDate', 'title', this.users), fields: form_fields_1.FormFields.appointment },
            {
                title: 'Invoices', controlName: 'invoices', isShowTime: false, service: 'InvoiceService', control: this.getPatientControls(this.invoices, 'createdAt', [
                    { name: 'appointmentId', dependence: 'appointmentList' },
                    { name: 'paymentType' },
                    { name: 'paymentStatus' },
                    { name: 'invoiceTotal', symbol: '€' }
                ]), fields: form_fields_1.FormFields.invoice
            }
        ];
    };
    PatientUpdateComponent.prototype.getPatientControls = function (data, dateName, contentData, users) {
        var control = Array(data.length).fill(null).map(Object);
        var _loop_1 = function (i) {
            if (users) {
                var user = users.filter(function (v) { return v.id === data[i].userId; })[0];
                var userName = user ? user.firstName[0] + user.lastName[1] : '';
                control[i].userName = userName;
            }
            control[i].id = data[i].id;
            control[i].date = data[i][dateName];
            if (Array.isArray(contentData)) {
                control[i].content = Array(contentData.length);
                var _loop_2 = function (j) {
                    if (contentData[j].dependence) {
                        control[i].content[j] = this_1.createControlView(this_1[contentData[j].dependence].find(function (v) { return v.id === data[i][contentData[j].name]; })).id;
                    }
                    else if (contentData[j].symbol) {
                        control[i].content[j] = this_1.createControlView(data[i][contentData[j].name] + " " + contentData[j].symbol);
                    }
                    else {
                        control[i].content[j] = this_1.createControlView(data[i][contentData[j].name]);
                    }
                };
                for (var j = 0; j < contentData.length; j++) {
                    _loop_2(j);
                }
            }
            else {
                control[i].content = data[i][contentData];
            }
        };
        var this_1 = this;
        for (var i = 0; i < data.length; i++) {
            _loop_1(i);
        }
        console.clear();
        console.log(control);
        return control;
    };
    PatientUpdateComponent.prototype.createControlView = function (value) {
        return value ? value : '-';
    };
    PatientUpdateComponent.prototype.getFormFields = function (name, id, fields) {
        var control = this[name].filter(function (v) { return v.id === id; })[0];
        var result = lodash.cloneDeep(fields);
        for (var i = 0; i < fields.length; i++) {
            if (control[fields[i].templateOptions.keyCode]) {
                if (result[i].symbol) {
                    result[i].defaultValue = control[fields[i].templateOptions.keyCode] + " " + result[i].symbol;
                }
                else {
                    result[i].defaultValue = control[fields[i].templateOptions.keyCode];
                }
            }
        }
        return result;
    };
    PatientUpdateComponent.prototype.checkIsArrayView = function (value) {
        return Array.isArray(value) ? true : false;
    };
    PatientUpdateComponent.prototype.updateForm = function (patient) {
        var _a, _b, _c, _d, _e, _f;
        this.editForm.patchValue({
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            title: patient.title,
            gender: patient.gender,
            dateOfBirth: patient.dateOfBirth ? patient.dateOfBirth.format(input_constants_1.DATE_TIME_FORMAT) : null,
            email: patient.email,
            phone: patient.phone,
            mobile: patient.mobile,
            language: patient.language,
            insuranceNumber: patient.insuranceNumber,
            occupation: patient.occupation,
            employer: patient.employer,
            initialDiagnose: patient.initialDiagnose,
            locationId: patient.locationId,
            insurerId: patient.insurerId,
            location: {
                id: (_a = patient.location) === null || _a === void 0 ? void 0 : _a.id,
                city: (_b = patient.location) === null || _b === void 0 ? void 0 : _b.city,
                countryId: (_c = patient.location) === null || _c === void 0 ? void 0 : _c.countryId,
                postalCode: (_d = patient.location) === null || _d === void 0 ? void 0 : _d.postalCode,
                state: (_e = patient.location) === null || _e === void 0 ? void 0 : _e.state,
                streetAddress: (_f = patient.location) === null || _f === void 0 ? void 0 : _f.state
            }
        });
    };
    PatientUpdateComponent.prototype.previousState = function () {
        window.history.back();
    };
    PatientUpdateComponent.prototype.save = function () {
        this.isSaving = true;
        var patient = this.createFromForm();
        console.log(patient);
        if (patient.id !== undefined) {
            this.subscribeToSaveResponse(this.patientService.update(patient));
        }
        else {
            this.subscribeToSaveResponse(this.patientService.create(patient));
        }
    };
    PatientUpdateComponent.prototype.updateControl = function (patientControl, index, controlId) {
        var _this = this;
        this.isOpenModal = true;
        var modalRef = this.modalService.open(patient_control_dialog_component_1.PatientControlDialogComponent, { backdrop: false, windowClass: 'patient-control-dialog', container: this.modalContainer.nativeElement });
        modalRef.componentInstance.title = patientControl.title;
        if (controlId) {
            modalRef.componentInstance.id = controlId;
            modalRef.componentInstance.fields = this.getFormFields(patientControl.controlName, controlId, patientControl.fields);
        }
        else {
            modalRef.componentInstance.fields = patientControl.fields;
        }
        if (true) {
            // debugger;
        }
        modalRef.componentInstance.updateEmit
            .subscribe(function (result) {
            result.patientId = _this.editForm.get(['id']).value;
            if (patientControl.controlName === 'appointments') {
                _this.createAppointmentControl(result, patientControl, index, controlId);
            }
            else {
                if (controlId) {
                    result.id = controlId;
                    result.isUpdated = true;
                    var mergedControl = __assign(__assign({}, _this[patientControl.controlName].find(function (v) { return v.id === controlId; })), result);
                    _this[patientControl.controlName] = __spreadArrays(_this[patientControl.controlName].filter(function (v) { return v.id !== controlId; }), [mergedControl]);
                    var content = _this[patientControl.controlName].find(function (v) { return v.id === controlId; });
                    if (patientControl.controlName === 'invoices') {
                        content = { id: controlId, date: content.createdAt, content: [content.appointmentId, content.paymentType, content.paymentStatus, content.invoiceTotal + '€'] };
                    }
                    _this.patientControls[index].control = __spreadArrays(_this.patientControls[index].control.filter(function (v) { return v.id !== controlId; }), [content]);
                }
                else {
                    result.id = "created-" + uuid.v4();
                    _this[patientControl.controlName].push(result);
                    if (patientControl.controlName === 'invoices') {
                        var control = { id: result.id, date: null, content: [result.appointmentId, result.paymentType, 'PENDING', '0€'] };
                        _this.patientControls[index].control.push(control);
                        // debugger;
                    }
                    else {
                        _this.patientControls[index].control.push(result);
                    }
                }
            }
        });
        modalRef.result.then(function () { }, function () { _this.isOpenModal = false; });
    };
    PatientUpdateComponent.prototype.getStopPropagation = function (event) {
        event.stopPropagation();
    };
    PatientUpdateComponent.prototype.createInvoiceControl = function (content, index, controlId) {
        // debugger;
    };
    PatientUpdateComponent.prototype.createAppointmentControl = function (result, control, index, controlId) {
        var startDate = moment(new Date(result.startDate.format('MM/DD/YYYY') + " " + result.timeFrom), input_constants_1.DATE_TIME_FORMAT);
        var endDate = moment(new Date(result.startDate.format('MM/DD/YYYY') + " " + result.timeTo), input_constants_1.DATE_TIME_FORMAT);
        var a = moment;
        var appointment = {
            startDate: startDate,
            endDate: endDate,
            title: result.title,
            colorCode: result.colorCode,
            notes: result.notes,
            userId: result.userId,
            patientId: result.patientId
        };
        if (controlId) {
            appointment['isUpdated'] = true;
            appointment['id'] = controlId;
            var mergedAppointment = __assign(__assign({}, this.appointments.find(function (v) { return v.id === appointment['id']; })), appointment);
            this.appointments = __spreadArrays(this.appointments.filter(function (v) { return v.id !== appointment['id']; }), [mergedAppointment]);
            var control_1 = this.getPatientControls(this.appointments, 'startDate', 'title', this.users).filter(function (v) { return v.id === appointment['id']; });
            this.patientControls[index].control = __spreadArrays(this.patientControls[index].control.filter(function (v) { return v.id !== controlId; }), control_1);
        }
        else {
            appointment['id'] = "created-" + uuid.v4();
            this.appointments.push(appointment);
            this.patientControls[index].control = this.getPatientControls(this.appointments, 'startDate', 'title', this.users);
        }
    };
    PatientUpdateComponent.prototype.removeControl = function (patientControl, index, id) {
        var _this = this;
        if (!this.isCreated(id)) {
            var service = this.injector.get(patientControl.service);
            service["delete"](id).subscribe(function (res) {
                _this.patientControls[index].control = _this.patientControls[index].control.filter(function (v) { return v.id !== id; });
            });
        }
        else {
            this.patientControls[index].control = this.patientControls[index].control.filter(function (v) { return v.id !== id; });
            this[patientControl.controlName] = this[patientControl.controlName].filter(function (v) { return v.id !== id; });
        }
    };
    PatientUpdateComponent.prototype.isCreated = function (id) {
        return typeof id === 'string' && id.slice(0, 7) === 'created' ? true : false;
    };
    PatientUpdateComponent.prototype.createFromForm = function () {
        var _a, _b, _c, _d, _e, _f;
        return __assign(__assign({}, new patient_model_1.Patient()), { id: this.editForm.get(['id']).value, firstName: this.editForm.get(['firstName']).value, lastName: this.editForm.get(['lastName']).value, title: this.editForm.get(['title']).value, gender: this.editForm.get(['gender']).value, dateOfBirth: this.editForm.get(['dateOfBirth']).value
                ? moment(this.editForm.get(['dateOfBirth']).value, input_constants_1.DATE_TIME_FORMAT)
                : undefined, email: this.editForm.get(['email']).value, phone: this.editForm.get(['phone']).value, mobile: this.editForm.get(['mobile']).value, language: this.editForm.get(['language']).value, insuranceNumber: this.editForm.get(['insuranceNumber']).value, occupation: this.editForm.get(['occupation']).value, employer: this.editForm.get(['employer']).value, initialDiagnose: this.editForm.get(['initialDiagnose']).value, locationId: this.editForm.get(['locationId']).value, insurerId: this.editForm.get(['insurerId']).value, location: {
                id: (_a = this.editForm.get(['location']).value) === null || _a === void 0 ? void 0 : _a.id,
                city: (_b = this.editForm.get(['location']).value) === null || _b === void 0 ? void 0 : _b.city,
                countryId: (_c = this.editForm.get(['location']).value) === null || _c === void 0 ? void 0 : _c.countryId,
                postalCode: (_d = this.editForm.get(['location']).value) === null || _d === void 0 ? void 0 : _d.postalCode,
                state: (_e = this.editForm.get(['location']).value) === null || _e === void 0 ? void 0 : _e.state,
                streetAddress: (_f = this.editForm.get(['location']).value) === null || _f === void 0 ? void 0 : _f.state
            } });
    };
    PatientUpdateComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            console.log(result);
            _this.saveControls('RemarkService', 'remarks', res.body.id);
            _this.saveControls('AppointmentService', 'appointments', res.body.id);
            _this.saveControls('InvoiceService', 'invoices', res.body.id);
        }, function () { return _this.onSaveError(); }, function () { return _this.onSaveSuccess(); });
    };
    PatientUpdateComponent.prototype.saveControls = function (serviceName, data, id) {
        var _this = this;
        var service = this.injector.get(serviceName);
        var toCreate = this[data].filter(function (v) { return _this.isCreated(v.id); });
        var toUpdate = this[data].filter(function (v) { return v.isUpdated; });
        if (toCreate.length) {
            for (var i = 0; i < toCreate.length; i++) {
                delete toCreate[i].id;
                if (id) {
                    toCreate[i].patientId = id;
                }
                service.create(toCreate[i]).subscribe(function (res) {
                    console.log(res);
                    // debugger;
                });
            }
        }
        if (toUpdate.length) {
            for (var i = 0; i < toUpdate.length; i++) {
                delete toUpdate[i].isUpdated;
                service.update(toUpdate[i]).subscribe(function (res) {
                    console.log(res);
                });
            }
        }
    };
    PatientUpdateComponent.prototype.onSaveSuccess = function () {
        this.isSaving = false;
        this.previousState();
    };
    PatientUpdateComponent.prototype.onSaveError = function () {
        this.isSaving = false;
    };
    PatientUpdateComponent.prototype.trackById = function (index, item) {
        return item.id;
    };
    __decorate([
        core_1.ViewChild('modalContainer')
    ], PatientUpdateComponent.prototype, "modalContainer");
    PatientUpdateComponent = __decorate([
        core_1.Component({
            selector: 'jhi-patient-update',
            templateUrl: './patient-update.component.html',
            styleUrls: ['patient-update.component.scss'],
            animations: [
                animations_1.trigger("collectionAnimation", [
                    animations_1.state("in", animations_1.style({ top: 0 })),
                    animations_1.transition(":enter", [animations_1.style({ top: -45, 'z-index': 0 }), animations_1.animate(0)]),
                    animations_1.transition(":leave", animations_1.animate(400, animations_1.style({ top: -45, 'z-index': 0 })))
                ])
            ]
        })
    ], PatientUpdateComponent);
    return PatientUpdateComponent;
}());
exports.PatientUpdateComponent = PatientUpdateComponent;
