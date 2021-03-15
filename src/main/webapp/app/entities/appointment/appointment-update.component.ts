import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAppointment, Appointment } from 'app/shared/model/appointment.model';
import { AppointmentService } from './appointment.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';
import { ITreatment } from 'app/shared/model/treatment.model';
import { TreatmentService } from 'app/entities/treatment/treatment.service';

type SelectableEntity = IUser | IPatient | ITreatment;

@Component({
  selector: 'jhi-appointment-update',
  templateUrl: './appointment-update.component.html',
})
export class AppointmentUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  patients: IPatient[] = [];
  treatments: ITreatment[] = [];

  editForm = this.fb.group({
    id: [],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    title: [null, [Validators.required]],
    cancelled: [],
    colorCode: [null, [Validators.required]],
    missed: [],
    notes: [null, [Validators.required]],
    userId: [null, [Validators.required]],
    patientId: [null, [Validators.required]],
    treatmentId: [],
  });

  constructor(
    protected appointmentService: AppointmentService,
    protected userService: UserService,
    protected patientService: PatientService,
    protected treatmentService: TreatmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appointment }) => {
      if (!appointment.id) {
        const today = moment().startOf('day');
        appointment.startDate = today;
        appointment.endDate = today;
      }

      this.updateForm(appointment);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.patientService.query().subscribe((res: HttpResponse<IPatient[]>) => (this.patients = res.body || []));

      this.treatmentService.query().subscribe((res: HttpResponse<ITreatment[]>) => (this.treatments = res.body || []));
    });
  }

  updateForm(appointment: IAppointment): void {
    this.editForm.patchValue({
      id: appointment.id,
      startDate: appointment.startDate ? (appointment.startDate as moment.Moment).format(DATE_TIME_FORMAT) : null,
      endDate: appointment.endDate ? (appointment.endDate as moment.Moment).format(DATE_TIME_FORMAT) : null,
      title: appointment.title,
      cancelled: appointment.cancelled,
      colorCode: appointment.colorCode,
      missed: appointment.missed,
      notes: appointment.notes,
      userId: appointment.userId,
      patientId: appointment.patientId,
      treatmentId: appointment.treatmentId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appointment = this.createFromForm();
    if (appointment.id !== undefined) {
      this.subscribeToSaveResponse(this.appointmentService.update(appointment));
    } else {
      this.subscribeToSaveResponse(this.appointmentService.create(appointment));
    }
  }

  private createFromForm(): IAppointment {
    return {
      ...new Appointment(),
      id: this.editForm.get(['id'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      title: this.editForm.get(['title'])!.value,
      cancelled: this.editForm.get(['cancelled'])!.value,
      colorCode: this.editForm.get(['colorCode'])!.value,
      missed: this.editForm.get(['missed'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      patientId: this.editForm.get(['patientId'])!.value,
      treatmentId: this.editForm.get(['treatmentId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppointment>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
