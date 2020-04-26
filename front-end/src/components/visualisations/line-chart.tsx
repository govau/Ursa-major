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
import AxisTickRotate from "./angle-axis-tick";
import CustomTooltip from "./custom-tooltip";

interface Props extends LineChartProps {
  xInterval?: AxisInterval;
  xLabel?: LabelProps;
  xTicks?: Array<string>;
  xTickFormatter?: TickFormatterFunction;
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
  isTabletOrMobile: Boolean;
}

const LineGraph: React.FC<Props> = ({
  data,
  x_key,
  margin = { top: 20, right: 10, bottom: 40, left: 10 },
  xTicks,
  xTickSize,
  xTickMargin,
  xTickFormatter,
  Heading,
  yKey,
  yScale,
  yDomain,
  yTicks,
  dot = false,
  fill = "#489cba",
  yTickFormatter,
  isTabletOrMobile,
}) => {
  const HeadingTag: any = Heading.level || "h3";
  return (
    <>
      <HeadingTag className={`bar-chart-title ${Heading.className}`}>
        {Heading.text}
      </HeadingTag>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={x_key}
            tick={<AxisTickRotate />}
            ticks={xTicks}
            tickSize={xTickSize}
            tickMargin={xTickMargin}
          />
          <YAxis
            domain={yDomain}
            ticks={yTicks}
            scale={yScale}
            //FIX so it's customisable
            tickFormatter={yTickFormatter}
          />
          <Tooltip
            content={<CustomTooltip isTabletOrMobile={isTabletOrMobile} />}
          />
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
