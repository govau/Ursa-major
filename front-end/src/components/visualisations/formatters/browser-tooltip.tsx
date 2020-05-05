import { TooltipProps } from "recharts";
import React from "react";

interface Props extends TooltipProps {
  payloadKeys: Array<string>;
}

interface ToolTipData {
  color: string;
  category: string;
}

let BrowserToolTip: (props: Props) => JSX.Element;

BrowserToolTip = ({ active, payload, label, payloadKeys }) => {
  let tooltipData: any = [];
  let date: string = "";

  if (payload && payload[0]) {
    payloadKeys.map((category: any, i: any) =>
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

export default BrowserToolTip;
