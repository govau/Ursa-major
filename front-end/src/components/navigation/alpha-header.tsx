import React from "react";
interface Props {}

export const AlphaHeader: React.FC<Props> = () => {
  return (
    <div className="au-body" id="alpha-banner">
      <div className="container-fluid">
        <span className="alpha-pill">Alpha</span>
        <span>
          This prototype is not complete and has limited functionality.
        </span>
      </div>
    </div>
  );
};
