import React, { useLayoutEffect, useState } from "react";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsSunburst from "highcharts/modules/sunburst";
import { useFetch } from "../hooks_helpers/use-fetch";
import {
  TableMillionthFormatter,
  TableCellRowSpanMonthly,
} from "../hooks_helpers/table-formatter";
import { Table } from "../hooks_helpers/table";

if (typeof window !== `undefined`) {
  HighchartsSunburst(Highcharts);
}
const colors = ["#008568", "#002957", "#e69f00", "#cc79a7", "#eee12f"];

interface Props {
  chartView: boolean;
}
const SunburstHigh: React.FC<Props> = ({ chartView }) => {
  const OpSysVersionData = useFetch({
    initialState: "",
    query: `{
    opsys_version_total {
      parent
      name
      value
    }
  }  
  `,
  });

  const data = [
    {
      id: "Total",
      name: "Total",
    },
    {
      id: "Macintosh",
      parent: "Total",
      name: "Macintosh",
      color: colors[1],
    },
    {
      id: "Windows",
      parent: "Total",
      name: "Windows",
      color: colors[2],
    },
    {
      id: "Android",
      parent: "Total",
      name: "Android",
      color: colors[3],
    },
    {
      id: "iOS",
      parent: "Total",
      name: "iOS",
      color: colors[4],
    },
    {
      id: "Linux",
      parent: "Total",
      name: "Linux",
      color: colors[5],
    },
  ];

  const [state, setState] = useState(data);
  const graphTitle = "Popular operating system versions, last 12 months";

  const sunburstconfig = {
    title: {
      text: `<h3 class="au-display-md" style="margin-top:-10px">${graphTitle}</h3>`,
      useHTML: true,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: true,
    },
    chart: {
      events: {
        load: function (this: any) {
          console.log(this);
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const chart: any = this;
          setTimeout(function () {
            chart.reflow();
          }, 0);
        },
      },
    },
    tooltip: {
      formatter: function (this: any) {
        return `<p class="custom-tooltip__text">
        <span class="color-square" style="background-color:${
          this.point.color
        }"></span>
        ${this.point.name}:  ${TableMillionthFormatter(
          this.point.value
        )} users</p>`;
      },
      backgroundColor: null,
      borderWidth: 0,
      shadow: false,
      useHTML: true,
      style: {
        padding: 0,
      },
    },
    series: [
      {
        type: "sunburst",
        levels: [
          {
            level: 1,
            levelIsConstant: false,
            dataLabels: {
              filter: {
                property: "outerArcLength",
                operator: ">",
                value: 64,
              },
            },
          },
          {
            level: 2,
            colorByPoint: true,
          },
          {
            level: 3,
            colorVariation: {
              key: "brightness",
              to: -0.5,
            },
          },
          {
            level: 4,
            colorVariation: {
              key: "brightness",
              to: 0.5,
            },
          },
        ],
        dataLabels: {
          /**
           * A custom formatter that returns the name only if the inner arc
           * is longer than a certain pixel size, so the shape has place for
           * the label.
           */
          formatter: function (this: any) {
            const shape = this.point.node.shapeArgs;

            const innerArcFraction = (shape.end - shape.start) / (2 * Math.PI);
            const perimeter = 2 * Math.PI * shape.innerR;

            const innerArcPixels = innerArcFraction * perimeter;

            if (innerArcPixels > 16 || this.point.name === "Total") {
              return this.point.name;
            }
          },
        },
        data: state,
        allowDrillToNode: true,
        cursor: "pointer",
      },
    ],
  };

  useLayoutEffect(() => {
    if (typeof window !== `undefined`) {
      HighchartsSunburst(Highcharts);
    }

    if (!OpSysVersionData.loading) {
      setState((current: any) => {
        const data = current.concat(OpSysVersionData.data.opsys_version_total);
        return data;
      });
    }
  }, [OpSysVersionData.loading]);

  const renderView = () => {
    if (!OpSysVersionData.loading) {
      if (chartView) {
        return (
          <HighchartsReact
            highcharts={Highcharts}
            options={sunburstconfig}
            constructor={"chart"}
          ></HighchartsReact>
        );
      } else {
        return (
          <Table
            heading={graphTitle}
            rowSpanInterval={5}
            headers={[
              {
                title: "Parent",
                key: "parent",
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
                    rowSpanSize={5}
                  />
                ),
              },
              {
                title: "Operating system version",
                key: "name",
              },
              {
                title: "Total unique users",
                key: "value",
                type: "numeric",
                render: TableMillionthFormatter,
              },
            ]}
            data={OpSysVersionData.data.opsys_version_total}
          />
        );
      }
    } else {
      return <p></p>;
    }
  };

  return <div className="au-body">{renderView()}</div>;
};

export default SunburstHigh;
