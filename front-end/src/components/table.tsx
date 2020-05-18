import React from "react";
import AUtable, { AUtableResponsiveWrapper } from "../auds/react/table";

interface Props {
  headers: Array<any>;
  data: Array<any>;
  caption: string;
  striped?: boolean;
}

const AuTable: any = AUtable;

export const Table: React.FC<Props> = ({
  headers,
  data,
  caption,
  striped = false,
}) => {
  return (
    <AUtableResponsiveWrapper>
      <AuTable
        headers={headers}
        data={data}
        caption={caption}
        striped={striped}
      />
    </AUtableResponsiveWrapper>
  );
};
