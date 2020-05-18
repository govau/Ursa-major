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

const OperatingSystemVisualisation: React.FC<Props> = ({
  isTabletOrMobile,
  chartView,
}) => {
  const operatingSysVersionData = useFetch({
    initialState: "",
    query: `{
        operating_system_total {
          device_opsys
          percent_month
          month_year
        }
      }       
    `,
  });

  interface OperatingSystemType {
    device_opsys: string;
    percent_month: number;
    month_year: string;
  }

  const yKeys: Array<string> = [
    "Windows",
    "iOS",
    "Android",
    "Macintosh",
    "Linux",
  ];
  const initialState: any = {};
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    const months: Array<string> = [];
    const finalData: Array<any> = [];
    const xTicks: Array<any> = [];
    if (!operatingSysVersionData.loading) {
      //   console.log(operatingSysVersionData);
      // REFACTOR, the data should have this structure out of the box
      //the following code restructures the JSON object from the API into suitable format
      //for the recharts API
      operatingSysVersionData.data.operating_system_total.forEach(
        (row: OperatingSystemType) => {
          if (!months.includes(row.month_year)) {
            months.push(row.month_year);
          }
        }
      );

      months.forEach((month: string, i: number) => {
        i !== 0 && i % 1 === 0 && xTicks.push(month);
        let flattened = "";

        const monthData = operatingSysVersionData.data.operating_system_total.filter(
          (row: OperatingSystemType) => row.month_year === month
        );

        monthData.forEach((row: OperatingSystemType) => {
          const devData = `"${[row.device_opsys]}":"${row.percent_month}",`;
          flattened += devData;
        });

        const month_yr = `"month_yr":"${month}"`;

        const final = `{${flattened}${month_yr}}`;

        finalData.push(JSON.parse(final));
        setState({ data: finalData, xTicks });
      });
    }
  }, [operatingSysVersionData.loading]);

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
      text: "Popular operating systems",
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
    if (!operatingSysVersionData.loading) {
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
                title: "Operating system",
                key: "device_opsys",
              },
              {
                title: "Total users (%)",
                key: "percent_month",
                type: "numeric",
              },
            ]}
            data={operatingSysVersionData.data.operating_system_total.filter(
              (row: OperatingSystemType) => row.device_opsys !== "Others"
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

export default OperatingSystemVisualisation;
