import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBusiness } from 'app/shared/model/business.model';
import { BusinessService } from './business.service';
import { BusinessDeleteDialogComponent } from './business-delete-dialog.component';

@Component({
  selector: 'jhi-business',
  templateUrl: './business.component.html',
})
export class BusinessComponent implements OnInit, OnDestroy {

  businesses = [];
  eventSubscriber?: Subscription;

  formFields = [
    {
      className: "section-label",
      template: "<h1>V OChered!</h1>"
    },
    {
      fieldGroupClassName: "row",
      fieldGroup: [
        {
          key: "name",
          type: "input",
          className: "col-lg-6",
          templateOptions: {
            label: "Name",
            required: true
          }
        },
        {
          key: "surname",
          type: "input",
          className: "col-lg-6",
          templateOptions: {
            label: "Surname",
            required: true
          }
        }
      ]
    },
    {
      key: "investments",
      type: "datatable",
      templateOptions: {
        columns: [
          { name: "Name of Investment", prop: "investmentName" },
          { name: "Date of Investment", prop: "investmentDate" },
          { name: "Stock Identifier", prop: "stockIdentifier" }
        ]
      },
      fieldArray: {
        fieldGroup: [
          {
            type: "input",
            key: "investmentName",
            templateOptions: {
              required: true
            }
          },
          {
            type: "input",
            key: "investmentDate",
            templateOptions: {
              type: "date"
            }
          },
          {
            type: "input",
            key: "stockIdentifier",
            templateOptions: {
              label: "Stock Identifier:"
            }
          }
        ]
      }
    }
  ];

  tableHeaders = [
    { columnsValue: 'id', fieldName: 'ID', width: '4%', sortable: true },
    { columnsValue: 'name', fieldName: 'Name', width: '10%', sortable: true },
    { columnsValue: 'description', fieldName: 'Description', width: '7%', sortable: true },
    { columnsValue: 'email', fieldName: 'Email', width: '7%', sortable: true },
    { columnsValue: 'phone', fieldName: 'Phone', width: '7%', sortable: true },
    { columnsValue: 'mobile', fieldName: 'Mobile', width: '7%', sortable: true },
    { columnsValue: 'website', fieldName: 'Website', width: '7%', sortable: true },
    { columnsValue: 'logo', fieldName: 'Logo', width: '7%', sortable: true },
    { columnsValue: 'emailFooter', fieldName: 'Email Footer', width: '7%', sortable: true },
    { columnsValue: 'vatNumber', fieldName: 'Vat Number', width: '7%', sortable: true },
    { columnsValue: 'bankName', fieldName: 'Bank Name', width: '7%', sortable: true },
    { columnsValue: 'iban', fieldName: 'iban', width: '7%', sortable: true },
    { columnsValue: 'currencyId', fieldName: 'Currency', width: '7%', sortable: true, navigateUrl: 'currency' },
    { columnsValue: 'locationId', fieldName: 'Location', width: '7%', sortable: true, navigateUrl: 'location' }
  ];

  constructor(
    protected businessService: BusinessService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) { }

  loadAll(): void {
    this.businessService
      .query()
      .subscribe(
        (res: HttpResponse<IBusiness[]>) => this.paginateBusinesses(res.body),
        (err) => console.log(err));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBusinesses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBusiness): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  protected paginateBusinesses(data: IBusiness[] | null): void {
    if (data) {
      this.businesses = [];
      for (let i = 0; i < data.length; i++) {
        this.businesses.push(data[i]);
      }
    }
  }

  getSelectedData(data: any) {
    const deletedIds = Object.keys(data);
    for (let i = 0; i < deletedIds.length; i++) {
      this.businessService.delete(parseInt(deletedIds[i])).subscribe(
        (res) => {
          if ((i + 1) === deletedIds.length) {
            this.loadAll();
          }
        });
    }
  }

  registerChangeInBusinesses(): void {
    this.eventSubscriber = this.eventManager.subscribe('businessListModification', () => this.loadAll());
  }

  deleteBuissnes(business: IBusiness): void {
    const modalRef = this.modalService.open(BusinessDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.business = business;
  }
}
