import { IUser } from 'app/core/user/user.model';
import { CalendarComponent } from './calendar.component';
import { Routes, Resolve, Router } from '@angular/router';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Injectable } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from '../patient/patient.service';
import { ITreatment } from 'app/shared/model/treatment.model';
import { TreatmentService } from '../treatment/treatment.service';

@Injectable({ providedIn: 'root' })
class UserListResolver implements Resolve<IUser[] | null> {
    constructor(private service: UserService) { }
    resolve() {
        return this.service.query().pipe(map((users: HttpResponse<IUser[]>) => users.body));
    }
}


@Injectable({ providedIn: 'root' })
export class PatientListResolve implements Resolve<IPatient[] | null> {
    constructor(private service: PatientService) { }
    resolve() {
        return this.service.query().pipe(map((patient: HttpResponse<IPatient[]>) => patient.body));
    }
}

@Injectable({ providedIn: 'root' })
export class TreatmentResolve implements Resolve<ITreatment[] | null> {
    constructor(private service: TreatmentService) { }
    resolve() {
        return this.service.query().pipe(map((treatment: HttpResponse<ITreatment[]>) => treatment.body));
    }
}

export const calendarRoute: Routes = [
    {
        path: '',
        component: CalendarComponent,
        data: {
            authorities: [Authority.USER],
            pageTitle: 'medappointApp.calendar.home.title',
        },
        resolve: {
            userList: UserListResolver,
            patientList: PatientListResolve,
            treatmentList: TreatmentResolve
        },
        canActivate: [UserRouteAccessService],
    }
];
