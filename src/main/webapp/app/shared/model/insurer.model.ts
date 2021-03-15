export interface IInsurer {
  id?: number;
  name?: string;
  abbr?: string;
}

export class Insurer implements IInsurer {
  constructor(public id?: number, public name?: string, public abbr?: string) {}
}
