import { PatientUpdateComponent } from 'app/entities/patient/patient-update.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MedappointSharedModule } from 'app/shared/shared.module';
import { UserService } from './../../core/user/user.service';
import { PatientComponent } from './patient.component';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientDeleteDialogComponent } from './patient-delete-dialog.component';
import { patientRoute } from './patient.route';
import { AppointmentService } from '../appointment/appointment.service';
import { RemarkService } from '../remark/remark.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    MedappointSharedModule,
    CommonModule,
    RouterModule.forChild(patientRoute),
  ],
  declarations: [
    PatientComponent,
    PatientUpdateComponent,
    PatientDetailComponent,
    PatientDeleteDialogComponent
  ],
  entryComponents: [PatientDeleteDialogComponent] 
})
export class MedappointPatientModule { }
