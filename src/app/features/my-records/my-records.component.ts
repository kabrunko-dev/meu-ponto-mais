import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Observable } from 'rxjs';

import { ClockPipe } from '../board/pipes';
import { WorkDaysService } from '../board/services';
import CardComponent from '../../shared/components/card.component';

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
    @if (mock2$ | async; as values) {
      <header>
        <a routerLink="/board" type="button">
          <span class="material-icons-outlined">arrow_back</span>
        </a>
        <h3>Meu Ponto</h3>
      </header>

      @for (value of values; track value.id) {
        <app-card>
          <div class="card__header">
            <p>{{ value.date }}</p>
          </div>
          <div style="display: flex; gap 16px; justify-content: space-between;">
            <p>{{ value.extra_time | clock }}</p>
            <p>{{ value.missing_time | clock }}</p>
            <p>{{ value.time_balance | clock }}</p>
          </div>
        </app-card>
      }
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
export default class MyRecordsComponent implements OnInit {
  private wds = inject(WorkDaysService);

  now = new Date();
  twoDaysBefore = new Date();
  mock2$!: Observable<any>;

  ngOnInit(): void {
    this.twoDaysBefore.setDate(this.twoDaysBefore.getDate() - 8);

    this.mock2$ = this.wds.getTimeCardControl(
      this.twoDaysBefore.toISOString().split('T')[0],
      this.now.toISOString().split('T')[0]
    );
  }
}
