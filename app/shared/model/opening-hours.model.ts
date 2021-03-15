import { DayOfWeek } from 'app/shared/model/enumerations/day-of-week.model';

export interface IOpeningHours {
  id?: number;
  dayOfWeek?: DayOfWeek;
  startTime?: string;
  endTime?: string;
  businessId?: number;
}

export class OpeningHours implements IOpeningHours {
  constructor(
    public id?: number,
    public dayOfWeek?: DayOfWeek,
    public startTime?: string,
    public endTime?: string,
    public businessId?: number
  ) {}
}
