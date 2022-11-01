export interface Note {
    text: string;
    id: number;
    date: string;
    time: string;
}

export class Note implements Note {
    constructor(text: string, id: number) {
        this.text = text;
        this.id = id;
        const dateObject = new Date();
        this.date = dateObject.toLocaleDateString('de-DE', {day: "2-digit", month: "long", year: "numeric"});
        this.time = dateObject.toLocaleTimeString('de-DE', {hour: "2-digit", minute: "2-digit"});
    }
}

