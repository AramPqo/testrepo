import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IServiceItem, ServiceItem } from 'app/shared/model/service-item.model';
import { ServiceItemService } from './service-item.service';
import { IInvoice } from 'app/shared/model/invoice.model';

@Component({
  selector: 'jhi-service-item-update',
  templateUrl: './service-item-update.component.html',
})
export class ServiceItemUpdateComponent implements OnInit {
  isSaving = false;
  invoices: IInvoice[];

  editForm = this.fb.group({
    id: [],
    description: [],
    price: [],
    vatRate: [],
  });

  constructor(private serviceItemService: ServiceItemService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceItem, invoices, appointments }) => {
      this.invoices = invoices;
      this.updateForm(serviceItem);
    });
  }

  updateForm(serviceItem: IServiceItem): void {
    this.editForm.patchValue({
      id: serviceItem.id,
      description: serviceItem.description,
      price: serviceItem.price,
      vatRate: serviceItem.vatRate,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serviceItem = this.createFromForm();
    if (serviceItem.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceItemService.update(serviceItem));
    } else {
      this.subscribeToSaveResponse(this.serviceItemService.create(serviceItem));
    }
  }

  private createFromForm(): IServiceItem {
    return {
      ...new ServiceItem(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      price: this.editForm.get(['price'])!.value,
      vatRate: this.editForm.get(['vatRate'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceItem>>): void {
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
