import type { OutletInput } from "../types";

const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export type FormErrors = Partial<Record<keyof OutletInput, string>>;
export const validateOutlet = (form: OutletInput): FormErrors => {
  const errors: FormErrors = {};
  if (form.name.trim().length < 2)
    errors.name = "Enter an outlet name (at least 2 characters).";
  if (form.owner.trim().length < 2) errors.owner = "Enter the owner name.";
  if (!/^[6-9]\d{9}$/.test(form.phone.replace(/[\s-]/g, "")))
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (form.address.trim().length < 5)
    errors.address = "Enter a complete street address.";
  if (form.city.trim().length < 2) errors.city = "Enter a city.";
  if (
    !Number.isFinite(form.latitude) ||
    form.latitude < -90 ||
    form.latitude > 90
  )
    errors.latitude = "Latitude must be between -90 and 90.";
  if (
    !Number.isFinite(form.longitude) ||
    form.longitude < -180 ||
    form.longitude > 180
  )
    errors.longitude = "Longitude must be between -180 and 180.";
  if (!["Active", "Inactive", "Prospect"].includes(form.status))
    errors.status = "Choose an outlet status.";
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(form.lastVisit) ||
    Number.isNaN(new Date(`${form.lastVisit}T00:00:00`).getTime()) ||
    new Date(`${form.lastVisit}T00:00:00`).getFullYear() !==
      Number(form.lastVisit.slice(0, 4)) ||
    new Date(`${form.lastVisit}T00:00:00`).getMonth() + 1 !==
      Number(form.lastVisit.slice(5, 7)) ||
    new Date(`${form.lastVisit}T00:00:00`).getDate() !==
      Number(form.lastVisit.slice(8, 10))
  )
    errors.lastVisit = "Select a valid visit date.";
  else if (form.lastVisit > localToday())
    errors.lastVisit = "Visit date cannot be in the future.";
  return errors;
};
