import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppointment } from 'app/shared/model/appointment.model';
import { AppointmentService } from './appointment.service';
import { AppointmentDeleteDialogComponent } from './appointment-delete-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'jhi-appointment',
  templateUrl: './appointment.component.html',
})
export class AppointmentComponent implements OnInit, OnDestroy {
  appointments = [];
  eventSubscriber?: Subscription;

  tableHeaders = [
    { columnsValue: 'id', fieldName: 'ID', width: '14%', sortable: true },
    { columnsValue: 'startDate', fieldName: 'Start Date', width: '14%', sortable: true },
    { columnsValue: 'endDate', fieldName: 'End Date', width: '14%', sortable: true },
    { columnsValue: 'title', fieldName: 'Title', width: '14%', sortable: true },
    { columnsValue: 'cancelled', fieldName: 'Cancelled', width: '14%', sortable: true },
    { columnsValue: 'colorCode', fieldName: 'Color Code', width: '14%', sortable: true },
    { columnsValue: 'missed', fieldName: 'Missed', width: '14%', sortable: true },
    { columnsValue: 'notes', fieldName: 'Notes', width: '14%', sortable: true },
    { columnsValue: 'userId', fieldName: 'User', width: '14%', sortable: true },
    { columnsValue: 'patientId', fieldName: 'Patient', width: '14%', sortable: true, navigateUrl: 'patient' },
    { columnsValue: 'treatmentId', fieldName: 'Treatment', width: '14%', sortable: true, navigateUrl: 'treatment' }
  ];

  constructor(
    protected appointmentService: AppointmentService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) { }

  loadAll(): void {
    this.appointmentService
      .query()
      .subscribe(
        (res: HttpResponse<IAppointment[]>) => this.paginateAppointments(res.body),
        (err) => console.log(err));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAppointments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAppointment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  protected paginateAppointments(data: IAppointment[] | null): void {
    if (data) {
      this.appointments = [];
      for (let i = 0; i < data.length; i++) {
        data[i].startDate ? data[i].startDate = this.createValidDate(data[i].startDate as moment.Moment, 'DD.MM.YYYY') : '-';
        data[i].endDate ? data[i].endDate = this.createValidDate(data[i].endDate as moment.Moment, 'DD.MM.YYYY') : '-';
        this.appointments.push(data[i]);
      }

    }
  }

  createValidDate(value: string | moment.Moment, format: string) {
    return moment.isMoment(value) ? value.format(format) : moment(value).format(format);
  }

  getSelectedData(data: any) {
    const deletedIds = Object.keys(data);
    for (let i = 0; i < deletedIds.length; i++) {
      this.appointmentService.delete(parseInt(deletedIds[i])).subscribe(
        (res) => {
          if ((i + 1) === deletedIds.length) {
            this.loadAll();
          }
        });
    }
  }

  registerChangeInAppointments(): void {
    this.eventSubscriber = this.eventManager.subscribe('appointmentListModification', () => this.loadAll());
  }

  deleteAppointment(appointment: IAppointment): void {
    const modalRef = this.modalService.open(AppointmentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.appointment = appointment;
  }
}
