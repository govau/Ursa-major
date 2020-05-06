import { TickFormatterFunction } from "recharts";

let months: Array<String> = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let times: Array<string> = [
  "12am",
  "1am",
  "2am",
  "3am",
  "4am",
  "5am",
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
  "9pm",
  "10pm",
  "11pm",
];

//REFACTOR May become redundant once data stream is updated
let formatDate: TickFormatterFunction;
let formatHour: TickFormatterFunction;

formatDate = (date) => {
  let date_obj: Date = new Date(date);
  let month: any = date_obj.getMonth();
  return `${date_obj.getDate()} ${months[month]}`;
};

formatHour = (hour) => {
  return times[hour];
};

export { formatDate, formatHour };
