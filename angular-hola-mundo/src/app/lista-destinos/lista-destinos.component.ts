import { Component, OnInit, HostBinding } from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje-model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent {
  destinos:DestinoViaje[];
  @HostBinding('attr.class') cssClass = 'col-md-4';
  constructor(){
    this.destinos = [
      {nombre:"Madrid",imagenUrl:"www.madrid.com"},
      {nombre:"Londres",imagenUrl:"www.londres.com"},
      {nombre:"Paris",imagenUrl:"www.paris.com"}
    ];
  }

  ngOnInit(){

  }

  guardar(n:string,	u:string):boolean	{
    this.destinos.push(new DestinoViaje(n,	u));
    return false;
  }
}
