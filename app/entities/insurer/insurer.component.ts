import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInsurer } from 'app/shared/model/insurer.model';
import { InsurerService } from './insurer.service';
import { InsurerDeleteDialogComponent } from './insurer-delete-dialog.component';

@Component({
  selector: 'jhi-insurer',
  templateUrl: './insurer.component.html',
})
export class InsurerComponent implements OnInit, OnDestroy {
  insurers = [];
  eventSubscriber?: Subscription;

  tableHeaders = [
    { columnsValue: 'id', fieldName: 'ID', width: '25%', sortable: true },
    { columnsValue: 'name', fieldName: 'Name', width: '25%', sortable: true },
    { columnsValue: 'abbr', fieldName: 'Abbr', width: '25%', sortable: true }
  ];

  constructor(protected insurerService: InsurerService, protected eventManager: JhiEventManager, protected modalService: NgbModal) { }

  loadAll(): void {
    this.insurerService
      .query()
      .subscribe(
        (res: HttpResponse<IInsurer[]>) => this.paginateInsurer(res.body),
        (err) => console.log(err));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInsurers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  getSelectedData(data: any) {
    const deletedIds = Object.keys(data);
    for (let i = 0; i < deletedIds.length; i++) {
      this.insurerService.delete(parseInt(deletedIds[i])).subscribe(
        (res) => {
          if ((i + 1) === deletedIds.length) {
            this.loadAll();
          }
        });
    }
  }

  deleteInsurer(business: IInsurer): void {
    const modalRef = this.modalService.open(InsurerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.business = business;
  }

  protected paginateInsurer(data: IInsurer[] | null): void {
    if (data) {
      this.insurers = [];
      for (let i = 0; i < data.length; i++) {
        this.insurers.push(data[i]);
      }
    }
  }

  trackId(index: number, item: IInsurer): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInsurers(): void {
    this.eventSubscriber = this.eventManager.subscribe('insurerListModification', () => this.loadAll());
  }

  delete(insurer: IInsurer): void {
    const modalRef = this.modalService.open(InsurerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.insurer = insurer;
  }
}
