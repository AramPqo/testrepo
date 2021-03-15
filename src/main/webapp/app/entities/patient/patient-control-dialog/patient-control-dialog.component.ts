import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'patient-control-dialog',
  templateUrl: './patient-control-dialog.component.html',
  styleUrls: ['./patient-control-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientControlDialogComponent implements OnInit {

  @Output() updateEmit = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }

  title!: string;
  field: string;
  id: any;
  form = new FormGroup({});
  model = {};
  options = {};
  fields!: FormlyFieldConfig[];
  isDelete: boolean;
  ngOnInit() {

  }

  emitDelete() {
    // this.updateEmit.emit('delte');
  }

  onSubmit() {
    if (this.form.valid) {
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
