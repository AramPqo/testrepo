import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-horizontal-wrapper',
  template: `
        <div class="form-group horizontal-wrapper-container d-flex align-items-center justify-content-between">
            <div [attr.for]="id" class="wrapper-form-label" *ngIf="to.label">
                {{ to.label }} 
            </div>
            <div class="wrapper-form-input">
                <ng-template #fieldComponent></ng-template>
            </div>
        </div>
  `,
})
export class FormlyHorizontalWrapper extends FieldWrapper {
}