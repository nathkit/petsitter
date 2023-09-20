import moment from "moment";

function timeFormat(time) {
  const formattedDate = moment(time).format("ddd, DD MMM YYYY");
  return formattedDate;
}

export default timeFormat;

export const timeFormatForSitterReviews = function (time) {
  const format = moment(time).format("ll");
  return format;
};
