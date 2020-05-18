import { TooltipProps } from "recharts";
import React from "react";

type Props = TooltipProps;
interface SquareProps {
  desktop: string | undefined;
  mobile: string | undefined;
  tablet: string | undefined;
}

const DeviceCategoryToolTip: (props: Props) => JSX.Element = ({
  active,
  payload,
}) => {
  let mobile: string | number = "";
  let tablet = "";
  let desktop = "";
  let date = "";
  let style: SquareProps = { desktop: "", mobile: "", tablet: "" };

  if (payload && payload[0]) {
    style = {
      desktop: payload[0].color,
      mobile: payload[1].color,
      tablet: payload[2].color,
    };
    mobile = `Mobile: ${payload[0].payload.mobile}%`;
    tablet = `Tablet: ${payload[0].payload.tablet}%`;
    desktop = `Desktop: ${payload[0].payload.desktop}%`;
    date = `${payload[0].payload.month_yr}`;
  }

  return (
    <>
      {active && (
        <div className="custom-tooltip au-body">
          <p>{date}</p>
          <p className="custom-tooltip__text">
            <span
              className="color-square"
              style={{ background: style.desktop }}
            ></span>
            {desktop}
          </p>
          <p className="custom-tooltip__text">
            <span
              className="color-square"
              style={{ background: style.mobile }}
            ></span>
            {mobile}
          </p>
          <p className="custom-tooltip__text">
            <span
              className="color-square"
              style={{ background: style.tablet }}
            ></span>
            {tablet}
          </p>
        </div>
      )}
    </>
  );
};

export default DeviceCategoryToolTip;
