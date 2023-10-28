import { Component, Inject, Injectable, InjectionToken } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { AppState } from 'src/app/app.module';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
	DestinosApiClient
]
})
export class DestinoDetalleComponent {
  destino: DestinoViaje;

	constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) { }

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		this.destino = this.destinosApiClient.getById(id);
	}
}
