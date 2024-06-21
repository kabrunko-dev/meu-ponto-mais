import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import {
  WorkDayResponse,
  WorkDaysResponse,
} from '@core/models/work-days.model';

@Injectable({
  providedIn: 'root',
})
export default class WorkDaysService {
  private http = inject(HttpClient);

  getWorkDays(start: string, end: string): Observable<WorkDayResponse> {
    return this.http
      .get<WorkDaysResponse>('/time_cards/work_days/current', {
        params: {
          start_date: start,
          end_date: end,
          sort_direction: 'desc',
          attributes: 'time_cards,date',
        },
      })
      .pipe(map((response: WorkDaysResponse) => response.work_days[0]));
  }

  // TODO: Use for "/meu-ponto" route/feature
  getTimeCardControl(start: string, end: string): Observable<any> {
    return this.http
      .get<any>('/time_card_control/current/work_days', {
        params: {
          start_date: start,
          end_date: end,
          sort_direction: 'desc',
          sort_property: 'date',
        },
      })
      .pipe(map((value) => value.work_days));
  }
}
