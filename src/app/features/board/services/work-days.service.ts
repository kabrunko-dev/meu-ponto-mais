import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { WorkDaysResponse } from '../../../core/models/work-days.model';

@Injectable()
export default class WorkDaysService {
  private http = inject(HttpClient);

  getWorkDays(start: string, end: string): Observable<string[]> {
    return this.http
      .get<WorkDaysResponse>('/time_cards/work_days/current', {
        params: {
          start_date: start,
          end_date: end,
          attributes: 'time_cards',
        },
      })
      .pipe(
        map((response) =>
          response.work_days[0].time_cards.map((day) => day.time)
        )
      );
  }
}
