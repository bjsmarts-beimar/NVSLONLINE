import { Pipe, PipeTransform } from '@angular/core';

import { IResult } from '../interfaces/interfaces';

@Pipe({
  name: 'scheduleSeasonFilter'
})
export class ScheduleSeasonFilterPipe implements PipeTransform {

  transform(results: IResult[], args?: any): any {
    
    if ( results !== undefined ) {

      return results.filter(result => result.SeasonId === +args )

    }
  }  

}
