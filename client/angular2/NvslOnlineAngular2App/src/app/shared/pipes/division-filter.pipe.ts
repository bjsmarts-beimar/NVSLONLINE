import { Pipe, PipeTransform } from '@angular/core';
import { ITeam } from '../interfaces/interfaces';

@Pipe({
  name: 'divisionFilter'
})
export class DivisionFilterPipe implements PipeTransform {

  transform(teams: ITeam[], args1: number, args2: number): any {

    if ( teams !== undefined )
    {
      return teams.filter(team => team.DivisionId === args1 && team.SeasonId === args2 )
    }
            
  }
}
