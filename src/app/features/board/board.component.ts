import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { Observable, interval } from 'rxjs';

import { EmployeeResponse } from '../../core/models/session.model';
import SessionService from './session.service';
import WorkDaysService from './work-days.service';
import SpinnerComponent from '../../shared/spinner.component';
import ClockPipe from './clock.pipe';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [AsyncPipe, ClockPipe, NgFor, NgIf, SpinnerComponent],
  providers: [SessionService, WorkDaysService],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export default class BoardComponent implements OnInit {
  private workDaysService = inject(WorkDaysService);
  private sessionService = inject(SessionService);

  today = new Date().toISOString().split('T')[0];
  session$: Observable<EmployeeResponse> = this.sessionService.getSession();

  // TODO: Improve signals logic
  times = signal<string[]>([]);
  sWorkedHours = computed(() => {
    const times = this.times().slice();

    if (times.length % 2 !== 0) {
      const hourAndMinutes = new Date()
        .toLocaleString()
        .split(', ')[1]
        .slice(0, 5);
      times.push(hourAndMinutes);
    }
    return this.calculateWH(times);
  });
  sLeftingHours = computed(() => 28800 - this.sWorkedHours());
  sClockOut = computed(() => {
    const times = this.times().slice();

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

    this.workDaysService
      .getWorkDays(this.today, this.today)
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
