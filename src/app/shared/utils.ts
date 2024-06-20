export function addDay(date: Date, amount: number = 1): Date {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + amount);
  return newDate;
}

export function isToday(date: Date): boolean {
  const now = new Date();

  return (
    now.getDate() === date.getDate() && 
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear()
  );
}
