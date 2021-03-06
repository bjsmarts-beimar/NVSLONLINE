

export interface ITeam {
    Id : number;
    TeamName : string;
    IsHidden : boolean;
    DivisionId : number;
    Division : IDivision;
    SeasonId : number;
    Season: ISeason;    
}

export interface ISchedule {
    Id: number;
    SeasonId: number;
    Season: ISeason;
    DivisionId: number;
    Division: IDivision;
    VenueId: number;
    Venue: IVenue;
    Status: string;
    DateTime: string;
    HomeTeamId: number;
    HomeTeam: ITeam;
    AwayTeamId: number;
    AwayTeam: ITeam;
    IsHidden: boolean;
    GoalsHomeTeam: number;
    GoalsAwayTeam: number;
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

export interface IPlayer {
    Id : number;
    FirstName: string;
    LastName: string;
    IsHidden: boolean;
    TeamId: number;    
}

export interface IResult {
    DivisionId: number;
    DivisionName: string;
    TotalCount: number;
    IsActive: boolean;
    SeasonId: number;
    SeasonStartDate: string;
    Teams: ITeam[];
}

export interface IStatistics {
    TeamName: string;
    DivisionId: number;  
    SeasonId: number;
    Wins: number;
    Loses: number;
    Ties: number;  
    Points: number;
}


export interface ITimeSchedule {    
    venue: IVenue
    day: string;    
    time: number;    
}







