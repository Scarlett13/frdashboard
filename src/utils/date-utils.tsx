import { format } from 'date-fns';
import { DateTime } from 'luxon';

import logger from '@/lib/logger';

export function serverTimestampToLocalTime(servertime: string): string {
  // Parse the ISO8601 date and set the timezone to 'local'
  const dateTime = DateTime.fromFormat(
    servertime,
    "ccc, dd LLL yyyy HH:mm:ss 'GMT'",
    { zone: 'utc' }
  );

  // Set the timezone to 'Asia/Bangkok' (GMT+7)
  const localDateTime = dateTime.setZone('Asia/Bangkok');

  // Format the date in 'yyyy-MM-dd HH:mm' with the 'Asia/Bangkok' timezone
  const formattedDate = localDateTime.toFormat('yyyy-MM-dd HH:mm');

  return formattedDate;
}

export function anytimeToServerTime(time: string): string {
  const dateTime = new Date(time); // Your JavaScript Date object

  // Convert the JavaScript Date object to Luxon DateTime
  const luxonDateTime = DateTime.fromJSDate(dateTime);

  // Set the timezone to 'Asia/Bangkok' (GMT+7)
  const localDateTime = luxonDateTime.setZone('utc');

  // Format the date in 'yyyy-MM-dd HH:mm' with the 'Asia/Bangkok' timezone
  const formattedDate = localDateTime.toFormat('yyyy-MM-dd HH:mm');

  return formattedDate;
}

export function formatDateToString(
  date: Date | null | undefined,
  formatstring: string,
  needToBeUtc?: boolean
): string | null {
  if (!date) {
    return '';
  }
  try {
    let parseddate;
    needToBeUtc
      ? (parseddate = new Date(
          date.toLocaleString('en-US', { timeZone: 'GMT' })
        ))
      : (parseddate = date);

    const formattedDate = format(parseddate, formatstring);

    return formattedDate;
  } catch (error) {
    return '';
  }
}

export function isDateTheSame(startDate: Date, endDate: Date) {
  try {
    const startDateTime = DateTime.fromJSDate(startDate);
    const endDateTime = DateTime.fromJSDate(endDate);
    logger('startdate: ' + startDate + ' -- startDateTime: ' + startDateTime);
    logger('endDate: ' + startDate + ' -- endDateTime: ' + endDateTime);
    return startDateTime.hasSame(endDateTime, 'day');
  } catch (error) {
    logger(error);
    return false;
  }
}
