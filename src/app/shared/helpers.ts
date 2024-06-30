import { DAILY_WORKING_HOURS } from '@core/constants';
import { Tracker } from '@shared/interfaces';

export function getWorkTracking(times: string[]): Tracker {
  if (!times.length) {
    return {
      worked: 0,
      left: 0,
      out: 0,
    };
  }

  if (times.length % 2 !== 0) {
    const newTime = new Date().toTimeString().substring(0, 5);
    times.push(newTime);
  }

  const worked = getWorkingHours(times);
  const left = DAILY_WORKING_HOURS - worked;
  const out = getTime(times.at(-1)!) + left;

  return {
    worked,
    left,
    out,
  };
}

function getWorkingHours(times: string[]): number {
  let result = 0;

  for (let i = 0; i < times.length; i += 2) {
    const clockIn = times[i + 1];
    const clockOut = times[i];
    const worked = getTime(clockIn) - getTime(clockOut);
    result += worked;
  }

  return result;
}

function getTime(time: string): number {
  const [hour, minutes] = time.split(':').map(Number);

  const hourInSec = hour * 3600;
  const minutesInSec = minutes * 60;

  return hourInSec + minutesInSec;
}
