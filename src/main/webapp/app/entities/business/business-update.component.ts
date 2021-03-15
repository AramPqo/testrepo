import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBusiness, Business } from 'app/shared/model/business.model';
import { BusinessService } from './business.service';
import { ICurrency } from 'app/shared/model/currency.model';
import { CurrencyService } from 'app/entities/currency/currency.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';

type SelectableEntity = ICurrency | ILocation;

@Component({
  selector: 'jhi-business-update',
  templateUrl: './business-update.component.html',
})
export class BusinessUpdateComponent implements OnInit {
  isSaving = false;
  currencies: ICurrency[] = [];
  locations: ILocation[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    email: [],
    phone: [],
    mobile: [],
    website: [],
    logo: [],
    emailFooter: [],
    vatNumber: [],
    bankName: [],
    iban: [],
    bic: [],
    showPatientName: [],
    currencyId: [],
    locationId: [],
    customColors: [],
    invoiceNumber: []
  });

  constructor(
    protected businessService: BusinessService,
    protected currencyService: CurrencyService,
    protected locationService: LocationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ business }) => {
      this.updateForm(business);

      this.currencyService
        .query({ filter: 'business-is-null' })
        .pipe(
          map((res: HttpResponse<ICurrency[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICurrency[]) => {
          if (!business.currencyId) {
            this.currencies = resBody;
          } else {
            this.currencyService
              .find(business.currencyId)
              .pipe(
                map((subRes: HttpResponse<ICurrency>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICurrency[]) => (this.currencies = concatRes));
          }
        });

      this.locationService
        .query({ filter: 'business-is-null' })
        .pipe(
          map((res: HttpResponse<ILocation[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ILocation[]) => {
          if (!business.locationId) {
            this.locations = resBody;
          } else {
            this.locationService
              .find(business.locationId)
              .pipe(
                map((subRes: HttpResponse<ILocation>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ILocation[]) => (this.locations = concatRes));
          }
        });
    });
  }

  updateForm(business: IBusiness): void {
    this.editForm.patchValue({
      id: business.id,
      name: business.name,
      description: business.description,
      email: business.email,
      phone: business.phone,
      mobile: business.mobile,
      website: business.website,
      logo: business.logo,
      emailFooter: business.emailFooter,
      vatNumber: business.vatNumber,
      bankName: business.bankName,
      iban: business.iban,
      bic: business.bic,
      showPatientName: business.showPatientName,
      currencyId: business.currencyId,
      locationId: business.locationId,
      customColors: business.customColors,
      invoiceNumber: business.invoiceNumber
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const business = this.createFromForm();
    if (business.id !== undefined) {
      this.subscribeToSaveResponse(this.businessService.update(business));
    } else {
      this.subscribeToSaveResponse(this.businessService.create(business));
    }
  }

  private createFromForm(): IBusiness {
    return {
      ...new Business(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      email: this.editForm.get(['email'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      mobile: this.editForm.get(['mobile'])!.value,
      website: this.editForm.get(['website'])!.value,
      logo: this.editForm.get(['logo'])!.value,
      emailFooter: this.editForm.get(['emailFooter'])!.value,
      vatNumber: this.editForm.get(['vatNumber'])!.value,
      bankName: this.editForm.get(['bankName'])!.value,
      iban: this.editForm.get(['iban'])!.value,
      bic: this.editForm.get(['bic'])!.value,
      showPatientName: this.editForm.get(['showPatientName'])!.value,
      currencyId: this.editForm.get(['currencyId'])!.value,
      locationId: this.editForm.get(['locationId'])!.value,
      customColors: this.editForm.get(['customColors'])!.value,
      invoiceNumber: this.editForm.get(['invoiceNumber'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBusiness>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
