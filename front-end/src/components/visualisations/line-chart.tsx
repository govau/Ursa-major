import React, { PureComponent } from "react";
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
  Label,
} from "recharts";
import LineLabel from "./formatters/line-label";

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
  fill?: string;
  dot?: Boolean;
  yTickFormatter?: TickFormatterFunction;
  isTabletOrMobile: Boolean;
  Tick?: any;
  CustomToolTip?: any;
  CustomLabel?: any;
  margin?: Object;
  legend?: Boolean;
  TooltipKeys?: any;
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
  TooltipKeys,
  CustomLabel,
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

  //REFACTOR, should be in a global settings
  const fills: Array<string | undefined> = [
    "#0077ff",
    "#008568",
    "#002957",
    "#e69f00",
    "#cc79a7",
    "#eee12f",
  ];

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
                <CustomToolTip
                  isTabletOrMobile={isTabletOrMobile}
                  payloadKeys={yKeys}
                />
              )
            }
          />
          {legend && (
            <Legend
              // REFACTOR THIS, shouldn't be hard-coded in
              wrapperStyle={{ bottom: "-10px" }}
              iconType="rect"
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
              //Refactor
              label={
                CustomLabel && (
                  <CustomLabel length={data?.length} dataKey={key} />
                )
              }
            ></Line>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineGraph;
