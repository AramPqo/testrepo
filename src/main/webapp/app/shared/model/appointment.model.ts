import { Moment } from 'moment';

export interface IAppointment {
  id?: number;
  startDate?: Moment | string | Date;
  endDate?: Moment | string | Date;
  title?: string;
  cancelled?: boolean;
  colorCode?: string;
  missed?: boolean;
  notes?: string;
  userId?: number;
  patientId?: number;
  treatmentId?: number;
  isUpdated?: boolean;
}

export class Appointment implements IAppointment {
  constructor(
    public id?: number,
    public startDate?: Moment | string | Date,
    public endDate?: Moment | string | Date,
    public title?: string,
    public cancelled?: boolean,
    public colorCode?: string,
    public missed?: boolean,
    public notes?: string,
    public userId?: number,
    public patientId?: number,
    public treatmentId?: number,
    public isUpdated?: boolean
  ) {
    this.cancelled = this.cancelled || false;
    this.missed = this.missed || false;
  }
}
