import { Pipe, PipeTransform } from '@angular/core';
import { IStatistics } from '../interfaces/interfaces';

@Pipe({
  name: 'statisticsFilter'
})
export class StatisticsFilterPipe implements PipeTransform {

  transform(stat: IStatistics[], args1: number, args2: number): any {

    if ( stat !== undefined )
    {      
      if ( stat.length > 0 ) {

        if ( args2 !== undefined ) {
            if ( args1 === +args2 ) {
              return stat.filter(team => team.DivisionId === args1 );
            }

        }
        else {
          return stat.filter(team => team.DivisionId === args1 );
        }
      }      

    }

  }

}
