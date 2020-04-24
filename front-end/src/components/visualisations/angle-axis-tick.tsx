import React from "react";
import formatDate from "./date-tick-formatter";
interface Props {
  x?: number;
  y?: number;
  stroke?: string;
  payload?: any;
}

const AxisTickRotate: React.FC<Props> = ({ x, y, stroke, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-30)"
      >
        {formatDate(payload.value)}
      </text>
    </g>
  );
};

export default AxisTickRotate;
