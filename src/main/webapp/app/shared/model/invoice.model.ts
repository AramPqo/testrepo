import { Moment } from 'moment';
import { IServiceItem } from './service-item.model';
import { invoiceStatus } from './enumerations/invoice-status.model';

export interface IInvoice {
    id?: number;
    appointmentId?: number;
    businessId?: number;
    createdAt?: Moment | string | any;
    currencyId?: number;
    invoiceNumber?: number | string;
    invoiceStatus?: invoiceStatus | string;
    invoiceTotal?: number | string;
    patientId?: number;
    paymentStatus?: string;
    paymentType?: string;
    recipientAddress?: string;
    recipientCity?: string;
    recipientName?: string;
    recipientPostalCode?: string;
    treatmentId?: number;
    invoiceItems?: IServiceItem[];
    isUpdated?: boolean
}

export class Invoice implements IInvoice {
    constructor(
        public id?: number,
        public appointmentId?: number,
        public businessId?: number,
        public createdAt?: Moment | string | any,
        public currencyId?: number,
        public invoiceNumber?: number | string,
        public invoiceStatus?: invoiceStatus | string,
        public invoiceTotal?: number | string,
        public patientId?: number,
        public paymentStatus?: string,
        public paymentType?: string,
        public recipientAddress?: string,
        public recipientCity?: string,
        public recipientName?: string,
        public recipientPostalCode?: string,
        public treatmentId?: number,
        public invoiceItems?: IServiceItem[],
        public isUpdated?: boolean
    ) { }
}
