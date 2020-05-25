import React, { useLayoutEffect, useState } from "react";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsSunburst from "highcharts/modules/sunburst";
import { useFetch } from "../hooks_helpers/use-fetch";

HighchartsSunburst(Highcharts);
const colors = ["#008568", "#002957", "#e69f00", "#cc79a7", "#eee12f"];

export const SunburstHigh = (props: any) => {
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

  const sunburstconfig = {
    title: {
      text: `<h3 class="au-display-md" style="margin-top:-10px">Popular operating system versions, last 12 months</h3>`,
      useHTML: true,
    },
    tooltip: {
      headerFormat: "",
      pointFormat: "<b>{point.name}</b> has <b>{point.value} views</b>",
    },
    series: [
      {
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
        type: "sunburst",
        data: [
          { id: "1.0", parent: "0.0", name: "1.0" },
          { id: "1.1", parent: "0.0", name: "1.1" },
          { id: "1.2", parent: "0.0", name: "1.2" },
          { id: "1.3", parent: "0.0", name: "1.3" },
          { id: "1.4", parent: "0.0", name: "1.4" },
          { id: "1.5", parent: "0.0", name: "1.5" },
          { id: "2.0", parent: "1.0", name: "2.0" },
          { id: "2.1", parent: "1.0", name: "2.1" },
          { id: "2.2", parent: "1.0", name: "2.2" },
          { id: "2.21", parent: "1.1", name: "2.21" },
          { id: "2.28", parent: "1.2", name: "2.28" },
          { id: "2.29", parent: "1.2", name: "2.29" },
          { id: "2.42", parent: "1.3", name: "2.42" },
          { id: "2.43", parent: "1.3", name: "2.43" },
          { id: "2.52", parent: "1.4", name: "2.52" },
          { id: "2.53", parent: "1.4", name: "2.53" },
          { id: "2.54", parent: "1.4", name: "2.54" },
          { id: "2.68", parent: "1.5", name: "2.68" },
          { id: "3.0", parent: "2.0", name: "3.0", value: 194232133.89645863 },
          { id: "3.0", parent: "2.21", name: "3.0", value: 29565243.95739746 },
          { id: "3.0", parent: "2.28", name: "3.0", value: 227463077.07683563 },
          { id: "3.0", parent: "2.42", name: "3.0", value: 62004629 },
          { id: "3.0", parent: "2.52", name: "3.0", value: 33433240.82700348 },
          { id: "3.0", parent: "2.68", name: "3.0", value: 44748956.67807007 },
          { id: "3.1", parent: "2.0", name: "3.1", value: 184381548.9338379 },
          {
            id: "3.10",
            parent: "2.1",
            name: "3.10",
            value: 23275435.725387573,
          },
          { id: "3.1", parent: "2.21", name: "3.1", value: 20739469.481307983 },
          { id: "3.1", parent: "2.28", name: "3.1", value: 99330190 },
          { id: "3.10", parent: "2.29", name: "3.10", value: 27996306 },
          { id: "3.1", parent: "2.42", name: "3.1", value: 59453712 },
          { id: "3.1", parent: "2.52", name: "3.1", value: 20315401 },
          {
            id: "3.10",
            parent: "2.53",
            name: "3.10",
            value: 23529179.742912292,
          },
          {
            id: "3.11",
            parent: "2.1",
            name: "3.11",
            value: 50846403.081130505,
          },
          { id: "3.11", parent: "2.29", name: "3.11", value: 152910474.734375 },
          {
            id: "3.11",
            parent: "2.53",
            name: "3.11",
            value: 59519865.02382851,
          },
          { id: "3.12", parent: "2.2", name: "3.12", value: 35388974.92138672 },
          { id: "3.12", parent: "2.54", name: "3.12", value: 17317578 },
          {
            id: "3.13",
            parent: "2.2",
            name: "3.13",
            value: 17777492.279762268,
          },
          {
            id: "3.14",
            parent: "2.2",
            name: "3.14",
            value: 16959125.961639404,
          },
          {
            id: "3.15",
            parent: "2.2",
            name: "3.15",
            value: 16847544.570983887,
          },
          {
            id: "3.16",
            parent: "2.2",
            name: "3.16",
            value: 16615079.467697144,
          },
          { id: "3.17", parent: "2.2", name: "3.17", value: 59350836 },
          { id: "3.2", parent: "2.0", name: "3.2", value: 183928534.91726685 },
          { id: "3.2", parent: "2.21", name: "3.2", value: 20035362 },
          { id: "3.2", parent: "2.28", name: "3.2", value: 97264980 },
          { id: "3.2", parent: "2.42", name: "3.2", value: 57756738 },
          { id: "3.2", parent: "2.52", name: "3.2", value: 18704649 },
          { id: "3.3", parent: "2.0", name: "3.3", value: 160592029.7685547 },
          { id: "3.3", parent: "2.21", name: "3.3", value: 18492659.386291504 },
          { id: "3.3", parent: "2.28", name: "3.3", value: 87542497.63748932 },
          { id: "3.3", parent: "2.42", name: "3.3", value: 56890079 },
          { id: "3.3", parent: "2.52", name: "3.3", value: 12369364.75 },
          { id: "3.4", parent: "2.0", name: "3.4", value: 156886943.2731781 },
          { id: "3.4", parent: "2.21", name: "3.4", value: 14338264 },
          { id: "3.4", parent: "2.28", name: "3.4", value: 77625295 },
          { id: "3.4", parent: "2.42", name: "3.4", value: 51122782 },
          { id: "3.4", parent: "2.52", name: "3.4", value: 11562500 },
          { id: "3.5", parent: "2.0", name: "3.5", value: 1578025522.209939 },
          { id: "3.5", parent: "2.21", name: "3.5", value: 2347868568.23774 },
          { id: "3.5", parent: "2.28", name: "3.5", value: 343539741.62323 },
          { id: "3.5", parent: "2.42", name: "3.5", value: 198136282.71875 },
          { id: "3.5", parent: "2.52", name: "3.5", value: 181821407.48940802 },
          { id: "3.6", parent: "2.1", name: "3.6", value: 229231147.5263672 },
          { id: "3.6", parent: "2.29", name: "3.6", value: 127622122 },
          { id: "3.6", parent: "2.43", name: "3.6", value: 74581140 },
          { id: "3.6", parent: "2.53", name: "3.6", value: 30776174.086730957 },
          { id: "3.7", parent: "2.1", name: "3.7", value: 47715048.077869415 },
          { id: "3.7", parent: "2.29", name: "3.7", value: 37938975 },
          { id: "3.7", parent: "2.43", name: "3.7", value: 58255287 },
          { id: "3.7", parent: "2.53", name: "3.7", value: 28648166.517337322 },
          { id: "3.8", parent: "2.1", name: "3.8", value: 39825560.26689416 },
          { id: "3.8", parent: "2.29", name: "3.8", value: 30192250 },
          { id: "3.8", parent: "2.53", name: "3.8", value: 27048228.33060646 },
          { id: "3.9", parent: "2.1", name: "3.9", value: 23655616.56366515 },
          { id: "3.9", parent: "2.29", name: "3.9", value: 29339917 },
          { id: "3.9", parent: "2.53", name: "3.9", value: 25286777.511730194 },
        ],
        allowDrillToNode: true,
        cursor: "pointer",
      },
    ],
  };

  // useLayoutEffect(() => {
  //   if (!OpSysVersionData.loading) {
  //     setState((current: any) => {
  //       const data = current.concat(OpSysVersionData.data.opsys_version_total);
  //       return data;
  //     });
  //   }
  // }, [OpSysVersionData.loading]);

  return (
    <div className="au-body">
      {!OpSysVersionData.loading && (
        <HighchartsReact
          highcharts={Highcharts}
          options={sunburstconfig}
          constructor={"chart"}
        ></HighchartsReact>
      )}
    </div>
  );
};
