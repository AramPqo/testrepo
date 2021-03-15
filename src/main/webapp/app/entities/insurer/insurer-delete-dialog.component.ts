import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInsurer } from 'app/shared/model/insurer.model';
import { InsurerService } from './insurer.service';

@Component({
  templateUrl: './insurer-delete-dialog.component.html',
})
export class InsurerDeleteDialogComponent {
  insurer?: IInsurer;

  constructor(protected insurerService: InsurerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.insurerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('insurerListModification');
      this.activeModal.close();
    });
  }
}
