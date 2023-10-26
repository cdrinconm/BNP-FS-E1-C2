import { Component, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje-model';
import { DestinosApiClient } from './../models/destinos-api-client.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];

  constructor(private destinosApiClient:DestinosApiClient){
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.destinosApiClient.subscribeOnChance((d:DestinoViaje)=> {
      if(d != null){
        this.updates.push("se ha elegido: " + d.nombre)
      }
    })
  }

  ngOnInit(){

  }

  agregado(d:DestinoViaje)	{
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }
  
  elegido(e:DestinoViaje){
    this.destinosApiClient.elegir(e);
  }

  getAll(): DestinoViaje[] {
		return this.destinosApiClient.getAll();
	}
}
