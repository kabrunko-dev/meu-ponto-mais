import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

import CardComponent from '@shared/components/card.component';
import { Tracker } from '@shared/interfaces';
import { DAILY_WORKING_HOURS } from '@core/constants';
import { ClockPipe } from '../pipes';
import { EmployeeResponse } from '@core/models/session.model';

@Component({
  selector: 'app-time-tracker',
  standalone: true,
  imports: [CardComponent, ClockPipe, NgIf],
  template: `
    <app-card>
      <div class="flex justify-between pos-relative">
        <p>Banco de horas</p>
        <p
          [class.text-red]="session.time_balance < 0"
          [class.text-green]="session.time_balance > 0"
          [class.fw-700]="session.time_balance > 0"
        >
          {{ session.time_balance | clock }}
        </p>
        @if (extraHours > 0) {
          <span class="extra-hours pos-absolute fs-12 fw-700">
            +{{ extraHours | clock }}
          </span>
        }
      </div>
    </app-card>

    <div class="flex gap-8 working-hours">
      <app-card>
        <h4>Trabalhado</h4>
        <p>{{ tracker.worked | clock }}</p>
      </app-card>
      <app-card>
        <h4>Faltam</h4>
        <p>{{ tracker.left | clock }}</p>
      </app-card>
      <app-card>
        <h4>Saída</h4>
        <p>{{ tracker.out | clock }}</p>
      </app-card>
    </div>
  `,
  styles: `
    @use 'assets/variables';

    .working-hours {
      margin-top: 8px;

      & > * {
        flex: 1;
      }
    }

    .extra-hours {
      top: -24px;
      right: 0;
      padding: 2px 8px;
      border-radius: 4px;
      background-color: variables.$green-default;
      color: variables.$white-default;
    }
  `,
})
export default class TimeTrackerComponent {
  @Input({ required: true })
  session!: EmployeeResponse;

  @Input({ required: true })
  tracker!: Tracker;

  get extraHours(): number {
    return this.tracker.worked - DAILY_WORKING_HOURS;
  }
}
