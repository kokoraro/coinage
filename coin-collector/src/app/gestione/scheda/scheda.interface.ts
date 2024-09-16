export class Quantity {
    constructor(public value: number, public unit: string) { };
}
  
export interface Unit {
    unit: string;
    prefix?: boolean;
}
  