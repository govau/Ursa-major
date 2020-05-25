import React, { useLayoutEffect, useState } from "react";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsSunburst from "highcharts/modules/sunburst";
import { useFetch } from "../hooks_helpers/use-fetch";

if (typeof window !== `undefined`) {
  HighchartsSunburst(Highcharts);
}
const colors = ["#008568", "#002957", "#e69f00", "#cc79a7", "#eee12f"];

const SunburstHigh = (props: any) => {
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

export default SunburstHigh;
