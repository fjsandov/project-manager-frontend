import moment from 'moment';

export function dateToString(date) {
  if(date == null) return undefined;
  const momentUtcDate = moment(date).utc();
  return momentUtcDate.format('MM/DD/YYYY');
}