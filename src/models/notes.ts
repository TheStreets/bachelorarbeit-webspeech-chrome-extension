export interface Note {
    text: string;
    id: number;
    date: string;
}

export class Note implements Note {
    constructor(text: string, id: number) {
        this.text = text;
        this.id = id;
        this.date = new Date().toLocaleDateString('de-DE', {day: "2-digit", month: "long", year: "numeric"});
    }
}

