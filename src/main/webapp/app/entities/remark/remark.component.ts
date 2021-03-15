import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRemark } from 'app/shared/model/remark.model';
import { RemarkService } from './remark.service';
import { RemarkDeleteDialogComponent } from './remark-delete-dialog.component';

@Component({
  selector: 'jhi-remark',
  templateUrl: './remark.component.html',
})
export class RemarkComponent implements OnInit, OnDestroy {
  remarks = [];
  eventSubscriber?: Subscription;

  tableHeaders = [
    { columnsValue: 'id', fieldName: 'ID', width: '15%', sortable: true },
    { columnsValue: 'createdAt', fieldName: 'Created At', width: '15%', sortable: true },
    { columnsValue: 'colorCode', fieldName: 'Color Code', width: '15%', sortable: true },
    { columnsValue: 'title', fieldName: 'Title', width: '15%', sortable: true },
    { columnsValue: 'content', fieldName: 'Content', width: '15%', sortable: true },
    { columnsValue: 'patientId', fieldName: 'patient', width: '15%', sortable: true, navigateUrl: 'patient' }
  ];

  constructor(protected remarkService: RemarkService, protected eventManager: JhiEventManager, protected modalService: NgbModal) { }

  loadAll(): void {
    this.remarkService
      .query()
      .subscribe(
        (res: HttpResponse<IRemark[]>) => this.paginateRemarks(res.body),
        (err) => console.log(err));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRemarks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRemark): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  protected paginateRemarks(data: IRemark[] | null): void {
    if (data) {
      this.remarks = [];
      for (let i = 0; i < data.length; i++) {
        this.remarks.push(data[i]);
      }
    }
  }

  getSelectedData(data: any) {
    const deletedIds = Object.keys(data);
    for (let i = 0; i < deletedIds.length; i++) {
      this.remarkService.delete(parseInt(deletedIds[i])).subscribe(
        (res) => {
          if ((i + 1) === deletedIds.length) {
            this.loadAll();
          }
        });
    }
  }

  registerChangeInRemarks(): void {
    this.eventSubscriber = this.eventManager.subscribe('remarkListModification', () => this.loadAll());
  }

  deleteRemark(remark: IRemark): void {
    const modalRef = this.modalService.open(RemarkDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.remark = remark;
  }
}
