import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable, forkJoin, interval, tap } from 'rxjs';

import { AuthService, LocalStorageService, LoginService } from '@core/services';
import { EmployeeResponse } from '@core/models/session.model';
import { WorkDayResponse } from '@core/models/work-days.model';
import { getWorkTracking } from '@shared/helpers';
import { Tracker } from '@shared/tracker.interface';
import { SessionService, WorkDaysService } from './services';
import ProfileComponent from './components/profile.component';
import TimeTrackerComponent from './components/time-tracker.component';
import LastRecordsComponent from './components/last-records.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    NgIf,
    LastRecordsComponent,
    ProfileComponent,
    TimeTrackerComponent,
  ],
  providers: [SessionService],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export default class BoardComponent implements OnInit {
  private localStorageService = inject(LocalStorageService);
  private loginService = inject(LoginService);
  private authService = inject(AuthService);
  private sessionService = inject(SessionService);
  private workDaysService = inject(WorkDaysService);
  private router = inject(Router);

  today = signal(new Date());
  records = signal<string[]>([]);
  tracker = computed<Tracker>(() => getWorkTracking([...this.records()]));

  board$!: Observable<{ session: EmployeeResponse }>;

  constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.today.set(new Date()));
  }

  ngOnInit(): void {
    const now = this.today().toISOString().split('T')[0];

    this.board$ = forkJoin({
      session: this.sessionService.getSession(),
      times: this.workDaysService
        .getWorkDays(now, now)
        .pipe(
          tap((times: WorkDayResponse) =>
            this.records.set(times.time_cards.map((tc) => tc.time))
          )
        ),
    });
  }

  onSignOut(): void {
    this.loginService.signOut().subscribe(() => {
      this.authService.set(null);
      this.localStorageService.removeItem('session');
      this.router.navigate(['login']);
    });
  }
}
