import { useDeferredValue, useMemo, useState } from "react";
import { MapPin, Plus } from "lucide-react";
import { useOutlets } from "../context/OutletContext";
import { filterOutlets } from "../lib/helpers";
import { useOutletDialogs } from "../hooks/useOutletDialogs";
import type { StatusFilter } from "../types";
import MapLocationSidebar from "../components/map/MapLocationSidebar";
import MapWorkspace from "../components/map/MapWorkspace";

const MapView = () => {
  const { outlets } = useOutlets();
  const dialog = useOutletDialogs();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const deferred = useDeferredValue(query);
  const filtered = useMemo(
    () => filterOutlets(outlets, deferred, status),
    [outlets, deferred, status],
  );
  const focus = (id: string) => setSelectedId(id);

  return (
    <div className="page-content map-page mx-auto max-w-[1740px] px-[38px] pt-[37px] pb-[48px]">
      <div className="page-heading mb-[30px] flex items-end justify-between gap-5">
        <div>
          <div className="page-eyebrow">
            <span className="eyebrow-dot bg-[var(--accent)] w-[6px] h-[6px] rounded-full" /> LOCATION INTELLIGENCE
          </div>
          <h1>
            Map explorer <span className="heading-star text-[color:#e4a754] text-[28px] font-medium">✳</span>
          </h1>
          <p>Explore your outlet footprint and find locations faster.</p>
        </div>
        <div className="heading-right flex items-center gap-[11px] pb-[3px]">
          <div className="map-location-count text-[color:var(--muted)] flex gap-[7px] items-center text-[12px] font-bold">
            <MapPin size={17} /> {filtered.length} locations
          </div>
          <button className="btn btn-primary" onClick={dialog.create}>
            <Plus size={17} /> Add outlet
          </button>
        </div>
      </div>
      <div className="map-workspace">
        <MapLocationSidebar
          outlets={filtered}
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
          selectedId={selectedId}
          onFocus={focus}
          onView={dialog.view}
        />
        <MapWorkspace
          outlets={filtered}
          selectedId={selectedId}
          onSelect={(outlet) => {
            setSelectedId(outlet.id);
            dialog.view(outlet);
          }}
        />
      </div>
      <div className="page-footnote mt-[18px] text-[11px] text-[var(--muted)]">
        Click a location in the list to zoom, or select a map pin to view outlet
        details. Scroll the map to zoom when the cursor is over it; scroll the
        page when it is not.
      </div>
      {dialog.dialogs}
    </div>
  );
};

export default MapView;
