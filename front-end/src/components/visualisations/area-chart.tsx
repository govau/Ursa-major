import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Margin,
  AxisDomain,
  BarProps,
  ScaleType,
  AxisInterval,
  LabelProps,
  ResponsiveContainer,
  TickFormatterFunction,
  Legend,
  AreaChart,
  Area,
} from "recharts";

interface Props extends BarProps {
  margin?: Partial<Margin>;
  fill?: string;
  yKeys: Array<string>;
  yScale?: ScaleType;
  yLabel?: LabelProps;
  yDomain: [AxisDomain, AxisDomain];
  yTicks?: Array<number>;
  xInterval?: AxisInterval;
  xTicks?: Array<string>;
  xTickSize?: number;
  xTickMargin?: number;
  Tick?: any;
  yTickFormatter?: TickFormatterFunction;
  xTickFormatter?: TickFormatterFunction;
  dataKey: string;
  Heading: {
    text: string;
    className: string;
    level: string;
  };
}

const StackedAreaGraph: React.FC<Props> = ({
  data,
  margin,
  dataKey,
  xInterval,
  yTicks,
  xTicks,
  xTickSize,
  xTickMargin,
  yKeys,
  yScale,
  yTickFormatter,
  Tick,
  xTickFormatter,
  yDomain,
  Heading,
}) => {
  const HeadingTag: any = Heading.level || "h3";
  const fills: Array<string | undefined> = ["#0077ff", "#002957", "#008568"];

  return (
    <>
      <HeadingTag className={`bar-chart-title ${Heading.className}`}>
        {Heading.text}
      </HeadingTag>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={dataKey}
            ticks={xTicks}
            interval={xInterval}
            tickSize={xTickSize}
            tickMargin={xTickMargin}
            tick={
              Tick && <Tick formatFunction={xTickFormatter && xTickFormatter} />
            }
          ></XAxis>
          <YAxis
            domain={yDomain}
            ticks={yTicks}
            tickFormatter={yTickFormatter}
            scale={yScale}
          />
          <Tooltip />
          <Legend iconType="square" wrapperStyle={{ bottom: "-10px" }} />
          {yKeys.map((key: string, i: number) => (
            <Area
              type="monotone"
              dataKey={key}
              key={i}
              fill={fills[i]}
              stroke={fills[i % 3]}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default StackedAreaGraph;
