import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { Form, NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  constructor(private heroeService: HeroesService, private route: ActivatedRoute) { }

  heroe = new HeroeModel();


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (id !== 'nuevo'){
      this.heroeService.getHeroe(id)
        .subscribe((resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
        });

    }else{

    }
  }

  guardar( form: NgForm): any {

    if ( form.invalid ){
      console.log('Form no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
        peticion = this.heroeService.actualizarHeroe(this.heroe);
      }else{
        peticion = this.heroeService.crearHeroe(this.heroe);
      }

    peticion.subscribe( ( resp: any) => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actualizo correctamente',
          icon: 'success'
        });
      });

  }

}
