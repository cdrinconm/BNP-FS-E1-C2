import { UUID } from 'uuid-generator-ts';

export class DestinoViaje {
    
    selected:boolean;
    servicios:string[];
	id = new UUID();

    constructor(public nombre:string, public url:string, public votes:number=0){
        this.servicios = ['pileta', 'desayuno'];
    }

    isSelected():boolean{
        return this.selected;
    }

    setSelected(s:boolean){
        this.selected = s;
    }

    voteUp(): void {
		this.votes++;
	}

	voteDown(): void {
		this.votes--;
	}

	voteReset(): void {
		this.votes = 0;
	}
}