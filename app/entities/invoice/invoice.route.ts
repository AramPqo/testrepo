import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInvoice, Invoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from './invoice.service';
import { InvoiceComponent } from './invoice.component';
import { InvoiceUpdateComponent } from './invoice-update.component';
import { PatientService } from '../patient/patient.service';
import { IPatient } from 'app/shared/model/patient.model';
import { AppointmentService } from '../appointment/appointment.service';
import { IAppointment } from 'app/shared/model/appointment.model';
import { TreatmentService } from '../treatment/treatment.service';
import { ITreatment } from 'app/shared/model/treatment.model';

@Injectable({ providedIn: 'root' })
export class InvoiceResolve implements Resolve<IInvoice> {
  constructor(private service: InvoiceService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IInvoice> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((invoice: HttpResponse<Invoice>) => {
          if (invoice.body) {
            return of(invoice.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Invoice());
  }
}

@Injectable({ providedIn: 'root' })
class PatientResolve implements Resolve<IPatient[] | null> {
  constructor(private service: PatientService) { }
  resolve() {
    return this.service.query().pipe(map((appointments: HttpResponse<IPatient[]>) => appointments.body));
  }
}

@Injectable({ providedIn: 'root' })
class AppointmentResolve implements Resolve<IAppointment[] | null> {
  constructor(private service: AppointmentService) { }
  resolve() {
    return this.service.query().pipe(map((appointments: HttpResponse<IAppointment[]>) => appointments.body));
  }
}

@Injectable({ providedIn: 'root' })
class TreatmentResolve implements Resolve<ITreatment[] | null> {
  constructor(private service: TreatmentService) { }
  resolve() {
    return this.service.query().pipe(map((treatments: HttpResponse<ITreatment[]>) => treatments.body));
  }
}

export const invoiceRoute: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.invoice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InvoiceUpdateComponent,
    resolve: {
      invoice: InvoiceResolve,
      patients: PatientResolve,
      appointments: AppointmentResolve,
      treatments: TreatmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.invoice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InvoiceUpdateComponent,
    resolve: {
      invoice: InvoiceResolve,
      patients: PatientResolve,
      appointments: AppointmentResolve,
      treatments: TreatmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.invoice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
