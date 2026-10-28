import { ChevronDown, Filter, Search, X } from "lucide-react";
import type { SortKey, StatusFilter } from "../../types";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  sort: SortKey;
  onSortChange: (value: SortKey) => void;
};

const DirectoryToolbar = ({
  query,
  onQueryChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
}: Props) => (
  <div className="outlets-toolbar flex justify-between gap-3 px-[21px] pt-5 pb-[15px]">
    <div className="search-field">
      <Search size={18} />
      <input
        aria-label="Search outlets"
        placeholder="Search outlet, owner, phone, location..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      {query && (
        <button
          className="clear-search"
          aria-label="Clear search"
          onClick={() => onQueryChange("")}
        >
          <X size={15} />
        </button>
      )}
    </div>
    <div className="toolbar-controls flex gap-[9px]">
      <label className="select-field flex items-center gap-[8px] relative [border:1px_solid_var(--border)] rounded-[8px] p-[0_9px] bg-[var(--surface)] min-h-[40px] text-[color:var(--muted)]">
        <Filter size={16} />
        <select
          aria-label="Filter by status"
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as StatusFilter)
          }
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Prospect">Prospect</option>
        </select>
        <ChevronDown size={15} />
      </label>
      <label className="select-field sort-select flex items-center gap-[8px] relative [border:1px_solid_var(--border)] rounded-[8px] p-[0_9px] bg-[var(--surface)] min-h-[40px] text-[color:var(--muted)]">
        <select
          aria-label="Sort outlets"
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortKey)}
        >
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
          <option value="recent-visit">Most recent visit</option>
          <option value="oldest-visit">Oldest visit</option>
          <option value="status">By status</option>
        </select>
        <ChevronDown size={15} />
      </label>
    </div>
  </div>
);

export default DirectoryToolbar;
