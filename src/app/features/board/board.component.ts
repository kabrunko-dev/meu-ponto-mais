import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Observable, interval } from 'rxjs';

import { EmployeeResponse } from '../../core/models/session.model';
import { isToday } from '../../shared/helpers/date.helper';
import { ClockPipe } from './pipes';
import { SessionService, WorkDaysService } from './services';
import SpinnerComponent from '../../shared/spinner.component';
import CardComponent from '../../shared/components/card.component';
import ProfileComponent from './components/profile.component';
import TimeTrackerComponent from './components/time-tracker.component';
import LastRecordsComponent from './components/last-records.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    AsyncPipe,
    CardComponent,
    ClockPipe,
    DatePipe,
    LastRecordsComponent,
    NgFor,
    NgIf,
    ProfileComponent,
    RouterLink,
    SpinnerComponent,
    TimeTrackerComponent,
  ],
  providers: [SessionService, WorkDaysService],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export default class BoardComponent implements OnInit {
  private workDaysService = inject(WorkDaysService);
  private sessionService = inject(SessionService);

  today2 = signal(new Date());
  today = new Date().toISOString().split('T')[0];
  session$: Observable<EmployeeResponse> = this.sessionService.getSession();
  isToday = computed(() => isToday(this.today2()));

  // TODO: Improve signals logic
  times = signal<string[]>([]);
  sWorkedHours = computed(() => {
    const times = this.times().slice();

    if (times.length % 2 !== 0) {
      const hourAndMinutes = new Date()
        .toTimeString()
        .split(':')
        .slice(0, 2)
        .join(':');
      times.push(hourAndMinutes);
    }

    return this.calculateWH(times);
  });
  sLeftingHours = computed(() => 28800 - this.sWorkedHours());
  sClockOut = computed(() => {
    const times = this.times().slice();

    if (times.length === 0) return 0;

    if (times.length % 2 !== 0) {
      times.pop();
    }

    return (
      this.getTime(this.times()[this.times().length - 1]) +
      (28800 - this.calculateWH(times))
    );
  });

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      if (this.times().length === 0) return;

      const times = this.times().slice();

      if (times.length % 2 !== 0) {
        const hourAndMinutes = new Date()
          .toLocaleString()
          .split(', ')[1]
          .slice(0, 5);
        times.push(hourAndMinutes);
      }

      this.calculateWH(times);
    });

    const now = new Date();

    const twoDaysBefore = new Date(now);
    twoDaysBefore.setDate(twoDaysBefore.getDate() - 4);

    // Para o que eu quero é outro endpoint. Olhar a página "Meu Ponto"
    // do PontoMais, versão web
    this.workDaysService
      .getWorkDays(
        twoDaysBefore.toISOString().split('T')[0],
        now.toISOString().split('T')[0]
      )
      .subscribe((times: string[]) => this.times.set(times));
  }

  private calculateWH(times: string[]): number {
    let result = 0;

    for (let i = 0; i < times.length; i += 2) {
      result += this.getTime(times[i + 1]) - this.getTime(times[i]);
    }

    return result;
  }

  private getTime(time: string): number {
    const [hour, minutes] = time.split(':').map(Number);

    const hourInSec = hour * 3600;
    const minutesInSec = minutes * 60;

    return hourInSec + minutesInSec;
  }
}
