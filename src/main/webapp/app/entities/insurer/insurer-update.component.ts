import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInsurer, Insurer } from 'app/shared/model/insurer.model';
import { InsurerService } from './insurer.service';

@Component({
  selector: 'jhi-insurer-update',
  templateUrl: './insurer-update.component.html',
})
export class InsurerUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    abbr: [],
  });

  constructor(protected insurerService: InsurerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ insurer }) => {
      this.updateForm(insurer);
    });
  }

  updateForm(insurer: IInsurer): void {
    this.editForm.patchValue({
      id: insurer.id,
      name: insurer.name,
      abbr: insurer.abbr,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const insurer = this.createFromForm();
    if (insurer.id !== undefined) {
      this.subscribeToSaveResponse(this.insurerService.update(insurer));
    } else {
      this.subscribeToSaveResponse(this.insurerService.create(insurer));
    }
  }

  private createFromForm(): IInsurer {
    return {
      ...new Insurer(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      abbr: this.editForm.get(['abbr'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInsurer>>): void {
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
}
