import { Injectable } from '@angular/core';
import { PatientService } from 'app/entities/patient/patient.service';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { IPatient, Patient } from '../model/patient.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ILocation, Location } from '../model/location.model';
import { LocationService } from 'app/entities/location/location.service';

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
export class LocationResolve implements Resolve<ILocation> {
  constructor(private service: LocationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((location: HttpResponse<Location>) => {
          if (location.body) {
            return of(location.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Location());
  }
}
