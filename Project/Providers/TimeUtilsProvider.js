import { format, differenceInYears, parse } from 'date-fns';

export function formatDate (date, formatMode='human') {
  if (date) {
    const formatPatn = formatMode === 'human' ? 'dd/MM/yyyy' : 'yyyy-MM-dd_HH:mm:ss';
    let formatted = format(date, formatPatn);
    if (formatMode === 'api') {
      formatted = formatted.replace('_', 'T');
    }
    return formatted;
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
  return differenceInYears(new Date(), new Date(date));
}
