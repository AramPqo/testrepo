import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExpense } from 'app/shared/model/expense.model';
import { ExpenseService } from './expense.service';
import { ExpenseDeleteDialogComponent } from './expense-delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { IBusiness } from 'app/shared/model/business.model';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'jhi-expense',
  templateUrl: './expense.component.html',
})
export class ExpenseComponent implements OnInit, OnDestroy {
  expenses = [];
  eventSubscriber?: Subscription;
  selectActions = [
    { label: 'Print All Selected', name: 'printAll', method: this.printAll(), disabled: true }
  ];

  business: IBusiness[];
  tableHeaders = [
    { columnsValue: 'business', fieldName: 'Business', width: '14%', sortable: true },
    { columnsValue: 'date', fieldName: 'Date', width: '14%', sortable: true },
    { columnsValue: 'accountNumber', fieldName: 'Account Number', width: '14%', sortable: true },
    { columnsValue: 'voucherNumber', fieldName: 'Voucher Number', width: '14%', sortable: true },
    { columnsValue: 'name', fieldName: 'Name', width: '14%', sortable: true },
    { columnsValue: 'subject', fieldName: 'Subject', width: '14%', sortable: true },
    { columnsValue: 'total', fieldName: 'Total', width: '14%', sortable: true },
    { columnsValue: 'printIcon', isIcon: true, width: '14%', sortable: false }
  ];

  constructor(
    protected expenseService: ExpenseService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  loadAll(): void {
    this.expenseService
      .query()
      .subscribe(
        (res: HttpResponse<IExpense[]>) => this.paginateExpense(res.body),
        (err) => console.log(err));
  }

  ngOnInit(): void {
    this.route.data.pipe(
      tap(({ business }) => {
        this.business = business;
      })
    ).subscribe(() => this.loadAll());
    this.registerChangeInExpenses();
  }

  createValidDate(value: string | moment.Moment, format: string) {
    return moment.isMoment(value) ? value.format(format) : moment(value).format(format);
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  printAll() {

  }

  getSelectedData(data: any) {
    const deletedIds = Object.keys(data);
    for (let i = 0; i < deletedIds.length; i++) {
      this.expenseService.delete(parseInt(deletedIds[i])).subscribe(
        (res) => {
          if ((i + 1) === deletedIds.length) {
            this.loadAll();
          }
        });
    }
  }

  deleteExpense(business: IExpense): void {
    const modalRef = this.modalService.open(ExpenseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.business = business;
  }

  protected paginateExpense(data: IExpense[] | null): void {


    if (data) {
      this.expenses = [];
      for (let i = 0; i < data.length; i++) {
        data[i].date ? data[i].date = this.createValidDate(data[i].date, 'MM.DD.YYYY') : '-';
        data[i]['business'] = this.business.find(v => v.id === data[i].businessId)?.name ? this.business.find(v => v.id === data[i].businessId)?.name : '-';
        data[i]['printIcon'] = {
          iconName: `print-icon`,
          disabled: true
        };
        this.expenses.push(data[i]);
      }
    }
  }

  trackId(index: number, item: IExpense): number {
    return item.id!;
  }

  registerChangeInExpenses(): void {
    this.eventSubscriber = this.eventManager.subscribe('expenseListModification', () => this.loadAll());
  }

  delete(expense: IExpense): void {
    const modalRef = this.modalService.open(ExpenseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.expense = expense;
  }
}
