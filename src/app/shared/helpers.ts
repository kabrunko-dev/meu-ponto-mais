export function getTime(time: string): number {
  const [hour, minutes] = time.split(':').map(Number);

  const hourInSec = hour * 3600;
  const minutesInSec = minutes * 60;

  return hourInSec + minutesInSec;
}
