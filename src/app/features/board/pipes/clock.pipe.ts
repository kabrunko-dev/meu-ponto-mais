import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clock',
  standalone: true,
})
export default class ClockPipe implements PipeTransform {
  transform(seconds: number): string {
    if (seconds < 0) return '00:00';

    let minutes = (seconds / 3600) % 1;
    const hour = seconds / 3600 - minutes;

    minutes = Math.round(minutes * 60);

    const hourStr = (hour < 10 ? '0' : '') + hour;
    const minStr = (minutes < 10 ? '0' : '') + minutes;

    return `${hourStr}:${minStr}`;
  }
}
