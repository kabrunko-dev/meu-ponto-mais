import { Component, HostBinding, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: ``,
  styles: `
    :host {
      display: block;
      border-radius: 50%;
      border: 4px solid white;
      animation: spinner 0.8s linear infinite;
      border-right-color: transparent;
    }

    @keyframes spinner {
      0% {
        rotate: 0deg;
      }
      100% {
        rotate: 360deg;
      }
    }
  `,
})
export default class SpinnerComponent {
  @Input({ transform: numberAttribute })
  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  diameter = 24;

  @Input({ transform: numberAttribute })
  @HostBinding('style.border-width.px')
  strokeWidth = 4;

  @Input()
  @HostBinding('style.border-bottom-color')
  @HostBinding('style.border-left-color')
  @HostBinding('style.border-top-color')
  color: string = 'white';
}
