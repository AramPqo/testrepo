import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import * as moment from 'moment';

@Component({
  selector: 'jhi-medappoint-timepicker',
  templateUrl: './medappoint-timepicker.component.html',
  styleUrls: ['./medappoint-timepicker.component.scss']
})
export class MedappointTimepickerComponent extends FieldType implements OnInit {

  selectedTime!: number;
  timeValue: any;
  formControl!: any;
  timePicker: string[];

  constructor() {
    super();
  }

  ngOnInit() {
    if(moment.isMoment(this.field.defaultValue)) {
      this.timeValue = moment(this.field.defaultValue).format("HH:mm");
    } else {
      this.timeValue = this.field.defaultValue;
    }
    this.timePicker = this.getTimePicker();
  }

  getTime(time, index) {
    this.timeValue = time;
    this.selectedTime = index;
  }

  getTimePicker() {
    let start = 9;
    let end: any = 0;
    let result = [];
    let i = 0;
    while (i < 60) {
      if (end === 60) {
        end = 0;
        start += 1;
      }
      result[i] = start + ':' + (end.toString().length === 1 ? end += '0' : end);
      if(result[i] === this.timeValue) this.selectedTime = i;
      end = parseInt(end) + 15;
      i++;
      if (start === 24) {
        result[result.length - 1] = '00:00';
        break;
      }
    }
    return result;
  }

}
