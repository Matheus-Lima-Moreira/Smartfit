import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';

const OPENNING_HOURS = {
  morning: {
    start: '06',
    end: '12',
  },
  afternoon: {
    start: '12',
    end: '18',
  },
  night: {
    start: '18',
    end: '23',
  },
};

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night';

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }

  transformWeekDay(weekDay: number): string {
    switch (weekDay) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sáb.';
      default:
        return 'Seg. à Sex.';
    }
  }

  filterUnits(unit: Location, open_hour: string, close_hour: string): boolean {
    if(!unit.schedules) return true;

    let open_hour_number = parseInt(open_hour);
    let close_hour_number = parseInt(close_hour);

    const todays_weekday = this.transformWeekDay(new Date().getDay());

    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour;
      let schedule_weekday = unit.schedules[i].weekdays;

      if (schedule_weekday === todays_weekday) {
        if (schedule_hour !== 'Fechada') {
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ');
          let unit_open_hour_number = parseInt(unit_open_hour.replace('h', ''));
          let unit_close_hour_number = parseInt(unit_close_hour.replace('h', ''));

          if (unit_open_hour_number <= open_hour_number && unit_close_hour_number >= close_hour_number) {
            return true;
          } else {
            return false;
          }
        }
      }
    }

    return false;
  }

  filter (results: Location[], showClosed: boolean, hour: string) {
    let filteredResults = results;

    if (!showClosed) {
      filteredResults = filteredResults.filter(location => location.opened === true);
    }

    if (hour) {
      const OPEN_HOUR = OPENNING_HOURS[hour as HOUR_INDEXES].start;
      const CLOSE_HOUR = OPENNING_HOURS[hour as HOUR_INDEXES].end;
      filteredResults = filteredResults.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR));
    }

    return filteredResults;
  }
}
