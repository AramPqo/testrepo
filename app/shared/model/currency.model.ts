export interface ICurrency {
  id?: number;
  name?: string;
  isoCode?: string;
  symbol?: string;
}

export class Currency implements ICurrency {
  constructor(public id?: number, public name?: string, public isoCode?: string, public symbol?: string) {}
}
