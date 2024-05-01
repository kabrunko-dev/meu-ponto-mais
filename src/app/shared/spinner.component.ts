import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: ``,
  styles: `
    :host {
      display: block;
      border-radius: 50%;
      border: 4px solid white;
      border-bottom-color: transparent;
      animation: spinner 0.8s linear infinite;
    }

    @keyframes spinner {
      0% { rotate: 0deg }
      100% { rotate: 360deg }
    }
  `,
  host: {
    '[style.border-width.px]': 'strokeWidth',
    '[style.width.px]': 'diameter',
    '[style.height.px]': 'diameter',
  }
})
export default class SpinnerComponent {
  @Input({ transform: numberAttribute })
  diameter = 24;

  @Input({ transform: numberAttribute })
  strokeWidth = 4;
}
