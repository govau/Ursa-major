import React, { PureComponent } from "react";

interface Props {
  x: number;
  y: number;
  stroke: string;
  index: any;
  dataKey: any;
  length: any;
}

// let LineLabel: (props: Props) => JSX.Element;
class LineLabel extends PureComponent<Props> {
  render() {
    const { x, y, length, index, dataKey, stroke } = this.props;
    if (index === Math.round(length / 2) - 1) {
      return (
        <text
          x={x}
          y={y}
          dy={-6}
          fill={stroke}
          fontSize={14}
          textAnchor="middle"
          className="au-body"
        >
          {dataKey}
        </text>
      );
    } else {
      return <></>;
    }
  }
}

export default LineLabel;
