import type { Outlet, StatusFilter } from "../../types";

const filters: StatusFilter[] = ["All", "Active", "Inactive", "Prospect"];

type Props = {
  outlets: Outlet[];
  selected: StatusFilter;
  onChange: (status: StatusFilter) => void;
};

const DirectoryStatusTabs = ({ outlets, selected, onChange }: Props) => (
  <div className="filter-tabs" role="group" aria-label="Quick status filters">
    {filters.map((filter) => (
      <button
        key={filter}
        className={selected === filter ? "selected" : ""}
        aria-pressed={selected === filter}
        onClick={() => onChange(filter)}
      >
        {filter === "All" ? "All outlets" : filter}
        <span>
          {filter === "All"
            ? outlets.length
            : outlets.filter((outlet) => outlet.status === filter).length}
        </span>
      </button>
    ))}
  </div>
);

export default DirectoryStatusTabs;
