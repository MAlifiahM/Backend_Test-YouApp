export function parseDateString(dateString: string): Date {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function isValidDate(dateString: string): boolean {
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  return regex.test(dateString);
}
