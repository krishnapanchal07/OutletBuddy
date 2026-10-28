import { lazy, Suspense } from "react";
import type { Outlet } from "../../types";

const MapCanvas = lazy(() => import("./MapCanvas"));

type Props = {
  outlets: Outlet[];
  selectedId: string | null;
  onSelect: (outlet: Outlet) => void;
};

const MapWorkspace = ({ outlets, selectedId, onSelect }: Props) => (
  <div className="map-main relative min-w-0">
    <Suspense
      fallback={
        <div className="map-loading grid h-full min-h-[190px] place-content-center bg-[#f8f8fa] text-[13px] text-[#8e95a7]">
          Loading outlet map…
        </div>
      }
    >
      <MapCanvas
        outlets={outlets}
        selectedId={selectedId}
        onSelect={onSelect}
        scrollWheelZoom
        zoomControl={false}
      />
    </Suspense>
    <div className="map-overlay">
      <span className="map-overlay-pulse" />
      <div>
        <strong>Live map view</strong>
        <small>Outlet locations · Demo data</small>
      </div>
    </div>
    <div className="map-legend">
      <span>
        <i className="legend-dot green w-[8px] h-[8px] inline-block rounded-full" /> Active
      </span>
      <span>
        <i className="legend-dot orange w-[8px] h-[8px] inline-block rounded-full" /> Prospect
      </span>
      <span>
        <i className="legend-dot gray w-[8px] h-[8px] inline-block rounded-full" /> Inactive
      </span>
    </div>
  </div>
);

export default MapWorkspace;
