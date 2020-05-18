import React from "react";
interface Props {
  x?: number;
  y?: number;
  stroke?: string;
  payload?: any;
  formatFunction?: any;
}

const AxisTickRotate: React.FC<Props> = ({ x, y, payload, formatFunction }) => {
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
        {typeof formatFunction === "undefined"
          ? payload.value
          : formatFunction(payload.value)}
      </text>
    </g>
  );
};

export default AxisTickRotate;
