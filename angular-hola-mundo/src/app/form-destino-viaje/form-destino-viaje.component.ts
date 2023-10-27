import { Component, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg:FormGroup;
  minLongitud = 3;
  searchResults:any;

  constructor(fb:FormBuilder){
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
				this.nombreValidatorParametrizable(this.minLongitud)
      ])],
    url: [''/*, Validators.required*/]
    });

    this.fg.valueChanges.subscribe((form:any) => {
      console.log("cambio: ",form)
    });
  }

  ngOnInit(){
    const elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
    .pipe(
      map((e:KeyboardEvent)=>(e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(()=>ajax('/assets/datos.json'))
    ).subscribe(ajaxResponse => {
      this.searchResults = ajaxResponse.response;
    })
  }

  guardar(nombre:string, url:string){
    let d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control:FormControl):{ [s:string]: boolean } | null {
    let l = control.value.toString().trim().length;
    if(l>0 && l<5){
      return {invalidNombre:true};
    }
    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
		return (control: FormControl): { [s: string]: boolean } | null => {
			const l = control.value.toString().trim().length;
			if (l > 0 && l < minLong) {
				return { minLongNombre: true };
			}
			return null;
		}
	}
}
