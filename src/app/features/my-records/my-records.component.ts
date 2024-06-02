import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { WorkDaysService } from '../board/services';
import CardComponent from '../../shared/components/card.component';
import { ClockPipe } from '../board/pipes';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-my-records',
  standalone: true,
  imports: [
    AsyncPipe,
    CardComponent,
    ClockPipe,
    NgFor,
    NgIf,
    RouterLink,
    SlicePipe,
  ],
  template: `
    <header>
      <a routerLink="/board" type="button">
        <span class="material-icons-outlined"> arrow_back </span>
      </a>
      <h3>Meu Ponto</h3>
    </header>

    @for (value of mock$ | async; track value.id) {
      <app-card>
        <div class="card__header">
          <p>{{ value.date }}</p>
          @if (value.time_cards.length > 0) {
            <p>
              {{ value.time_cards | slice: 0 : 1 }} -
              {{ value.time_cards | slice: -1 }}
            </p>
          }
        </div>
        <div style="display: flex; gap 16px; justify-content: space-between;">
          <p>{{ value.extra_time | clock }}</p>
          <p>{{ value.missing_time | clock }}</p>
          <p>{{ value.time_balance | clock }}</p>
        </div>
      </app-card>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
    }

    h1 {
      margin-bottom: 16px;
    }

    header {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .card__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .material-icons-outlined {
      line-height: 1.5;
    }
  `,
})
export default class MyRecordsComponent {
  private workDaysService = inject(WorkDaysService);

  mock$ = new Observable<any>();

  constructor() {
    const now = new Date();
    const twoDaysBefore = new Date(now);
    twoDaysBefore.setDate(twoDaysBefore.getDate() - 15);

    this.mock$ = this.workDaysService
      .getTimeCardControl(
        twoDaysBefore.toISOString().split('T')[0],
        now.toISOString().split('T')[0]
      )
      .pipe(
        map((value) =>
          value.map((v: any) => ({
            ...v,
            date: v.date.split('-').reverse().join('/'),
            time_cards: v.time_cards.map((tc: any) => tc.time),
          }))
        )
      );
  }
}
