import { CircularProgress, Container, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxios from "../lib/hooks/useAxios";
import { Column, GenericTable } from "./GenericTable";
import { Pager } from "./Pager";

interface AllObjectsProps {
  title: string;
  createUrl: (page: number, pageSize: number) => string;
  getColumns: (page: number, pageSize: number) => Column[];
  children?: ReactNode;
}

export const AllObjects: React.FC<AllObjectsProps> = ({
  title,
  createUrl,
  getColumns,
  children,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [objects, setObjects] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const axios = useAxios();

  const fetchObjects = async () => {
    setLoading(true);
    const url = createUrl(page, pageSize);
    const { data } = await axios.get(url);
    const { count, results } = data;
    setObjects(results);
    setCount(count);
    setLoading(false);
    navigate(url, { replace: true });
  };

  useEffect(() => {
    fetchObjects();
  }, [page, pageSize, createUrl]);

  const columns = getColumns(page, pageSize);

  return (
    <Container>
      <Typography variant="h3">{title}</Typography>
      {children}
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <GenericTable
            data={objects}
            columns={columns}
            noDataElement={
              <Typography variant="h4">No objects found</Typography>
            }
          />
          <Pager
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            count={count}
          />
        </>
      )}
    </Container>
  );
};
