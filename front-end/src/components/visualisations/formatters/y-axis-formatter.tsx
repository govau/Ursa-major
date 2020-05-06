import { TickFormatterFunction } from "recharts";

let scaleFormatter: TickFormatterFunction;
let millionthFormatter: TickFormatterFunction;

scaleFormatter = (numb: any) => {
  return numb / 10 + "M";
};

millionthFormatter = (numb: any) => {
  return numb / 1000000 + "M";
};
export { scaleFormatter, millionthFormatter };
