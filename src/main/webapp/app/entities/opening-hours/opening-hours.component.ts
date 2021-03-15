import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOpeningHours } from 'app/shared/model/opening-hours.model';
import { OpeningHoursService } from './opening-hours.service';
import { OpeningHoursDeleteDialogComponent } from './opening-hours-delete-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'jhi-opening-hours',
  templateUrl: './opening-hours.component.html',
})
export class OpeningHoursComponent implements OnInit, OnDestroy {
  openingHours = [];
  eventSubscriber?: Subscription;

  tableHeaders = [
    { columnsValue: 'id', fieldName: 'ID', width: '10%', sortable: true },
    { columnsValue: 'dayOfWeek', fieldName: 'Day Of Week', width: '20%', sortable: true },
    { columnsValue: 'startTime', fieldName: 'Start Time', width: '25%', sortable: true },
    { columnsValue: 'endTime', fieldName: 'End Time', width: '25%', sortable: true }
  ];

  constructor(
    protected openingHoursService: OpeningHoursService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) { }

  loadAll(): void {
    this.openingHoursService
      .query()
      .subscribe(
        (res: HttpResponse<IOpeningHours[]>) => this.paginateOpeningHourses(res.body),
        (err) => console.log(err));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOpeningHours();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOpeningHours): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  protected paginateOpeningHourses(data: IOpeningHours[] | null): void {
    if (data) {
      this.openingHours = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].startTime || data[i].endTime)
          this.openingHours.push(data[i]);
      }
    }
  }

  getSelectedData(data: any) {
    const deletedIds = Object.keys(data);
    for (let i = 0; i < deletedIds.length; i++) {
      this.openingHoursService.delete(parseInt(deletedIds[i])).subscribe(
        (res) => {
          if ((i + 1) === deletedIds.length) {
            this.loadAll();
          }
        });
    }
  }

  registerChangeInOpeningHours(): void {
    this.eventSubscriber = this.eventManager.subscribe('openingHoursListModification', () => this.loadAll());
  }

  deleteOpeningHours(openingHours: IOpeningHours): void {
    const modalRef = this.modalService.open(OpeningHoursDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.openingHours = openingHours;
  }
}
