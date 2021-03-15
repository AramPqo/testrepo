import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServiceItem } from 'app/shared/model/service-item.model';

@Component({
  selector: 'jhi-service-item-detail',
  templateUrl: './service-item-detail.component.html',
})
export class ServiceItemDetailComponent implements OnInit {
  serviceItem: IServiceItem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceItem }) => (this.serviceItem = serviceItem));
  }

  previousState(): void {
    window.history.back();
  }
}
