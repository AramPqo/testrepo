import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServiceItem } from 'app/shared/model/service-item.model';
import { ServiceItemService } from './service-item.service';
import { ServiceItemDeleteDialogComponent } from './service-item-delete-dialog.component';

@Component({
  selector: 'jhi-service-item',
  templateUrl: './service-item.component.html',
})
export class ServiceItemComponent implements OnInit, OnDestroy {
  serviceItems: IServiceItem[] = [];
  eventSubscriber?: Subscription;
  tableHeaders = [
    { columnsValue: 'id', fieldName: 'ID', width: '14%', sortable: true },
    { columnsValue: 'description', fieldName: 'Description', width: '14%', sortable: true },
    { columnsValue: 'price', fieldName: 'Price', width: '14%', sortable: true },
    { columnsValue: 'vatRate', fieldName: 'Vat Rate', width: '14%', sortable: true }
  ];

  constructor(
    protected serviceItemService: ServiceItemService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) { }

  loadAll(): void {
    this.serviceItemService
      .query()
      .subscribe(
        (res: HttpResponse<IServiceItem[]>) => this.paginateServiceItems(res.body, res.headers),
        (err) => console.log(err));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServiceItems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  protected paginateServiceItems(data: IServiceItem[] | null, headers: HttpHeaders): void {
    if (data) {
      this.serviceItems = [];
      for (let i = 0; i < data.length; i++) {
        this.serviceItems.push(data[i]);
      }
    }
  }

  trackId(index: number, item: IServiceItem): number {
    return item.id! as number;
  }

  registerChangeInServiceItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('serviceItemListModification', () => this.loadAll());
  }

  deleteServiceItem(serviceItem: IServiceItem): void {
    const modalRef = this.modalService.open(ServiceItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.serviceItem = serviceItem;
  }

  getSelectedData(data: any) {
    const deletedIds = Object.keys(data);
    for (let i = 0; i < deletedIds.length; i++) {
      this.serviceItemService.delete(parseInt(deletedIds[i])).subscribe(
        (res) => {
          if ((i + 1) === deletedIds.length) {
            this.loadAll();
          }
        });
    }
  }

}
