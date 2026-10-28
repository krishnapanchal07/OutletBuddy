import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { filterOutlets } from "../lib/helpers";
import type { Outlet, SortKey, StatusFilter } from "../types";

const PAGE_SIZE = 8;

export const useOutletDirectory = (outlets: Outlet[]) => {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [sort, setSort] = useState<SortKey>("name-asc");
  const [page, setPage] = useState(1);

  const deferredQuery = useDeferredValue(query);
  const filtered = useMemo(
    () => filterOutlets(outlets, deferredQuery, status, sort),
    [outlets, deferredQuery, status, sort],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => setPage(1), [deferredQuery, status, sort]);
  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [pages, page]);

  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const clear = () => {
    setQuery("");
    setStatus("All");
    setSort("name-asc");
  };

  return {
    query,
    setQuery,
    status,
    setStatus,
    sort,
    setSort,
    page,
    setPage,
    filtered,
    pageRows,
    pages,
    pageSize: PAGE_SIZE,
    clear,
  };
};
