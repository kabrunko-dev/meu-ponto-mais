import { Component } from '@angular/core';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';

import { LoadingService } from '../core/services';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgStyle],
  template: `
    @if (loadingService.onLoadingChange | async) {
      <div class="overlay">
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
      </div>
    }
  `,
  styles: `
    @use 'assets/variables';

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: grid;
      place-content: center;
      z-index: 999;
      background-color: variables.$green-light;
    }

    .spinner {
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
  diameter = 96;
  strokeWidth = 8;
  color = 'limegreen';

  constructor(public loadingService: LoadingService) {}
}
