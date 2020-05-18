import { TickFormatterFunction } from "recharts";

const PercentageFormatter: TickFormatterFunction = (numb: any) => {
  return numb + "%";
};

export default PercentageFormatter;
