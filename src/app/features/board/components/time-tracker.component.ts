import { Component, Input } from '@angular/core';

import { ClockPipe } from '../pipes';
import CardComponent from '../../../shared/components/card.component';

@Component({
  selector: 'app-time-tracker',
  standalone: true,
  imports: [CardComponent, ClockPipe],
  template: `
    <app-card>
      <div class="flex justify-between">
        <p><strong>Banco de horas</strong></p>
        <p
          [class.text-green]="session.time_balance > 0"
          [class.fw-700]="session.time_balance"
        >
          {{ session.time_balance > 0 ? '+' : '-'
          }}{{ session.time_balance | clock }}
        </p>
      </div>
    </app-card>

    <div class="flex gap-8 working-hours">
      <app-card
        ><strong>Trabalhado</strong><br />{{ tracker.worked | clock }}</app-card
      >
      <app-card
        ><strong>Faltam</strong><br />{{ tracker.left | clock }}</app-card
      >
      <app-card
        ><strong>Saída</strong><br />{{ tracker.clockOut | clock }}</app-card
      >
    </div>
  `,
  styles: `
    .working-hours {
      margin-top: 8px;

      & > * {
        flex: 1;
      }
    }
  `,
})
export default class TimeTrackerComponent {
  @Input()
  session: any;

  @Input()
  tracker: any;
}
