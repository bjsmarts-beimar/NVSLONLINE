import { IVenue } from '../interfaces/interfaces';

export class Venue implements IVenue{    
    
    constructor (public Id: number, public VenueName: string, public IsHidden: boolean) {
        this.Id = Id;
        this.VenueName = VenueName;        
        this.IsHidden = IsHidden;
    } 
}