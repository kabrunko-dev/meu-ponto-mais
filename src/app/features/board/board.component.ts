import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { forkJoin, interval, tap } from 'rxjs';

import { AuthService, LocalStorageService, LoginService } from '@core/services';
import { getWorkTracking } from '@shared/helpers';
import { Tracker, TimeCard } from '@shared/interfaces';
import { SessionService, WorkDaysService } from './services';
import ProfileComponent from './components/profile.component';
import TimeTrackerComponent from './components/time-tracker.component';
import LastRecordsComponent from './components/last-records.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    NgIf,
    LastRecordsComponent,
    ProfileComponent,
    TimeTrackerComponent,
  ],
  providers: [SessionService],
  templateUrl: './board.component.html',
  styles: `
    @use 'assets/variables';

    .board {
      padding: 16px;
      padding-bottom: 24px;

      &__clock {
        margin-top: 16px;
      }
    }

    dialog {
      height: 150px;
      width: 180px;
      position: absolute;
      top: 172px;
      left: 70px;
      border-radius: 4px;
      border: 0;
      padding: 8px;
    }

    ::backdrop {
      background-color: variables.$black-default;
      opacity: 0.75;
    }
  `,
})
export default class BoardComponent {
  private localStorageService = inject(LocalStorageService);
  private loginService = inject(LoginService);
  private authService = inject(AuthService);
  private sessionService = inject(SessionService);
  private workDaysService = inject(WorkDaysService);
  private router = inject(Router);

  today = signal(new Date());
  records = signal<TimeCard[]>([]);
  tracker = computed<Tracker>(() => {
    const times = this.records().map((record) => record.time);
    return getWorkTracking([...times]);
  });
  board = toSignal(
    forkJoin({
      session: this.sessionService.getSession(),
      _: this.workDaysService
        .getWorkDays(this.today().toISOString().split('T')[0])
        .pipe(tap((response) => this.records.set(response))),
    })
  );

  constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.today.set(new Date()));
  }

  onSignOut(): void {
    this.loginService.signOut().subscribe(() => {
      this.authService.set(null);
      this.localStorageService.removeItem('session');
      this.router.navigate(['login']);
    });
  }
}
