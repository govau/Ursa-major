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
  LegendType,
  Legend,
} from "recharts";
import CustomTooltip from "./unique-users-tooltip";

interface Props extends LineChartProps {
  xInterval?: AxisInterval;
  xLabel?: LabelProps;
  xTicks?: Array<string>;
  xTickFormatter?: TickFormatterFunction;
  xTickSize?: number;
  xTickMargin?: number;
  x_key: string;
  yDomain: [AxisDomain, AxisDomain];
  yKeys: Array<string>;
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
  Tick?: any;
  CustomToolTip?: any;
  margin?: Object;
  legend?: Boolean;
}

const LineGraph: React.FC<Props> = ({
  data,
  x_key,
  margin,
  xTicks,
  xTickSize,
  xTickMargin,
  xTickFormatter,
  Heading,
  Tick,
  yKeys,
  yScale,
  yDomain,
  yTicks,
  dot = false,
  CustomToolTip,
  fill = "#489cba",
  yTickFormatter,
  isTabletOrMobile,
  legend,
}) => {
  const HeadingTag: any = Heading.level || "h3";
  if (!margin) {
    margin = isTabletOrMobile
      ? { top: 20, right: 10, bottom: 40, left: -0 }
      : { top: 20, right: 10, bottom: 40, left: -15 };
  }

  const fills: Array<string | number> = ["#0077ff", "#002957", "#008568"];

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
            tick={
              Tick && <Tick formatFunction={xTickFormatter && xTickFormatter} />
            }
            ticks={xTicks && xTicks}
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
            content={
              CustomToolTip && (
                <CustomToolTip isTabletOrMobile={isTabletOrMobile} />
              )
            }
          />
          {legend && (
            <Legend
              // REFACTOR THIS, shouldn't be hard-coded in
              wrapperStyle={{ bottom: "-10px" }}
            />
          )}
          {yKeys.map((key: string, i: number) => (
            <Line
              type="monotone"
              dataKey={key}
              dot={dot}
              stroke={fills[i]}
              strokeWidth={3}
              key={i}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineGraph;
