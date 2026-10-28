import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  page: number;
  pages: number;
  total: number;
  pageSize: number;
  onChange: (page: number | ((previous: number) => number)) => void;
};

const DirectoryPagination = ({
  page,
  pages,
  total,
  pageSize,
  onChange,
}: Props) => (
  <div className="table-footer flex min-h-[67px] items-center justify-between gap-[10px] border-t border-[var(--border)] px-5 py-[14px] text-[11px] text-[var(--muted)]">
    <div>
      Showing{" "}
      <strong>
        {total ? (page - 1) * pageSize + 1 : 0}–
        {Math.min(page * pageSize, total)}
      </strong>{" "}
      of <strong>{total}</strong> outlets
    </div>
    <div className="pagination flex items-center gap-[5px]">
      <button
        className="page-arrow"
        disabled={page === 1}
        onClick={() => onChange((previous) => previous - 1)}
        aria-label="Previous page"
      >
        <ArrowLeft size={17} />
      </button>
      {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
        <button
          key={number}
          className={`page-number ${page === number ? "current" : ""}`}
          onClick={() => onChange(number)}
          aria-label={`Page ${number}`}
          aria-current={page === number ? "page" : undefined}
        >
          {number}
        </button>
      ))}
      <button
        className="page-arrow"
        disabled={page === pages}
        onClick={() => onChange((previous) => previous + 1)}
        aria-label="Next page"
      >
        <ArrowRight size={17} />
      </button>
    </div>
  </div>
);

export default DirectoryPagination;
