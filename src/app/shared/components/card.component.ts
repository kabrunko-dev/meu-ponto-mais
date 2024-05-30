import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `<ng-content />`,
  styles: `
    :host {
      display: block;
      padding: 8px;
      border-radius: 4px;
      background-color: white;
      box-shadow: 
        rgba(0, 0, 0, 0.12) 0px 1px 3px, 
        rgba(0, 0, 0, 0.24) 0px 1px 2px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardComponent {}
