import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'entity-from-dialog',
  templateUrl: './entity-from-dialog.component.html',
  styleUrls: ['./entity-from-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntityFromDialogComponent {

  @Output() updateEmit = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }

  title!: string;
  field: string;
  id: any;
  form = new FormGroup({});
  model = {};
  options = {};
  fields!: FormlyFieldConfig[];

  onSubmit() {
    if (this.form.valid) {
      if (this.id) {
        this.model['id'] = this.id;
      }
      this.updateEmit.emit(this.model);
      this.activeModal.dismiss();
      this.form.reset();
    }
  }

  close(): void {
    this.activeModal.dismiss();
    this.updateEmit.emit(null);
  }
}
