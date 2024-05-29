import { Component, Input } from '@angular/core';

import { ClockPipe } from '../pipes';
import CardComponent from '../../../shared/components/card.component';

@Component({
  selector: 'app-time-tracker',
  standalone: true,
  imports: [CardComponent, ClockPipe],
  template: `
    <app-card class="flex justify-between">
      <p>Banco de horas</p>
      <p>{{ session.time_balance | clock }}</p>
    </app-card>
    <div class="working-hours">
      <app-card>Trabalhado<br />{{ tracker.worked | clock }}</app-card>
      <app-card>Falta<br />{{ tracker.left | clock }}</app-card>
      <app-card>Saída<br />{{ tracker.clockOut | clock }}</app-card>
    </div>
  `,
  styles: `
    .working-hours {
      display: flex;
      gap: 8px;
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
