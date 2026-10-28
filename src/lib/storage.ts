import { seedOutlets } from "../data/seed";
import type { Outlet } from "../types";

const STORAGE_KEY = "outletBUddy:outlets:v1";
export function loadOutlets(): { outlets: Outlet[]; warning: string | null } {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return { outlets: seedOutlets, warning: null };
    const value: unknown = JSON.parse(stored);
    if (!Array.isArray(value)) throw new Error("Data is not a list");
    const valid = value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.owner === "string" &&
        typeof item.phone === "string" &&
        typeof item.address === "string" &&
        typeof item.city === "string" &&
        typeof item.lastVisit === "string" &&
        typeof item.createdAt === "string" &&
        typeof item.latitude === "number" &&
        Number.isFinite(item.latitude) &&
        item.latitude >= -90 &&
        item.latitude <= 90 &&
        typeof item.longitude === "number" &&
        Number.isFinite(item.longitude) &&
        item.longitude >= -180 &&
        item.longitude <= 180 &&
        ["Active", "Inactive", "Prospect"].includes(item.status),
    );
    if (!valid) throw new Error("Saved outlet data is malformed");
    return { outlets: value as Outlet[], warning: null };
  } catch {
    return {
      outlets: seedOutlets,
      warning:
        "Saved outlet data could not be read. Showing sample data instead.",
    };
  }
}
export function saveOutlets(outlets: Outlet[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(outlets));
    return true;
  } catch {
    return false;
  }
}
export function resetOutlets() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
