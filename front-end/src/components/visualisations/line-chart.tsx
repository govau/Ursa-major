import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChartProps,
  AxisInterval,
  LabelProps,
  ResponsiveContainer,
  ScaleType,
  AxisDomain,
} from "recharts";
import CustomTooltipContent from "./custom-tooltip";
import scaleFormatter from "./y-axis-formatter";

interface Props extends LineChartProps {
  xInterval?: AxisInterval;
  xLabel?: LabelProps;
  xTicks?: Array<string>;
  xTickSize?: number;
  xTickMargin?: number;
  dataKey: string;
  yDomain: [AxisDomain, AxisDomain];
  yKey: string;
  yScale?: ScaleType;
  yLabel?: LabelProps;
  yTicks?: Array<number>;
  Heading: {
    text: string;
    className?: string;
    level?: string;
  };
  fill: string;
  dot?: Boolean;
}

const LineGraph: React.FC<Props> = ({
  data,
  dataKey,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  xTicks,
  xTickSize,
  xTickMargin,
  Heading,
  yKey,
  yLabel,
  yScale,
  yDomain,
  yTicks,
  dot = false,
  fill = "#489cba",
}) => {
  const HeadingTag: any = Heading.level || "h3";
  return (
    <>
      <HeadingTag className={`bar-chart-title ${Heading.className}`}>
        {Heading.text}
      </HeadingTag>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={dataKey}
            ticks={xTicks}
            tickSize={xTickSize}
            tickMargin={xTickMargin}
            tickFormatter={formatDate}
          />
          <YAxis
            domain={yDomain}
            ticks={yTicks}
            scale={yScale}
            //FIX so it's customisable
            tickFormatter={scaleFormatter}
          />
          <Tooltip content={CustomTooltipContent} />
          <Line
            type="monotone"
            //FIX add prop type
            dataKey="total_unique_users_scale"
            dot={dot}
            stroke={fill}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineGraph;

const formatDate = (date: any) => {
  return date.substring(5);
};
