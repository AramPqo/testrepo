import { UserService } from './../core/user/user.service';
import { NgModule } from '@angular/core';
import { MedappointDatePipe } from './pipes/medappoint-date.pipe';
import { MedAppintCollectionValuePipe } from './pipes/medappoint.collection.pipe';
import { MedappointAppointmentDropdownComponent } from './medappoint-form-field/medappoint-appointment-dropdown/medappoint-appointment-dropdown.component';
import { InvoiceService } from 'app/entities/invoice/invoice.service';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MedappointSharedLibsModule } from './shared-libs.module';
import { MedappointDropdownComponent } from './medappoint-form-field/medappoint-dropdown/medappoint-dropdown.component';
import { MedappointColorPickerComponent } from './medappoint-form-field/medappoint-colorpicker/medappoint-colorpicker.component';
import { MedappointDatepickerComponent } from './medappoint-form-field/medappoint-datepicker/medappoint-datepicker.component';
import { MedappointTimepickerComponent } from './medappoint-form-field/medappoint-timepicker/medappoint-timepicker.component';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { FileUpploadComponent } from './medappoint-form-field/file-uppload/file-uppload.component';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { FilterComponent } from './filter/filter.component';
import { TableResizeDirective } from 'app/shared/directives/table-resize.directive';
import { SortableHeaderDirective } from 'app/shared/directives/sortable.directive';
import { FileDragDropDirective } from './directives/file-drag-drop.directive';
import { PatientControlDialogComponent } from 'app/entities/patient/patient-control-dialog/patient-control-dialog.component';
import { InvoiceControlDialogComponent } from 'app/entities/patient/invoice-control-dialog/invoice-control-dialog.component';
import { FormlyModule } from '@ngx-formly/core';
import { RemarkService } from 'app/entities/remark/remark.service';
import { AppointmentService } from 'app/entities/appointment/appointment.service';
import { TreatmentService } from 'app/entities/treatment/treatment.service';
import { MedappointSearchComponent } from './medappoint-form-field/medappoint-search/medappoint-search.component';
import { PatientService } from 'app/entities/patient/patient.service';
import { ServiceItemControlComponent } from './medappoint-form-field/service-Item-control/service-item-control.component';
import { MedAppintDropDownLabel } from './pipes/medappoint-dropdown-label.pipe';
import { ColorpickerDialogComponent } from './medappoint-form-field/medappoint-colorpicker/colorpicker-dialog/colorpicker-dialog.component';
import { MedappointButtonComponent } from './medappoint-form-field/medappoint-button/medappoint-button.component';
import { EntityFromDialogComponent } from './components/entity-form/entity-from-dialog.component';
import { FormlyHorizontalWrapper } from './util/horizontal-wrapper';

@NgModule({
  imports: [
    MedappointSharedLibsModule,
    FormlyModule.forChild({
      types: [
        { name: 'file', component: FileUpploadComponent },
        { name: 'medappointDate', component: MedappointDatepickerComponent },
        { name: 'medappointTime', component: MedappointTimepickerComponent },
        { name: 'medappointSearch', component: MedappointSearchComponent },
        { name: 'medappointDropdown', component: MedappointDropdownComponent },
        { name: 'medappointColor', component: MedappointColorPickerComponent },
        { name: 'medappointAppointmentDropdown', component: MedappointAppointmentDropdownComponent },
        { name: 'serviceItemControl', component: ServiceItemControlComponent },
        { name: 'medappointButton', component: MedappointButtonComponent }
      ],
      wrappers: [{ name: 'form-field-horizontal', component: FormlyHorizontalWrapper }]
    })
  ],
  declarations: [
    FindLanguageFromKeyPipe,
    PatientControlDialogComponent,
    FilterComponent,
    MedappointDatePipe,
    MedAppintCollectionValuePipe,
    AlertComponent,
    FileUpploadComponent,
    MedappointDatepickerComponent,
    ColorpickerDialogComponent,
    MedappointAppointmentDropdownComponent,
    ServiceItemControlComponent,
    FormlyHorizontalWrapper,
    MedappointButtonComponent,
    MedAppintDropDownLabel,
    MedappointTimepickerComponent,
    MedappointDropdownComponent,
    InvoiceControlDialogComponent,
    MedappointColorPickerComponent,
    AlertErrorComponent,
    DataTableComponent,
    EntityFromDialogComponent,
    FileDragDropDirective,
    TableResizeDirective,
    SortableHeaderDirective,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    MedappointSearchComponent
  ],
  entryComponents: [
    LoginModalComponent,
    PatientControlDialogComponent,
    InvoiceControlDialogComponent,
    ColorpickerDialogComponent,
    EntityFromDialogComponent
  ],
  exports: [
    MedappointSharedLibsModule,
    FindLanguageFromKeyPipe,
    FilterComponent,
    MedappointDatePipe,
    MedAppintCollectionValuePipe,
    FileDragDropDirective,
    ColorpickerDialogComponent,
    MedAppintDropDownLabel,
    PatientControlDialogComponent,
    InvoiceControlDialogComponent,
    MedappointAppointmentDropdownComponent,
    ServiceItemControlComponent,
    MedappointButtonComponent,
    AlertComponent,
    AlertErrorComponent,
    DataTableComponent,
    EntityFromDialogComponent,
    TableResizeDirective,
    SortableHeaderDirective,
    LoginModalComponent,
    HasAnyAuthorityDirective
  ],
  providers: [
    {
      provide: 'UserService',
      useExisting: UserService
    },
    {
      provide: 'PatientService',
      useExisting: PatientService
    },
    {
      provide: 'AppointmentService',
      useExisting: AppointmentService
    },
    {
      provide: 'RemarkService',
      useExisting: RemarkService
    },
    {
      provide: 'InvoiceService',
      useExisting: InvoiceService
    },
    {
      provide: 'TreatmentService',
      useExisting: TreatmentService
    },
    {
      provide: 'InvoiceService',
      useExisting: InvoiceService
    }
  ]
})
export class MedappointSharedModule { }
