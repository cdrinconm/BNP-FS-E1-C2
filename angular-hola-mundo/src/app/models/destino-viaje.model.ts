import { UUID } from 'uuid-generator-ts';

export class DestinoViaje {
    
    private selected:boolean = false;
    public servicios:string[];
	public id = new UUID();

    constructor(public nombre:string, public u:string, public votes:number=0){
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