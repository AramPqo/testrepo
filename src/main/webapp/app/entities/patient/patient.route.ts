import { InvoiceService } from './../invoice/invoice.service';
import { IInvoice } from 'app/shared/model/invoice.model';
import { UserService } from './../../core/user/user.service';
import { IUser } from './../../core/user/user.model';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country/country.service';
import { RemarkService } from 'app/entities/remark/remark.service';
import { IRemark } from 'app/shared/model/remark.model';
import { IInsurer } from 'app/shared/model/insurer.model';
import { InsurerService } from 'app/entities/insurer/insurer.service';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPatient, Patient } from 'app/shared/model/patient.model';
import { PatientService } from './patient.service';
import { PatientComponent } from './patient.component';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientUpdateComponent } from './patient-update.component';
import { AppointmentService } from '../appointment/appointment.service';
import { IAppointment } from 'app/shared/model/appointment.model';

@Injectable({ providedIn: 'root' })
export class PatientResolve implements Resolve<IPatient> {
  constructor(private service: PatientService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IPatient> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((patient: HttpResponse<Patient>) => {
          if (patient.body) {
            return of(patient.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Patient());
  }
}

@Injectable({ providedIn: 'root' })
class PatientInsurerResolve implements Resolve<IInsurer[] | null> {
  constructor(private service: InsurerService) { }
  resolve() {
    return this.service.query().pipe(map((insurers: HttpResponse<IInsurer[]>) => insurers.body));
  }
}

@Injectable({ providedIn: 'root' })
class PatientRemarkResolve implements Resolve<IRemark[] | null> {
  constructor(private service: RemarkService) { }
  resolve() {
    return this.service.query().pipe(map((remarks: HttpResponse<IRemark[]>) => remarks.body));
  }
}

@Injectable({ providedIn: 'root' })
class PatientCountryResolve implements Resolve<ICountry[] | null> {
  constructor(private service: CountryService) { }
  resolve() {
    return this.service.query().pipe(map((countries: HttpResponse<ICountry[]>) => countries.body));
  }
}
@Injectable({ providedIn: 'root' })
class PatientAppointmentResolve implements Resolve<IAppointment[] | null> {
  constructor(private service: AppointmentService) { }
  resolve() {
    return this.service.query().pipe(map((countries: HttpResponse<IAppointment[]>) => countries.body));
  }
}
@Injectable({ providedIn: 'root' })
class UserResolve implements Resolve<IUser[] | null> {
  constructor(private service: UserService) { }
  resolve() {
    return this.service.query().pipe(map((users: HttpResponse<IUser[]>) => users.body));
  }
}
@Injectable({ providedIn: 'root' })
class PatientInvoiceResolve implements Resolve<IInvoice[] | null> {
  constructor(private service: InvoiceService) { }
  resolve() {
    return this.service.query().pipe(map((locations: HttpResponse<IInvoice[]>) => locations.body));
  }
}
@Injectable({ providedIn: 'root' })
class PatientsWithAppointmentsResolve implements Resolve<IPatient[] | null> {
  constructor(private service: PatientService) { }
  resolve() {
    return this.service.patientsWithAppointments().pipe(map((appointments: HttpResponse<IPatient[]>) => appointments.body));
  }
}

export const patientRoute: Routes = [
  {
    path: '',
    component: PatientComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.patient.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PatientDetailComponent,
    resolve: {
      patient: PatientResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.patient.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PatientUpdateComponent,
    resolve: {
      patient: PatientResolve,
      insurers: PatientInsurerResolve,
      remarks: PatientRemarkResolve,
      countries: PatientCountryResolve,
      appointments: PatientAppointmentResolve,
      users: UserResolve,
      invoices: PatientInvoiceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.patient.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PatientUpdateComponent,
    resolve: {
      patient: PatientResolve,
      insurers: PatientInsurerResolve,
      remarks: PatientRemarkResolve,
      countries: PatientCountryResolve,
      appointments: PatientAppointmentResolve,
      users: UserResolve,
      invoices: PatientInvoiceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'medappointApp.patient.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
