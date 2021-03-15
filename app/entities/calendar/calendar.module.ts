import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule } from '@angular/router';
import { calendarRoute } from './calendar.route';
import { MedappointSharedModule } from './../../shared/shared.module';
import { CalendarComponent } from './calendar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    MedappointSharedModule,
    NgbModule,
    RouterModule.forChild(calendarRoute)
  ]
})
export class CalendarModule { }
