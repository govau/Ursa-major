import { TooltipProps } from "recharts";
import React from "react";

interface Props extends TooltipProps {}

let DeviceCategoryToolTip: (props: Props) => JSX.Element;

DeviceCategoryToolTip = ({ active, payload, label }) => {
  let mobile: string | number = "";
  let tablet: string = "";
  let desktop: string = "";
  let date: string = "";

  if (payload && payload[0]) {
    mobile = `Mobile: ${payload[0].payload.mobile}%`;
    tablet = `Tablet: ${payload[0].payload.tablet}%`;
    desktop = `Desktop: ${payload[0].payload.desktop}%`;
    date = `${payload[0].payload.month_yr}`;
  }

  return (
    <>
      {active && (
        <div className="custom-tooltip au-body">
          <p>{date}</p>
          <p>{desktop}</p>
          <p>{mobile}</p>
          <p>{tablet}</p>
        </div>
      )}
    </>
  );
};

export default DeviceCategoryToolTip;
