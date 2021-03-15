import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICurrency } from 'app/shared/model/currency.model';
import { CurrencyService } from './currency.service';
import { CurrencyDeleteDialogComponent } from './currency-delete-dialog.component';

@Component({
  selector: 'jhi-currency',
  templateUrl: './currency.component.html',
})
export class CurrencyComponent implements OnInit, OnDestroy {
  currencies = [];
  eventSubscriber?: Subscription;

  tableHeaders = [
    { columnsValue: 'id', fieldName: 'ID', width: '25%', sortable: true },
    { columnsValue: 'name', fieldName: 'Name', width: '25%', sortable: true },
    { columnsValue: 'isoCode', fieldName: 'Iso Code', width: '25%', sortable: true },
    { columnsValue: 'symbol', fieldName: 'Symbol', width: '25%', sortable: true }
  ];

  constructor(protected currencyService: CurrencyService, protected eventManager: JhiEventManager, protected modalService: NgbModal) { }

  loadAll(): void {
    this.currencyService
      .query()
      .subscribe(
        (res: HttpResponse<ICurrency[]>) => this.paginateCurrencyICurrencyes(res.body),
        (err) => console.log(err));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCurrencies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICurrency): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  protected paginateCurrencyICurrencyes(data: ICurrency[] | null): void {
    if (data) {
      this.currencies = [];
      for (let i = 0; i < data.length; i++) {
        this.currencies.push(data[i]);
      }
    }
  }

  getSelectedData(data: any) {
    const deletedIds = Object.keys(data);
    for (let i = 0; i < deletedIds.length; i++) {
      this.currencyService.delete(parseInt(deletedIds[i])).subscribe(
        (res) => {
          if ((i + 1) === deletedIds.length) {
            this.loadAll();
          }
        });
    }
  }

  registerChangeInCurrencies(): void {
    this.eventSubscriber = this.eventManager.subscribe('currencyListModification', () => this.loadAll());
  }

  deleteCurrencies(currency: ICurrency): void {
    const modalRef = this.modalService.open(CurrencyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.currency = currency;
  }
}
