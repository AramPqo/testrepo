import { RemarkService } from 'app/entities/remark/remark.service';
import { Component, OnInit, Injector, ElementRef, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormFields } from './../../shared/util/form-fields';
import { UserService } from 'app/core/user/user.service';
import { IAppointment } from 'app/shared/model/appointment.model';
import { ICountry } from 'app/shared/model/country.model';
import { IRemark } from './../../shared/model/remark.model';
import { AppointmentService } from 'app/entities/appointment/appointment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import * as lodash from 'lodash';
import * as uuid from 'uuid';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IPatient, Patient } from 'app/shared/model/patient.model';
import { PatientService } from './patient.service';
import { Location } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { IInsurer } from 'app/shared/model/insurer.model';
import { InsurerService } from 'app/entities/insurer/insurer.service';
import { CountryService } from '../country/country.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientControlDialogComponent } from './patient-control-dialog/patient-control-dialog.component';
import { IUser } from 'app/core/user/user.model';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import { IInvoice } from 'app/shared/model/invoice.model';
import { TranslateService } from '@ngx-translate/core';
import { updateExp } from 'app/shared/util/translate-util';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';

@Component({
  selector: 'jhi-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['patient-update.component.scss'],
  animations: [
    trigger("collectionAnimation", [
      state("in", style({ top: 0 })),
      transition(":enter", [style({ top: -45, 'z-index': 0 }), animate(0)]),
      transition(":leave", animate(400, style({ top: -45, 'z-index': 0 })))
    ])
  ]
})
export class PatientUpdateComponent implements OnInit {

  @ViewChild('modalContainer') modalContainer: ElementRef;

