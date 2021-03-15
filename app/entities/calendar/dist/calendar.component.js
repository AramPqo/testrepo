"use strict";
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
exports.CalendarComponent = void 0;
var patient_control_dialog_component_1 = require("./../patient/patient-control-dialog/patient-control-dialog.component");
var core_1 = require("@angular/core");
var daygrid_1 = require("@fullcalendar/daygrid");
var interaction_1 = require("@fullcalendar/interaction");
var timegrid_1 = require("@fullcalendar/timegrid");
var moment = require("moment");
var form_fields_1 = require("app/shared/util/form-fields");
var lodash = require("lodash");
var input_constants_1 = require("app/shared/constants/input.constants");
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(calendar, formatter, appointmentService, route, modalService) {
        this.calendar = calendar;
        this.formatter = formatter;
        this.appointmentService = appointmentService;
        this.route = route;
        this.modalService = modalService;
        this.eventList = [];
    }
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = this.calendar.getToday();
        this.calendarOptions = {
            plugins: [daygrid_1["default"], interaction_1["default"], timegrid_1["default"]],
            editable: true,
            initialView: 'timeGridWeek',
            scrollTime: '06:00',
            events: __spreadArrays(this.eventList),
            customButtons: {
                calendarBtn: {
                    text: '',
                    click: function () {
                        _this.toggleMiniCalendar();
                    }
                }
            },
            dayHeaderFormat: { weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true },
            businessHours: [
                {
                    daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
                    startTime: '08:00',
                    endTime: '12:00'
                },
                {
                    daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
                    startTime: '13:00',
                    endTime: '18:00'
                }
            ],
            eventTimeFormat: {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            },
            headerToolbar: {
                left: 'today,calendarBtn',
                center: 'prev,title,next',
                right: 'timeGridDay,timeGridThreeDay,timeGridSixDay,timeGridWeek'
            },
            views: {
                timeGridThreeDay: {
                    type: 'timeGrid',
                    duration: { days: 3 },
                    buttonText: '3 Days'
                },
                timeGridSixDay: {
                    type: 'timeGrid',
                    duration: { days: 6 },
                    buttonText: '6 Days'
                }
            },
            dateClick: this.handleDateClick.bind(this),
            eventClick: this.handleEventClick.bind(this),
            eventDragStop: this.handleEventDragStop.bind(this),
            datesSet: this.handleDateSet.bind(this),
            eventDrop: this.handleEventDrop.bind(this),
            eventResize: this.handleEventResize.bind(this)
        };
        this.getEventList();
    };
    CalendarComponent.prototype.ngAfterViewInit = function () {
        this.calendarApi = this.fullcalendar.getApi();
    };
    CalendarComponent.prototype.getEventList = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var userList = _a.userList, patientList = _a.patientList;
            _this.eventList = [];
            console.clear();
            console.log(userList);
            _this.appointmentService.query()
                .subscribe(function (res) {
                _this.appointments = res.body;
                var _loop_1 = function (i) {
                    var startDate = _this.appointments[i].startDate.format('YYYY-MM-DDTHH:mm:ss');
                    var endDate = _this.appointments[i].endDate.format('YYYY-MM-DDTHH:mm:ss');
                    var user = userList.filter(function (v) { return v.id === _this.appointments[i].userId; })[0];
                    var patient = patientList.filter(function (v) { return v.id === _this.appointments[i].patientId; })[0];
                    _this.eventList.push({
                        classNames: [_this.getEventColor(_this.appointments[i].colorCode) + "-color"],
                        title: "User: " + (user === null || user === void 0 ? void 0 : user.firstName) + " " + (user === null || user === void 0 ? void 0 : user.lastName) + " \n                      Patient: " + (patient === null || patient === void 0 ? void 0 : patient.firstName) + " " + (patient === null || patient === void 0 ? void 0 : patient.lastName),
                        start: startDate,
                        end: endDate,
                        startDate: startDate,
                        backgroundColor: _this.appointments[i].colorCode,
                        id: _this.appointments[i].id
                    });
                };
                for (var i = 0; i < _this.appointments.length; i++) {
                    _loop_1(i);
                }
                _this.calendarOptions.events = __spreadArrays(_this.eventList);
            });
        });
    };
    CalendarComponent.prototype.getEventColor = function (hexcolor) {
        if (hexcolor.slice(0, 1) === '#') {
            hexcolor = hexcolor.slice(1);
        }
        if (hexcolor.length === 3) {
            hexcolor = hexcolor.split('').map(function (hex) {
                return hex + hex;
            }).join('');
        }
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    };
    ;
    CalendarComponent.prototype.getDateFormat = function (date) {
        return date.year + "-" + date.month + "-" + date.day;
    };
    CalendarComponent.prototype.handleDateClick = function (calendarEvent) {
        var event = {
            start: calendarEvent.date,
            startDate: moment(moment(calendarEvent.date).toISOString())
        };
        this.openPatientControlModal(event);
    };
    CalendarComponent.prototype.handleEventClick = function (calendarEvent) {
        this.openPatientControlModal(calendarEvent.event);
    };
    CalendarComponent.prototype.handleDateSet = function (arg) {
        console.log(arg);
    };
    CalendarComponent.prototype.handleEventDragStop = function (calendarEvent) {
    };
    CalendarComponent.prototype.handleEventResize = function (calendarEvent) {
        var _this = this;
        var id = parseInt(calendarEvent.event.id);
        var appointemnt = lodash.clone(this.appointments.filter(function (v) { return v.id === id; }))[0];
        appointemnt.startDate = moment(calendarEvent.event.start);
        appointemnt.endDate = moment(calendarEvent.event.end);
        this.appointmentService.update(appointemnt)
            .subscribe(function (res) {
            _this.getEventList();
        });
    };
    CalendarComponent.prototype.handleEventDrop = function (calendarEvent) {
        var _this = this;
        var id = parseInt(calendarEvent.event.id);
        var appointemnt = lodash.clone(this.appointments.filter(function (v) { return v.id === id; }))[0];
        appointemnt.startDate = moment(calendarEvent.event.start);
        appointemnt.endDate = moment(calendarEvent.event.end);
        this.appointmentService.update(appointemnt)
            .subscribe(function (res) {
            _this.getEventList();
        });
    };
    CalendarComponent.prototype.openPatientControlModal = function (event) {
        var _this = this;
        var appointment = this.appointments.find(function (v) { return v.id === parseInt(event.id); });
        var patientId = appointment.patientId;
        var userId = appointment.userId;
        if (patientId && userId) {
            var modalRef = this.modalService.open(patient_control_dialog_component_1.PatientControlDialogComponent, { backdrop: true, windowClass: 'patient-control-dialog' });
            modalRef.componentInstance.title = 'Appointment';
            var fields = form_fields_1.FormFields.appointment;
            var id_1 = parseInt(event.id);
            var a = moment;
            console.log(a);
            if (id_1) {
                modalRef.componentInstance.fields = this.getFormFields(fields, event, id_1);
                modalRef.componentInstance.id = id_1;
                modalRef.componentInstance.updateEmit
                    .subscribe(function (result) {
                    result.id = id_1;
                    var a = moment;
                    console.log(a);
                    console.log(_this);
                    result.patientId = patientId;
                    result.userId = userId;
                    result.startDate = moment(new Date(result.startDate.format('MM/DD/YYYY') + " " + result.timeFrom), input_constants_1.DATE_TIME_FORMAT);
                    result.endDate = moment(new Date(result.startDate.format('MM/DD/YYYY') + " " + result.timeTo), input_constants_1.DATE_TIME_FORMAT);
                    delete result.timeFrom;
                    delete result.timeTo;
                    _this.appointmentService.update(result)
                        .subscribe(function (res) {
                        _this.getEventList();
                    });
                });
            }
            else {
                modalRef.componentInstance.fields = this.getFormFields(fields, event);
                modalRef.componentInstance.updateEmit
                    .subscribe(function (result) {
                    result.patientId = patientId;
                    result.startDate = moment(new Date(result.startDate.format('MM/DD/YYYY') + " " + result.timeFrom), input_constants_1.DATE_TIME_FORMAT);
                    result.endDate = moment(new Date(result.startDate.format('MM/DD/YYYY') + " " + result.timeTo), input_constants_1.DATE_TIME_FORMAT);
                    delete result.timeFrom;
                    delete result.timeTo;
                    _this.appointmentService.create(result)
                        .subscribe(function (res) {
                        _this.getEventList();
                    });
                });
            }
        }
    };
    CalendarComponent.prototype.getFormFields = function (fields, event, id) {
        var result = lodash.cloneDeep(fields);
        if (id) {
            var control = this.appointments.filter(function (v) { return v.id === id; })[0];
            for (var i = 0; i < fields.length; i++) {
                if (event[fields[i].templateOptions.calendarKeyCode]) {
                    result[i].defaultValue = moment(event[fields[i].templateOptions.calendarKeyCode], 'YYYY-MM-DDTHH:mm');
                }
                else if (control[fields[i].templateOptions.keyCode]) {
                    result[i].defaultValue = control[fields[i].templateOptions.keyCode];
                }
            }
        }
        else {
            for (var i = 0; i < fields.length; i++) {
                if (event[fields[i].templateOptions.calendarKeyCode]) {
                    result[i].defaultValue = moment(event[fields[i].templateOptions.calendarKeyCode], 'YYYY-MM-DDTHH:mm');
                }
                if (event[fields[i].templateOptions.keyCode]) {
                    result[i].defaultValue = event[fields[i].templateOptions.keyCode];
                }
            }
        }
        return result;
    };
    CalendarComponent.prototype.toggleMiniCalendar = function () {
        this.isShowMiniCalendar = !this.isShowMiniCalendar;
    };
    CalendarComponent.prototype.createMomentFormat = function (date) {
        return moment(date.getFullYear().toString() + " " + date.getMonth().toString() + " " + date.getMonth().toString() + " ");
    };
    CalendarComponent.prototype.updateHeader = function () {
        this.calendarOptions.headerToolbar = {
            start: 'prev,next today myCustomButton',
            center: 'title',
            end: 'timeGridWeek,dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        };
    };
    CalendarComponent.prototype.updateEvents = function () {
        var nowDate = new Date();
        var yearMonth = nowDate.getUTCFullYear() + '-' + (nowDate.getUTCMonth() + 1);
        this.eventList.push({
            title: 'First',
            start: '2020-11-11T12:10:00',
            end: '2020-11-11T12:30:00'
        });
        this.eventList.push({
            title: 'Second',
            start: '2020-11-11T12:10:00',
            end: '2020-11-11T15:30:00'
        });
        this.calendarOptions.events = __spreadArrays(this.eventList);
    };
    CalendarComponent.prototype.getSelectDate = function (event) {
        this.calendarApi.gotoDate(this.formatter.format(event));
        this.toggleMiniCalendar();
    };
    CalendarComponent.prototype.getNextMount = function (event) {
        var date = event.next;
        date.day = '01';
        if (this.calendarApi) {
            this.calendarApi.gotoDate(this.formatter.format(date));
        }
    };
    __decorate([
        core_1.ViewChild('fullcalendar')
    ], CalendarComponent.prototype, "fullcalendar");
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'jhi-calendar',
            templateUrl: './calendar.component.html',
            styleUrls: ['./calendar.component.scss'],
            encapsulation: core_1.ViewEncapsulation.ShadowDom
        })
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
