import moment from 'moment';

export function getFormatForDate(day, month, year, format) {
  const formatForHuman = `${day}/${month}/${year}`;
  const formatForAPI = `${year}-${month}-${day}T00:00:00Z`;
  switch(format) {
    case 'api':
      return formatForAPI;
    case 'human':
    default:
      return formatForHuman;
  }
}

export function formatDate (date, format='human') {
  if (date) {
    const day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
    const month = `${date.getMonth() < 10 ? '0' : ''}${date.getMonth() + 1}`;
    const year = date.getFullYear();
    return getFormatForDate(day, month, year, format);
  }
  return '';
}

export function formatTime (time) {
  if (time) {
    const hour = time.getHours();
    const minutes = time.getMinutes();
    return `${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
  return '';
}

export function getAgeFromDate(date) {
  return moment().diff(moment(date), 'years');
}
