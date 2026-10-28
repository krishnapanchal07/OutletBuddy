import { ArrowDownToLine, Plus } from "lucide-react";

type Props = {
  outletCount: number;
  onExport: () => void;
  onAdd: () => void;
};

const DirectoryHeader = ({ outletCount, onExport, onAdd }: Props) => (
  <div className="page-heading mb-[30px] flex items-end justify-between gap-5">
    <div>
      <div className="page-eyebrow">
        <span className="eyebrow-dot bg-[var(--accent)] w-[6px] h-[6px] rounded-full" /> OUTLET DIRECTORY
      </div>
      <h1>
        All outlets <span className="page-count">{outletCount}</span>
      </h1>
      <p>Manage, organize and keep track of your sales network.</p>
    </div>
    <div className="heading-right flex items-center gap-[11px] pb-[3px]">
      <button className="btn btn-outline" onClick={onExport}>
        <ArrowDownToLine size={17} /> Export CSV
      </button>
      <button className="btn btn-primary" onClick={onAdd}>
        <Plus size={17} /> Add outlet
      </button>
    </div>
  </div>
);

export default DirectoryHeader;
