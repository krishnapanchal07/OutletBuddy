import { Plus, Store } from "lucide-react";
import { useOutlets } from "../context/OutletContext";
import { useToast } from "../context/ToastContext";
import { useOutletDialogs } from "../hooks/useOutletDialogs";
import { useOutletDirectory } from "../hooks/useOutletDirectory";
import { downloadCsv } from "../lib/helpers";
import OutletTable from "../components/outlets/OutletTable";
import DirectoryHeader from "../components/outlets/DirectoryHeader";
import DirectoryToolbar from "../components/outlets/DirectoryToolbar";
import DirectoryStatusTabs from "../components/outlets/DirectoryStatusTabs";
import DirectoryPagination from "../components/outlets/DirectoryPagination";

const Outlets = () => {
  const { outlets } = useOutlets();
  const { toast } = useToast();
  const dialog = useOutletDialogs();
  const directory = useOutletDirectory(outlets);

  const exportData = () => {
    if (!directory.filtered.length) {
      toast("No outlets to export", "info");
      return;
    }
    downloadCsv(directory.filtered);
    toast(`${directory.filtered.length} outlets exported as CSV`);
  };

  return (
    <div className="page-content mx-auto max-w-[1740px] px-[38px] pt-[37px] pb-[48px]">
      <DirectoryHeader
        outletCount={outlets.length}
        onExport={exportData}
        onAdd={dialog.create}
      />
      <div className="surface outlets-surface rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] overflow-hidden">
        <DirectoryToolbar
          query={directory.query}
          onQueryChange={directory.setQuery}
          status={directory.status}
          onStatusChange={directory.setStatus}
          sort={directory.sort}
          onSortChange={directory.setSort}
        />
        <DirectoryStatusTabs
          outlets={outlets}
          selected={directory.status}
          onChange={directory.setStatus}
        />
        {directory.filtered.length ? (
          <OutletTable
            outlets={directory.pageRows}
            onView={dialog.view}
            onEdit={dialog.edit}
            onDelete={dialog.remove}
          />
        ) : (
          <div className="empty-state min-h-[320px] flex items-center flex-col justify-center text-center gap-[11px] p-[25px] text-[color:var(--muted)]">
            <span className="empty-state-icon grid place-items-center w-[64px] h-[64px] rounded-[18px] bg-[var(--accent-bg)] text-[color:var(--accent)]">
              <Store size={28} />
            </span>
            <h3>
              {outlets.length === 0
                ? "No outlets added yet"
                : "No matching outlets found"}
            </h3>
            <p>
              {outlets.length === 0
                ? "Create your first outlet to start managing your network."
                : "Try different search terms or clear your filters."}
            </p>
            {outlets.length === 0 ? (
              <button className="btn btn-primary" onClick={dialog.create}>
                <Plus size={16} /> Add outlet
              </button>
            ) : (
              <button className="btn btn-outline" onClick={directory.clear}>
                Clear filters
              </button>
            )}
          </div>
        )}
        <DirectoryPagination
          page={directory.page}
          pages={directory.pages}
          total={directory.filtered.length}
          pageSize={directory.pageSize}
          onChange={directory.setPage}
        />
      </div>
      <div className="page-footnote mt-[18px] text-[11px] text-[var(--muted)]">
        Demo data is saved automatically in your browser. Export a CSV to keep a
        copy of your work.
      </div>
      {dialog.dialogs}
    </div>
  );
};

export default Outlets;
