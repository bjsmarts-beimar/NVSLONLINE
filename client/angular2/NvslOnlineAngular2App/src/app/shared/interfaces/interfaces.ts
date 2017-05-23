
export interface ITeam {
    Id : number;
    TeamName : string;
    IsHidden : boolean;
    DivisionId : number;
    Division : IDivision;
    SeasonId : number;
    Season: ISeason;
}

export interface INews {
    Id: number;    
    title: string;
    description: string;
    IsHidden: boolean;
    created: string;
}

export interface ISeason {
    Id : number;
    SeasonName: string;
    Active: boolean;
    IsHidden: boolean;
    SeasonStart: string;
    SeasonEnd: string;
}

export interface IDivision {
    Id : number;
    DivisionName: string;    
    IsHidden: boolean;
}

export interface IVenue {
    Id : number;
    VenueName: string;    
    IsHidden: boolean;
}






