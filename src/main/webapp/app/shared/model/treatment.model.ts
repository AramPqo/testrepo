export interface ITreatment {
  id?: number;
  description?: string;
  duration?: number;
  colorCode?: string;
  businessId?: number;
}

export class Treatment implements ITreatment {
  constructor(
    public id?: number,
    public description?: string,
    public duration?: number,
    public colorCode?: string,
    public businessId?: number
  ) {}
}
