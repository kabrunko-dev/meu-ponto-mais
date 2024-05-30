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
          sort_direction: 'desc',
          attributes: 'time_cards',
        },
      })
      .pipe(
        map((response) =>
          // TODO: Update mapping for when `start_date` !== `end_date`
          response.work_days
            .map((day) => day.time_cards.map((day) => day.time))
            .flat()
        )
      );
  }

  // TODO: Use for "/meu-ponto" route/feature
  // getTimeCardControl(start: string, end: string): Observable<any> {
  //   return this.http.get<any>('/time_card_control/current/work_days', {
  //     params: {
  //       start_date: start,
  //       end_date: end,
  //       sort_direction: 'desc',
  //       sort_property: 'date'
  //     },
  //   });
  // }
}
