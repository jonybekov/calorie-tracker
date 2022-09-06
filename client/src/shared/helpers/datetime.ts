import moment, { CalendarSpec } from "moment";

export const isToday = (date: moment.Moment | string) =>
  moment(date).isSame(moment(), "day");

export const groupCalendarFormats: CalendarSpec = {
  sameDay: "[Today]",
  nextDay: "[Tomorrow]",
  nextWeek: "dddd",
  lastDay: "[Yesterday]",
  lastWeek: "[Last] dddd",
  sameElse: "MMM DD, YYYY",
};
