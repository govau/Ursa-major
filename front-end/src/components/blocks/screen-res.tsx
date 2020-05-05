import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../hooks/use-fetch";
import LineGraph from "../visualisations/line-chart";
import { AxisDomain } from "recharts";
import AxisTickRotate from "../visualisations/formatters/angle-axis-tick";
import PercentageFormatter from "../visualisations/formatters/percentage-formatter";
import CategoryTooltip from "../visualisations/formatters/category-tooltip";

interface Props {
  isTabletOrMobile: Boolean;
}

const ScreenResVisualisation: React.FC<Props> = ({ isTabletOrMobile }) => {
  const screenResMonthlyData = useFetch({
    initialState: "",
    query: `{
        total_screen_res {
          device_screen_res
          month_year
          percent_month
        }
      }
      
    `,
  });

  interface ScreenResMonthlyType {
    device_screen_res: string;
    percent_month: number;
    month_year: string;
  }

  const yKeys: Array<string> = [
    "Others",
    "1920x1080",
    "1366x768",
    "375x667",
    "1440x900",
  ];
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
          var devData = `"${[row.device_screen_res]}":"${row.percent_month}"${
            i < 5 ? "," : ""
          }`;
          flattened += devData;
        });

        var month_yr: string = `"month_yr":"${month}"`;

        var final: string = `{${month_yr},${flattened}}`;

        finalData.push(JSON.parse(final));
        setState({ data: finalData, xTicks });
      });
    }
  }, [screenResMonthlyData.loading]);

  const yDomain: [AxisDomain, AxisDomain] = [0, 55];

  const lineGraphProps = {
    data: state.data,
    yKeys,
    x_key: "month_yr",
    yDomain,
    yTicks: [0, 25, 50],
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
    yTickFormatter: PercentageFormatter,
    margin: isTabletOrMobile
      ? { top: 20, right: 10, bottom: 40, left: 0 }
      : { top: 20, right: 10, bottom: 40, left: -10 },
    legend: true,
    CustomToolTip: CategoryTooltip,
  };

  return (
    <>{!screenResMonthlyData.loading && <LineGraph {...lineGraphProps} />}</>
  );
};

export default ScreenResVisualisation;
