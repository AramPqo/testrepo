import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOpeningHours, OpeningHours } from 'app/shared/model/opening-hours.model';
import { OpeningHoursService } from './opening-hours.service';
import { IBusiness } from 'app/shared/model/business.model';
import { BusinessService } from 'app/entities/business/business.service';

@Component({
  selector: 'jhi-opening-hours-update',
  templateUrl: './opening-hours-update.component.html',
})
export class OpeningHoursUpdateComponent implements OnInit {
  isSaving = false;
  businesses: IBusiness[] = [];

  editForm = this.fb.group({
    id: [],
    dayOfWeek: [],
    startTime: [],
    endTime: [],
    businessId: [],
  });

  constructor(
    protected openingHoursService: OpeningHoursService,
    protected businessService: BusinessService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ openingHours }) => {
      this.updateForm(openingHours);

      this.businessService.query().subscribe((res: HttpResponse<IBusiness[]>) => (this.businesses = res.body || []));
    });
  }

  updateForm(openingHours: IOpeningHours): void {
    this.editForm.patchValue({
      id: openingHours.id,
      dayOfWeek: openingHours.dayOfWeek,
      startTime: openingHours.startTime,
      endTime: openingHours.endTime,
      businessId: openingHours.businessId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const openingHours = this.createFromForm();
    if (openingHours.id !== undefined) {
      this.subscribeToSaveResponse(this.openingHoursService.update(openingHours));
    } else {
      this.subscribeToSaveResponse(this.openingHoursService.create(openingHours));
    }
  }

  private createFromForm(): IOpeningHours {
    return {
      ...new OpeningHours(),
      id: this.editForm.get(['id'])!.value,
      dayOfWeek: this.editForm.get(['dayOfWeek'])!.value,
      startTime: this.editForm.get(['startTime'])!.value,
      endTime: this.editForm.get(['endTime'])!.value,
      businessId: this.editForm.get(['businessId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOpeningHours>>): void {
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

  trackById(index: number, item: IBusiness): any {
    return item.id;
  }
}
