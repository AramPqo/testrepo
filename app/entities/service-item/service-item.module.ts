import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MedappointSharedModule } from 'app/shared/shared.module';
import { ServiceItemComponent } from './service-item.component';
import { ServiceItemDetailComponent } from './service-item-detail.component';
import { ServiceItemUpdateComponent } from './service-item-update.component';
import { ServiceItemDeleteDialogComponent } from './service-item-delete-dialog.component';
import { serviceItemRoute } from './service-item.route';

@NgModule({
  imports: [MedappointSharedModule, RouterModule.forChild(serviceItemRoute)],
  declarations: [ServiceItemComponent, ServiceItemDetailComponent, ServiceItemUpdateComponent, ServiceItemDeleteDialogComponent],
  entryComponents: [ServiceItemDeleteDialogComponent],
})
export class MedappointServiceItemModule {}
