export function formatDateTime(dateTime: string | Date) {
  let parsedDate: Date;

  if (typeof dateTime === 'string') {
    parsedDate = new Date(dateTime);
  } else if (dateTime instanceof Date) {
    parsedDate = dateTime;
  } else {
    throw new Error('Invalid date format');
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
