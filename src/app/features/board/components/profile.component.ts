import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeResponse } from '@core/models/session.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="flex gap-8 align-center">
      <img
        [alt]="'Foto de ' + name"
        [src]="'https://' + session.picture.medium_url"
        height="36"
        width="36"
      />
      <div>
        <p style="font-weight: bold">{{ name }}</p>
        <small>{{ session.login }}</small>
      </div>
    </div>
    <button (click)="signOut.emit()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        width="24px"
        fill="#ffffff"
        viewBox="0 -960 960 960"
      >
        <path
          d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
        />
        <title>Sair da conta</title>
      </svg>
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
  @Input({ required: true })
  session!: EmployeeResponse;

  @Output()
  signOut = new EventEmitter<never>();

  get name(): string {
    const names = this.session.name.split(' ');

    const first = names[0];
    const last = names.at(-1);

    return first + ' ' + last;
  }
}
