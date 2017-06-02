import { ITimeSchedule, IVenue } from '../interfaces/interfaces';

export class Timeschedule implements ITimeSchedule {
    constructor (public venue: IVenue, public day: string, public time: number) {
        this.venue = venue;
        this.day = day;
        this.time = time;
    } 
}

