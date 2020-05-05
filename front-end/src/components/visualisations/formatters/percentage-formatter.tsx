import { TickFormatterFunction } from "recharts";

let PercentageFormatter: TickFormatterFunction;

PercentageFormatter = (numb: any) => {
  return numb + "%";
};

export default PercentageFormatter;
