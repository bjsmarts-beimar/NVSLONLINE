import { INews } from '../interfaces/interfaces';

export class News implements INews{    
    
    constructor (public Id: number, public title: string, public description: string,  public IsHidden: boolean, public created: string) {
        this.Id = Id;
        this.title = title;
        this.description = description;
        this.IsHidden = IsHidden;
        this.created = created;
    } 
}