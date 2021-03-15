import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedappointSharedModule } from 'app/shared/shared.module';
import { InsurerComponent } from './insurer.component';
import { InsurerDetailComponent } from './insurer-detail.component';
import { InsurerUpdateComponent } from './insurer-update.component';
import { InsurerDeleteDialogComponent } from './insurer-delete-dialog.component';
import { insurerRoute } from './insurer.route';

@NgModule({
  imports: [MedappointSharedModule, RouterModule.forChild(insurerRoute)],
  declarations: [InsurerComponent, InsurerDetailComponent, InsurerUpdateComponent, InsurerDeleteDialogComponent],
  entryComponents: [InsurerDeleteDialogComponent],
})
export class MedappointInsurerModule {}
