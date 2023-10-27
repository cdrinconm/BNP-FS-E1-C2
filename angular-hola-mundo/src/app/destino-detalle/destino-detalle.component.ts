import { Component } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClient } from '../models/destinos-api-client.model';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css']
})
export class DestinoDetalleComponent {
  destino: DestinoViaje;

	constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) { }

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		this.destino = null;
	}
}
