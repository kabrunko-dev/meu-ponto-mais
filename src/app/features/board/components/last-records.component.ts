import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReversePipe } from '../pipes';
import CardComponent from '../../../shared/components/card.component';

@Component({
  selector: 'app-last-records',
  standalone: true,
  imports: [CardComponent, NgFor, NgIf, ReversePipe, RouterLink],
  template: `
    <h4>Últimos registros</h4>

    <div class="punches">
      @for (time of times | reverse; track time; let odd = $odd) {
        <app-card>{{ time }}</app-card>
      } @empty {
        <p>Sem registros</p>
      }

      @if (times.length > 0) {
        <a routerLink="/teste" style="text-align: center">Ver mais</a>
      }
    </div>
  `,
  styles: `
    .punches {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .card {
      padding: 8px;
      border-radius: 4px;
      background-color: white;
      box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
  `,
})
export default class LastRecordsComponent {
  @Input()
  times: any[] = [];
}
