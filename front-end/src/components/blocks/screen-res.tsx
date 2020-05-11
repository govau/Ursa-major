import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../hooks/use-fetch";
import LineGraph from "../visualisations/line-chart";
import { AxisDomain } from "recharts";
import AxisTickRotate from "../visualisations/formatters/angle-axis-tick";
import PercentageFormatter from "../visualisations/formatters/percentage-formatter";
import {
  CategoryTooltip,
  UsersDataTooltip,
} from "../visualisations/formatters/category-tooltip";
import { millionthFormatter } from "../visualisations/formatters/y-axis-formatter";

interface Props {
  isTabletOrMobile: Boolean;
}

const ScreenResVisualisation: React.FC<Props> = ({ isTabletOrMobile }) => {
  const screenResMonthlyData = useFetch({
    initialState: "",
    query: `{
        total_screen_res(id:"sr") {
          device_screen_res
          month_year
          screen_res_count
        }
      }
      
    `,
  });

  interface ScreenResMonthlyType {
    device_screen_res: string;
    screen_res_count: number;
    month_year: string;
  }

  const yKeys: Array<string> = ["1920x1080", "1366x768", "375x667", "1440x900"];
  const initialState: any = {};
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    let months: Array<string> = [];
    let finalData: Array<any> = [];
    let xTicks: Array<any> = [];
    if (!screenResMonthlyData.loading) {
      //   console.log(screenResMonthlyData);
      // REFACTOR, the data should have this structure out of the box
      //the following code restructures the JSON object from the API into suitable format
      //for the recharts API
      screenResMonthlyData.data.total_screen_res.forEach(
        (row: ScreenResMonthlyType) => {
          if (!months.includes(row.month_year)) {
            months.push(row.month_year);
          }
        }
      );

      months.forEach((month: string, i: number) => {
        i !== 0 && i % 1 === 0 && xTicks.push(month);
        var flattened = "";

        const monthData = screenResMonthlyData.data.total_screen_res.filter(
          (row: ScreenResMonthlyType) => row.month_year === month
        );

        monthData.forEach((row: ScreenResMonthlyType, i: Number) => {
          var devData = `"${[row.device_screen_res]}":"${
            row.screen_res_count
          }",`;
          flattened += devData;
        });

        var month_yr: string = `"month_yr":"${month}"`;

        var final: string = `{${flattened}${month_yr}}`;

        finalData.push(JSON.parse(final));
        setState({ data: finalData, xTicks });
      });
    }
  }, [screenResMonthlyData.loading]);

  const yDomain: [AxisDomain, AxisDomain] = [0, 6000000];

  const lineGraphProps = {
    data: state.data,
    yKeys,
    x_key: "month_yr",
    yDomain,
    yTicks: [2500000, 5000000],
    xTicks: state.xTicks,
    xTickSize: 10,
    xTickMargin: 5,
    Tick: AxisTickRotate,
    Heading: {
      text: "Popular screen resolutions",
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
    CustomToolTip: UsersDataTooltip,
  };

  return (
    <>{!screenResMonthlyData.loading && <LineGraph {...lineGraphProps} />}</>
  );
};

export default ScreenResVisualisation;
