import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = true;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes()
        .subscribe( (resp: any) => {
          console.log(resp);
          this.heroes = resp;
          this.cargando = false;
        });
  }

  borrarHeroe(id: string, i: number): any {

    Swal.fire({
      title: 'Esta seguro de borrarlo?',
      text: '',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {

      if ( resp.value){
        this.heroes.splice(i, 1 );
        this.heroesService.deleteHeroe(id)
        .subscribe((response: any) => {
          console.log(response);
        });
      }
    });


  }

}
