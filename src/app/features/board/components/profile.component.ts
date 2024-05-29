import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <img [src]="'https://' + session.picture.medium_url" height="40" width="40" />
    <div>
      <p>{{ session.name }}</p>
      <p>{{ session.login }}</p>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 12px;
      background-color: lightgreen;
      padding: 16px;
      font-size: 10px;
    }

    img {
      border-radius: 50%;
      object-fit: cover;
    }
  `,
})
export default class ProfileComponent {
  @Input()
  session: any;
}
