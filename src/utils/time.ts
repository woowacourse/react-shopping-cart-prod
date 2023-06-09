export const GMTToLocalTime = (GMT: string) => {
  const [datePart, timePart] = GMT.split(' ');
  const [year, month, day] = datePart.split('-');
  const [hour, minute, second] = timePart.split(':');
  const fixedSecond = second.split('.')[0];
  const isoString = `${year}-${month}-${day}T${hour}:${minute}:${fixedSecond}.000Z`;
  const date = new Date(isoString);
  date.setHours(date.getHours() + 9);

  return date.toISOString().replace('T', ' ').slice(0, -5);
};
