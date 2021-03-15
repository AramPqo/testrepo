import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITreatment, Treatment } from 'app/shared/model/treatment.model';

import { TreatmentService } from './treatment.service';
import { TreatmentDeleteDialogComponent } from './treatment-delete-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-treatment',
  templateUrl: './treatment.component.html',
})
export class TreatmentComponent implements OnInit {

  treatments: ITreatment[] = [];
  formFields = [
    {
      key: 'description',
      type: 'input',
      tskey: 'medappointApp.remark.content',
      defaultValue: '',
      templateOptions: {
        keyCode: 'description',
        required: true,
        label: 'description'
      }
    },
    {
      key: 'duration',
      type: 'input',
      tskey: 'medappointApp.remark.content',
      defaultValue: '',
      templateOptions: {
        keyCode: 'duration',
        required: true,
        type: 'number',
        label: 'duration'
      }
    }];

  tableHeaders = [
    { columnsValue: 'id', fieldName: 'ID', width: '50%', sortable: true },
    { columnsValue: 'description', fieldName: 'Description', width: '50%', sortable: true }
  ];

  columnPercentages: string[] = [];

  constructor(
    protected treatmentService: TreatmentService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) { }

  loadAll(): void {
    this.treatmentService
      .query()
      .subscribe(
        (res: HttpResponse<ITreatment[]>) => this.paginateTreatments(res.body, res.headers),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITreatment): number {
    return item.id!;
  }

  deleteTreatment(treatment: ITreatment): void {
    const modalRef = this.modalService.open(TreatmentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.treatment = treatment;
  }

  getSelectedData(data: any) {
    const deletedIds = Object.keys(data);
    for (let i = 0; i < deletedIds.length; i++) {
      this.treatmentService.delete(parseInt(deletedIds[i])).subscribe(
        (res) => {
          if ((i + 1) === deletedIds.length) {
            this.loadAll();
          }
        });
    }
  }

  updateTreatment(treatment) {
    if (treatment.id !== undefined) {
      this.subscribeToSaveResponse(this.treatmentService.update(treatment));
    } else {
      this.subscribeToSaveResponse(this.treatmentService.create(treatment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITreatment>>): void {
    result.subscribe(
      (treatment) => this.onSaveSuccess(treatment),
      () => this.onError()
    );
  }

  onSaveSuccess(treatment) {
    this.loadAll();
  }

  protected paginateTreatments(data: ITreatment[] | null, headers: HttpHeaders): void {
    if (data) {
      this.treatments = [];
      for (let i = 0; i < data.length; i++) {
        this.treatments.push(data[i]);
      }
    }
  }

  protected onError(): void {
    console.log('Error');
  }
}
