import { lazy, Suspense, useEffect, type ReactNode } from "react";
import {
  CalendarDays,
  Edit3,
  ExternalLink,
  Hash,
  MapPin,
  Phone,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import type { Outlet } from "../../types";
import { formatDate, initials } from "../../lib/helpers";
import StatusBadge from "./StatusBadge";
const MapCanvas = lazy(() => import("../map/MapCanvas"));

const DataRow = ({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) => (
  <div className="detail-row flex gap-[12px] items-start">
    <div className="detail-icon bg-[var(--surface-2)] text-[color:var(--muted)] [border:1px_solid_var(--border)] rounded-[9px] w-[35px] h-[35px] grid place-items-center">{icon}</div>
    <div>
      <small>{label}</small>
      <div className="detail-value">{children}</div>
    </div>
  </div>
);

export default function OutletDrawer({
  outlet,
  onClose,
  onEdit,
  onDelete,
}: {
  outlet: Outlet;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  useEffect(() => {
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("keydown", handle);
    };
  }, [onClose]);
  return (
    <div
      className="drawer-backdrop justify-end p-0 items-stretch"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside
        className="detail-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`${outlet.name} details`}
      >
        <div className="drawer-top flex items-center justify-between p-[22px_24px] [border-bottom:1px_solid_var(--border)] text-[color:var(--muted)] text-[10px] font-extrabold tracking-[1.3px]">
          <span>OUTLET DETAILS</span>
          <button
            className="icon-button border-0 bg-[transparent] text-[color:var(--muted)] inline-flex items-center justify-center w-[34px] h-[34px] rounded-[8px]"
            aria-label="Close details"
            onClick={onClose}
          >
            <X size={19} />
          </button>
        </div>
        <div className="drawer-intro text-center p-[27px_20px_23px] [border-bottom:1px_solid_var(--border)]">
          <div className="detail-avatar h-[60px] w-[60px] grid place-items-center bg-[var(--accent-bg)] rounded-[17px] text-[color:var(--accent)] text-[22px] font-extrabold m-[0_auto_13px]">{initials(outlet.name)}</div>
          <h2>{outlet.name}</h2>
          <div>
            <StatusBadge status={outlet.status} />
          </div>
          <p>Outlet ID · {outlet.id}</p>
        </div>
        <div className="drawer-scroll flex-1 overflow-y-auto px-[25px] py-[23px]">
          <div className="detail-section-title">CONTACT & LOCATION</div>
          <div className="details-list mt-[16px] flex flex-col gap-[20px]">
            <DataRow icon={<UserRound size={18} />} label="Owner">
              {outlet.owner}
            </DataRow>
            <DataRow icon={<Phone size={18} />} label="Phone">
              <a href={`tel:${outlet.phone}`}>{outlet.phone}</a>
            </DataRow>
            <DataRow icon={<MapPin size={18} />} label="Address">
              {outlet.address}, {outlet.city}
            </DataRow>
            <DataRow icon={<CalendarDays size={18} />} label="Last visited">
              {formatDate(outlet.lastVisit)}
            </DataRow>
            <DataRow icon={<Hash size={18} />} label="Coordinates">
              {outlet.latitude.toFixed(5)}, {outlet.longitude.toFixed(5)}
            </DataRow>
          </div>
          <div className="drawer-map-heading flex items-center justify-between mt-[28px]">
            <span>LOCATION PREVIEW</span>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.openstreetmap.org/?mlat=${outlet.latitude}&mlon=${outlet.longitude}#map=15/${outlet.latitude}/${outlet.longitude}`}
            >
              Open map <ExternalLink size={13} />
            </a>
          </div>
          <div className="drawer-map h-[184px] rounded-[10px] overflow-hidden mt-[13px] [border:1px_solid_var(--border)]">
            <Suspense
              fallback={
                <div className="map-loading grid h-full min-h-[190px] place-content-center bg-[#f8f8fa] text-[13px] text-[#8e95a7]">
                  Loading location map…
                </div>
              }
            >
              <MapCanvas outlets={[outlet]} zoomControl={false} />
            </Suspense>
          </div>
          <div className="drawer-footnote text-[10px] text-[color:var(--muted)] pt-[19px] leading-[1.6]">
            Data is stored locally in this browser. This is a demonstration
            application.
          </div>
        </div>
        <div className="drawer-bottom flex justify-between gap-3 border-t border-[var(--border)] px-[23px] py-[17px]">
          <button className="btn btn-outline danger-text text-[color:#cd4e58]" onClick={onDelete}>
            <Trash2 size={16} /> Delete
          </button>
          <button className="btn btn-primary" onClick={onEdit}>
            <Edit3 size={16} /> Edit outlet
          </button>
        </div>
      </aside>
    </div>
  );
}
