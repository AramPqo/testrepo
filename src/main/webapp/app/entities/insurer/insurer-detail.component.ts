import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInsurer } from 'app/shared/model/insurer.model';

@Component({
  selector: 'jhi-insurer-detail',
  templateUrl: './insurer-detail.component.html',
})
export class InsurerDetailComponent implements OnInit {
  insurer: IInsurer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ insurer }) => (this.insurer = insurer));
  }

  previousState(): void {
    window.history.back();
  }
}
