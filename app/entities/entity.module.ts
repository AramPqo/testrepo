import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'business',
        loadChildren: () => import('./business/business.module').then(m => m.MedappointBusinessModule),
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.MedappointInvoiceModule),
      },
      {
        path: 'patient',
        loadChildren: () => import('./patient/patient.module').then(m => m.MedappointPatientModule),
      },
      {
        path: 'insurer',
        loadChildren: () => import('./insurer/insurer.module').then(m => m.MedappointInsurerModule),
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.MedappointLocationModule),
      },
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.MedappointCountryModule),
      },
      {
        path: 'currency',
        loadChildren: () => import('./currency/currency.module').then(m => m.MedappointCurrencyModule),
      },
      {
        path: 'opening-hours',
        loadChildren: () => import('./opening-hours/opening-hours.module').then(m => m.MedappointOpeningHoursModule),
      },
      {
        path: 'treatment',
        loadChildren: () => import('./treatment/treatment.module').then(m => m.MedappointTreatmentModule),
      },
      {
        path: 'remark',
        loadChildren: () => import('./remark/remark.module').then(m => m.MedappointRemarkModule),
      },
      {
        path: 'appointment',
        loadChildren: () => import('./appointment/appointment.module').then(m => m.MedappointAppointmentModule),
      },
      {
        path: 'service-item',
        loadChildren: () => import('./service-item/service-item.module').then(m => m.MedappointServiceItemModule),
      },
      {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule),
      },
      {
        path: 'expense',
        loadChildren: () => import('./expense/expense.module').then(m => m.MedappointExpenseModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MedappointEntityModule { }
