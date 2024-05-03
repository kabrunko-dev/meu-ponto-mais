import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import environment from '../environments/env';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export default class AppComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  ngOnInit(): void {
    if (environment.production) {
      this.setManifestLinkTag();
    }
  }

  private setManifestLinkTag(): void {
    const manifestLink = this.document.createElement('link');
    const headTag = this.document.querySelector('head');

    manifestLink.setAttribute('rel', 'manifest');
    manifestLink.setAttribute('href', 'manifest.json');

    headTag?.appendChild(manifestLink);
  }
}
