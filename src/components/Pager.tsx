import { Button } from "@mui/material";

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
    </>
  );
};
