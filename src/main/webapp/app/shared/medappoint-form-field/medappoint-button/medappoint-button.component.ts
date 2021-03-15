import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'jhi-medappoint-button',
    templateUrl: './medappoint-button.component.html',
    styleUrls: ['./medappoint-button.component.scss']
})
export class MedappointButtonComponent extends FieldType implements OnInit {

    itemId: any = '';
    displayName: string;
    formControl!: any;
    isBlocked:boolean;

    constructor() {
        super();
    }

    ngOnInit() {
        this.displayName = this.field.templateOptions.displayName;
        this.itemId = this.field.defaultValue;
    }

    emitEvent() {
        this.to.getEvent();
      }
}
