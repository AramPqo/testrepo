import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from './country.service';
import { CountryDeleteDialogComponent } from './country-delete-dialog.component';

@Component({
  selector: 'jhi-country',
  templateUrl: './country.component.html',
})
export class CountryComponent implements OnInit, OnDestroy {
  countries = [];
  eventSubscriber?: Subscription;

  tableHeaders = [
    { columnsValue: 'id', fieldName: 'ID', width: '50%', sortable: true },
    { columnsValue: 'name', fieldName: 'Name', width: '50%', sortable: true },
  ];

  constructor(
    protected countryService: CountryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) { }

  loadAll(): void {
    this.countryService
      .query()
      .subscribe(
        (res: HttpResponse<ICountry[]>) => this.paginateCountryes(res.body),
        (err) => console.log(err));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCountries();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICountry): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  protected paginateCountryes(data: ICountry[] | null): void {
    if (data) {
      this.countries = [];
      for (let i = 0; i < data.length; i++) {
        this.countries.push(data[i]);
      }
    }
  }

  getSelectedData(data: any) {
    const deletedIds = Object.keys(data);
    for (let i = 0; i < deletedIds.length; i++) {
      this.countryService.delete(parseInt(deletedIds[i])).subscribe(
        (res) => {
          if ((i + 1) === deletedIds.length) {
            this.loadAll();
          }
        });
    }
  }

  registerChangeInCountries(): void {
    this.eventSubscriber = this.eventManager.subscribe('countryListModification', () => this.loadAll());
  }

  deleteCountry(country: ICountry): void {
    const modalRef = this.modalService.open(CountryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.country = country;
  }
}
