import { Component, Injector, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'jhi-medappoint-search',
  templateUrl: './medappoint-search.component.html',
  styleUrls: ['./medappoint-search.component.scss']
})
export class MedappointSearchComponent extends FieldType implements OnInit {

  itemId = '';
  items: any[];
  displayName: string;
  searchBy: string;
  service: any;
  selectedItem: any;
  formControl!: any;
  activeItem: any = '';
  displayItems: any[];
  isShowDropdown = false;
  disabled;

  constructor(private injector: Injector) {
    super();
  }

  ngOnInit() {
    this.itemId = this.field.defaultValue;
    this.searchBy = this.field.templateOptions.displayName;
    this.disabled = this.field.templateOptions.disabled;
    this.service = this.injector.get(this.field.templateOptions.service);
    this.service.query()
      .subscribe(
        (res) => {
          this.items = res.body;
          this.displayItems = this.items;
          if (this.itemId) {
            const item = this.items.find(v => v.id === this.itemId);
            this.items.forEach(v => {
              v.fullName = this.field.templateOptions.fullName.map(name => v[name]).join(' ');
            });
            if (item) {
              this.activeItem = this.field.templateOptions.fullName.map(v => item[v]).join(' ');
            }
          }
        });
  }

  getFilteredValue(event) {
    this.items = event;
    this.isShowDropdown = true;
  }

  getFocusEvent(event) {
    this.isShowDropdown = event;
  }

  setItem(item) {
    this.activeItem = this.field.templateOptions.fullName.map(v => item[v]).join(' ');
    this.itemId = item.id;
    this.isShowDropdown = false;
  }

}
