/* eslint-disable react/display-name */
import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../hooks/use-fetch";
import LineGraph from "../visualisations/line-chart";
import { AxisDomain } from "recharts";
import AxisTickRotate from "../visualisations/formatters/angle-axis-tick";
import { UsersDataTooltip } from "../visualisations/formatters/category-tooltip";
import { formatHour } from "../visualisations/formatters/date-tick-formatter";
import { millionthFormatter } from "../visualisations/formatters/y-axis-formatter";
import AUtable, { AUtableResponsiveWrapper } from "../navigation/ds/table";
import { TableCellRowSpanHourly } from "../hooks/table-formatter";

const AuTable: any = AUtable;

interface Props {
  isTabletOrMobile: boolean;
  chartView?: boolean;
}

const HourlyViewsVisualisation: React.FC<Props> = ({
  isTabletOrMobile,
  chartView,
}) => {
  const HourlyViewsData = useFetch({
    initialState: "",
    query: `{
        hourly_unique_views {
          visit_hour
          day_type
          total_unique_users
        }
      }
    `,
  });

  interface HourlyDataType {
    visit_hour: string;
    day_type: string;
    total_unique_users: string;
  }

  const yKeys: Array<string> = ["weekday", "weekend"];
  const initialState: any = {};
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    const hours: Array<string> = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ];
    const finalData: Array<any> = [];
    const xTicks: Array<any> = [];
    if (!HourlyViewsData.loading) {
      //   console.log(HourlyViewsData);
      // REFACTOR, the data should have this structure out of the box
      //the following code restructures the JSON object from the API into suitable format
      //for the recharts API
      //   HourlyViewsData.data.hourly_unique_views.forEach((row: DeviceBrandType) => {
      //     if (!months.includes(row.month_year)) {
      //       months.push(row.month_year);
      //     }
      //   });
      hours.forEach((hour: string, i: number) => {
        i !== 0 && i % 2 === 0 && xTicks.push(hour);
        let flattened = "";
        const hourlyData = HourlyViewsData.data.hourly_unique_views.filter(
          (row: HourlyDataType) => row.visit_hour === hour
        );

        hourlyData.forEach((row: HourlyDataType) => {
          const devData = `"${[row.day_type]}":"${row.total_unique_users}",`;
          flattened += devData;
        });
        const hour_data = `"visit_hour":"${hour}"`;
        const final = `{${flattened}${hour_data}}`;
        finalData.push(JSON.parse(final));
        setState({ data: finalData, xTicks });
      });
    }
  }, [HourlyViewsData.loading]);

  const yDomain: [AxisDomain, AxisDomain] = [0, 3000000];

  const lineGraphProps = {
    data: state.data,
    yKeys,
    x_key: "visit_hour",
    yDomain,
    yTicks: [500000, 1000000, 1500000, 2000000, 2500000],
    xTicks: state.xTicks,
    xTickSize: 10,
    xTickMargin: 5,
    Tick: AxisTickRotate,
    Heading: {
      text: "Average unique users on an hourly basis, last 90 days",
      className: "au-display-md bar-chart-title",
      level: "h3",
    },
    isTabletOrMobile,
    // Tick: AxisTickRotate,
    // dot:false,
    yTickFormatter: millionthFormatter,
    margin: isTabletOrMobile
      ? { top: 20, right: 10, bottom: 40, left: 0 }
      : { top: 20, right: 10, bottom: 40, left: -10 },
    legend: true,
    xTickFormatter: formatHour,
    CustomToolTip: UsersDataTooltip,
  };

  const renderView = () => {
    if (!HourlyViewsData.loading) {
      if (chartView) {
        return <LineGraph {...lineGraphProps} />;
      } else {
        return (
          <AUtableResponsiveWrapper>
            <AuTable
              caption={lineGraphProps.Heading.text}
              rowSpanInterval={yKeys.length}
              headers={[
                {
                  title: "Visit hour",
                  key: "visit_hour",
                  renderCustom: (
                    data: any,
                    row: any,
                    rowIndex: number,
                    columnIndex: number
                  ) => (
                    <TableCellRowSpanHourly
                      data={data}
                      rowIndex={rowIndex}
                      colIndex={columnIndex}
                    />
                  ),
                },
                {
                  title: "Day type",
                  key: "day_type",
                },
                {
                  title: "Total users (millions)",
                  key: "total_unique_users",
                  type: "numeric",
                  render: millionthFormatter,
                },
              ]}
              data={HourlyViewsData.data.hourly_unique_views}
            />
          </AUtableResponsiveWrapper>
        );
      }
    } else {
      return <p></p>;
    }
  };

  return <>{renderView()}</>;
};

export default HourlyViewsVisualisation;
