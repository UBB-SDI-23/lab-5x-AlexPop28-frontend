import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

interface PagerProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  count: number;
}

export const Pager = ({
  page,
  setPage,
  pageSize,
  setPageSize,
  count,
}: PagerProps) => {
  const [pages, setPages] = useState<(number | string)[]>([]);
  const user = localStorage.getItem("user");
  const pageCount = Math.ceil(count / pageSize);
  const siblings = 2;

  const computePages = useCallback(() => {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= siblings; ++i) pageNumbers.push(i);
    for (let i = pageCount - siblings + 1; i <= pageCount; ++i)
      pageNumbers.push(i);
    for (let i = page - siblings; i <= page + siblings; ++i)
      pageNumbers.push(i);
    setPages(
      pageNumbers
        .sort((a, b) => a - b)
        .filter((page) => 1 <= page && page <= pageCount)
        .reduce((result: (string | number)[], current) => {
          if (result.length == 0) {
            result.push(current);
          } else {
            const prev = result[result.length - 1];
            if (prev !== current) {
              if (prev !== current - 1) result.push("...");
              result.push(current);
            }
          }
          return result;
        }, [])
    );
  }, [page, pageSize, count]);

  useEffect(() => {
    setPageSize(
      (() => {
        if (!user || !JSON.parse(user).pageSize) return 10;
        return JSON.parse(user).pageSize;
      })()
    );
    computePages();
  }, [page, pageSize, count]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        {pages.map((value, index) => {
          if (typeof value === "number") {
            const variant = value === page ? "outlined" : "text";
            return (
              <Button variant={variant} onClick={() => setPage(value)}>
                {value}
              </Button>
            );
          }
          return "...";
        })}
        <Button disabled={page === pageCount} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ display: "block" }}>
          <InputLabel id="page-size-label" style={{ width: "100px" }}>
            Page size
          </InputLabel>
          <Select
            labelId="page-size-label"
            label="Page size"
            value={pageSize}
            onChange={(event) => setPageSize(Number(event.target.value))}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
};
