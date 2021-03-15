import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRemark, Remark } from 'app/shared/model/remark.model';
import { RemarkService } from './remark.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';

@Component({
  selector: 'jhi-remark-update',
  templateUrl: './remark-update.component.html',
})
export class RemarkUpdateComponent implements OnInit {
  isSaving = false;
  patients: IPatient[] = [];

  editForm = this.fb.group({
    id: [],
    createdAt: [],
    colorCode: [],
    title: [],
    content: [],
    patientId: [],
  });

  constructor(
    protected remarkService: RemarkService,
    protected patientService: PatientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ remark }) => {
      if (!remark.id) {
        const today = moment().startOf('day');
        remark.createdAt = today;
      }

      this.updateForm(remark);

      this.patientService.query().subscribe((res: HttpResponse<IPatient[]>) => (this.patients = res.body || []));
    });
  }

  updateForm(remark: IRemark): void {
    this.editForm.patchValue({
      id: remark.id,
      createdAt: remark.createdAt ? (remark.createdAt as moment.Moment).format(DATE_TIME_FORMAT) : null,
      colorCode: remark.colorCode,
      title: remark.title,
      content: remark.content,
      patientId: remark.patientId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const remark = this.createFromForm();
    if (remark.id !== undefined) {
      this.subscribeToSaveResponse(this.remarkService.update(remark));
    } else {
      this.subscribeToSaveResponse(this.remarkService.create(remark));
    }
  }

  private createFromForm(): IRemark {
    return {
      ...new Remark(),
      id: this.editForm.get(['id'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? moment(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      colorCode: this.editForm.get(['colorCode'])!.value,
      title: this.editForm.get(['title'])!.value,
      content: this.editForm.get(['content'])!.value,
      patientId: this.editForm.get(['patientId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRemark>>): void {
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

  trackById(index: number, item: IPatient): any {
    return item.id;
  }
}
