import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { Outlet, OutletStatus } from "../../types";
import { formatDate } from "../../lib/helpers";
import StatusBadge from "../outlets/StatusBadge";

const dotColor: Record<OutletStatus, string> = {
  Active: "#279d79",
  Inactive: "#8893a7",
  Prospect: "#dba54f",
};
const icons: Record<OutletStatus, L.DivIcon> = {
  Active: L.divIcon({
    className: "outlet-pin",
    html: `<span style="--pin-color:${dotColor.Active}"><i></i></span>`,
    iconSize: [30, 38],
    iconAnchor: [15, 37],
  }),
  Inactive: L.divIcon({
    className: "outlet-pin",
    html: `<span style="--pin-color:${dotColor.Inactive}"><i></i></span>`,
    iconSize: [30, 38],
    iconAnchor: [15, 37],
  }),
  Prospect: L.divIcon({
    className: "outlet-pin",
    html: `<span style="--pin-color:${dotColor.Prospect}"><i></i></span>`,
    iconSize: [30, 38],
    iconAnchor: [15, 37],
  }),
};
function WheelZoomOnHover() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    const enable = () => map.scrollWheelZoom.enable();
    const disable = () => map.scrollWheelZoom.disable();
    map.scrollWheelZoom.disable();
    container.addEventListener("mouseenter", enable);
    container.addEventListener("mouseleave", disable);
    if (container.matches(":hover")) enable();
    return () => {
      container.removeEventListener("mouseenter", enable);
      container.removeEventListener("mouseleave", disable);
      map.scrollWheelZoom.disable();
    };
  }, [map]);
  return null;
}
function AutoBounds({
  outlets,
  focusId,
}: {
  outlets: Outlet[];
  focusId?: string | null;
}) {
  const map = useMap();
  const boundsKey = outlets
    .map((o) => `${o.id}:${o.latitude}:${o.longitude}`)
    .join("|");
  useEffect(() => {
    const current = outlets.filter(
      (o) => Number.isFinite(o.latitude) && Number.isFinite(o.longitude),
    );
    if (!current.length) {
      map.setView([23.0225, 72.5714], 11);
      return;
    }
    if (current.length === 1)
      map.setView([current[0].latitude, current[0].longitude], 14);
    else
      map.fitBounds(
        L.latLngBounds(current.map((o) => [o.latitude, o.longitude])),
        { padding: [44, 44], maxZoom: 13, animate: false },
      );
  }, [map, boundsKey]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!focusId) return;
    const outlet = outlets.find((o) => o.id === focusId);
    if (outlet)
      map.flyTo(
        [outlet.latitude, outlet.longitude],
        Math.max(map.getZoom(), 14),
        { duration: 0.7 },
      );
  }, [focusId, map, outlets]);
  return null;
}
export default function MapCanvas({
  outlets,
  selectedId,
  onSelect,
  zoomControl = true,
  scrollWheelZoom = false,
}: {
  outlets: Outlet[];
  selectedId?: string | null;
  onSelect?: (outlet: Outlet) => void;
  zoomControl?: boolean;
  scrollWheelZoom?: boolean;
}) {
  const safeOutlets = useMemo(
    () =>
      outlets.filter(
        (o) =>
          Number.isFinite(o.latitude) &&
          Number.isFinite(o.longitude) &&
          Math.abs(o.latitude) <= 90 &&
          Math.abs(o.longitude) <= 180,
      ),
    [outlets],
  );
  return (
    <MapContainer
      center={[23.0225, 72.5714]}
      zoom={11}
      zoomControl={zoomControl}
      scrollWheelZoom={false}
      className="leaflet-map h-full w-full z-[0] bg-[#d8e5da]"
    >
      {scrollWheelZoom && <WheelZoomOnHover />}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <AutoBounds outlets={safeOutlets} focusId={selectedId} />
      {safeOutlets.map((o) => (
        <Marker
          key={o.id}
          position={[o.latitude, o.longitude]}
          icon={icons[o.status]}
          eventHandlers={{ click: () => onSelect?.(o) }}
        >
          <Popup>
            <div className="marker-popup">
              <strong>{o.name}</strong>
              <span>
                {o.address}, {o.city}
              </span>
              <StatusBadge status={o.status} />
              <span>Last visit: {formatDate(o.lastVisit)}</span>
              {onSelect && (
                <button onClick={() => onSelect(o)}>View details →</button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
