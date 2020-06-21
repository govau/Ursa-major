import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../hooks_helpers/use-fetch";
import { AxisDomain } from "recharts";
import { number } from "prop-types";
import LineGraph from "../visualisations/line-chart";
import { scaleFormatter } from "../visualisations/formatters/y-axis-formatter";
import { formatDate } from "../visualisations/formatters/date-tick-formatter";
import AxisTickRotate from "../visualisations/formatters/angle-axis-tick";
import UniqueUsersToolTip from "../visualisations/formatters/unique-users-tooltip";
import { Table } from "../hooks_helpers/table";

interface Props {
  isTabletOrMobile: boolean;
  chartView?: boolean;
}

const UniqueUsersLineGraph: React.FC<Props> = ({
  isTabletOrMobile,
  chartView,
}) => {
  const graphData = useFetch({
    initialState: "",
    query: `{total_unique {total_unique_users_scale visit_date}}`,
  });

  const initialState: any = {};
  const [state, setstate] = useState(initialState);

  // use this to generate data for mobile view
  useLayoutEffect((): any => {
    let count = 0;
    let datePoint = "";
    const mobileData: Array<any> = [];
    const xTicksMobile: Array<any> = [];
    const xTicksDesktop: Array<any> = [];
    let i = 0;

    if (!graphData.loading) {
      for (i = 0; i < graphData.data.total_unique.length; i++) {
        count =
          +graphData.data.total_unique[i].total_unique_users_scale + +count;
        if (i % 13 === 0) {
          datePoint = graphData.data.total_unique[i].visit_date;
          i % 2 && xTicksMobile.push(datePoint);
          mobileData.push({
            total_unique_users_scale: count,
            visit_date: datePoint,
          });
          count = 0;
        }

        if (i === graphData.data.total_unique.length - 1) {
          datePoint = graphData.data.total_unique[i].visit_date;
          xTicksMobile.push(datePoint);
          mobileData.push({
            total_unique_users_scale: count,
            visit_date: datePoint,
          });
          count = 0;
        }
      }

      [6, 13, 20, 27, 34, 41, 48, 55, 62, 69, 76, 83].map((index: number) => {
        xTicksDesktop.push(graphData.data.total_unique[index].visit_date);
      });
    }
    setstate({ data: mobileData, xTicksMobile, xTicksDesktop });
  }, [graphData.loading]);

  //REFACTOR this should be automatic based off the data
  const yDomain: [AxisDomain, AxisDomain] = isTabletOrMobile
    ? [10, 40]
    : [0, 5];

  const lineGraphProps = {
    data: isTabletOrMobile ? state.data : graphData.data.total_unique,
    yKeys: ["total_unique_users_scale"],
    x_key: "visit_date",
    yDomain,
    type: number,
    yTicks: isTabletOrMobile ? [10, 20, 30] : [1, 2, 3, 4],
    xTicks: isTabletOrMobile ? state.xTicksMobile : state.xTicksDesktop,
    xTickSize: 10,
    xTickMargin: 5,
    Heading: {
      text: "Total unique users, last 90 days",
      className: "au-display-md bar-chart-title",
      level: "h3",
    },
    fill: "#0077ff",
    dot: isTabletOrMobile ? true : false,
    yTickFormatter: scaleFormatter,
    xTickFormatter: formatDate,
    isTabletOrMobile,
    Tick: AxisTickRotate,
    CustomToolTip: UniqueUsersToolTip,
  };

  const renderData = () => {
    if (!graphData.loading) {
      if (chartView) {
        return <LineGraph {...lineGraphProps} />;
      } else {
        return (
          <Table
            heading={lineGraphProps.Heading.text}
            headers={[
              { title: "Date", key: "visit_date", render: formatDate },
              {
                title: "Total views (millions)",
                key: "total_unique_users_scale",
                type: "numeric",
                render: (data: any) => <span>{data.toFixed(2)}M</span>,
              },
            ]}
            data={!graphData.loading && graphData.data.total_unique}
          />
        );
      }
    } else {
      return <p></p>;
    }
  };

  return <>{renderData()}</>;
};

export default UniqueUsersLineGraph;