  isSaving = false;
  isFormValid = false;
  location = new Location;
  insurers: IInsurer[] = [];
  remarks: IRemark[] = [];
  appointments: IAppointment[] = [];
  appointmentList: IAppointment[] = [];
  countries: ICountry[] = [];
  locationForm!: any;
  avatarName!: string;
  patientControls!: any[];
  selectedItem: number;
  isOpenModal: boolean;
  users: any;
  invoices: IInvoice[] = [];
  gender = Object.keys(Gender);
  paymentType = Object.keys(PaymentType);

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    title: [],
    gender: [null, [Validators.required]],
    dateOfBirth: [],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required, Validators.pattern(/^[0-9 ()+-]+$/)]],
    mobile: [null, [Validators.required, Validators.pattern(/^[0-9 ()+-]+$/)]],
    language: [],
    insuranceNumber: [],
    occupation: [],
    employer: [],
    initialDiagnose: [],
    locationId: [],
    insurerId: [],
    workPhone: [],
    bluePrescription: [],
    paymentType: [],
    yearlyReceipt: [],
    location: this.fb.group({
      id: [],
      streetAddress: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, []],
      countryId: [null, [Validators.required]]
    })
  });

  dropdownsForm = {
    country: 'Country',
    insurer: 'Insurer',
    gender: 'Gender',
    paymentType: 'Payment Type'
  }

  constructor(
    protected patientService: PatientService,
    protected locationService: LocationService,
    protected insurerService: InsurerService,
    protected countryService: CountryService,
    private injector: Injector,
    private userService: UserService,
    private appointmentService: AppointmentService,
    private remarkService: RemarkService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.locationForm = this.editForm.get('location');
    this.activatedRoute.data.subscribe(({ patient, insurers, remarks, countries, appointments, users, invoices }) => {

      if (!patient.id) {
        const today = moment().startOf('day');
        patient.dateOfBirth = today;
      } else {
        this.remarks = remarks.filter((remark: IRemark) => remark.patientId === patient.id);
        this.appointments = appointments.filter((appointment: IAppointment) => appointment.patientId === patient.id);
        this.invoices = invoices.filter((invoice: IInvoice) => invoice.patientId === patient.id);
      }

      this.appointmentList = appointments;
      this.countries = countries;
      this.insurers = insurers;
      this.users = users;
      this.getPatientControl();
      this.updateForm(patient);
      this.getDropdownsForm(patient, countries, insurers);
    });
  }

  getPatientControl() {
    this.patientControls = [
      {
        code: 'remark',
        title: 'global.menu.entities.remark',
        controlName: 'remarks',
        isShowTime: false,
        service: 'RemarkService',
        control: this.getPatientControls(this.remarks, 'createdAt', 'content'),
        fields: FormFields.remark
      },
      {
        code: 'appointment',
        title: 'global.menu.entities.appointment',
        controlName: 'appointments',
        isShowTime: true,
        service: 'AppointmentService',
        control: this.getPatientControls(this.appointments, 'startDate', 'title', this.users),
        fields: FormFields.appointment
      },
      {
        code: 'invoice',
        title: 'global.menu.entities.invoice',
        controlName: 'invoices',
        isShowTime: false,
        service: 'InvoiceService',
        control: this.getPatientControls(
          this.invoices, 'createdAt', [
          { name: 'appointmentId', dependence: 'appointmentList' },
          { name: 'paymentType' },
          { name: 'paymentStatus' },
          { name: 'invoiceTotal', symbol: '€' }
        ]), fields: FormFields.invoice
      }
    ];
  }

  getPatientControls(data: any[], dateName: string, contentData: any, users?: IUser[]): any {
    if (data) {
      let control = Array(data.length).fill(null).map(Object);
      for (let i = 0; i < data.length; i++) {
        if (users) {
          const user = users.filter(v => v.id === data[i].userId)[0];
          const userName = user ? user.firstName[0] + user.lastName[1] : '';
          control[i].userName = userName;
        }
        control[i].id = data[i].id;
        control[i].date = data[i][dateName];
        if (Array.isArray(contentData)) {
          control[i].content = Array(contentData.length);
          for (let j = 0; j < contentData.length; j++) {
            if (contentData[j].dependence) {
              control[i].content[j] = this.createControlView(this[contentData[j].dependence]
                .find(v => v.id === data[i][contentData[j].name])).id;
            } else if (contentData[j].symbol) {
              control[i].content[j] = this.createControlView(`${data[i][contentData[j].name]} ${contentData[j].symbol}`);
            } else {
              control[i].content[j] = this.createControlView(data[i][contentData[j].name]);
            }
          }
        } else {
          control[i].content = data[i][contentData];
        }
      }
      return control;
    }
  }

  createControlView(value) {
    return value ? value : '-';
  }

  getFormFields(name, id, fields) {
    const control = this[name].filter(v => v.id === id)[0];
    const result = lodash.cloneDeep(fields);
    for (let i = 0; i < fields.length; i++) {
      if (control[fields[i].templateOptions.keyCode]) {
        result[i].defaultValue = control[fields[i].templateOptions.keyCode];
      }
    }
    return result;
  }

  getDropdownsForm(patient, countries, insurers) {
    this.dropdownsForm = {
      country: countries.find(v => v.id === patient.location?.countryId)?.name,
      insurer: insurers.find(v => v.id === patient.insurerId)?.name,
      gender: patient.gender,
      paymentType: patient.paymentType
    }
  }

  setPatientItem(item, dropdownLabel, elem, isDeep?) {
    this.dropdownsForm[dropdownLabel] = item[elem];
    if (isDeep) {
      this.editForm.get('location').get(`${dropdownLabel}Id`).patchValue(item.id);
    } else {
      this.editForm.get(`${dropdownLabel}Id`).patchValue(item.id);
    }
  }

  setGender(gender) {
    this.editForm.get('gender').patchValue(gender);
    this.dropdownsForm.gender = gender;
  }

  setPaymentType(paymentType) {
    this.editForm.get('paymentType').patchValue(paymentType);
    this.dropdownsForm.paymentType = paymentType;
  }

  checkIsArrayView(value) {
    return Array.isArray(value) ? true : false;
  }

  updateForm(patient: IPatient): void {
    this.editForm.patchValue({
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      title: patient.title,
      gender: patient.gender,
      dateOfBirth: patient.dateOfBirth ? patient.dateOfBirth.format(DATE_TIME_FORMAT) : null,
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
      workPhone: patient.workPhone,
      bluePrescription: patient.bluePrescription,
      paymentType: patient.paymentType,
      yearlyReceipt: patient.yearlyReceipt,
      location: {
        id: patient.location?.id,
        city: patient.location?.city,
        countryId: patient.location?.countryId,
        postalCode: patient.location?.postalCode,
        state: patient.location?.state,
        streetAddress: patient.location?.state
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const patient = this.createFromForm();
    if (patient.id !== undefined) {
      this.subscribeToSaveResponse(this.patientService.update(patient));
    } else {
      this.subscribeToSaveResponse(this.patientService.create(patient));
    }
  }

  updateControl(patientControl: any, index, controlId?: any) {
    this.isOpenModal = true;
    const modalRef = this.modalService.open(
      PatientControlDialogComponent,
      { backdrop: false, windowClass: 'patient-control-dialog', container: this.modalContainer.nativeElement }
    );
    modalRef.componentInstance.title = patientControl.title;

    updateExp(FormFields[patientControl.code.toLowerCase()], this.translate);
    if (controlId) {
      modalRef.componentInstance.id = controlId;
      modalRef.componentInstance.fields = this.getFormFields(patientControl.controlName, controlId, patientControl.fields);
    } else {
      modalRef.componentInstance.fields = patientControl.fields;
    }

    modalRef.componentInstance.updateEmit
      .subscribe(
        (result) => {
          if (result) {
            result.patientId = this.editForm.get(['id'])!.value;
            if (patientControl.controlName === 'appointments') {
              this.createAppointmentControl(result, index, controlId);
            } else {
              if (controlId) {
                result.id = controlId;
                result.isUpdated = true;
                const mergedControl = { ...this[patientControl.controlName].find(v => v.id === controlId), ...result };
                this[patientControl.controlName] = [...this[patientControl.controlName].filter(v => v.id !== controlId), mergedControl];
                let content = this[patientControl.controlName].find(v => v.id === controlId);
                if (patientControl.controlName === 'invoices') {
                  this.createInvoiceControl(content, result);
                  const invoice = lodash.cloneDeep(content);
                  invoice.invoiceTotal = invoice.invoiceTotal ? parseInt(invoice.invoiceTotal) : 0;
                  this.invoices = [...this.invoices.filter(v => v.id !== invoice.id), invoice];
                  content = { id: controlId, date: content.createdAt, content: [content.appointmentId, content.paymentType, content.paymentStatus, content.invoiceTotal] };
                } else {
                  this.remarks = [...this.remarks.filter(v => v.id !== result.id), result];
                }
                this.patientControls[index].control = [...this.patientControls[index].control.filter(v => v.id !== controlId), content];
              } else {
                result.id = `created-${uuid.v4()}`;
                result.date = moment().startOf('day');
                if (patientControl.controlName === 'invoices') {
                  this.createInvoiceControl(null, result);
                  this[patientControl.controlName].push(result);
                  const control = { id: result.id, date: result.createdAt, content: [result.appointmentId, result.paymentType, result.paymentStatus, result.invoiceTotal] }
                  this.patientControls[index].control.push(control);
                } else {
                  this[patientControl.controlName].push(result);
                  this.patientControls[index].control.push(result);
                }

              }
            }
          }
        });

    modalRef.result.then(() => { }, () => { this.isOpenModal = false })
  }

  createInvoiceControl(content, result) {
    if (!content) {
      result.paymentStatus = 'PENDING';
      result.createdAt = moment().startOf('day');;
      result.invoiceTotal += '€';
      result.invoiceItems = result.invoiceId;
      delete result.invoiceId;
      if (result.invoiceItems?.length) {
        result.invoiceItems?.forEach(v => {
          if (typeof v.id === 'string') {
            v.invoiceId = this.createFromForm().id;
            v.id = null;
          }
        });
      }
    } else {
      content.invoiceItems = content.invoiceId;
      content.paymentStatus = 'PENDING';
      content.createdAt = moment().startOf('day');;
      content.invoiceTotal += '€';
      delete content.invoiceId;
      if (content.invoiceItems?.length) {
        content.invoiceItems.forEach(v => {
          if (typeof v.id === 'string') {
            v.invoiceId = result.id;
            v.id = null;
          }
        });
      }
    }
  }


  createAppointmentControl(result, index: number, controlId?: any) {
    let startDate = moment(new Date(`${result.startDate.format('MM/DD/YYYY')} ${result.timeFrom}`), DATE_TIME_FORMAT);
    let endDate = moment(new Date(`${result.startDate.format('MM/DD/YYYY')} ${result.timeTo}`), DATE_TIME_FORMAT);
    const appointment = {
      startDate,
      endDate,
      title: result.title,
      // colorCode: result.colorCode,
      notes: result.notes,
      treatmentId: result.treatmentId,
      userId: result.userId,
      patientId: result.patientId
    };

    if (controlId) {
      appointment['isUpdated'] = true;
      appointment['id'] = controlId;
      const mergedAppointment = { ...this.appointments.find(v => v.id === appointment['id']), ...appointment };
      this.appointments = [...this.appointments.filter(v => v.id !== appointment['id']), mergedAppointment];
      const control = this.getPatientControls(this.appointments, 'startDate', 'title', this.users).filter(v => v.id === appointment['id']);
      this.patientControls[index].control = [...this.patientControls[index].control.filter(v => v.id !== controlId), ...control];
    } else {
      appointment['id'] = `created-${uuid.v4()}`;
      this.appointments.push(appointment);
      this.patientControls[index].control = this.getPatientControls(this.appointments, 'startDate', 'title', this.users);
    }
  }

  getStopPropagation(event) {
    event.stopPropagation();
  }

  removeControl(patientControl: any, index, id: any) {
    if (!this.isCreated(id)) {
      const service = this.injector.get(patientControl.service);
      service.delete(id).subscribe(
        (res) => {
          this.patientControls[index].control = this.patientControls[index].control.filter(v => v.id !== id);
        });
    } else {
      this.patientControls[index].control = this.patientControls[index].control.filter(v => v.id !== id);
      this[patientControl.controlName] = this[patientControl.controlName].filter(v => v.id !== id);
    }
  }

  isCreated(id): boolean {
    return typeof id === 'string' && id.slice(0, 7) === 'created' ? true : false;
  }

  private createFromForm(): IPatient {
    return {
      ...new Patient(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      title: this.editForm.get(['title'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      dateOfBirth: this.editForm.get(['dateOfBirth'])!.value
        ? moment(this.editForm.get(['dateOfBirth'])!.value, DATE_TIME_FORMAT)
        : undefined,
      email: this.editForm.get(['email'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      mobile: this.editForm.get(['mobile'])!.value,
      language: this.editForm.get(['language'])!.value,
      insuranceNumber: this.editForm.get(['insuranceNumber'])!.value,
      occupation: this.editForm.get(['occupation'])!.value,
      employer: this.editForm.get(['employer'])!.value,
      initialDiagnose: this.editForm.get(['initialDiagnose'])!.value,
      locationId: this.editForm.get(['locationId'])!.value,
      insurerId: this.editForm.get(['insurerId'])!.value,
      workPhone: this.editForm.get(['workPhone'])!.value,
      bluePrescription: this.editForm.get(['bluePrescription'])!.value,
      paymentType: this.editForm.get(['paymentType'])!.value,
      yearlyReceipt: this.editForm.get(['yearlyReceipt'])!.value,
      location: {
        id: this.editForm.get(['location'])!.value?.id,
        city: this.editForm.get(['location'])!.value?.city,
        countryId: this.editForm.get(['location'])!.value?.countryId,
        postalCode: this.editForm.get(['location'])!.value?.postalCode,
        state: this.editForm.get(['location'])!.value?.state,
        streetAddress: this.editForm.get(['location'])!.value?.state
      }
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatient>>): void {
    result.subscribe(
      (res) => {
        this.saveControls('RemarkService', 'remarks', res.body.id);
        this.saveControls('AppointmentService', 'appointments', res.body.id);
        this.saveControls('InvoiceService', 'invoices', res.body.id);
      },
      () => this.onSaveError(),
      () => this.onSaveSuccess()
    );
  }

  saveControls(serviceName, data, id?) {
    const service = this.injector.get(serviceName);
    if (this[data]) {
      const toCreate = this[data].filter(v => this.isCreated(v.id));
      const toUpdate = this[data].filter(v => v.isUpdated);
      if (toCreate.length) {
        for (let i = 0; i < toCreate.length; i++) {
          delete toCreate[i].id;
          if (id) {
            toCreate[i].patientId = id;
          }
          service.create(toCreate[i]).subscribe((res) => {
            console.log(res);
          });
        }
      }
      if (toUpdate.length) {
        for (let i = 0; i < toUpdate.length; i++) {
          delete toUpdate[i].isUpdated;
          service.update(toUpdate[i])
            .subscribe((res) => {
              console.log(res);
            });
        }
      }
    }

  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: any): any {
    return item.id;
  }
}

