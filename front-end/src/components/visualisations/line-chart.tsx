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
  TickFormatterFunction,
} from "recharts";
import CustomTooltipContent from "./custom-tooltip";
import scaleFormatter from "./y-axis-formatter";

interface Props extends LineChartProps {
  xInterval?: AxisInterval;
  xLabel?: LabelProps;
  xTicks?: Array<string>;
  xTickSize?: number;
  xTickMargin?: number;
  x_key: string;
  yDomain: [AxisDomain, AxisDomain];
  yKey: string;
  yScale?: ScaleType;
  yTicks?: Array<number>;
  Heading: {
    text: string;
    className?: string;
    level?: string;
  };
  fill: string;
  dot?: Boolean;
  yTickFormatter?: TickFormatterFunction;
}

const LineGraph: React.FC<Props> = ({
  data,
  x_key,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  xTicks,
  xTickSize,
  xTickMargin,
  Heading,
  yKey,
  yScale,
  yDomain,
  yTicks,
  dot = false,
  fill = "#489cba",
  yTickFormatter,
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
            dataKey={x_key}
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
            tickFormatter={yTickFormatter}
          />
          <Tooltip content={CustomTooltipContent} />
          <Line
            type="monotone"
            dataKey={yKey}
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
