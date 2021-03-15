import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOpeningHours } from 'app/shared/model/opening-hours.model';
import { OpeningHoursService } from './opening-hours.service';

@Component({
  templateUrl: './opening-hours-delete-dialog.component.html',
})
export class OpeningHoursDeleteDialogComponent {
  openingHours?: IOpeningHours;

  constructor(
    protected openingHoursService: OpeningHoursService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.openingHoursService.delete(id).subscribe(() => {
      this.eventManager.broadcast('openingHoursListModification');
      this.activeModal.close();
    });
  }
}
