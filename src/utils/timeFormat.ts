export function formatDateTime(dateTime: string) {
  const [date, time] = dateTime.split(' ');
  const [year, month, day] = date.split('-');

  return `${year}.${month}.${day}`;
}
