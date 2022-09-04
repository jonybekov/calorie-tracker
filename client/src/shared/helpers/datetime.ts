import moment from "moment";

export const isToday = (date: moment.Moment | string) =>
  moment(date).isSame(moment(), "day");
