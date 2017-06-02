

import { IResult, ITeam } from '../interfaces/interfaces';

export class Result implements IResult {

    constructor (public DivisionId: number, public DivisionName: string, public TotalCount: number, public IsActive: boolean, public SeasonId: number, public SeasonStartDate: string, public Teams: ITeam[]) {
        this.DivisionId = DivisionId;
        this.DivisionName = DivisionName;
        this.TotalCount = TotalCount;
        this.IsActive = IsActive;
        this.SeasonId = SeasonId;
        this.SeasonStartDate = SeasonStartDate;
        this.Teams = Teams;
    } 
}


