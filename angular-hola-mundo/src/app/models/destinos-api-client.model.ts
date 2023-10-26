import { Injectable } from "@angular/core";
import { DestinoViaje } from "./destino-viaje-model";
import { BehaviorSubject, Subject } from "rxjs";

export class DestinosApiClient {
    
    destinos: DestinoViaje[];
    current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

    constructor(){
        this.destinos = [];
    }

    add(d: DestinoViaje): void {
		this.destinos.push(d)
	}

    getAll(): DestinoViaje[] {
		return this.destinos;
	}

    getById(id:string){
        return this.destinos.filter(function(d){return d.id.toString() === id;}[0])
    }

    elegir(d: DestinoViaje): void {
		this.destinos.forEach(x => {
            x.setSelected(true);
            this.current.next(d);
        });
	}
    subscribeOnChance(fn){
        this.current.subscribe(fn);
    }
}