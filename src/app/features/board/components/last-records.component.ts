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
            [attr.fill]="even ? '#75797c' : '#00b11d'"
            viewBox="0 -960 960 960"
          >
            @if (even) {
              <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v80h-80v-80H200v560h560v-80h80v80q0 33-23.5 56.5T760-120H200Zm480-160-56-56 103-104H360v-80h367L624-624l56-56 200 200-200 200Z"
              />
            } @else {
              <path
                d="M160-160q-33 0-56.5-23.5T80-240v-120h80v120h640v-480H160v120H80v-120q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm300-140-56-58 83-82H80v-80h407l-83-82 56-58 180 180-180 180Z"
              />
            }
            <title>{{ even ? 'Entrada' : 'Saída' }}</title>
          </svg>
          <div class="flex align-center justify-between flex-fill">
            <p>{{ time }}</p>
            <small class="text-gray-dark opacity-25">
              {{ even ? 'Saída' : 'Entrada' }}
            </small>
          </div>
        </app-card>
      } @empty {
        <div class="empty-state flex align-center gap-4 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            width="36px"
            fill="#123442"
            viewBox="0 -960 960 960"
          >
            <path
              d="m819-28-52-52H160v-80h80v-120q0-61 28.5-114.5T348-480q-32-20-54.5-48T257-590L27-820l57-57L876-85l-57 57ZM602-474l-60-59q45-19 71.5-59t26.5-88v-120H320v45l-45-45-80-80h605v80h-80v120q0 64-31 119t-87 87ZM320-160h320v-47L419-428q-45 19-72 59t-27 89v120Zm400 0Z"
            />
          </svg>
          <p>Sem registros hoje</p>
        </div>
      }
    </div>
  `,
  styles: `
    .empty-state {
      padding: 16px;
      opacity: 0.75;
    }

    h4 {
      margin-bottom: 4px;
    }
  `,
})
export default class LastRecordsComponent {
  @Input()
  records: string[] = [];
}
