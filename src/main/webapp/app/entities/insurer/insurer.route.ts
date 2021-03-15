import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInsurer, Insurer } from 'app/shared/model/insurer.model';
import { InsurerService } from './insurer.service';
import { InsurerComponent } from './insurer.component';
import { InsurerDetailComponent } from './insurer-detail.component';
import { InsurerUpdateComponent } from './insurer-update.component';

@Injectable({ providedIn: 'root' })
export class InsurerResolve implements Resolve<IInsurer> {
  constructor(private service: InsurerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInsurer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((insurer: HttpResponse<Insurer>) => {
          if (insurer.body) {
            return of(insurer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Insurer());
  }
}

export const insurerRoute: Routes = [
  {
    path: '',
    component: InsurerComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.insurer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InsurerDetailComponent,
    resolve: {
      insurer: InsurerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.insurer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InsurerUpdateComponent,
    resolve: {
      insurer: InsurerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.insurer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InsurerUpdateComponent,
    resolve: {
      insurer: InsurerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.insurer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
