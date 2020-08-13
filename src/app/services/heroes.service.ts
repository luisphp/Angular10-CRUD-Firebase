import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  constructor(private http: HttpClient) { }

  deleteHeroe(id: string): any{
    return this.http.delete(`https://login-app-angular10-ed82e.firebaseio.com/heroes/${ id }.json`);
  }

  crearHeroe(heroe: HeroeModel): any {
    return this.http.post(`https://login-app-angular10-ed82e.firebaseio.com/heroes.json`, heroe)
      .pipe(
        map( (resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  }

  actualizarHeroe(heroe: HeroeModel): any {
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`https://login-app-angular10-ed82e.firebaseio.com/heroes/${ heroe.id }.json`, heroeTemp )
    .pipe(
      map( (resp: any) => {
        return heroe;
      })
    );
  }

  getHeroes(): any{
    return this.http.get('https://login-app-angular10-ed82e.firebaseio.com/heroes.json')
      .pipe(
        map((resp: any) => {
          return this.crearArreglo(resp);
        })
      );
  }

  private crearArreglo(heroesObjs: object): any{
    if ( heroesObjs === null) {return []; }
    const heroes: HeroeModel[] = [];
    console.log(heroesObjs);

    Object.keys(heroesObjs).forEach( key => {
      const heroe: HeroeModel = heroesObjs[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }

  getHeroe(id: string): any{
    return this.http.get(`https://login-app-angular10-ed82e.firebaseio.com/heroes/${ id }.json`);
  }
}
