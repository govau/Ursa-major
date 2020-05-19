import { formatHour } from "../visualisations/formatters/date-tick-formatter";
import React from "react";

interface Props {
  data: any;
  row?: any;
  rowIndex: number;
}

const TableCellRowSpanHourly: (props: Props) => any = ({
  data,
  row,
  rowIndex,
}) => {
  return (
    rowIndex % 2 === 0 && (
      <th rowSpan={2} className="au-table__cell au-table__cell-border-right">
        {formatHour(data)}
      </th>
    )
  );
};

interface MonthlyProps extends Props {
  rowSpanSize: number;
}

const TableCellRowSpanMonthly: (props: MonthlyProps) => any = ({
  data,
  row,
  rowIndex,
  rowSpanSize,
}) => {
  return (
    rowIndex % rowSpanSize === 0 && (
      <th
        rowSpan={rowSpanSize}
        className="au-table__cell au-table__cell-border-right"
      >
        {data}
      </th>
    )
  );
};

const TableMillionthFormatter: (numb: number | string) => string = (
  numb: any
) => {
  const scaled = numb / 1000000;
  return scaled.toFixed(2) + "M";
};

export {
  TableCellRowSpanHourly,
  TableCellRowSpanMonthly,
  TableMillionthFormatter,
};
