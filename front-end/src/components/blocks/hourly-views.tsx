import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../hooks/use-fetch";
import LineGraph from "../visualisations/line-chart";
import { AxisDomain } from "recharts";
import AxisTickRotate from "../visualisations/formatters/angle-axis-tick";
import { UsersDataTooltip } from "../visualisations/formatters/category-tooltip";
import { formatHour } from "../visualisations/formatters/date-tick-formatter";
import { millionthFormatter } from "../visualisations/formatters/y-axis-formatter";

interface Props {
  isTabletOrMobile: Boolean;
}

const HourlyViewsVisualisation: React.FC<Props> = ({ isTabletOrMobile }) => {
  const HourlyViewsData = useFetch({
    initialState: "",
    query: `{
        hourly_unique_views(id:"huv") {
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
    let hours: Array<string> = [
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
    let finalData: Array<any> = [];
    let xTicks: Array<any> = [];
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
        var flattened = "";
        const hourlyData = HourlyViewsData.data.hourly_unique_views.filter(
          (row: HourlyDataType) => row.visit_hour === hour
        );

        hourlyData.forEach((row: HourlyDataType, i: Number) => {
          var devData;
          devData = `"${[row.day_type]}":"${row.total_unique_users}",`;
          flattened += devData;
        });
        var hour_data: string = `"visit_hour":"${hour}"`;
        var final: string = `{${flattened}${hour_data}}`;
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

  return <>{!HourlyViewsData.loading && <LineGraph {...lineGraphProps} />}</>;
};

export default HourlyViewsVisualisation;
