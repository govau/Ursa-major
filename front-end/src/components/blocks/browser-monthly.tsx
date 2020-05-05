import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../hooks/use-fetch";
import LineGraph from "../visualisations/line-chart";
import { AxisDomain } from "recharts";
import AxisTickRotate from "../visualisations/formatters/angle-axis-tick";
import PercentageFormatter from "../visualisations/formatters/percentage-formatter";
import StackedBarGraph from "../visualisations/stacked-chart";
import BarGraph from "../visualisations/bar-chart";
import CategoryTooltip from "../visualisations/formatters/category-tooltip";

interface Props {
  isTabletOrMobile: Boolean;
}

const BrowserMonthly: React.FC<Props> = ({ isTabletOrMobile }) => {
  const browserMonthlyData = useFetch({
    initialState: "",
    query: `{
      total_browser {
        device_browser
        percent_month
        month_year
      }
    }
    `,
  });

  interface BrowserMonthlyType {
    device_browser: string;
    percent_month: number;
    month_year: string;
  }

  interface LineGraphDataType {
    month_yr: string;
    desktop: string;
    tablet: string;
    mobile: string;
  }

  const yKeys: Array<String> = [
    "Safari",
    "Edge",
    "Internet Explorer",
    "Chrome",
    "Others",
  ];
  const initialState: any = {};
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    let months: Array<string> = [];
    let finalData: Array<any> = [];
    let xTicks: Array<any> = [];
    if (!browserMonthlyData.loading) {
      //   console.log(browserMonthlyData);
      // REFACTOR, the data should have this structure out of the box
      //the following code restructures the JSON object from the API into suitable format
      //for the recharts API
      browserMonthlyData.data.total_browser.forEach(
        (row: BrowserMonthlyType) => {
          if (!months.includes(row.month_year)) {
            months.push(row.month_year);
          }
        }
      );

      months.forEach((month: string, i: number) => {
        i !== 0 && i % 1 === 0 && xTicks.push(month);
        var flattened = "";

        const monthData = browserMonthlyData.data.total_browser.filter(
          (row: BrowserMonthlyType) => row.month_year === month
        );

        monthData.forEach((row: BrowserMonthlyType, i: Number) => {
          var devData = `"${[row.device_browser]}":"${row.percent_month}"${
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
  }, [browserMonthlyData.loading]);

  const yDomain: [AxisDomain, AxisDomain] = [0, 55];

  const lineGraphProps = {
    data: state.data,
    yKeys: ["Chrome", "Safari", "Internet Explorer", "Edge", "Others"],
    x_key: "month_yr",
    yDomain,
    yTicks: [0, 25, 50],
    xTicks: state.xTicks,
    xTickSize: 10,
    xTickMargin: 5,
    Tick: AxisTickRotate,
    Heading: {
      text: "Popular browsers",
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
    <>{!browserMonthlyData.loading && <LineGraph {...lineGraphProps} />}</>
  );
};

export default BrowserMonthly;
