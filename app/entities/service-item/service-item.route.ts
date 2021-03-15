import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IServiceItem, ServiceItem } from 'app/shared/model/service-item.model';
import { ServiceItemService } from './service-item.service';
import { ServiceItemComponent } from './service-item.component';
import { ServiceItemDetailComponent } from './service-item-detail.component';
import { ServiceItemUpdateComponent } from './service-item-update.component';
import { IInvoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from '../invoice/invoice.service';

@Injectable({ providedIn: 'root' })
export class ServiceItemResolve implements Resolve<IServiceItem> {
  constructor(private service: ServiceItemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServiceItem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((serviceItem: HttpResponse<ServiceItem>) => {
          if (serviceItem.body) {
            return of(serviceItem.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ServiceItem());
  }
}

@Injectable({ providedIn: 'root' })
class InvoiceResolve implements Resolve<IInvoice[] | null> {
  constructor(private service: InvoiceService) { }
  resolve() {
    return this.service.query().pipe(map((treatments: HttpResponse<IInvoice[]>) => treatments.body));
  }
}
export const serviceItemRoute: Routes = [
  {
    path: '',
    component: ServiceItemComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.serviceItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ServiceItemDetailComponent,
    resolve: {
      serviceItem: ServiceItemResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.serviceItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ServiceItemUpdateComponent,
    resolve: {
      serviceItem: ServiceItemResolve,
      invoices: InvoiceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.serviceItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ServiceItemUpdateComponent,
    resolve: {
      serviceItem: ServiceItemResolve,
      invoices: InvoiceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.serviceItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
