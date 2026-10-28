import type { Outlet, OutletInput } from "../types";

export const addToOutlets = (
  outlets: Outlet[],
  data: OutletInput,
  id: string,
  createdAt: string,
): Outlet[] => [{ ...data, id, createdAt }, ...outlets];

export const updateInOutlets = (
  outlets: Outlet[],
  id: string,
  data: OutletInput,
): Outlet[] =>
  outlets.map((outlet) =>
    outlet.id === id ? { ...outlet, ...data } : outlet,
  );

export const removeFromOutlets = (outlets: Outlet[], id: string): Outlet[] =>
  outlets.filter((outlet) => outlet.id !== id);
