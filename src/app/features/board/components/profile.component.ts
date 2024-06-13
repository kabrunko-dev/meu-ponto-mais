import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="flex gap-8 align-center">
      <img
        [src]="'https://' + session.picture.medium_url"
        height="36"
        width="36"
      />
      <div>
        <p style="font-weight: bold">{{ name }}</p>
        <small>{{ session.login }}</small>
      </div>
    </div>
    <button (click)="signOut.emit()" title="Sair">
      <span class="material-icons-outlined">logout</span>
    </button>
  `,
  styles: `
    @use 'assets/variables';

    :host {
      display: flex;
      justify-content: space-between;
      padding: 16px;
      font-size: 12px;
      border-radius: 0 0 18px 18px;
      background-color: variables.$green-default;
      color: variables.$white-default;
    }

    img {
      border-radius: 50%;
      object-fit: cover;
    }

    button {
      color: inherit;
    }
  `,
})
export default class ProfileComponent {
  @Input()
  session: any;

  @Output()
  signOut = new EventEmitter<never>();

  get name(): string {
    const names = this.session.name.split(' ');

    const first = names[0];
    const last = names.at(-1);

    return first + ' ' + last;
  }
}
