import { Pipe, PipeTransform } from '@angular/core';
import { ISchedule } from '../interfaces/interfaces';

@Pipe({
  name: 'divisionScheduleFilter'
})
export class DivisionScheduleFilterPipe implements PipeTransform {

  transform(schedules: ISchedule[], args?: any): any {
    
    if ( schedules !== undefined )
    {
      return schedules.filter(schedule => schedule.Division.Id === args )
    }
        
  }
}
