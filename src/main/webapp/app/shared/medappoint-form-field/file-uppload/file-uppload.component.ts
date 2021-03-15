import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'jhi-file-uppload',
  templateUrl: './file-uppload.component.html',
  styleUrls: ['./file-uppload.component.scss']
})
export class FileUpploadComponent extends FieldType {
  fileName!: any;
  formControl!: any;
  file: any;

  constructor() {
    super();
  }

  onFilesChange(event: any) {
    this.model.file = event.target['files'][0]; 
    if (event instanceof Event) {
      this.fileName = event.target['files'][0].name;
    } else {
      this.fileName = event[0]['name'];
    }
  }

}
