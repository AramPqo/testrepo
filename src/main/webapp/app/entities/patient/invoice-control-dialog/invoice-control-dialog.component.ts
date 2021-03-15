import { Component, EventEmitter, Output, ViewEncapsulation, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './invoice-control-dialog.component.html',
    styleUrls: ['./invoice-control-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InvoiceControlDialogComponent implements OnInit {

    title: string;
    @Output() updateEmit = new EventEmitter();

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
        // debugger;
    }

    onSubmit() {

    }

    close(): void {
        this.activeModal.dismiss();
    }
}
