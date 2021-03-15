import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOpeningHours } from 'app/shared/model/opening-hours.model';

@Component({
  selector: 'jhi-opening-hours-detail',
  templateUrl: './opening-hours-detail.component.html',
})
export class OpeningHoursDetailComponent implements OnInit {
  openingHours: IOpeningHours | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ openingHours }) => (this.openingHours = openingHours));
  }

  previousState(): void {
    window.history.back();
  }
}
