import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { CurrentWorkDaysResponse } from '@core/models/work-days.model';
import { TimeCard } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export default class WorkDaysService {
  private http = inject(HttpClient);

  getWorkDays(start_date: string, end_date?: string): Observable<TimeCard[]> {
    if (!end_date) end_date = start_date;

    return this.http
      .get<CurrentWorkDaysResponse>('/time_cards/work_days/current', {
        params: {
          start_date,
          end_date,
          attributes: 'time_cards',
        },
      })
      .pipe(
        map(({ work_days }) =>
          work_days[0].time_cards.map(({ time }, idx) => ({
            time,
            type: idx % 2 ? 'out' : 'in',
          }))
        )
      );
  }
}
