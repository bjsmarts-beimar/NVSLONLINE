import { Pipe, PipeTransform } from '@angular/core';
import { ISchedule } from '../interfaces/interfaces';

@Pipe({
  name: 'gameTeamFilter'
})
export class GameTeamFilterPipe implements PipeTransform {

  transform(games: ISchedule[], args?: any): any {
    
    if ( games !== undefined )
    {
      return games.filter(team => team.HomeTeam.Id === args || team.AwayTeam.Id === args )      
    }   
  }

}
