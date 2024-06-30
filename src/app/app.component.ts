import { DOCUMENT } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService, LocalStorageService } from '@core/services';
import GlobalSpinnerComponent from '@core/components/global-spinner.component';
import { Auth } from '@shared/interfaces';
import environment from '../environments/env';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GlobalSpinnerComponent],
  template: `
    <app-global-spinner />
    <router-outlet />
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
    }
  `,
})
export default class AppComponent implements OnInit {
  private document = inject(DOCUMENT);
  private localStorageService = inject(LocalStorageService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.setUserSession();

    if (environment.production) {
      this.setManifestLinkTag();
    }
  }

  private setUserSession(): void {
    const session = this.localStorageService.getItem<Auth>('session');

    if (session) {
      this.authService.set(session);
    }
  }

  // TODO: Refactor to use Angular's renderer3
  private setManifestLinkTag(): void {
    const manifestLink = this.document.createElement('link');
    const headTag = this.document.querySelector('head');

    manifestLink.setAttribute('rel', 'manifest');
    manifestLink.setAttribute('href', 'assets/manifest.json');

    headTag?.appendChild(manifestLink);
  }
}
