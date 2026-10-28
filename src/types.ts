export type OutletStatus = "Active" | "Inactive" | "Prospect";

export interface Outlet {
  id: string;
  name: string;
  owner: string;
  phone: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  status: OutletStatus;
  lastVisit: string; // YYYY-MM-DD
  createdAt: string; // ISO timestamp
}

export type OutletInput = Omit<Outlet, "id" | "createdAt">;

export type SortKey =
  | "name-asc"
  | "name-desc"
  | "recent-visit"
  | "oldest-visit"
  | "status";
export type StatusFilter = "All" | OutletStatus;
