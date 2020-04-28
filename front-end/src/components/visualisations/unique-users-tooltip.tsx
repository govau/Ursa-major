import { TooltipProps } from "recharts";
import React from "react";
import formatDate from "./date-tick-formatter";

interface Props extends TooltipProps {
  isTabletOrMobile?: Boolean;
}

let UniqueUsersToolTip: (props: Props) => JSX.Element;

UniqueUsersToolTip = ({ active, payload, label, isTabletOrMobile }) => {
  let totalVal: string | number = "";
  let date: string = "";

  if (payload && payload[0]) {
    totalVal = payload[0].payload.total_unique_users_scale * 100000;
    if (isTabletOrMobile) {
      date = `Fortnight ending ${formatDate(payload[0].payload.visit_date)}`;
    } else {
      date = formatDate(payload[0].payload.visit_date);
    }
  }

  return (
    <>
      {active && (
        <div className="custom-tooltip au-body">
          <p>{`${totalVal.toLocaleString()} views`}</p>
          <p>{date}</p>
        </div>
      )}
    </>
  );
};

export default UniqueUsersToolTip;
