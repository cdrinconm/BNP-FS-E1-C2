import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { VoteDownAction, VoteResetAllAction, VoteUpAction } from '../../models/destinos-viajes-state.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css'],
  animations: [
    trigger('esFavorito', [
      state('estadoFavorito', style({
        backgroundColor: 'PaleTurquoise'
      })),
      state('estadoNoFavorito', style({
        backgroundColor: 'WhiteSmoke'
      })),
      transition('estadoNoFavorito => estadoFavorito', [
        animate('3s')
      ]),
      transition('estadoFavorito => estadoNoFavorito', [
        animate('1s')
      ])
    ])
  ]
})
export class DestinoViajeComponent {
  @Input() destino:DestinoViaje;
  @Input('idx') position:number = 0;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked:EventEmitter<DestinoViaje>;
	@Output() deleted: EventEmitter<DestinoViaje>;

  constructor(private store: Store<AppState>){
    this.clicked = new EventEmitter();
		this.deleted = new EventEmitter();
  }

  ngOnInit(){

  }

  ir(): boolean {
		this.clicked.emit(this.destino);
		return false;
	}

  voteUp(): boolean {
		this.store.dispatch(new VoteUpAction(this.destino));
		return false;
	}

	voteDown(): boolean {
		this.store.dispatch(new VoteDownAction(this.destino));
		return false;
	}

	voteReset(): boolean {
    this.store.dispatch(new VoteResetAllAction(this.destino));
		return false;
	}

	eliminar(): boolean {
		this.deleted.emit(this.destino);
		return false;
	}
}
