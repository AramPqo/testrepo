import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITreatment, Treatment } from 'app/shared/model/treatment.model';
import { TreatmentService } from './treatment.service';
import { IBusiness } from 'app/shared/model/business.model';
import { BusinessService } from 'app/entities/business/business.service';

@Component({
  selector: 'jhi-treatment-update',
  templateUrl: './treatment-update.component.html',
})
export class TreatmentUpdateComponent implements OnInit {
  isSaving = false;
  businesses: IBusiness[] = [];

  editForm = this.fb.group({
    id: [],
    description: [],
    duration: [],
    colorCode: [],
  });

  constructor(
    protected treatmentService: TreatmentService,
    protected businessService: BusinessService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ treatment }) => {
      this.updateForm(treatment);
      this.businessService.query().subscribe((res: HttpResponse<IBusiness[]>) => (this.businesses = res.body || []));
    });
  }

  updateForm(treatment: ITreatment): void {
    this.editForm.patchValue({
      id: treatment.id,
      description: treatment.description,
      duration: treatment.duration,
      colorCode: treatment.colorCode,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const treatment = this.createFromForm();
    if (treatment.id !== undefined) {
      this.subscribeToSaveResponse(this.treatmentService.update(treatment));
    } else {
      this.subscribeToSaveResponse(this.treatmentService.create(treatment));
    }
  }

  private createFromForm(): ITreatment {
    return {
      ...new Treatment(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      duration: this.editForm.get(['duration'])!.value,
      colorCode: this.editForm.get(['colorCode'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITreatment>>): void {
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
