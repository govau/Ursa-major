import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../hooks/use-fetch";
import LineGraph from "../visualisations/line-chart";
import { AxisDomain } from "recharts";
import AxisTickRotate from "../visualisations/formatters/angle-axis-tick";
import PercentageFormatter from "../visualisations/formatters/percentage-formatter";
import { CategoryTooltip } from "../visualisations/formatters/category-tooltip";

interface Props {
  isTabletOrMobile: Boolean;
}

const DeviceBrandVisualisation: React.FC<Props> = ({ isTabletOrMobile }) => {
  const DeviceBrandData = useFetch({
    initialState: "",
    query: `{
        device_brand {
          device_brand
          percent_month
          month_year
        }
      }    
    `,
  });

  interface DeviceBrandType {
    device_brand: string;
    percent_month: number;
    month_year: string;
  }

  const yKeys: Array<string> = [
    "Apple",
    "Samsung",
    "Microsoft",
    "OPPO",
    "Huawei",
  ];
  const initialState: any = {};
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    let months: Array<string> = [];
    let finalData: Array<any> = [];
    let xTicks: Array<any> = [];
    if (!DeviceBrandData.loading) {
      //   console.log(DeviceBrandData);
      // REFACTOR, the data should have this structure out of the box
      //the following code restructures the JSON object from the API into suitable format
      //for the recharts API
      DeviceBrandData.data.device_brand.forEach((row: DeviceBrandType) => {
        if (!months.includes(row.month_year)) {
          months.push(row.month_year);
        }
      });

      months.forEach((month: string, i: number) => {
        i !== 0 && i % 1 === 0 && xTicks.push(month);
        var flattened = "";

        const monthData = DeviceBrandData.data.device_brand.filter(
          (row: DeviceBrandType) => row.month_year === month
        );

        monthData.forEach((row: DeviceBrandType, i: Number) => {
          var devData = `"${[row.device_brand]}":"${row.percent_month}",`;
          flattened += devData;
        });

        var month_yr: string = `"month_yr":"${month}"`;

        var final: string = `{${flattened}${month_yr}}`;

        finalData.push(JSON.parse(final));
        setState({ data: finalData, xTicks });
      });
    }
  }, [DeviceBrandData.loading]);

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
      text: "Popular mobile device brands",
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

  return <>{!DeviceBrandData.loading && <LineGraph {...lineGraphProps} />}</>;
};

export default DeviceBrandVisualisation;
