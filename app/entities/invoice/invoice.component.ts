import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceService } from './invoice.service';
import { IInvoice } from 'app/shared/model/invoice.model';
import { InvoiceDeleteDialogComponent } from './invoice-delete-dialog.component';

@Component({
  selector: 'jhi-invoice',
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent implements OnInit, OnDestroy {

  invoices: IInvoice[] = [];
  eventSubscriber?: Subscription;
  routeUrl: string = 'invoices';
  selectActions = [
    {
      label: 'Print All Selected', name: 'printAll', method: 'printSelected', disabled: true,
    },
    {
      label: 'Cancel', name: 'cancel', method: 'cancelSelected', disabled: true,
    }
  ];

  tableHeaders = [
    { columnsValue: 'invoiceNumber', fieldName: 'InvoiceNumber', width: '14%', sortable: true },
    { columnsValue: 'recipientName', fieldName: 'Recipient Name', width: '14%', sortable: true },
    { columnsValue: 'invoiceStatus', fieldName: 'Invoice Status', width: '14%', sortable: true },
    { columnsValue: 'paymentType', fieldName: 'Payment Type', width: '14%', sortable: true },
    { columnsValue: 'paymentStatus', fieldName: 'Payment Status', width: '14%', sortable: true },
    { columnsValue: 'invoiceTotal', fieldName: 'Invoice Total', width: '14%', sortable: true },
    { columnsValue: 'printIcon', isIcon: true, width: '14%', sortable: false }
  ];

  constructor(
    protected invoiceService: InvoiceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.invoices = [];
  }

  loadAll(): void {
    this.invoiceService
      .query()
      .subscribe(
        (res: HttpResponse<IInvoice[]>) => this.paginateInvoices(res.body, res.headers),
        (err) => console.log(err));
  }

  printSelected(rows) {
    const idList = Object.keys(rows).map(v => +v).filter((key) => rows[key]);
    idList.forEach((id) => {
      const invoice = this.invoices.find(i => i.id === id);
      invoice.invoiceStatus = 'IMMUTABLE';
      this.invoiceService
        .update(invoice)
        .subscribe((res) => {
          invoice['printIcon'].disabled = true;
        });
    });
  }

  cancelSelected(rows) {
    console.clear();

    console.log('cancel', rows);
  }

  ngOnInit(): void {
    const invoice = {
      invoiceNumber: '0011056',
      recipientName: 'Cress Shaun',
      invoiceStatus: 'DRAFT',
      paymentType: 'TRANSFER',
      paymentStatus: 'PAID',
      invoiceTotal: 78585,
      // businessId: 1,
      appointmentId: 1856,
      treatmentId: 1
    }

    this.invoiceService.create(invoice)
      .subscribe();
    this.loadAll();
    this.registerChangeInInvoices();
  }

  getFilteredValue(invoices: IInvoice[]) {
    if (invoices.length) {
      this.invoices = invoices;
    } else {
      this.loadAll();
    }
  }

  registerChangeInInvoices(): void {
    this.eventSubscriber = this.eventManager.subscribe('invoiceListModification', () => this.loadAll());
  }

  deleteInvoice(invoice: IInvoice): void {
    const modalRef = this.modalService.open(InvoiceDeleteDialogComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.invoice = invoice;
  }

  getSelectedData({ method, rows }) {
    // const deletedIds = Object.keys(data);
    // for (let i = 0; i < deletedIds.length; i++) {
    //   this.invoiceService
    //     .delete(parseInt(deletedIds[i])).subscribe(
    //       (res) => {
    //         if ((i + 1) === deletedIds.length) {
    //           this.loadAll();
    //         }
    //       });
    // }

    console.log(method);
    console.log(rows);
    this[method](rows);
  }

  getSelectedActions(rows: IInvoice | any) {
    const idList = Object.keys(rows).map(v => +v).filter((key) => rows[key]);
    let invoiceStatuses = [];
    for (let i = 0; i < idList.length; i++) {
      const id = +idList[i];
      const invoice = this.invoices.find(i => i.id === id);
      if (invoice) {
        invoiceStatuses.push(invoice.invoiceStatus);
      }
    }

    invoiceStatuses = invoiceStatuses.filter((v, i, arr) => arr.indexOf(v) === i);
    if (invoiceStatuses.length > 1) {
      this.selectActions[0].disabled = true;
      this.selectActions[1].disabled = true;
    } else if (invoiceStatuses[0].toUpperCase() === 'DRAFT') {
      this.selectActions[0].disabled = false;
      this.selectActions[1].disabled = true;
    } else {
      this.selectActions[0].disabled = true;
      this.selectActions[1].disabled = false;
    }
    this.selectActions = [...this.selectActions];

  }

  getAction(row: IInvoice) {
    row.invoiceStatus = 'IMMUTABLE';
    this.invoiceService.update(row)
      .subscribe(
        (res) => {
          this.invoices.find(v => v.id === row.id)['printIcon'].disabled = true;
        });
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  createValidInvoice(invoice) {
    invoice['printIcon'].disabled = true;
  }

  protected paginateInvoices(data: IInvoice[] | null, headers: HttpHeaders): void {
    if (data) {
      this.invoices = [];
      // data = [{
      //   id: 5,
      //   invoiceNumber: '0011056',
      //   recipientName: 'Cress Shaun',
      //   invoiceStatus: 'DRAFT',
      //   paymentType: 'TRANSFER',
      //   paymentStatus: 'PAID',
      //   invoiceTotal: 78585,
      //   businessId: 1,
      //   appointmentId: 1856,
      //   treatmentId: 1
      // }]
      for (let i = 0; i < data.length; i++) {
        data[i]['printIcon'] = {
          iconName: `print-icon`,
          disabled: !(data[i].invoiceStatus.toLocaleLowerCase() === 'draft')
        };
        data[i]['date'] = data[i].createdAt;
        this.invoices.push(data[i]);
      }
    }
  }
}
