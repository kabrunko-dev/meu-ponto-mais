import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `<ng-content />`,
  styles: `
    :host {
      padding: 8px;
      border-radius: 4px;
      background-color: white;
      box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardComponent {}
