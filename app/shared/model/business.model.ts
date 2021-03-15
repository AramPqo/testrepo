export interface IBusiness {
  id?: number;
  name?: string;
  description?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  website?: string;
  logo?: string;
  emailFooter?: string;
  vatNumber?: string;
  bankName?: string;
  iban?: string;
  bic?: string;
  currencyId?: number;
  locationId?: number;
  showPatientName?: boolean;
  customColors?: string,
  invoiceNumber?: number
}

export class Business implements IBusiness {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public email?: string,
    public phone?: string,
    public mobile?: string,
    public website?: string,
    public logo?: string,
    public emailFooter?: string,
    public vatNumber?: string,
    public bankName?: string,
    public iban?: string,
    public bic?: string,
    public currencyId?: number,
    public locationId?: number,
    public showPatientName?: boolean,
    public customColors?: string,
    public invoiceNumber?: number
  ) { }
}
