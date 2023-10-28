import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje.model';
import { HttpClient, HttpClientModule, HttpHeaderResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { FunctionExpr } from '@angular/compiler';

// ESTADO
export interface DestinosViajesState {
	items: DestinoViaje[];
	loading: boolean;
	favorito: DestinoViaje;
}

export function initializeDestinosViajesState () {
	return {
		items: [],
		loading: false,
		favorito: null
	};
};

// ACCIONES
export enum DestinosViajesActionTypes {
	NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
	ELIMINAR_DESTINO = '[Destinos Viajes] Eliminado',
	ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
	VOTE_UP = '[Destinos Viajes] Vote Up',
	VOTE_DOWN = '[Destinos Viajes] Vote Down',
	VOTE_RESET_ALL = '[Destinos Viajes] Reset Vote All',
	INIT_MY_DATA = '[Destinos Viajes] Init My Data'
}

export class NuevoDestinoAction implements Action {
	type = DestinosViajesActionTypes.NUEVO_DESTINO;
	constructor(public destino: DestinoViaje) {}
}

export class EliminadoDestinoAction implements Action {
	type = DestinosViajesActionTypes.ELIMINAR_DESTINO;
	constructor(public destino: DestinoViaje) { }
}

export class ElegidoFavoritoAction implements Action {
	type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
	constructor(public destino: DestinoViaje) {}
}

export class VoteUpAction implements Action {
	type = DestinosViajesActionTypes.VOTE_UP;
	constructor(public destino: DestinoViaje) { }
}

export class VoteDownAction implements Action {
	type = DestinosViajesActionTypes.VOTE_DOWN;
	constructor(public destino: DestinoViaje) { }
}

export class VoteResetAllAction implements Action {
	type = DestinosViajesActionTypes.VOTE_RESET_ALL;
	constructor(public destino: DestinoViaje) { }
}

export class InitMyDataAction implements Action {
	type = DestinosViajesActionTypes.INIT_MY_DATA;
	constructor(public destino: string[]) { }
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | EliminadoDestinoAction |
VoteUpAction | VoteDownAction | VoteResetAllAction | InitMyDataAction;

// REDUCERS
export function reducerDestinosViajes(
	state: DestinosViajesState,
	action: DestinosViajesActions
): DestinosViajesState {
	switch (action.type) {
		case DestinosViajesActionTypes.INIT_MY_DATA: {
			const destinos: string[] = (action as InitMyDataAction).destino;
			return {
				...state,
				items: destinos.map((d)=>new DestinoViaje(d, ""))
			};
		}
		case DestinosViajesActionTypes.NUEVO_DESTINO: {
			return {
				...state,
				items: [...state.items, (action as NuevoDestinoAction).destino]
			};
		}
		case DestinosViajesActionTypes.ELIMINAR_DESTINO: {
			const d: DestinoViaje = (action as EliminadoDestinoAction).destino;
			return {
				...state,
				items: state.items.filter(x => x.id !== d.id),
				favorito: (state.favorito.id === d.id) ? null : state.favorito
			};
		}
		case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
			state.items.forEach(x => x.setSelected(false));
			const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
			fav.setSelected(true);
			return {
				...state,
				favorito: fav
			};
		}
		case DestinosViajesActionTypes.VOTE_UP: {
			const d: DestinoViaje = (action as VoteUpAction).destino;
			d.voteUp();
			return { ...state };
		}
		case DestinosViajesActionTypes.VOTE_DOWN: {
			const d: DestinoViaje = (action as VoteDownAction).destino;
			d.voteDown();
			return { ...state };
		}
		case DestinosViajesActionTypes.VOTE_RESET_ALL: {
			const d: DestinoViaje = (action as VoteResetAllAction).destino;
			d.voteReset();
			return { ...state };
		}
	}
	return state;
}

// EFFECTS
@Injectable()
export class DestinosViajesEffects {

	nuevoAgregado$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(
			ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
			map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
		)
  	);

	constructor(private actions$: Actions) { }
}