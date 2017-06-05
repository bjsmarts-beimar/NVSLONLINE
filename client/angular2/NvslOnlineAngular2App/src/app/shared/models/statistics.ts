import { IStatistics } from '../interfaces/interfaces';

export class Statistics implements IStatistics {
    constructor (public TeamName: string, public DivisionId: number, public SeasonId: number, public Wins: number, public Loses: number, public Ties: number, public Points: number ) {
        this.TeamName = TeamName;    
        this.DivisionId = DivisionId;   
        this.SeasonId = SeasonId;
        this.Wins = Wins;
        this.Loses = Loses;
        this.Ties = Ties;
        this.Points = Points;   
    } 
}

