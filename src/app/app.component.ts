import { DOCUMENT } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import environment from '../environments/env';
import LocalStorageService from './core/services/local-storage.service';
import AuthService from './core/services/auth.service';
import Auth from './shared/auth.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export default class AppComponent implements OnInit {
  private document = inject(DOCUMENT);
  private localStorageService = inject(LocalStorageService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    if (environment.production) {
      this.setManifestLinkTag();
    }

    this.setUserSession();
  }

  private setUserSession(): void {
    const session = this.localStorageService.getItem<Auth>('session');

    if (session) {
      this.authService.set(session);
    }
  }

  private setManifestLinkTag(): void {
    const manifestLink = this.document.createElement('link');
    const headTag = this.document.querySelector('head');

    manifestLink.setAttribute('rel', 'manifest');
    manifestLink.setAttribute('href', 'assets/manifest.json');

    headTag?.appendChild(manifestLink);
  }
}
