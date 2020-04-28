import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../hooks/use-fetch";
import LineGraph from "../visualisations/line-chart";
import { AxisDomain } from "recharts";
import AxisTickRotate from "../visualisations/angle-axis-tick";
import PercentageFormatter from "../visualisations/percentage-formatter";

interface Props {
  isTabletOrMobile: Boolean;
}

const DeviceCategoryVisualisation: React.FC<Props> = ({ isTabletOrMobile }) => {
  const deviceData = useFetch({
    initialState: "",
    query: `{
            device_catogories {
              device_category
              device_category_count
              percent_month
              month_year
            }
          }
          `,
  });

  const initialState: any = {};
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    let months: Array<any> = [];
    let finalData: Array<any> = [];
    let xTicks: Array<any> = [];
    if (!deviceData.loading) {
      deviceData.data.device_catogories.forEach((a: any) => {
        if (!months.includes(a.month_year)) {
          months.push(a.month_year);
        }
      });

      months.forEach((month: string, i: number) => {
        i !== 0 && i % 1 === 0 && xTicks.push(month);
        var flattened = "";
        const monthData = deviceData.data.device_catogories.filter(
          (row: any) => row.month_year === month
        );

        monthData.forEach((row: any, i: Number) => {
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
    yKeys: ["mobile", "tablet", "desktop"],
    x_key: "month_yr",
    yDomain,
    // type: number,
    // yTicks: [100, 200, 300] : [10, 20, 30, 40],
    xTicks: state.xTicks,
    xTickSize: 10,
    xTickMargin: 5,
    Heading: {
      text: "Device categories",
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
    // xTickFormatter: formatDate,
  };

  return (
    <div className="container-fluid">
      <LineGraph {...lineGraphProps} />
    </div>
  );
};

export default DeviceCategoryVisualisation;
