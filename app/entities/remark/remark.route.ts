import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRemark, Remark } from 'app/shared/model/remark.model';
import { RemarkService } from './remark.service';
import { RemarkComponent } from './remark.component';
import { RemarkDetailComponent } from './remark-detail.component';
import { RemarkUpdateComponent } from './remark-update.component';

@Injectable({ providedIn: 'root' })
export class RemarkResolve implements Resolve<IRemark> {
  constructor(private service: RemarkService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRemark> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((remark: HttpResponse<Remark>) => {
          if (remark.body) {
            return of(remark.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Remark());
  }
}

export const remarkRoute: Routes = [
  {
    path: '',
    component: RemarkComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.remark.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RemarkDetailComponent,
    resolve: {
      remark: RemarkResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.remark.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RemarkUpdateComponent,
    resolve: {
      remark: RemarkResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.remark.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RemarkUpdateComponent,
    resolve: {
      remark: RemarkResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.remark.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
