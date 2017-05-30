import { Pipe, PipeTransform } from '@angular/core';
import { IPlayer } from '../interfaces/interfaces';

@Pipe({
  name: 'playerFilter'
})
export class PlayerFilterPipe implements PipeTransform {

  transform(players: IPlayer[], args?: any): any {
    if ( players !== undefined )
    {
      return players.filter(player => player.TeamId === args )
    }  
  }

}
