import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { FieldType } from '@ngx-formly/core';
import { ColorpickerDialogComponent } from './colorpicker-dialog/colorpicker-dialog.component';

@Component({
  selector: 'jhi-medappoint-colorpicker',
  templateUrl: './medappoint-colorpicker.component.html',
  styleUrls: ['./medappoint-colorpicker.component.scss']
})
export class MedappointColorPickerComponent extends FieldType implements OnInit {

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  isOpend: boolean;
  formControl!: any;
  selectedColor: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    super();
  }

  ngOnInit() {
    this.selectedColor = this.field.defaultValue;
  }

  openColorPicker() {
    if (this.isOpend) {
      return;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ColorpickerDialogComponent);
    const componentRef = this.container.createComponent(componentFactory);
    componentRef.instance.currentColor = this.selectedColor;
    this.isOpend = true;
    componentRef.instance.result
      .subscribe(
        (color) => {
          if (color.length) {
            this.selectedColor = color;
          }
          this.container.clear();
          this.isOpend = false;
        });
  }

}
