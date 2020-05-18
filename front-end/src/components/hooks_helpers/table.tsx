import React from "react";
import AUtable, { AUtableResponsiveWrapper } from "../navigation/ds/table";

const AuTable: any = AUtable;

interface Props {
  data: any;
  rowSpanInterval?: number;
  headers: any;
  heading: string;
}

export const Table: React.FC<Props> = ({
  data,
  headers,
  rowSpanInterval,
  heading,
}) => {
  return (
    <>
      <h3 className="au-display-md au-table__caption">{heading}</h3>
      <AUtableResponsiveWrapper>
        <AuTable
          rowSpanInterval={rowSpanInterval}
          headers={headers}
          data={data}
          caption={heading}
        />
      </AUtableResponsiveWrapper>
    </>
  );
};
