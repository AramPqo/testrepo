import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRemark } from 'app/shared/model/remark.model';
import { RemarkService } from './remark.service';

@Component({
  templateUrl: './remark-delete-dialog.component.html',
})
export class RemarkDeleteDialogComponent {
  remark?: IRemark;

  constructor(protected remarkService: RemarkService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.remarkService.delete(id).subscribe(() => {
      this.eventManager.broadcast('remarkListModification');
      this.activeModal.close();
    });
  }
}
