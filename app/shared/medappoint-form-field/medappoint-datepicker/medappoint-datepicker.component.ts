import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'jhi-medappoint-datepicker',
  templateUrl: './medappoint-datepicker.component.html',
  styleUrls: ['./medappoint-datepicker.component.scss']
})
export class MedappointDatepickerComponent extends FieldType implements OnInit {

  isBlocked: boolean;
  dateValue: any;
  formControl!: any;

  constructor() {
    super();
  }

  ngOnInit() {
    this.isBlocked = this.field.templateOptions.isBlocked;
    this.dateValue = this.field.defaultValue;
  }
}
