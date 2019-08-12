import moment from 'moment';

export function dateToString(date) {
  const momentUtcDate = moment(date).utc();
  return momentUtcDate.format('MM/DD/YYYY');
}