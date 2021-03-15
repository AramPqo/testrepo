import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceItem } from 'app/shared/model/service-item.model';
import { ServiceItemService } from './service-item.service';

@Component({
  templateUrl: './service-item-delete-dialog.component.html',
})
export class ServiceItemDeleteDialogComponent {
  serviceItem?: IServiceItem;

  constructor(
    protected serviceItemService: ServiceItemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string | number): void {
    this.serviceItemService.delete(id as number).subscribe(() => {
      this.eventManager.broadcast('serviceItemListModification');
      this.activeModal.close();
    });
  }
}
