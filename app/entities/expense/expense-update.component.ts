import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IExpense, Expense } from 'app/shared/model/expense.model';
import { ExpenseService } from './expense.service';
import { IBusiness } from 'app/shared/model/business.model';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

@Component({
  selector: 'jhi-expense-update',
  templateUrl: './expense-update.component.html',
})
export class ExpenseUpdateComponent implements OnInit {
  isSaving = false;
  selectedItem;
  business: IBusiness[];

  editForm = this.fb.group({
    id: [],
    businessId: [],
    date: [],
    accountNumber: [],
    voucherNumber: [],
    name: [],
    subject: [],
    total: [],
  });

  constructor(protected expenseService: ExpenseService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ expense, business }) => {
      this.business = business;
      this.updateForm(expense);
      this.getDropdownsForm(expense, business);
    });
  }

  updateForm(expense: IExpense): void {
    this.editForm.patchValue({
      id: expense.id,
      businessId: expense.businessId,
      date: expense.date ? expense.date.format(DATE_FORMAT) : null,
      accountNumber: expense.accountNumber,
      voucherNumber: expense.voucherNumber,
      name: expense.name,
      subject: expense.subject,
      total: expense.total
    });
  }

  previousState(): void {
    window.history.back();
    console.clear();
  }

  dropdownsForm = {
    business: 'Businnes',
  };

  setExpenseItem(item, dropdownLabel, elem) {
    this.dropdownsForm[dropdownLabel] = item[elem];
    this.editForm.get(`${dropdownLabel}Id`).patchValue(item.id);
  }

  save(): void {
    this.isSaving = true;
    const expense = this.createFromForm();
    if (expense.id !== undefined) {
      this.subscribeToSaveResponse(this.expenseService.update(expense));
    } else {
      this.subscribeToSaveResponse(this.expenseService.create(expense));
    }
  }

  private createFromForm(): IExpense {
    return {
      ...new Expense(),
      id: this.editForm.get('id')!.value,
      businessId: this.editForm.get('businessId')!.value,
      date: this.editForm.get(['date'])!.value
        ? moment(this.editForm.get(['date'])!.value, DATE_FORMAT)
        : undefined,
      accountNumber: this.editForm.get('accountNumber')!.value,
      voucherNumber: this.editForm.get('voucherNumber')!.value,
      name: this.editForm.get('name')!.value,
      subject: this.editForm.get('subject')!.value,
      total: this.editForm.get('total')!.value
    };
  }

  getDropdownsForm(expense, business) {
    this.dropdownsForm = {
      business: business.find(v => v.id === expense.businessId)?.name
    }
  }


  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpense>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
