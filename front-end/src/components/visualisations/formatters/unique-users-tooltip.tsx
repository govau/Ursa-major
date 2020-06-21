import { TooltipProps } from "recharts";
import React from "react";
import { formatDate } from "./date-tick-formatter";

interface Props extends TooltipProps {
  isTabletOrMobile?: boolean;
}

const UniqueUsersToolTip: (props: Props) => JSX.Element = ({
  active,
  payload,
  isTabletOrMobile,
}) => {
  let totalVal: string | number = "";
  let date = "";

  if (payload && payload[0]) {
    totalVal = payload[0].payload.total_unique_users_scale * 1000000;
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
          <p>{date}</p>
          <p>{`${totalVal.toLocaleString()} users`}</p>
        </div>
      )}
    </>
  );
};

export default UniqueUsersToolTip;
