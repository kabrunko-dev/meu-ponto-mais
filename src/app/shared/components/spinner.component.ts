import { Component, Input, numberAttribute } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgStyle],
  template: `
    <div
      class="spinner"
      [ngStyle]="{
        'width.px': diameter,
        'height.px': diameter,
        'border-width.px': strokeWidth,
        'border-bottom-color': color,
        'border-left-color': color,
        'border-top-color': color
      }"
    ></div>
  `,
  styles: `
    @use 'assets/variables';

    .spinner {
      display: block;
      border-radius: 50%;
      border: 4px solid variables.$white-default;
      border-right-color: transparent;
      animation: spinner 0.8s linear infinite;
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
  @Input({ transform: numberAttribute }) diameter = 96;
  @Input({ transform: numberAttribute }) strokeWidth = 8;
  @Input() color = '#ffffff';
}
