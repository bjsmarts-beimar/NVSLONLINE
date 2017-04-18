import { ISeason } from '../interfaces/interfaces';

export class Season implements ISeason{    
    
    constructor (public Id: number, public SeasonName: string, public Active: boolean, public IsHidden: boolean, public SeasonStart: string, public SeasonEnd: string ) {
        this.Id = Id;
        this.SeasonName = SeasonName;
        this.Active = Active;
        this.IsHidden = IsHidden;
        this.SeasonStart = SeasonStart;
        this.SeasonEnd = SeasonEnd;
    } 
}
