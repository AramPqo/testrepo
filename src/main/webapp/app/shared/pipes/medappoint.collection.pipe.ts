import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'collectionValuePipe'
})
export class MedAppintCollectionValuePipe implements PipeTransform {
    constructor() { }

    transform(
        value: string | number,
        collections?: any[],
        collectionName?: string,
        collectionValue?: string
    ) {
        if (collections && collectionName && collectionValue) {
            const result = collections[collectionName].filter(v => v.id === value);
            return result.length ? result[0].name : '-';
        }
    }
}
