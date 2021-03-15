import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dropDownLabel'
})
export class MedAppintDropDownLabel implements PipeTransform {
    constructor() { }

    transform(
        value: string | number,
        list: any[],
        key: any
    ) {
        if (!value || !list) {
            return '';
        }

        const element = list.find(e => e.id === value);
        return element && 'name' in element ? element.name : '';
    }
}
