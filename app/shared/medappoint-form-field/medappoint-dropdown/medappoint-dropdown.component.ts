import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'jhi-medappoint-dropdown.component',
  templateUrl: './medappoint-dropdown.component.html',
  styleUrls: ['./medappoint-dropdown.component.scss']
})
export class MedappointDropdownComponent extends FieldType implements OnInit, OnDestroy {

  itemId = '';
  items: any[];
  displayName: string;
  service: any;
  selectedItem: any;
  formControl!: any;
  activeItem: any = '';
  isCustom: boolean;
  customData;
  constructor(private injector: Injector) {
    super();
  }

  ngOnInit() {
    this.displayName = this.field.templateOptions.displayName;
    this.itemId = this.field.defaultValue;
    if (this.field.templateOptions.isCustom) {
      this.isCustom = true;
      this.items = this.field.templateOptions.data;
      this.activeItem = this.itemId;
    } else {
      this.service = this.injector.get(this.field.templateOptions.service);
      this.service.query()
        .subscribe(
          (res) => {
            this.items = res.body;
            if (this.itemId) {
              const items = this.items.find(v => v.id === this.itemId);
              this.activeItem = items ? items[this.displayName] : '';
            }
          });
    }
  }

  getItem(item, index) {
    this.selectedItem = index;
    if (!this.isCustom) {
      this.activeItem = item[this.displayName];
      this.itemId = item.id;
    } else {
      this.activeItem = item;
      this.itemId = item;
    }
  }

  ngOnDestroy() {
    this.itemId = null;
  }
}
