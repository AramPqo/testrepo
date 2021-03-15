import { IServiceItem } from 'app/shared/model/service-item.model';
import { Component, Injector, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from "@angular/animations";
import * as uuid from 'uuid';
import { FormBuilder, Validators } from '@angular/forms';
import * as lodash from 'lodash';
import { ServiceItemService } from 'app/entities/service-item/service-item.service';

@Component({
    selector: 'jhi-service-item-control',
    templateUrl: './service-item-control.component.html',
    styleUrls: ['./../../../entities/patient/patient-update.component.scss', './service-item-control.component.scss'],
    animations: [
        trigger("collectionAnimation", [
            state("in", style({ top: 0 })),
            transition(":enter", [style({ top: -45, 'z-index': 0 }), animate(0)]),
            transition(":leave", animate(400, style({ top: -45, 'z-index': 0 })))
        ])
    ]
})
export class ServiceItemControlComponent extends FieldType implements OnInit {
    serviceItems = [];
    editForm = this.fb.group({
        id: [],
        description: [null, [Validators.required]],
        price: [null, [Validators.required]]
    });

    field: any;
    items: IServiceItem[] = [];
    formControl!: any;
    changedItem: number;
    service: any;
    itemId: any = null;

    constructor(private fb: FormBuilder, private serviceItemService: ServiceItemService) {
        super();
    }

    ngOnInit() {
        this.serviceItemService.query().subscribe(res => this.serviceItems = res.body);
        this.items = lodash.cloneDeep(this.field.defaultValue);
    }

    setServieItem(item: IServiceItem, index: number) {
        item.id = `created-${uuid.v4()}`;
        this.updateItem(item, index);
    }

    updateItem(item: IServiceItem, index: number) {
        this.editForm.patchValue(item);
        this.changedItem = index;
        this.itemId = lodash.cloneDeep(this.items);
    }

    save(item: IServiceItem) {
        if (this.editForm.invalid) return;
        this.changedItem = null;
        item.description = this.editForm.value.description;
        item.price = this.editForm.value.price;
        if (this.getIsCreated(item.id)) {
            this.items = this.items.filter(v => v.id !== item.id);
            this.items.push(item);
        } else {
            this.items = [...this.items.filter(v => v.id !== item.id), item];
        }
        this.itemId = lodash.cloneDeep(this.items);
    }

    createItem() {
        const id = `created-${uuid.v4()}`;
        this.items.push({ id, description: '', price: null });
        this.changedItem = this.items.length - 1;
        this.editForm.reset();
        this.itemId = lodash.cloneDeep(this.items);
    }

    getStopPropagation(event) {
        event.stopPropagation();
    }

    removeItem(id: string | number, index: number) {
        if (this.changedItem === index) {
            this.changedItem = null;
            return;
        }
        this.items.find(v => v.id === id).invoiceId = null;
        this.items = this.items.filter(v => v.id !== id);
        this.changedItem = null;
        this.itemId = lodash.cloneDeep(this.items);
    }

    getIsCreated(id) {
        return typeof id === 'string' && (id as string).slice(0, 7) === 'created';
    }

}
