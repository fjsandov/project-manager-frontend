import moment from 'moment';

export function dateToString(date) {
  if(date == null) return undefined;
  const momentUtcDate = moment(date).utc();
  return momentUtcDate.format('MM/DD/YYYY');
}

export function dateTimeToString(dateTime) {
  if(dateTime == null) return undefined;
  const momentUtcDateTime = moment(dateTime).utc();
  return `${momentUtcDateTime.format('MM/DD/YYYY HH:MM:SS')} UTC`;
}