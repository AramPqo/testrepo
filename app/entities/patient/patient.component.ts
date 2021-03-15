import { IAppointment } from 'app/shared/model/appointment.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPatient } from 'app/shared/model/patient.model';

import { PatientService } from './patient.service';
import { PatientDeleteDialogComponent } from './patient-delete-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'jhi-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit, OnDestroy {

  patients: IPatient[] = [];
  eventSubscriber?: Subscription;
  links: any;
  routeUrl: string = 'patients';
  resizableColData = { width: 'auto', index: null };
  appointments: IAppointment[];
  tableHeaders = [
    { columnsValue: 'fullName', fieldName: 'Name', width: '14%', sortable: true },
    { columnsValue: 'dateOfBirth', fieldName: 'Date Of Birth', width: '14%', sortable: true },
    { columnsValue: 'phone', fieldName: 'Phone Number', width: '14%', sortable: true },
    { columnsValue: 'nextAppointment', fieldName: 'Next Appointment', width: '14%', sortable: true }
  ];

  constructor(
    protected patientService: PatientService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks,
    private route: ActivatedRoute
  ) {
    this.patients = [];
    this.links = {
      last: 0,
    };
  }

  loadAll(): void {
    this.patientService
      .patientsWithAppointments()
      .subscribe(
        (res: HttpResponse<IPatient[]>) => this.paginatePatients(res.body, res.headers),
        (err) => console.log(err));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPatients();
  }

  getFilteredValue(patients: IPatient[]) {
    if (patients.length) {
      this.patients = patients;
    } else {
      this.loadAll();
    }
  }

  registerChangeInPatients(): void {
    this.eventSubscriber = this.eventManager.subscribe('patientListModification', () => this.loadAll());
  }

  deletePatient(patient: IPatient): void {
    const modalRef = this.modalService.open(PatientDeleteDialogComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.patient = patient;
  }

  getSelectedData(data: any) {
    const deletedIds = Object.keys(data);
    for (let i = 0; i < deletedIds.length; i++) {
      this.patientService.delete(parseInt(deletedIds[i])).subscribe(
        (res) => {
          if ((i + 1) === deletedIds.length) {
            this.loadAll();
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  createValidDate(value: string | moment.Moment, format: string) {
    return moment.isMoment(value) ? value.format(format) : moment(value).format(format);
  }

  protected paginatePatients(data: IPatient[] | null, headers: HttpHeaders): void {
    if (data) {
      this.patients = [];
      for (let i = 0; i < data.length; i++) {
        data[i].dateOfBirth ? data[i].dateOfBirth = this.createValidDate(data[i].dateOfBirth, 'MM.DD.YYYY') : '-';
        data[i]['nextAppointment'] = this.createValidDate(data[i].startDate as moment.Moment, 'MM.DD.YYYY HH:mm');
        this.patients.push(data[i]);
      }
    }
  }
}
