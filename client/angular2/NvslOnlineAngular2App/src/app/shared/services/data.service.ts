import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { ISeason, IDivision, IVenue, INews, ITeam, IPlayer, ISchedule } from '../interfaces/interfaces';
import { Season } from '../models/season';
import { Division } from '../models/division';
import { Venue } from '../models/venue';
import { News } from '../models/news';
import { Team } from '../models/team';
import { Player } from '../models/player';
import { Schedule } from '../models/schedule';

import * as global from "../global"; 

@Injectable()
export class DataService {

    constructor(private http: Http) { }

    getSchedules(): Observable<ISchedule[]> {        

        let url = global.url + "api/Schedules";
        
        return this.http.get(url)
                   .map((res: Response) => {
                        return res.json();
                    })
                   .catch(this.handleError);            
    }

    getSchedule(id: number): Observable<ISchedule> {
        return this.getSchedules()
                   .map((schedules: ISchedule[]) => schedules.find(p => p.Id === id));
    }

    addSchedule(schedule: Schedule) : Observable<any> {
        
        let url = global.url + "api/Schedules";

        let body = JSON.stringify(schedule);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
                         .map((res: Response) => {
                            return res.json();
                         })
                         .catch(this.handleError);
    }

    updateSchedule(schedule: Schedule) : Observable<any> {
        
        let url = global.url + "api/Schedules/" + schedule.Id;

        let body = JSON.stringify(schedule);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });        

        return this.http.put(url, body, options)                         
                        .catch(this.handleError);
    }

    getPlayers(): Observable<IPlayer[]> {        

        let url = global.url + "api/Players";
        
        return this.http.get(url)
                   .map((res: Response) => {
                        return res.json();
                    })
                   .catch(this.handleError);            
    }

    getPlayer(id: number): Observable<IPlayer> {
        return this.getPlayers()
                   .map((players: IPlayer[]) => players.find(p => p.Id === id));
    }

    addPlayer(player: Player) : Observable<any> {
        
        let url = global.url + "api/Players";

        let body = JSON.stringify(player);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
                         .map((res: Response) => {
                            return res.json();
                         })
                         .catch(this.handleError);
    }

    deletePlayer(id: number) : Observable<any> {
        
        let url = global.url + "api/Players/" + id;

        return this.http.delete(url)
                   .map((res: Response) => {
                        return res.json();
                    })
                   .catch(this.handleError);
    }

    updatePlayer(player: Player) : Observable<any> {
        
        let url = global.url + "api/Players/" + player.Id;

        let body = JSON.stringify(player);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });        

        return this.http.put(url, body, options)                         
                        .catch(this.handleError);
    }

    getTeams(): Observable<ITeam[]> {        

        let url = global.url + "api/Teams";
        
        return this.http.get(url)
                   .map((res: Response) => {
                        return res.json();
                    })
                   .catch(this.handleError);            
    }

    getTeam(id: number): Observable<ITeam> {
        return this.getTeams()
                   .map((teams: ITeam[]) => teams.find(p => p.Id === id));
    }

    addTeam(team: Team) : Observable<any> {
        
        let url = global.url + "api/Teams";

        let body = JSON.stringify(team);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
                         .map((res: Response) => {
                            return res.json();
                         })
                         .catch(this.handleError);
    }

    deleteTeam(id: number) : Observable<any> {
        
        let url = global.url + "api/Teams/" + id;

        return this.http.delete(url)
                   .map((res: Response) => {
                        return res.json();
                    })
                   .catch(this.handleError);
    }

    updateTeam(team: Team) : Observable<any> {
        
        let url = global.url + "api/Teams/" + team.Id;

        let body = JSON.stringify(team);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });        

        return this.http.put(url, body, options)                         
                        .catch(this.handleError);
    }

    getSeasons(): Observable<ISeason[]> {        

        let url = global.url + "api/Seasons";
        
        return this.http.get(url)
                   .map((res: Response) => {
                        return res.json();
                    })
                   .catch(this.handleError);            
    }

    getSeason(id: number): Observable<ISeason> {
        return this.getSeasons()
                   .map((regions: ISeason[]) => regions.find(p => p.Id === id));
    }

    deleteSeason(id: number) : Observable<any> {
        
        let url = global.url + "api/Seasons/" + id;

        return this.http.delete(url)
                   .map((res: Response) => {
                        return res.json();
                    })
                   .catch(this.handleError);

    }

    addSeason(season: Season) : Observable<any> {
        
        let url = global.url + "api/Seasons";

        let body = JSON.stringify(season);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
                         .map((res: Response) => {
                            return res.json();
                         })
                         .catch(this.handleError);
    }

    updateSeason(season: Season) : Observable<any> {
        
        let url = global.url + "api/Seasons/" + season.Id;

        let body = JSON.stringify(season);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });        

        return this.http.put(url, body, options)                         
                        .catch(this.handleError);
    }

    getDivisions(): Observable<IDivision[]> {        

        let url = global.url + "api/Divisions";
        
        return this.http.get(url)
                   .map((res: Response) => {
                        return res.json();
                    })
                   .catch(this.handleError);            
    }

    getDivision(id: number): Observable<IDivision> {
        return this.getDivisions()
                   .map((regions: IDivision[]) => regions.find(p => p.Id === id));
    }

    deleteDivision(id: number) : Observable<any> {
        
        let url = global.url + "api/Divisions/" + id;

        return this.http.delete(url)
                   .map((res: Response) => {
                        return res.json();
                    })
                   .catch(this.handleError);

    }

    addDivision(division: Division) : Observable<any> {
        
        let url = global.url + "api/Divisions";

        let body = JSON.stringify(division);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
                         .map((res: Response) => {
                            return res.json();
                         })
                         .catch(this.handleError);
    }

    updateDivision(division: Division) : Observable<any> {
        
        let url = global.url + "api/Divisions/" + division.Id;

        let body = JSON.stringify(division);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });        

        return this.http.put(url, body, options)                         
                        .catch(this.handleError);
    }

    getVenues(): Observable<IVenue[]> {        

        let url = global.url + "api/Venues";
        
        return this.http.get(url)
                   .map((res: Response) => {
                        return res.json();
                    })
                   .catch(this.handleError);            
    }

    getVenue(id: number): Observable<IVenue> {
        return this.getVenues()
                   .map((venues: IVenue[]) => venues.find(p => p.Id === id));
    }

    deleteVenue(id: number) : Observable<any> {
        
        let url = global.url + "api/Venues/" + id;

        return this.http.delete(url)
                   .map((res: Response) => {
                        return res.json();
                    })
                   .catch(this.handleError);

    }

    addVenue(venue: Venue) : Observable<any> {
        
        let url = global.url + "api/Venues";

        let body = JSON.stringify(venue);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
                         .map((res: Response) => {
                            return res.json();
                         })
                         .catch(this.handleError);
    }

    updateVenue(venue: Venue) : Observable<any> {
        
        let url = global.url + "api/Venues/" + venue.Id;

        let body = JSON.stringify(venue);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });        

        return this.http.put(url, body, options)                         
                        .catch(this.handleError);
    }

    getNews(): Observable<INews[]> {        

        let url = global.url + "api/News";
        
        return this.http.get(url)
                   .map((res: Response) => {
                        return res.json();
                    })
                   .catch(this.handleError);            
    }

    getSingleNews(id: number): Observable<INews> {
        return this.getNews()
                   .map((news: INews[]) => news.find(p => p.Id === id));
    }

    deleteSingleNews(id: number) : Observable<any> {
        
        let url = global.url + "api/News/" + id;

        return this.http.delete(url)
                   .map((res: Response) => {
                        return res.json();
                    })
                   .catch(this.handleError);

    }

    addSingleNews(news: News) : Observable<any> {
        
        let url = global.url + "api/News";

        let body = JSON.stringify(news);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
                         .map((res: Response) => {
                            return res.json();
                         })
                         .catch(this.handleError);
    }

    updateSingleNews(news: News) : Observable<any> {
        
        let url = global.url + "api/News/" + news.Id;

        let body = JSON.stringify(news);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });        

        return this.http.put(url, body, options)                         
                        .catch(this.handleError);
    }

    private handleError(error: any) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors: string = '';

        if (!serverError.type) {
            console.log(serverError);
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }   

}
