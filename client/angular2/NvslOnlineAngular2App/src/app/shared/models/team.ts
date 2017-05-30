import { ITeam } from '../interfaces/interfaces';
import { Division } from './division';
import { Season } from './season';

export class Team implements ITeam {    
    
    constructor (public Id: number, public TeamName: string, public IsHidden: boolean, public DivisionId: number, public Division: Division, public SeasonId: number, public Season: Season  ) {
        this.Id = Id;
        this.TeamName = TeamName;        
        this.IsHidden = IsHidden;
        this.DivisionId = DivisionId;
        this.Division = Division;
        this.SeasonId = SeasonId;
        this.Season = Season;
    } 
}

