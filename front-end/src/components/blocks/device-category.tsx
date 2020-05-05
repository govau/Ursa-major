import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../hooks/use-fetch";
import LineGraph from "../visualisations/line-chart";
import { AxisDomain } from "recharts";
import AxisTickRotate from "../visualisations/formatters/angle-axis-tick";
import PercentageFormatter from "../visualisations/formatters/percentage-formatter";
import DeviceCategoryToolTip from "../visualisations/formatters/devices-tooltip";
import LineLabel from "../visualisations/formatters/line-label";

interface Props {
  isTabletOrMobile: Boolean;
}

const DeviceCategoryVisualisation: React.FC<Props> = ({ isTabletOrMobile }) => {
  const deviceData = useFetch({
    initialState: "",
    query: `{
            device_catogories {
              device_category
              percent_month
              month_year
            }
          }
          `,
  });

  interface DeviceCategoryType {
    device_category: string;
    month_year: string;
    percent_month: number;
  }

  interface LineGraphDataType {
    month_yr: string;
    desktop: string;
    tablet: string;
    mobile: string;
  }

  const initialState: any = {};
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    let months: Array<string> = [];
    let finalData: Array<LineGraphDataType> = [];
    let xTicks: Array<any> = [];
    if (!deviceData.loading) {
      // REFACTOR, the data should have this structure out of the box
      //the following code restructures the JSON object from the API into suitable format
      //for the recharts API
      deviceData.data.device_catogories.forEach((row: DeviceCategoryType) => {
        if (!months.includes(row.month_year)) {
          months.push(row.month_year);
        }
      });

      months.forEach((month: string, i: number) => {
        i !== 0 && i % 1 === 0 && xTicks.push(month);
        var flattened = "";

        const monthData = deviceData.data.device_catogories.filter(
          (row: DeviceCategoryType) => row.month_year === month
        );

        monthData.forEach((row: DeviceCategoryType, i: Number) => {
          var devData = `"${[row.device_category]}":"${row.percent_month}"${
            i < 2 ? "," : ""
          }`;
          flattened += devData;
        });

        var month_yr: string = `"month_yr":"${month}"`;

        var final: string = `{${month_yr},${flattened}}`;

        finalData.push(JSON.parse(final));
        setState({ data: finalData, xTicks });
      });
    }
  }, [deviceData.loading]);

  const yDomain: [AxisDomain, AxisDomain] = [0, 100];

  const lineGraphProps = {
    data: state.data,
    yKeys: ["desktop", "mobile", "tablet"],
    x_key: "month_yr",
    yDomain,
    // type: number,
    // yTicks: [100, 200, 300] : [10, 20, 30, 40],
    xTicks: state.xTicks,
    xTickSize: 10,
    xTickMargin: 5,
    Heading: {
      text: "Desktop vs Mobile vs Tablet usage",
      className: "au-display-md bar-chart-title",
      level: "h3",
    },
    fill: "#0077ff",
    isTabletOrMobile,
    Tick: AxisTickRotate,
    // dot:false,
    yTickFormatter: PercentageFormatter,
    margin: isTabletOrMobile
      ? { top: 20, right: 10, bottom: 40, left: 0 }
      : { top: 20, right: 10, bottom: 40, left: -10 },
    legend: true,
    CustomToolTip: DeviceCategoryToolTip,
    CustomLabel: LineLabel,
  };

  return <>{!deviceData.loading && <LineGraph {...lineGraphProps} />}</>;
};

export default DeviceCategoryVisualisation;
