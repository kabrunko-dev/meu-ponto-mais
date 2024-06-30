import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `<ng-content />`,
  styles: `
    @use 'assets/shadow' as *;
    @use 'assets/variables';

    :host {
      display: block;
      padding: 8px;
      border-radius: 4px;
      background-color: variables.$white-default;

      @include shadow;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardComponent {}
