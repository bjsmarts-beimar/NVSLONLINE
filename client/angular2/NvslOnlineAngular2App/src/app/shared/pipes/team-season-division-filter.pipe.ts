import { Pipe, PipeTransform } from '@angular/core';
import { ITeam } from '../interfaces/interfaces';

@Pipe({
  name: 'teamSeasonDivisionFilter'
})
export class TeamSeasonDivisionFilterPipe implements PipeTransform {

  transform(teams: ITeam[], args1: number, args2: number): any {
    if ( teams !== undefined )
    {
      if ( args1 === undefined && args2 === undefined ) {        
        return teams;
      } 
      else if ( args1 !== undefined && args2 === undefined ) {
        return teams.filter(team => team.Season.Id === +args1 );      
      }
      else if ( args1 === undefined && args2 === undefined ) {
        return teams.filter(team => team.Division.Id === +args2 );
      }
      else if ( args1 !== undefined && args2 !== undefined ) {
        return teams.filter(team => team.Division.Id === +args2 && team.Season.Id === +args1 );
      }
    }    
  }

}
