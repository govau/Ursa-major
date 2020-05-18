import React, { useState, useLayoutEffect } from "react";
import { useFetch } from "../hooks_helpers/use-fetch";
import LineGraph from "../visualisations/line-chart";
import { AxisDomain } from "recharts";
import AxisTickRotate from "../visualisations/formatters/angle-axis-tick";
import { UsersDataTooltip } from "../visualisations/formatters/category-tooltip";
import { millionthFormatter } from "../visualisations/formatters/y-axis-formatter";
import AUtable, { AUtableResponsiveWrapper } from "../navigation/ds/table";
import { TableCellRowSpanMonthly } from "../hooks_helpers/table-formatter";
import { Table } from "../hooks_helpers/table";

const AuTable: any = AUtable;

interface Props {
  isTabletOrMobile: boolean;
  chartView: boolean;
}

const OperatingSysVersionVisualisation: React.FC<Props> = ({
  isTabletOrMobile,
  chartView,
}) => {
  const operatingSysVersionData = useFetch({
    initialState: "",
    query: `{
      opsys_version_total {
        device_opsys_ver
        month_year
        opsys_version_count
      }
    }    
    `,
  });

  interface OpsysVersionType {
    device_opsys_ver: string;
    opsys_version_count: string;
    month_year: string;
  }

  const yKeys: Array<string> = [
    "Windows_10",
    "Android_9",
    "Windows_7",
    "iOS_13",
    "iOS_12",
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
      operatingSysVersionData.data.opsys_version_total.forEach(
        (row: OpsysVersionType) => {
          if (!months.includes(row.month_year)) {
            months.push(row.month_year);
          }
        }
      );

      months.forEach((month: string, i: number) => {
        i !== 0 && i % 1 === 0 && xTicks.push(month);
        let flattened = "";

        const monthData = operatingSysVersionData.data.opsys_version_total.filter(
          (row: OpsysVersionType) => row.month_year === month
        );

        monthData.forEach((row: OpsysVersionType) => {
          const devData = `"${[row.device_opsys_ver]}":"${
            row.opsys_version_count
          }",`;
          flattened += devData;
        });

        const month_yr = `"month_yr":"${month}"`;

        const final = `{${flattened}${month_yr}}`;

        finalData.push(JSON.parse(final));
        setState({ data: finalData, xTicks });
      });
    }
  }, [operatingSysVersionData.loading]);

  const yDomain: [AxisDomain, AxisDomain] = [0, 13000000];

  const lineGraphProps = {
    data: state.data,
    yKeys,
    x_key: "month_yr",
    yDomain,
    yTicks: [0, 5000000, 10000000],
    xTicks: state.xTicks,
    xTickSize: 10,
    xTickMargin: 5,
    Tick: AxisTickRotate,
    Heading: {
      text: "Popular operating system versions",
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
                    colIndex={columnIndex}
                    rowSpanSize={yKeys.length}
                  />
                ),
              },
              {
                title: "Operating system",
                key: "device_opsys_ver",
              },
              {
                title: "Total users",
                key: "opsys_version_count",
                type: "numeric",
                render: millionthFormatter,
              },
            ]}
            data={operatingSysVersionData.data.opsys_version_total}
          />
        );
      }
    } else {
      return <p></p>;
    }
  };

  return <>{renderView()}</>;
};

export default OperatingSysVersionVisualisation;
