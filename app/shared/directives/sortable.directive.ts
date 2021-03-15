import { Directive, Input, Output, EventEmitter } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };
export interface SortEvent {
    column: string;
    direction: SortDirection;
}

@Directive({
    selector: 'div[sortable]',
    // tslint:disable-next-line: no-host-metadata-property
    host: {
        '[class.sorting_asc]': 'direction === "asc" && isSortable',
        '[class.sorting_desc]': 'direction === "desc" && isSortable',
        '[class.sorting]': 'direction === "" && isSortable',
        '(click)': 'rotate()'
    }
})
export class SortableHeaderDirective {

    constructor() { }

    direction: SortDirection = '';
    @Input()
    sortable!: string;
    @Input()
    isSortable!: any;
    @Output() sort = new EventEmitter<SortEvent>();

    rotate() {
        if (this.isSortable) {
            this.direction = rotate[this.direction];
            this.sort.emit({ column: this.sortable, direction: this.direction });
        }
    }
}

