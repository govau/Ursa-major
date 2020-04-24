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

let formatDate: TickFormatterFunction;

formatDate = (date) => {
  let date_obj: Date = new Date(date);
  let month: any = date_obj.getMonth();
  return `${date_obj.getDate()} ${months[month]}`;
};

export default formatDate;
