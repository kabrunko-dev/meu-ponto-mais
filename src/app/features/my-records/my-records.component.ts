import {Component} from "@angular/core";

import CardComponent from "../../shared/components/card.component";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-my-records',
  standalone: true,
  imports: [CardComponent, NgFor],
  template: `
    <h3>Meu Ponto</h3>

    @for (value of mock; track value) {
      <app-card>{{ value }}</app-card>
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
  `
})
export default class MyRecordsComponent {
  mock = Array(10).fill(null).map((_, index) => index);
}
