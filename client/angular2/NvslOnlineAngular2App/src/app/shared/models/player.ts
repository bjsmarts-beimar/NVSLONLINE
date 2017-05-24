import { IPlayer } from '../interfaces/interfaces';

export class Player implements IPlayer {
    constructor (public Id: number, public FirstName: string, public LastName: string, public IsHidden: boolean, public TeamId: number ) {
        this.Id = Id;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.IsHidden = IsHidden;
        this.TeamId = TeamId;
    }
}



