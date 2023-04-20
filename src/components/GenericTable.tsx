import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

export interface Column {
  headElement?: JSX.Element;
  bodyElement: (value: any, index: number) => JSX.Element;
  sortKey?: string;
}

interface GenericTableProps {
  data: any[];
  columns: Column[];
  noDataElement?: JSX.Element;
}

export const GenericTable: React.FC<GenericTableProps> = ({
  data,
  columns,
  noDataElement,
}) => {
  const [sort, setSort] = useState<{ column: string; order: "asc" | "desc" }>({
    column: "",
    order: "asc",
  });
  const [sortedData, setSortedData] = useState(data);

  const sortData = (column: string) => {
    const isAsc = sort.column === column && sort.order === "asc";
    setSort({ column, order: isAsc ? "desc" : "asc" });
    setSortedData(
      [...data].sort((a: any, b: any) => {
        if (isAsc) {
          return a[column] < b[column] ? -1 : 1;
        } else {
          return a[column] < b[column] ? 1 : -1;
        }
      })
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                onClick={() => column.sortKey && sortData(column.sortKey)}
              >
                {column.headElement}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length}>{noDataElement}</TableCell>
            </TableRow>
          )}
          {sortedData.length > 0 &&
            sortedData.map((value, rowIndex) => (
              <TableRow key={value.id}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {column.bodyElement(value, rowIndex)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
