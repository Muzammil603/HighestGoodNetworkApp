import moment from "moment";

// converts date to desired format such as Aug-30-2023
export const formatDate = (date) => moment(date).format('MMM-DD-YY');
// converts time to AM/PM format. E.g., '2023-09-21T07:08:09-07:00' becomes '7:08:09 AM'.
export const formatted_AM_PM_Time = (date) => moment(date).format('h:mm:ss A');