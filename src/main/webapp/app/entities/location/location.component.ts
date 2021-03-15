import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from './location.service';
import { LocationDeleteDialogComponent } from './location-delete-dialog.component';

@Component({
  selector: 'jhi-location',
  templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit, OnDestroy {
  locations = [];
  eventSubscriber?: Subscription;

  tableHeaders = [
    { columnsValue: 'id', fieldName: 'ID', width: '20%', sortable: true },
    { columnsValue: 'streetAddress', fieldName: 'Street Address', width: '20%', sortable: true },
    { columnsValue: 'city', fieldName: 'City', width: '20%', sortable: true },
    { columnsValue: 'state', fieldName: 'State', width: '20%', sortable: true },
    { columnsValue: 'countryId', fieldName: 'countryId', width: '20%', sortable: true, navigateUrl: 'country' },
  ];

  constructor(protected locationService: LocationService, protected eventManager: JhiEventManager, protected modalService: NgbModal) { }

  loadAll(): void {
    this.locationService.query()
      .subscribe(
        (res: HttpResponse<ILocation[]>) => this.paginateLocationes(res.body),
        (err) => console.log(err));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocation): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  protected paginateLocationes(data: ILocation[] | null): void {
    if (data) {
      this.locations = [];
      for (let i = 0; i < data.length; i++) {
        this.locations.push(data[i]);
      }
    }
  }

  getSelectedData(data: any) {
    const deletedIds = Object.keys(data);
    for (let i = 0; i < deletedIds.length; i++) {
      this.locationService.delete(parseInt(deletedIds[i])).subscribe(
        (res) => {
          if ((i + 1) === deletedIds.length) {
            this.loadAll();
          }
        });
    }
  }

  registerChangeInLocations(): void {
    this.eventSubscriber = this.eventManager.subscribe('locationListModification', () => this.loadAll());
  }

  deleteLocation(location: ILocation): void {
    const modalRef = this.modalService.open(LocationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.location = location;
  }
}
