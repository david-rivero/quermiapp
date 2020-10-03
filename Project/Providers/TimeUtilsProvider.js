import { format, differenceInYears, parse } from 'date-fns';

export function formatDate (date, formatMode='human') {
  if (date) {
    const formatPatn = formatMode === 'human' ? 'dd/MM/yyyy' : 'yyyy-MM-ddTHH:mm:ss';
    return format(date, formatPatn);
  }
  return '';
}

export function formatTime (time) {
  if (time) {
    return format(time, 'HH:mm');
  }
  return '';
}

export function getDateTimeFromStr (dateStr, format) {
  if (dateStr) {
    return parse(dateStr, format, new Date());
  }
  return new Date();
}

export function getAgeFromDate(date = new Date()) {
  return differenceInYears(new Date(), date);
}
