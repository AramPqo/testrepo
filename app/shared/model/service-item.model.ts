export interface IServiceItem {
  id?: number | string;
  description?: string;
  price?: number;
  invoiceId?: number,
  vatRate?: number;
}

export class ServiceItem implements IServiceItem {
  constructor(
    public id?: number | string,
    public description?: string,
    public invoiceId?: number,
    public price?: number,
    public vatRate?: number,
  ) { }
}
