import { Button, InputLabel, MenuItem, Select } from "@mui/material";

interface PagerProps {
  page: number;
  setPage: (page: number) => void;
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
  return (
    <>
      <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </Button>
      <Button
        disabled={page === Math.ceil(count / pageSize)}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
      <InputLabel id="page-size-label" style={{ width: "auto" }}>
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
    </>
  );
};
