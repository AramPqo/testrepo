import { Moment } from "moment";

export interface IExpense {
    id?: number;
    accountNumber?: string;
    date?: string | Moment | any;
    businessId?: number;
    name?: string;
    subject?: string;
    total?: number;
    voucherNumber?: string;
}

export class Expense implements IExpense {
    constructor(
        public id?: number,
        public accountNumber?: string,
        public date?: string | Moment | any,
        public businessId?: number,
        public name?: string,
        public subject?: string,
        public total?: number,
        public voucherNumber?: string
    ) { }
}
