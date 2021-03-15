import { Component, Injector, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { AppointmentService } from 'app/entities/appointment/appointment.service';

@Component({
    selector: 'jhi-medappoint-appointment-dropdown.component',
    templateUrl: './medappoint-appointment-dropdown.component.html',
    styleUrls: ['./../medappoint-dropdown/medappoint-dropdown.component.scss']
})
export class MedappointAppointmentDropdownComponent extends FieldType implements OnInit {

    itemId = '';
    items: any[];
    service: any;
    selectedItem: any;
    formControl!: any;
    activeItem = { startDate: null, endDate: null };

    constructor(private appointmentService: AppointmentService) {
        super();
    }

    ngOnInit() {
        this.itemId = this.field.defaultValue;
        this.appointmentService.query()
            .subscribe(
                (res) => {
                    this.items = res.body;
                    if (this.itemId) {
                        const item = this.items.find(v => v.id === this.itemId) ? this.items.find(v => v.id === this.itemId) : null;
                        this.activeItem = item;
                    }
                });
    }

    getItem(item, index) {
        this.selectedItem = index;
        this.activeItem = item;
        this.itemId = item.id;
    }
}
