import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOpeningHours, OpeningHours } from 'app/shared/model/opening-hours.model';
import { OpeningHoursService } from './opening-hours.service';
import { OpeningHoursComponent } from './opening-hours.component';
import { OpeningHoursDetailComponent } from './opening-hours-detail.component';
import { OpeningHoursUpdateComponent } from './opening-hours-update.component';

@Injectable({ providedIn: 'root' })
export class OpeningHoursResolve implements Resolve<IOpeningHours> {
  constructor(private service: OpeningHoursService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOpeningHours> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((openingHours: HttpResponse<OpeningHours>) => {
          if (openingHours.body) {
            return of(openingHours.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OpeningHours());
  }
}

export const openingHoursRoute: Routes = [
  {
    path: '',
    component: OpeningHoursComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.openingHours.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OpeningHoursDetailComponent,
    resolve: {
      openingHours: OpeningHoursResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.openingHours.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OpeningHoursUpdateComponent,
    resolve: {
      openingHours: OpeningHoursResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.openingHours.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OpeningHoursUpdateComponent,
    resolve: {
      openingHours: OpeningHoursResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.openingHours.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
