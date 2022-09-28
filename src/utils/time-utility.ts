export enum WeekDay{
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}


export class TimeUtility {

    private _date: Date;

    constructor(timestamp:number) {
        this._date = new Date(timestamp*1000);
    }

    getWeekDay() {
        const day = this._date.getDay();
        switch (day) {
            case 0:
                return WeekDay.SUNDAY;
            case 1:
                return WeekDay.MONDAY;
            case 2:
                return WeekDay.TUESDAY;
            case 3:
                return WeekDay.WEDNESDAY;
            case 4:
                return WeekDay.THURSDAY;
            case 5:
                return WeekDay.FRIDAY;
            case 6:
                return WeekDay.SATURDAY;
            default:
                return -1;
        }
    }

    getWeekDayAsLocalString() {
        const weekDay = this.getWeekDay();
        switch (weekDay) {
            case WeekDay.SUNDAY:
                return 'Sonntag';
            case WeekDay.MONDAY:
                return 'Montag';
            case WeekDay.TUESDAY:
                return 'Dienstag';
            case WeekDay.WEDNESDAY:
                return 'Mittwoch';
            case WeekDay.THURSDAY:
                return 'Donnerstag';
            case WeekDay.FRIDAY:
                return 'Freitag';
            case WeekDay.SATURDAY:
                return 'Samstag';
            default:
                return -1;
        }
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }
}