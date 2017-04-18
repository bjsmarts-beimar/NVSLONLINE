import { IDivision } from '../interfaces/interfaces';

export class Division implements IDivision{    
    
    constructor (public Id: number, public DivisionName: string, public IsHidden: boolean) {
        this.Id = Id;
        this.DivisionName = DivisionName;        
        this.IsHidden = IsHidden;
    } 
}