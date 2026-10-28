import { useState, type FormEvent } from "react";
import { MapPin, Save } from "lucide-react";
import type { Outlet, OutletInput, OutletStatus } from "../../types";
import { validateOutlet, type FormErrors } from "../../lib/validation";
import Modal from "../ui/Modal";

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const defaults: OutletInput = {
  name: "",
  owner: "",
  phone: "",
  address: "",
  city: "Ahmedabad",
  latitude: 23.0225,
  longitude: 72.5714,
  status: "Prospect",
  lastVisit: today(),
};

export default function OutletForm({
  outlet,
  onClose,
  onSave,
}: {
  outlet?: Outlet;
  onClose: () => void;
  onSave: (data: OutletInput) => void;
}) {
  const [form, setForm] = useState<OutletInput>(() =>
    outlet
      ? {
          name: outlet.name,
          owner: outlet.owner,
          phone: outlet.phone,
          address: outlet.address,
          city: outlet.city,
          latitude: outlet.latitude,
          longitude: outlet.longitude,
          status: outlet.status,
          lastVisit: outlet.lastVisit,
        }
      : defaults,
  );
  const [coordRaw, setCoordRaw] = useState({
    latitude: String(form.latitude),
    longitude: String(form.longitude),
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const set = <K extends keyof OutletInput>(key: K, value: OutletInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalized: OutletInput = {
      ...form,
      name: form.name.trim(),
      owner: form.owner.trim(),
      phone: form.phone.replace(/[\s-]/g, ""),
      address: form.address.trim(),
      city: form.city.trim(),
      latitude:
        coordRaw.latitude.trim() === "" ? NaN : Number(coordRaw.latitude),
      longitude:
        coordRaw.longitude.trim() === "" ? NaN : Number(coordRaw.longitude),
    };
    const issues = validateOutlet(normalized);
    if (Object.keys(issues).length) {
      setErrors(issues);
      return;
    }
    onSave(normalized);
  };
  return (
    <Modal
      title={outlet ? "Edit outlet" : "Add new outlet"}
      subtitle={
        outlet
          ? "Update the information for this location."
          : "Fill out the details to register a new sales location."
      }
      wide
      onClose={onClose}
    >
      <form onSubmit={submit} noValidate>
        <div className="form-section-label mb-[15px] flex items-center gap-[6px] text-[10px] font-extrabold tracking-[1.35px] text-[var(--accent)]">
          OUTLET INFORMATION
        </div>
        <div className="form-grid grid grid-cols-2 gap-4">
          <div className="form-field flex min-w-0 flex-col gap-[7px]">
            <label htmlFor="outlet-name">
              Outlet name <b>*</b>
            </label>
            <input
              autoFocus
              id="outlet-name"
              placeholder="e.g. Horizon Retail"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <span className="field-error text-[10px] text-[#db4359]">
                {errors.name}
              </span>
            )}
          </div>
          <div className="form-field flex min-w-0 flex-col gap-[7px]">
            <label htmlFor="owner-name">
              Owner name <b>*</b>
            </label>
            <input
              id="owner-name"
              placeholder="Full name"
              value={form.owner}
              onChange={(e) => set("owner", e.target.value)}
              aria-invalid={!!errors.owner}
            />
            {errors.owner && (
              <span className="field-error text-[10px] text-[#db4359]">
                {errors.owner}
              </span>
            )}
          </div>
          <div className="form-field flex min-w-0 flex-col gap-[7px]">
            <label htmlFor="phone">
              Contact number <b>*</b>
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              maxLength={14}
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <span className="field-error text-[10px] text-[#db4359]">
                {errors.phone}
              </span>
            )}
          </div>
          <div className="form-field flex min-w-0 flex-col gap-[7px]">
            <label htmlFor="status">Outlet status</label>
            <select
              id="status"
              value={form.status}
              onChange={(e) => set("status", e.target.value as OutletStatus)}
            >
              {(["Active", "Inactive", "Prospect"] as OutletStatus[]).map(
                (s) => (
                  <option key={s}>{s}</option>
                ),
              )}
            </select>
          </div>
          <div className="form-field form-span flex min-w-0 flex-col gap-[7px] col-span-full">
            <label htmlFor="address">
              Street address <b>*</b>
            </label>
            <input
              id="address"
              placeholder="Street, area, landmark"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              aria-invalid={!!errors.address}
            />
            {errors.address && (
              <span className="field-error text-[10px] text-[#db4359]">
                {errors.address}
              </span>
            )}
          </div>
          <div className="form-field flex min-w-0 flex-col gap-[7px]">
            <label htmlFor="city">
              City <b>*</b>
            </label>
            <input
              id="city"
              placeholder="City"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              aria-invalid={!!errors.city}
            />
            {errors.city && (
              <span className="field-error text-[10px] text-[#db4359]">
                {errors.city}
              </span>
            )}
          </div>
          <div className="form-field flex min-w-0 flex-col gap-[7px]">
            <label htmlFor="visit-date">Last visit</label>
            <input
              id="visit-date"
              type="date"
              max={today()}
              value={form.lastVisit}
              onChange={(e) => set("lastVisit", e.target.value)}
              aria-invalid={!!errors.lastVisit}
            />
            {errors.lastVisit && (
              <span className="field-error text-[10px] text-[#db4359]">
                {errors.lastVisit}
              </span>
            )}
          </div>
        </div>
        <div className="form-section-label section-spaced mb-[15px] flex items-center gap-[6px] text-[10px] font-extrabold tracking-[1.35px] text-[var(--accent)] mt-6">
          <MapPin size={15} /> MAP COORDINATES <span>Use decimal degrees</span>
        </div>
        <div className="form-grid grid grid-cols-2 gap-4">
          {(["latitude", "longitude"] as const).map((key) => (
            <div
              className="form-field flex min-w-0 flex-col gap-[7px]"
              key={key}
            >
              <label htmlFor={key}>
                {key === "latitude" ? "Latitude" : "Longitude"} <b>*</b>
              </label>
              <input
                id={key}
                inputMode="decimal"
                type="number"
                step="any"
                value={coordRaw[key]}
                onChange={(e) => {
                  setCoordRaw((v) => ({ ...v, [key]: e.target.value }));
                  set(key, Number(e.target.value));
                }}
                aria-invalid={!!errors[key]}
              />
              {errors[key] && (
                <span className="field-error text-[10px] text-[#db4359]">
                  {errors[key]}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="form-hint mt-3 text-[10px] leading-normal text-[var(--muted)]">
          Tip: You can copy coordinates from Google Maps by right-clicking any
          location.
        </div>
        <div className="modal-actions pt-[21px] mt-[23px] [border-top:1px_solid_var(--border)] flex items-center justify-end gap-[10px]">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={16} />
            {outlet ? "Save changes" : "Create outlet"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
