export interface Note {
    text: string;
    id: number;
    date: Date;
}

export class Note implements Note {
    constructor(text: string, id:number) {
        this.text = text;
        this.id = id;
        this.date = new Date();
    }
}

