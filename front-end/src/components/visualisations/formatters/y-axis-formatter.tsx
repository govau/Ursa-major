import { TickFormatterFunction } from "recharts";

const scaleFormatter: TickFormatterFunction = (numb: any) => {
  return numb + "M";
};

const millionthFormatter: TickFormatterFunction = (numb: any) => {
  return numb / 1000000 + "M";
};

export { scaleFormatter, millionthFormatter };
