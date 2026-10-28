import {
  ArrowUpRight,
  Layers3,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { initials } from "../../lib/helpers";
import StatusBadge from "../outlets/StatusBadge";
import type { Outlet, StatusFilter } from "../../types";

type Props = {
  outlets: Outlet[];
  query: string;
  onQueryChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  selectedId: string | null;
  onFocus: (id: string) => void;
  onView: (outlet: Outlet) => void;
};

const MapLocationSidebar = ({
  outlets,
  query,
  onQueryChange,
  status,
  onStatusChange,
  selectedId,
  onFocus,
  onView,
}: Props) => (
  <aside className="map-side-list flex flex-col min-h-[0] [border-right:1px_solid_var(--border)]">
    <div className="map-side-top flex items-center justify-between p-[22px_20px_15px] text-[color:var(--muted)]">
      <div>
        <span className="tiny-eyebrow">OUTLET LOCATIONS</span>
        <h2>
          Your network <span>{outlets.length}</span>
        </h2>
      </div>
      <SlidersHorizontal size={19} />
    </div>
    <div className="map-side-search">
      <Search size={17} />
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Find a location..."
        aria-label="Find map location"
      />
      {query && (
        <button aria-label="Clear map search" onClick={() => onQueryChange("")}>
          <X size={15} />
        </button>
      )}
    </div>
    <div className="map-status-pills flex gap-[5px] p-[14px_17px] [border-bottom:1px_solid_var(--border)]">
      {(["All", "Active", "Inactive", "Prospect"] as StatusFilter[]).map(
        (filter) => (
          <button
            key={filter}
            onClick={() => onStatusChange(filter)}
            className={status === filter ? "active" : ""}
          >
            {filter}
          </button>
        ),
      )}
    </div>
    <div className="map-location-list">
      {outlets.length ? (
        outlets.map((outlet, index) => (
          <div
            className={`map-location-item ${selectedId === outlet.id ? "selected" : ""}`}
            key={outlet.id}
          >
            <button
              className="map-location-select [background:none] border-0 flex items-center gap-[11px] flex-1 min-w-[0] text-left p-[7px_2px]"
              onClick={() => onFocus(outlet.id)}
            >
              <span className={`outlet-avatar avatar-${index % 5}`}>
                {initials(outlet.name)}
              </span>
              <span className="map-location-details min-w-[0] block flex-1">
                <strong>{outlet.name}</strong>
                <small>
                  {outlet.address}, {outlet.city}
                </small>
                <StatusBadge status={outlet.status} />
              </span>
            </button>
            <button
              className="map-open-detail w-[30px] h-[30px] grid place-items-center text-[color:var(--muted)] [background:none] [border:1px_solid_var(--border)] rounded-[8px]"
              onClick={() => onView(outlet)}
              title={`View ${outlet.name}`}
              aria-label={`View details of ${outlet.name}`}
            >
              <ArrowUpRight size={17} />
            </button>
          </div>
        ))
      ) : (
        <div className="map-list-empty text-center text-[color:var(--muted)] p-[50px_20px]">
          <MapPin size={28} />
          <h3>Nothing to map</h3>
          <p>Try different filters or add an outlet.</p>
        </div>
      )}
    </div>
    <div className="map-list-footer p-[13px_20px] [border-top:1px_solid_var(--border)] text-[color:var(--muted)] flex items-center gap-[8px] text-[10px]">
      <Layers3 size={15} /> Using OpenStreetMap · {outlets.length} markers
    </div>
  </aside>
);

export default MapLocationSidebar;
