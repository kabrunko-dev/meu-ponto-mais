import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ReversePipe } from '../pipes';
import CardComponent from '@shared/components/card.component';

@Component({
  selector: 'app-last-records',
  standalone: true,
  imports: [CardComponent, NgFor, ReversePipe],
  template: `
    <h4>Últimos registros</h4>
    <div class="flex flex-column gap-8">
      @for (time of records | reverse; track time; let odd = $odd) {
        <app-card class="flex align-center gap-8">
          <span
            class="material-icons-outlined"
            [title]="odd ? 'Saída' : 'Entrada'"
          >
            {{ odd ? 'logout' : 'login' }}
          </span>
          <p>{{ time }}</p>
        </app-card>
      } @empty {
        <p>Sem registros</p>
      }
    </div>
  `,
})
export default class LastRecordsComponent {
  @Input()
  records: string[] = [];
}
