import { ISchedule, ISeason, IDivision, IVenue, ITeam } from '../interfaces/interfaces';

export class Schedule implements ISchedule{    
    
    constructor (public Id: number, public SeasonId: number, public Season: ISeason, public DivisionId: number, public Division: IDivision, public VenueId: number, public Venue: IVenue, public Status: string, public DateTime: string, public HomeTeamId: number, public HomeTeam: ITeam, public AwayTeamId: number, public AwayTeam: ITeam, public IsHidden: boolean) {
        this.Id = Id;            
        this.SeasonId = SeasonId;
        this.Season = Season;
        this.DivisionId = DivisionId;
        this.Division = Division;
        this.VenueId = VenueId;
        this.Venue = Venue;
        this.Status = Status;
        this.DateTime = DateTime;
        this.HomeTeamId = HomeTeamId;
        this.HomeTeam = HomeTeam;
        this.AwayTeamId = AwayTeamId;
        this.AwayTeam = AwayTeam    
        this.IsHidden = IsHidden;
    } 
}




