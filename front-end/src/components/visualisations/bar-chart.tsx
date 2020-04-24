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
} from "recharts";
import CustomTooltipContent from "./custom-tooltip";

interface Props extends BarProps {
  margin?: Partial<Margin>;
  fill?: string;
  yKey: string;
  yScale?: ScaleType;
  yLabel?: LabelProps;
  yDomain: [AxisDomain, AxisDomain];
  yTicks?: Array<number>;
  xInterval?: AxisInterval;
  xLabel?: LabelProps;
  xTicks?: Array<string>;
  xTickSize?: number;
  xTickMargin?: number;
  Heading: {
    text: string;
    className: string;
    level: string;
  };
}

const BarGraph: React.FC<Props> = ({
  data,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  dataKey,
  xInterval,
  yTicks,
  xTicks,
  xTickSize,
  xTickMargin,
  xLabel,
  yAxis,
  yKey,
  yLabel,
  yScale,
  yDomain,
  Heading,
  fill = "#489cba",
}) => {
  const HeadingTag: any = Heading.level || "h3";
  return (
    <>
      <HeadingTag className={`bar-chart-title ${Heading.className}`}>
        {Heading.text}
      </HeadingTag>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={dataKey}
            ticks={xTicks}
            interval={xInterval}
            tickSize={xTickSize}
            tickMargin={xTickMargin}
          ></XAxis>
          <YAxis domain={yDomain} ticks={yTicks} scale={yScale} />
          <Tooltip content={CustomTooltipContent} />
          <Bar dataKey={yKey} fill={fill} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarGraph;
