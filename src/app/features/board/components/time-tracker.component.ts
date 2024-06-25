import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

import CardComponent from '@shared/components/card.component';
import { Tracker } from '@shared/tracker.interface';
import { ClockPipe } from '../pipes';
import { DAILY_WORKING_HOURS } from '@core/constants';

@Component({
  selector: 'app-time-tracker',
  standalone: true,
  imports: [CardComponent, ClockPipe, NgIf],
  template: `
    <app-card>
      <div class="flex justify-between pos-relative">
        <p><strong>Banco de horas</strong></p>
        <p
          [class.text-green]="session.time_balance > 0"
          [class.fw-700]="session.time_balance"
        >
          {{ session.time_balance | clock }}
        </p>
        @if (extraHours) {
          <span class="extra-hours pos-absolute fs-12 fw-700"
            >+{{ extraHours | clock }}</span
          >
        }
      </div>
    </app-card>

    <div class="flex gap-8 working-hours">
      <app-card
        ><strong>Trabalhado</strong><br />{{ tracker.worked | clock }}</app-card
      >
      <app-card
        ><strong>Faltam</strong><br />{{ tracker.left | clock }}</app-card
      >
      <app-card><strong>Saída</strong><br />{{ tracker.out | clock }}</app-card>
    </div>
  `,
  styles: `
    .working-hours {
      margin-top: 8px;

      & > * {
        flex: 1;
      }
    }

    .extra-hours {
      top: -100%;
      right: 0;
      background-color: #00b11d;
      padding: 2px 8px;
      border-radius: 4px;
      color: #ffffff;
    }
  `,
})
export default class TimeTrackerComponent {
  @Input({ required: true })
  session: any;

  @Input({ required: true })
  tracker!: Tracker;

  get extraHours(): number {
    return this.tracker.worked - DAILY_WORKING_HOURS;
  }
}
