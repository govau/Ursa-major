import { TickFormatterFunction } from "recharts";

let scaleFormatter: TickFormatterFunction;

scaleFormatter = (numb: any) => {
  return numb / 10 + "M";
};

export default scaleFormatter;
