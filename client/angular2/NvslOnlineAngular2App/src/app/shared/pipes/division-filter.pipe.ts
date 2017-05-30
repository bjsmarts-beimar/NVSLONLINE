import { Pipe, PipeTransform } from '@angular/core';
import { ITeam } from '../interfaces/interfaces';

@Pipe({
  name: 'divisionFilter'
})
export class DivisionFilterPipe implements PipeTransform {

  transform(teams: ITeam[], args?: any): any {

    if ( teams !== undefined )
    {
      return teams.filter(team => team.DivisionId === args )
    }        
  }
}
