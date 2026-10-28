import { useMemo } from "react";
import type { Outlet } from "../types";

type VisitMonth = { month: string; visits: number };

const lastMonths = (outlets: Outlet[]): VisitMonth[] => {
  const now = new Date();
  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    const year = date.getFullYear();
    const month = date.getMonth();

    return {
      month: new Intl.DateTimeFormat("en-IN", { month: "short" }).format(date),
      visits: outlets.filter((outlet) => {
        const visited = new Date(`${outlet.lastVisit}T00:00:00`);
        return visited.getFullYear() === year && visited.getMonth() === month;
      }).length,
    };
  });
};

export const useDashboardOverview = (outlets: Outlet[]) => {
  const counts = useMemo(
    () => ({
      active: outlets.filter((outlet) => outlet.status === "Active").length,
      inactive: outlets.filter((outlet) => outlet.status === "Inactive").length,
      prospect: outlets.filter((outlet) => outlet.status === "Prospect").length,
    }),
    [outlets],
  );

  const recent = useMemo(
    () => [...outlets].sort((a, b) => b.lastVisit.localeCompare(a.lastVisit)),
    [outlets],
  );
  const recentVisits = outlets.filter((outlet) => {
    const days =
      (Date.now() - new Date(`${outlet.lastVisit}T00:00:00`).getTime()) /
      86400000;
    return days >= 0 && days <= 7;
  }).length;

  const chartData = useMemo(() => lastMonths(outlets), [outlets]);

  return { counts, recent, recentVisits, chartData };
};
