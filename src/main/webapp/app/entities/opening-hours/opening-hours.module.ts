import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedappointSharedModule } from 'app/shared/shared.module';
import { OpeningHoursComponent } from './opening-hours.component';
import { OpeningHoursDetailComponent } from './opening-hours-detail.component';
import { OpeningHoursUpdateComponent } from './opening-hours-update.component';
import { OpeningHoursDeleteDialogComponent } from './opening-hours-delete-dialog.component';
import { openingHoursRoute } from './opening-hours.route';

@NgModule({
  imports: [MedappointSharedModule, RouterModule.forChild(openingHoursRoute)],
  declarations: [OpeningHoursComponent, OpeningHoursDetailComponent, OpeningHoursUpdateComponent, OpeningHoursDeleteDialogComponent],
  entryComponents: [OpeningHoursDeleteDialogComponent],
})
export class MedappointOpeningHoursModule {}
