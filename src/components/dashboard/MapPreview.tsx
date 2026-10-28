import { lazy, Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Outlet } from "../../types";

const MapCanvas = lazy(() => import("../map/MapCanvas"));

type Props = {
  outlets: Outlet[];
  onSelect: (outlet: Outlet) => void;
};

const MapPreview = ({ outlets, onSelect }: Props) => (
  <section className="surface map-preview rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] overflow-hidden">
    <div className="section-title-row flex items-start justify-between gap-[15px] px-6 pt-[23px]">
      <div>
        <div className="tiny-eyebrow">GEOGRAPHIC VIEW</div>
        <h2>Your outlets on the map</h2>
        <p>Explore where your locations are operating</p>
      </div>
      <Link className="text-link inline-flex items-center gap-[8px] text-[color:var(--accent)] text-[11px] font-extrabold whitespace-nowrap" to="/map">
        Explore map <ArrowRight size={16} />
      </Link>
    </div>
    <div className="dashboard-map m-[19px] h-[286px] overflow-hidden rounded-[10px] relative">
      {outlets.length ? (
        <Suspense
          fallback={
            <div className="map-loading grid h-full min-h-[190px] place-content-center bg-[#f8f8fa] text-[13px] text-[#8e95a7]">
              Loading outlet map…
            </div>
          }
        >
          <MapCanvas outlets={outlets} onSelect={onSelect} />
        </Suspense>
      ) : (
        <div className="map-empty grid h-full place-items-center bg-[var(--surface-2)] text-[var(--muted)]">
          No locations to show
        </div>
      )}
    </div>
  </section>
);

export default MapPreview;
