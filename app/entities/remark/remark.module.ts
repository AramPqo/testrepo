import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedappointSharedModule } from 'app/shared/shared.module';
import { RemarkComponent } from './remark.component';
import { RemarkDetailComponent } from './remark-detail.component';
import { RemarkUpdateComponent } from './remark-update.component';
import { RemarkDeleteDialogComponent } from './remark-delete-dialog.component';
import { remarkRoute } from './remark.route';

@NgModule({
  imports: [MedappointSharedModule, RouterModule.forChild(remarkRoute)],
  declarations: [RemarkComponent, RemarkDetailComponent, RemarkUpdateComponent, RemarkDeleteDialogComponent],
  entryComponents: [RemarkDeleteDialogComponent],
})
export class MedappointRemarkModule {}
