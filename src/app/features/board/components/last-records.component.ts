import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ReversePipe } from '../pipes';
import CardComponent from '@shared/components/card.component';

@Component({
  selector: 'app-last-records',
  standalone: true,
  imports: [CardComponent, NgFor, NgIf, ReversePipe],
  template: `
    <h4>Últimos registros</h4>
    <div class="flex flex-column gap-8">
      @for (time of records | reverse; track time; let even = $even) {
        <app-card class="flex align-center gap-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            width="24px"
            fill="#123442"
            viewBox="0 -960 960 960"
          >
            @if (even) {
              <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
              />
            } @else {
              <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
              />
            }
            <title>{{ even ? 'Entrada' : 'Saída' }}</title>
          </svg>
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
