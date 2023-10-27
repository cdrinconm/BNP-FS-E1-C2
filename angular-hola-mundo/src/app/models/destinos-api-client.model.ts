import { Injectable } from "@angular/core";
import { DestinoViaje } from "./destino-viaje.model";
import { BehaviorSubject, Subject } from "rxjs";
import { AppState } from "../app.module";
import { ElegidoFavoritoAction, EliminadoDestinoAction, NuevoDestinoAction } from "./destinos-viajes-state.model";
import { Store } from "@ngrx/store";

@Injectable()
export class DestinosApiClient {
    
    constructor(private store:Store<AppState>){}

    add(d: DestinoViaje): void {
		this.store.dispatch(new NuevoDestinoAction(d));
	}

    delete(d: DestinoViaje): void {
		this.store.dispatch(new EliminadoDestinoAction(d));
	}

    elegir(d: DestinoViaje): void {
        this.store.dispatch(new ElegidoFavoritoAction(d));
	}
}