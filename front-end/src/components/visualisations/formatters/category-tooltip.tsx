import { TooltipProps } from "recharts";
import React from "react";
import { formatHour } from "./date-tick-formatter";
import { millionthFormatter } from "./y-axis-formatter";

interface Props extends TooltipProps {
  payloadKeys: Array<string>;
}

interface ToolTipData {
  color: string;
  category: string;
}

// reads through the categories of the data and auto generates tooltip based off payload and stroke colours
let CategoryTooltip: (props: Props) => JSX.Element;
let HourlyDataToolTip: (props: Props) => JSX.Element;

CategoryTooltip = ({ active, payload, label, payloadKeys }) => {
  let tooltipData: any = [];
  let date: string | number = "";

  if (payload && payload[0]) {
    payloadKeys.map(
      (category: any, i: any) =>
        payload[0].payload[category] &&
        tooltipData.push({
          category: `${category}: ${payload[0].payload[category]}%`,
          color: payload[i] && payload[i].color,
        })
    );

    date = `${payload[0].payload.month_yr}`;
  }

  return (
    <>
      {active && (
        <div className="custom-tooltip au-body">
          <p>{date}</p>
          {tooltipData.map((row: ToolTipData, i: any) => (
            <p className="custom-tooltip__text" key={i}>
              <span
                className="color-square"
                style={{ background: row.color }}
              ></span>
              {row.category}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

HourlyDataToolTip = ({ active, payload, label, payloadKeys }) => {
  let tooltipData: any = [];
  let time: string | number = "";

  if (payload && payload[0]) {
    payloadKeys.map(
      (category: any, i: any) =>
        payload[0].payload[category] &&
        tooltipData.push({
          category: `${category}: ${(
            payload[0].payload[category] / 1000000
          ).toFixed(2)}M users`,
          color: payload[i] && payload[i].color,
        })
    );

    time = `${formatHour(payload[0].payload.visit_hour)}`;
  }

  return (
    <>
      {active && (
        <div className="custom-tooltip au-body">
          <p>Time: {time}</p>
          {tooltipData.map((row: ToolTipData, i: any) => (
            <p className="custom-tooltip__text" key={i}>
              <span
                className="color-square"
                style={{ background: row.color }}
              ></span>
              {row.category}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export { CategoryTooltip, HourlyDataToolTip };
