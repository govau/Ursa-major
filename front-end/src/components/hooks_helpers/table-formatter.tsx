import { formatHour } from "../visualisations/formatters/date-tick-formatter";
import React from "react";

interface Props {
  data: any;
  row?: any;
  rowIndex: number;
  colIndex: number;
}

const TableCellRowSpanHourly: (props: Props) => any = ({
  data,
  row,
  rowIndex,
  colIndex,
}) => {
  return (
    rowIndex % 2 === 0 && (
      <th
        rowSpan={2}
        className="au-table__cell au-table__cell-border-right"
        key={`${colIndex}-${rowIndex}`}
      >
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
  colIndex,
  rowSpanSize,
}) => {
  return (
    rowIndex % rowSpanSize === 0 && (
      <th
        rowSpan={rowSpanSize}
        className="au-table__cell au-table__cell-border-right"
        key={`${colIndex}-${rowIndex}`}
      >
        {data}
      </th>
    )
  );
};

export { TableCellRowSpanHourly, TableCellRowSpanMonthly };
