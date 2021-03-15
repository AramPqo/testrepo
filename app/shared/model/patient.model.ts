import { Moment } from 'moment';
import { PaymentType } from './enumerations/payment-type.model';
import { ILocation } from './location.model';

export interface IPatient {
  id?: number;
  firstName?: string;
  lastName?: string;
  title?: string;
  gender?: string;
  dateOfBirth?: string | Moment | any;
  email?: string;
  phone?: string;
  mobile?: string;
  language?: string;
  insuranceNumber?: string;
  occupation?: string;
  employer?: string;
  initialDiagnose?: string;
  locationId?: number;
  location?: ILocation;
  insurerId?: number;
  startDate?: any;
  bluePrescription?: boolean;
  paymentType?: PaymentType;
  workPhone?: string;
  yearlyReceipt?: boolean;
}

export class Patient implements IPatient {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public title?: string,
    public gender?: string,
    public dateOfBirth?: string | Moment | any,
    public email?: string,
    public phone?: string,
    public mobile?: string,
    public language?: string,
    public insuranceNumber?: string,
    public occupation?: string,
    public employer?: string,
    public initialDiagnose?: string,
    public locationId?: number,
    public location?: ILocation,
    public insurerId?: number,
    public startDate?: any,
    public bluePrescription?: boolean,
    public paymentType?: PaymentType,
    public workPhone?: string,
    public yearlyReceipt?: boolean
  ) { }
}
