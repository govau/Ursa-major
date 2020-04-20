import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Margin,
} from "recharts";

interface Props {
  width?: number;
  height?: number;
  data: Array<Object>;
  margin?: Partial<Margin>;
  x_key: string;
  y_key: string;
  fill?: string;
}

export const BarGraph: React.FC<Props> = ({
  width = 500,
  height = 300,
  data,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  x_key,
  y_key,
  fill = "#d6000",
}) => {
  return (
    <>
      <BarChart width={width} height={height} data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={x_key} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={y_key} fill={fill} />
      </BarChart>
    </>
  );
};
