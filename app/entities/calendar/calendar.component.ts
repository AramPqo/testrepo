import { ActivatedRoute } from '@angular/router';
import { PatientControlDialogComponent } from './../patient/patient-control-dialog/patient-control-dialog.component';
import { AppointmentService } from './../appointment/appointment.service';
import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, ElementRef, OnDestroy } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import * as moment from 'moment';
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormFields } from 'app/shared/util/form-fields';
import * as lodash from 'lodash';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TranslateService } from '@ngx-translate/core';
import { updateExp } from 'app/shared/util/translate-util';

@Component({
  selector: 'jhi-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('fullcalendar')
  fullcalendar!: FullCalendarComponent;
  @ViewChild('eventDetailIconContainer')
  eventDetailIconContainer!: ElementRef;
  @ViewChild('eventDetailContainer')
  eventDetailContainer!: ElementRef;

  activeModalRef: any;
  activeEvent: any;
  activeElement: any;
  isShowMiniCalendar!: boolean;
  date!: { year: number, month: number };
  model!: NgbDateStruct;
  appointments: any;
  patients: any[];
  users: any[];
  treatments: any[];
  calendarOptions!: CalendarOptions;
  calendarApi!: Calendar;
  eventsModel: any;
  isBlocked?: boolean;
  eventList = [];
  formFields = [];
  calendarDetails: any = {};
  options: any;
  isCalendarDetail: boolean;

  constructor(
    private calendar: NgbCalendar,
    private formatter: NgbDateParserFormatter,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.translate.onLangChange
      .subscribe(lang => this.getEventList());
    this.model = this.calendar.getToday();
    updateExp(FormFields.appointment, this.translate);
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      editable: true,
      initialView: 'timeGridWeek',
      scrollTime: '06:00',
      slotMinTime: '6:00',
      slotMaxTime: '22:00',
      displayEventTime: false,
      allDaySlot: false,
      events: [...this.eventList],
      dayHeaderFormat: { weekday: 'short', day: 'numeric' },
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
        left: 'todayBtn,calendarBtn',
        center: 'prev,title,next',
        right: 'timeGridDayCustom,timeGridThreeDay,timeGridSixDay,timeGridWeekCustom'
      },
      titleFormat: { month: 'long', year: 'numeric' },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this),
      eventMouseEnter: this.handeEventMouseEnter.bind(this),
      eventMouseLeave: this.handeEventeventMouseLeave.bind(this),
      datesSet: this.handleDateSet.bind(this),
      eventDrop: this.handleEventDrop.bind(this),
      eventResize: this.handleEventResize.bind(this)
    };
  }

  createFormFields() {
    const appointmentFormFields = lodash.cloneDeep(FormFields.appointment);
    const appointmentPatient = {
      key: 'patientId',
      type: 'medappointSearch',
      defaultValue: ' ',
      templateOptions: {
        keyCode: 'patientId',
        label: 'Patient',
        service: 'PatientService',
        displayName: 'firstName',
        fullName: ['firstName', 'lastName']
      }
    };

    const bockSchedule = [
      {
        key: 'cancelled',
        type: 'medappointButton',
        className: `blocker block-${!!this.isBlocked}`,
        defaultValue: null,
        templateOptions: {
          status: !this.isBlocked,
          keyCode: 'cancelled',
          label: 'Appointmnet',
          getEvent: () => {
            this.getBlockEvent(false);
          }
        }
      },
      {
        key: 'cancelled',
        type: 'medappointButton',
        className: `blocker block-${!this.isBlocked}`,
        defaultValue: null,
        templateOptions: {
          status: !!this.isBlocked,
          keyCode: 'cancelled',
          label: 'Blocker',
          getEvent: () => {
            this.getBlockEvent(true);
          }
        }
      }
    ];

    const appointmentEndTime = [
      {
        key: 'endDate',
        type: 'medappointDate',
        tskey: 'medappointApp.appointment.endDate',
        defaultValue: moment().startOf('day'),
        templateOptions: {
          keyCode: 'endDate',
          label: 'Day',
          isBlocked: this.isBlocked,
          title: 'To:'
        }
      },
      {
        key: 'timeTo',
        type: 'medappointTime',
        tskey: 'medappointApp.appointment.detail.timeTo',
        className: 'time-field-content time-to',
        defaultValue: '11:00',
        templateOptions: {
          keyCode: 'endDate',
          calendarKeyCode: 'end',
          label: 'Time To',
          isBlocked: this.isBlocked
        }
      }
    ];

    appointmentFormFields[0].className = 'calendar-start-date';
    if (this.isBlocked) {
      appointmentFormFields[0].templateOptions['title'] = 'From:';
      appointmentFormFields[0].templateOptions['isBlocked'] = this.isBlocked;
      this.formFields = [...bockSchedule, ...appointmentFormFields.slice(0, 2), ...appointmentEndTime, ...appointmentFormFields.slice(3, 5), ...appointmentFormFields.slice(6, 7)];
    } else {
      this.formFields = [...bockSchedule, ...appointmentFormFields.slice(0, 4), appointmentPatient, ...appointmentFormFields.slice(4, 8)];
    }
  }

  getBlockEvent(block: boolean) {
    this.isBlocked = block;
    this.createFormFields();
    const id = parseInt(this.activeEvent.id);
    if (id) {
      this.activeModalRef.componentInstance.fields = this.getFormFields(this.activeEvent, id);
    } else {
      this.activeModalRef.componentInstance.fields = this.getFormFields(this.activeEvent);
    }

  }

  ngAfterViewInit() {
    this.calendarApi = this.fullcalendar.getApi();
  }

  getTranslatedText(preffix: string) {
    return this.translate.instant(preffix);
  }


  handeEventMouseEnter(calendarEvent: any) {
    this.eventDetailIconContainer.nativeElement.classList.remove('d-none');
    calendarEvent.el.appendChild(this.eventDetailIconContainer.nativeElement);
    if (calendarEvent.event.backgroundColor !== 'undefined') {
      this.eventDetailIconContainer.nativeElement.style.backgroundColor = calendarEvent.event.backgroundColor;
    } else {
      this.eventDetailIconContainer.nativeElement.style.backgroundColor = '#3788d8';
    }
    this.eventDetailIconContainer.nativeElement.style.display = 'block';
    this.activeEvent = calendarEvent.event;
  }

  removeDetail() {
    this.eventDetailContainer.nativeElement.classList.add('d-none');
  }

  getEventDetails() {
    this.eventDetailIconContainer?.nativeElement.appendChild(this.eventDetailContainer.nativeElement);
    this.eventDetailContainer.nativeElement.classList.remove('d-none');
    const appointment = this.appointments.find(v => v.id === parseInt(this.activeEvent.id));
    if (appointment) {
      this.calendarDetails = {
        patient: `${this.getFindElement(this.patients, appointment.patientId).firstName} ${this.getFindElement(this.patients, appointment.patientId).lastName}`,
        user: `${this.getFindElement(this.users, appointment.userId).firstName} ${this.getFindElement(this.users, appointment.userId).lastName}`,
        treatment: this.getFindElement(this.treatments, appointment.treatmentId).description,
        title: appointment.title
      };
    }
  }

  updateEvent() {
    this.openPatientControlModal();
  }

  handeEventeventMouseLeave(calendarEvent: any) {
    this.eventDetailIconContainer.nativeElement.classList.add('d-none');
    calendarEvent.el.removeChild(this.eventDetailIconContainer.nativeElement);
    this.removeDetail();
  }

  getFindElement(list, id) {
    const element = list.find(v => v.id === id);
    return element ? element : {};
  }

  getEventList(options?) {
    this.route.data.subscribe(({ userList, patientList, treatmentList }) => {
      this.eventList = [];
      this.appointmentService
        .query(options)
        .subscribe((res) => {
          this.appointments = res.body;
          for (let i = 0; i < this.appointments.length; i++) {
            const startDate = this.appointments[i].startDate.format('YYYY-MM-DDTHH:mm:ss');
            const endDate = this.appointments[i].endDate.format('YYYY-MM-DDTHH:mm:ss');
            this.patients = patientList;
            this.users = userList;
            this.treatments = treatmentList;
            const patient = patientList.filter((v) => v.id === this.appointments[i].patientId)[0];
            this.eventList.push({
              classNames: [`${this.getEventColor(userList.find(v => v.id === this.appointments[i].userId)?.colorCode)}-color`],
              // title: `${patient?.firstName ? patient?.firstName : '-'} ${patient?.lastName ? patient?.lastName : '-'}`,
              start: startDate,
              end: endDate,
              startDate: startDate,
              backgroundColor: userList.find(v => v.id === this.appointments[i].userId)?.colorCode,
              id: this.appointments[i].id
            });
          }
          this.calendarOptions.events = [...this.eventList];

          this.calendarOptions.views = {
            timeGridThreeDay: {
              type: 'timeGrid',
              duration: { days: 3 },
              buttonText: `3 ${this.getTranslatedText('medappointApp.calendar.header.days')}`
            },
            timeGridSixDay: {
              type: 'timeGrid',
              duration: { days: 6 },
              buttonText: `6 ${this.getTranslatedText('medappointApp.calendar.header.days')}`
            },
            timeGridWeekCustom: {
              type: 'timeGridWeek',
              buttonText: `${this.getTranslatedText('medappointApp.calendar.header.week')}`
            },
            timeGridDayCustom: {
              type: 'timeGridDay',
              buttonText: `${this.getTranslatedText('medappointApp.calendar.header.day')}`
            }
          }

          this.calendarOptions.customButtons = {
            calendarBtn: {
              text: '',
              click: () => {
                this.toggleMiniCalendar();
              }
            },
            todayBtn: {
              text: this.getTranslatedText('medappointApp.calendar.header.today'),
              click: () => {
                this.goToDay();
              }
            }
          }
          this.calendarOptions.locale = this.translate.currentLang;
        });
    });

  }

  getEventColor(hexcolor): any {
    if (!hexcolor) {
      return;
    }

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

  getDateFormat(date: any): string {
    return `${date.year}-${date.month}-${date.day}`;
  }

  handleDateClick(calendarEvent: any) {
    const event = {
      start: calendarEvent.date,
      startDate: moment(moment(calendarEvent.date).toISOString())
    }
    this.openPatientControlModal(event);
  }

  handleEventClick(calendarEvent: any) {
    // this.openPatientControlModal(calendarEvent.event);
    // XXX
  }

  handleDateSet(arg: any) {
    this.options = { fromDate: moment(arg.start).format('YYYY-MM-DD'), toDate: moment(arg.end).format('YYYY-MM-DD') };
    this.getEventList(this.options);
  }

  handleEventDragStop(calendarEvent: any) {
  }

  handleEventResize(calendarEvent: any) {
    const id = parseInt(calendarEvent.event.id);
    const appointemnt = lodash.clone(this.appointments.filter(v => v.id === id))[0];
    appointemnt.startDate = moment(calendarEvent.event.start);
    appointemnt.endDate = moment(calendarEvent.event.end);
    this.openPatientControlModal(calendarEvent.event, appointemnt);
  }

  handleEventDrop(calendarEvent: any) {
    const id = parseInt(calendarEvent.event.id);
    const appointemnt = lodash.clone(this.appointments.filter(v => v.id === id))[0];
    appointemnt.startDate = moment(calendarEvent.event.start);
    appointemnt.endDate = moment(calendarEvent.event.end);
    this.openPatientControlModal(calendarEvent.event, appointemnt);
  }

  openPatientControlModal(event?, appointemnt?: any) {
    if (event) {
      this.activeEvent = event;
    }

    const appointment = appointemnt ? appointemnt : this.appointments.find(v => v.id === parseInt(this.activeEvent.id));
    this.activeModalRef = this.modalService.open(PatientControlDialogComponent, { backdrop: true, backdropClass: 'calendar-backdrop', windowClass: 'calendar-control-dialog' });
    this.activeModalRef.componentInstance.title = 'global.menu.entities.appointment';
    this.activeModalRef.componentInstance.isDelete = true;
    if (appointment) {
      const id = parseInt(this.activeEvent.id);
      if (id) {
        this.getBlockEvent(!!appointment.cancelled);
        updateExp(FormFields.appointment, this.translate);
        this.activeModalRef.componentInstance.fields = this.getFormFields(this.activeEvent, id);
        this.activeModalRef.componentInstance.id = id;
        this.activeModalRef.componentInstance.updateEmit
          .subscribe(
            (result) => {
              if (!result) {
                this.getEventList();
                return;
              }
              result.id = id;
              result.cancelled = this.getCancelledAppointment();
              if (this.isBlocked) {
                this.createBlockSchedule(result);
              } else {
                result.startDate = moment(new Date(`${result.startDate.format('MM/DD/YYYY')} ${result.timeFrom}`), DATE_TIME_FORMAT);
                result.endDate = moment(new Date(`${result.startDate.format('MM/DD/YYYY')} ${result.timeTo}`), DATE_TIME_FORMAT);
                delete result.timeFrom;
                delete result.timeTo;
                this.appointmentService.update(result)
                  .subscribe(
                    (res) => {
                      this.getEventList();
                    });
              }
            });
      } else {
        this.getBlockEvent(false);
        this.activeModalRef.componentInstance.fields = this.getFormFields(event);
        this.activeModalRef.componentInstance.updateEmit
          .subscribe(
            (result) => {
              if (!result) {
                this.getEventList();
                return;
              }

              if (this.isBlocked) {
                this.createBlockSchedule(result);
              } else {
                result.startDate = moment(new Date(`${result.startDate.format('MM/DD/YYYY')} ${result.timeFrom}`), DATE_TIME_FORMAT);
                result.endDate = moment(new Date(`${result.startDate.format('MM/DD/YYYY')} ${result.timeTo}`), DATE_TIME_FORMAT);
                delete result.timeFrom;
                delete result.timeTo;
                result.cancelled = this.getCancelledAppointment();

                this.appointmentService.create(result)
                  .subscribe((res) => {
                    this.getEventList();
                  });
              }
            });
      }
    } else {
      if (!event.end) {
        event.end = new Date(event.start.getTime() + 1800000);
      }
      this.getBlockEvent(false);
      this.activeModalRef.componentInstance.fields = this.getFormFields(event);
      this.activeModalRef.componentInstance.updateEmit
        .subscribe(
          (result) => {
            if (!result) {
              this.getEventList();
              return;
            }

            if (this.isBlocked) {
              this.createBlockSchedule(result);
            } else {
              result.startDate = moment(new Date(`${result.startDate.format('MM/DD/YYYY')} ${result.timeFrom}`), DATE_TIME_FORMAT);
              result.endDate = moment(new Date(`${result.startDate.format('MM/DD/YYYY')} ${result.timeTo}`), DATE_TIME_FORMAT);
              result.cancelled = this.getCancelledAppointment();

              delete result.timeFrom
              delete result.timeTo
              this.appointmentService.create(result)
                .subscribe((res) => {
                  this.getEventList();
                });
            }
          });
    }
  }


  createBlockSchedule(result) {
    result.endDate = moment(new Date(`${result.endDate.format('MM/DD/YYYY')} ${result.timeTo}`), DATE_TIME_FORMAT);
    this.appointments.forEach(
      (appointment) => {
        if (result.startDate.diff(appointment.endDate, 'time') <= 0 && result.endDate.diff(appointment.endDate, 'time') >= 0) {
          appointment.cancelled = true;
          this.appointmentService.update(appointment)
            .subscribe(
              (res) => {
                this.getEventList();
              });
        }
      });
    if (!result.id) {
      result.startDate = moment(new Date(`${result.startDate.format('MM/DD/YYYY')} ${result.timeFrom}`), DATE_TIME_FORMAT);
      result.endDate = moment(new Date(`${result.startDate.format('MM/DD/YYYY')} ${result.timeTo}`), DATE_TIME_FORMAT);
      delete result.timeFrom;
      delete result.timeTo;
      result.cancelled = this.getCancelledAppointment();

      this.appointmentService.create(result)
        .subscribe((res) => {
          this.getEventList();
        });
    }
  }

  getFormFields(event, id?) {
    const result = lodash.cloneDeep(this.formFields);
    if (id) {
      const control = this.appointments.filter(v => v.id === id)[0];
      for (let i = 0; i < this.formFields.length; i++) {
        if (event[this.formFields[i].templateOptions.calendarKeyCode]) {
          result[i].defaultValue = moment(event[this.formFields[i].templateOptions.calendarKeyCode], 'YYYY-MM-DDTHH:mm');
        } else if (control[this.formFields[i].templateOptions.keyCode]) {
          result[i].defaultValue = control[this.formFields[i].templateOptions.keyCode];
        }
      }
    } else {
      for (let i = 0; i < this.formFields.length; i++) {
        if (event[this.formFields[i].templateOptions.calendarKeyCode]) {
          result[i].defaultValue = moment(event[this.formFields[i].templateOptions.calendarKeyCode], 'YYYY-MM-DDTHH:mm');
        }
        if (event[this.formFields[i].templateOptions.keyCode]) {
          result[i].defaultValue = event[this.formFields[i].templateOptions.keyCode];
        }
      }
    }
    return result;
  }

  getCancelledAppointment() {
    return this.formFields.slice(0, 2).find(v => v.templateOptions.label === 'Blocker').templateOptions.status;
  }

  toggleMiniCalendar() {
    this.isShowMiniCalendar = !this.isShowMiniCalendar;
  }

  goToDay() {
    this.calendarApi.gotoDate(moment(Date.now()).format('YYYY-MM-DD'));
  }

  createMomentFormat(date) {
    return moment(`${date.getFullYear().toString()} ${date.getMonth().toString()} ${date.getMonth().toString()} `)
  }

  updateHeader() {
    this.calendarOptions.headerToolbar = {
      start: 'prev,next Today myCustomButton',
      center: 'title',
      end: 'timeGridWeek,dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    };
  }

  getSelectDate(event: any) {
    this.calendarApi.gotoDate(this.formatter.format(event));
    this.toggleMiniCalendar();
  }

  getNextMount(event: any) {
    const date = event.next;
    date.day = '01';
    if (this.calendarApi) {
      this.calendarApi.gotoDate(this.formatter.format(date));
    }
  }

  ngOnDestroy() {
    this.modalService.dismissAll();
  }

}
