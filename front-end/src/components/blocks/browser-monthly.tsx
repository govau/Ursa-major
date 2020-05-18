import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../hooks_helpers/use-fetch";
import LineGraph from "../visualisations/line-chart";
import { AxisDomain } from "recharts";
import AxisTickRotate from "../visualisations/formatters/angle-axis-tick";
import PercentageFormatter from "../visualisations/formatters/percentage-formatter";
import { CategoryTooltip } from "../visualisations/formatters/category-tooltip";
import { TableCellRowSpanMonthly } from "../hooks_helpers/table-formatter";
import { Table } from "../hooks_helpers/table";

interface Props {
  isTabletOrMobile: boolean;
  chartView: boolean;
}

interface Props {
  isTabletOrMobile: boolean;
  chartView: boolean;
}
const BrowserMonthly: React.FC<Props> = ({ isTabletOrMobile, chartView }) => {
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

  const initialState: any = {};
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    const months: Array<string> = [];
    const finalData: Array<any> = [];
    const xTicks: Array<any> = [];
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
        let flattened = "";

        const monthData = browserMonthlyData.data.total_browser.filter(
          (row: BrowserMonthlyType) => row.month_year === month
        );

        monthData.forEach((row: BrowserMonthlyType) => {
          const devData = `"${[row.device_browser]}":"${row.percent_month}",`;
          flattened += devData;
        });

        const month_yr = `"month_yr":"${month}"`;

        const final = `{${flattened}${month_yr}}`;

        finalData.push(JSON.parse(final));
        setState({ data: finalData, xTicks });
      });
    }
  }, [browserMonthlyData.loading]);

  const yDomain: [AxisDomain, AxisDomain] = [0, 55];
  const yKeys: Array<string> = [
    "Chrome",
    "Safari",
    "Internet Explorer",
    "Edge",
    "Others",
  ];
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

  const renderView = () => {
    if (!browserMonthlyData.loading) {
      if (chartView) {
        return <LineGraph {...lineGraphProps} />;
      } else {
        return (
          <Table
            heading={lineGraphProps.Heading.text}
            rowSpanInterval={yKeys.length}
            headers={[
              {
                title: "Time",
                key: "month_year",
                renderCustom: (
                  data: any,
                  row: any,
                  rowIndex: number,
                  columnIndex: number
                ) => (
                  <TableCellRowSpanMonthly
                    data={data}
                    rowIndex={rowIndex}
                    key={columnIndex}
                    rowSpanSize={yKeys.length}
                  />
                ),
              },
              {
                title: "Device type",
                key: "device_browser",
              },
              {
                title: "Total users (%)",
                key: "percent_month",
                type: "numeric",
              },
            ]}
            //Refactor, should be instate
            data={browserMonthlyData.data.total_browser.filter(
              (row: BrowserMonthlyType) => row.device_browser !== "Firefox"
            )}
          />
        );
      }
    } else {
      return <p></p>;
    }
  };

  return <>{renderView()}</>;
};

export default BrowserMonthly;
