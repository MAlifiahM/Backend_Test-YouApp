export function determineHoroscope(dateOfBirth: Date): string {
  const day = dateOfBirth.getDate();
  const month = dateOfBirth.getMonth() + 1;

  if ((month == 1 && day <= 19) || (month == 12 && day >= 22)) {
    return 'Capricorn';
  } else if (month == 1 || (month == 2 && day <= 18)) {
    return 'Aquarius';
  } else if (month == 2 || (month == 3 && day <= 20)) {
    return 'Pisces';
  } else if (month == 3 || (month == 4 && day <= 19)) {
    return 'Aries';
  } else if (month == 4 || (month == 5 && day <= 20)) {
    return 'Taurus';
  } else if (month == 5 || (month == 6 && day <= 21)) {
    return 'Gemini';
  } else if (month == 6 || (month == 7 && day <= 22)) {
    return 'Cancer';
  } else if (month == 7 || (month == 8 && day <= 22)) {
    return 'Leo';
  } else if (month == 8 || (month == 9 && day <= 22)) {
    return 'Virgo';
  } else if (month == 9 || (month == 10 && day <= 23)) {
    return 'Libra';
  } else if (month == 10 || (month == 11 && day <= 21)) {
    return 'Scorpio';
  } else if (month == 11 || (month == 12 && day <= 21)) {
    return 'Sagitarius';
  }

  return '';
}
