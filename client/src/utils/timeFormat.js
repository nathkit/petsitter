import moment from "moment";

export function timeFormat(time) {
  const formattedDate = moment(time).format("ddd, DD MMM YYYY");
  return formattedDate;
}

export function dateFormat(time) {
  const formattedDate = moment(time).format("DD MMM, YYYY");
  return formattedDate;
}

export function dateTimeFormat(time) {
  const formattedDate = moment(time).format("DD MMM YYYY");
  return formattedDate;
}

export function formatTime(time) {
  const format = moment(time).format("LT");
  return format;
}

export function successTime(time) {
  const date = new Date(time);
  const hours = date.getUTCHours(); // Corrected: Remove the 'time' argument
  const minutes = date.getUTCMinutes(); // Corrected: Remove the 'time' argument
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Ensure two-digit minutes
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export const timeFormatForSitterReviews = function (time) {
  const format = moment(time).format("ll");
  return format;
};

export function dateWithOutComma(time) {
  const formattedDate = moment(time).format("DD MMM YYYY");
  return formattedDate;
}
