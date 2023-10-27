import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { VoteDownAction, VoteResetAllAction, VoteUpAction } from '../models/destinos-viajes-state.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent {
  @Input() destino:DestinoViaje = new DestinoViaje("","");
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

  ir(){
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
