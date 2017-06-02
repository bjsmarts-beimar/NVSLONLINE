import { Pipe, PipeTransform } from '@angular/core';
import { ISchedule } from '../interfaces/interfaces';


@Pipe({
  name: 'scheduleSeasonDivision'
})
export class ScheduleSeasonDivisionPipe implements PipeTransform {

  transform(schedules: ISchedule[], args1: number, args2: number, args3: number): any {
    if ( schedules !== undefined )
    {
      if ( args1 === 0 ) 
      {
          if ( args2 === undefined && args3 === undefined ) {        
              return schedules;
          }
          else if ( args2 !== undefined && args3 === undefined ) {
             return schedules.filter(schedule => schedule.SeasonId === +args2 );      
          }
          else if ( args2 === undefined && args3 !== undefined ) {
              return schedules.filter(schedule => schedule.DivisionId === +args3 );
          }
          else if ( args2 !== undefined && args3 !== undefined ) {
             return schedules.filter(schedule => schedule.DivisionId === +args3 && schedule.SeasonId === +args2 );
          }
      }
      if ( args3 === undefined )
      {
          if ( args1 !== undefined && args2 !== undefined ) {
             return schedules.filter(schedule => schedule.DivisionId === +args1 && schedule.SeasonId === +args2 );
          }
      }      
      else {
          if ( args1 === +args3 )
          {
              return schedules.filter(schedule => schedule.DivisionId === +args1 && schedule.SeasonId === +args2 );
          }
          else {
              return null;
          }
      }

      // if ( args1 === undefined && args2 === undefined ) {        
      //   return schedules;
      // } 
      // else if ( args1 !== undefined && args2 === undefined ) {
      //   return schedules.filter(schedule => schedule.SeasonId === +args1 );      
      // }
      // else if ( args1 === undefined && args2 !== undefined ) {
      //   return schedules.filter(schedule => schedule.DivisionId === +args2 );
      // }
      // else if ( args1 !== undefined && args2 !== undefined ) {
      //   return schedules.filter(schedule => schedule.DivisionId === +args2 && schedule.SeasonId === +args1 );
      // }
    }    
  }

}
