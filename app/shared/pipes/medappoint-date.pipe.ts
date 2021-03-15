import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'medappointDate'
})
export class MedappointDatePipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        let result = '';
        if (value) {
            switch (args) {
                case 'D/M/Y/T':
                    result = super.transform(value, 'dd.MM.yyyy HH:mm');
                    break;
                case 'W/D/M/Y':
                    result = value.format('LLLL').slice(0, -8);
                    break;
                case 'HH:mm':
                    result = value.format('HH:mm');
                    break;
            }
        }
        return result;
    }
}