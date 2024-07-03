import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ReversePipe } from '../pipes';
import CardComponent from '@shared/components/card.component';
import { TimeCard } from '@shared/interfaces';

@Component({
  selector: 'app-last-records',
  standalone: true,
  imports: [CardComponent, NgFor, NgIf, ReversePipe],
  template: `
    <div class="header flex align-center justify-between">
      <h4>Registros do dia</h4>
    </div>
    <div class="flex flex-column gap-8">
      @for (record of records | reverse; track record.time; let idx = $index) {
        <div class="flex align-center gap-8">
          <app-card
            class="flex align-center gap-8 flex-fill"
            [class.fake]="record.fake"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              width="24px"
              [attr.fill]="record.type === 'out' ? '#75797c' : '#00b11d'"
              viewBox="0 -960 960 960"
            >
              @if (record.type === 'out') {
                <path
                  d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v80h-80v-80H200v560h560v-80h80v80q0 33-23.5 56.5T760-120H200Zm480-160-56-56 103-104H360v-80h367L624-624l56-56 200 200-200 200Z"
                />
              } @else {
                <path
                  d="M160-160q-33 0-56.5-23.5T80-240v-120h80v120h640v-480H160v120H80v-120q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm300-140-56-58 83-82H80v-80h407l-83-82 56-58 180 180-180 180Z"
                />
              }
              <title>{{ record.type === 'out' ? 'Saída' : 'Entrada' }}</title>
            </svg>
            <div class="flex align-center justify-between flex-fill">
              <p>{{ record.time }}</p>
              <small class="text-gray-dark opacity-25">
                {{ record.type === 'out' ? 'Saída' : 'Entrada' }}
              </small>
            </div>
          </app-card>
          @if (record.fake) {
            <button (click)="delete.emit(idx)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                width="16px"
                fill="#ca3325"
                viewBox="0 -960 960 960"
              >
                <path
                  d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                />
                <title>Excluir ponto falso</title>
              </svg>
            </button>
          }
        </div>
      } @empty {
        <div
          class="empty-state flex align-center gap-4 justify-center opacity-75"
        >
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
    @use 'assets/variables';

    .header {
      margin-bottom: 8px;
    }

    .empty-state {
      padding: 16px;
    }
  `,
})
export default class LastRecordsComponent {
  @Input()
  records: TimeCard[] = [];

  @Output()
  add = new EventEmitter<never>();

  @Output()
  delete = new EventEmitter<number>();
}
