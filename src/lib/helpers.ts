import type { Outlet, OutletStatus, SortKey, StatusFilter } from "../types";

export const statusColors: Record<OutletStatus, string> = {
  Active: "#208e69",
  Inactive: "#8690a4",
  Prospect: "#bf8a39",
};

export const formatDate = (value: string) => {
  if (!value) return "Never";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.valueOf())
    ? "—"
    : new Intl.DateTimeFormat("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
};

export const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("") || "?";

export const getPercent = (num: number, total: number) =>
  total > 0 ? Math.round((num / total) * 100) : 0;

export function filterOutlets(
  outlets: Outlet[],
  query: string,
  status: StatusFilter = "All",
  sort: SortKey = "name-asc",
): Outlet[] {
  const q = query.trim().toLocaleLowerCase();
  const result = outlets.filter(
    (o) =>
      (status === "All" || o.status === status) &&
      (!q ||
        [o.name, o.owner, o.phone, o.address, o.city, o.id].some((v) =>
          v.toLocaleLowerCase().includes(q),
        )),
  );
  return result.sort((a, b) => {
    switch (sort) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "recent-visit":
        return b.lastVisit.localeCompare(a.lastVisit);
      case "oldest-visit":
        return a.lastVisit.localeCompare(b.lastVisit);
      case "status":
        return a.status.localeCompare(b.status) || a.name.localeCompare(b.name);
    }
  });
}

export const downloadCsv = (outlets: Outlet[]) => {
  const headings: (keyof Outlet)[] = [
    "id",
    "name",
    "owner",
    "phone",
    "address",
    "city",
    "latitude",
    "longitude",
    "status",
    "lastVisit",
  ];
  const escapeCell = (value: unknown) => {
    let str = String(value ?? "");
    // Avoid spreadsheet-formula injection for user-controlled text.
    if (/^[\s]*[=+@\-]/.test(str) && typeof value === "string") str = `'${str}`;
    return `"${str.replace(/"/g, '""')}"`;
  };
  const csv = [
    headings.join(","),
    ...outlets.map((row) =>
      headings.map((key) => escapeCell(row[key])).join(","),
    ),
  ].join("\r\n");
  const url = URL.createObjectURL(
    new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8;" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "outletBUddy-outlets.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
