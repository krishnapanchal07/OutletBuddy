import {
  Activity,
  ArrowDownToLine,
  ChartNoAxesCombined,
  CircleCheck,
  Clock,
  MapPin,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { useOutlets } from "../context/OutletContext";
import { useToast } from "../context/ToastContext";
import { downloadCsv, getPercent } from "../lib/helpers";
import type { OutletStatus } from "../types";

const shades: Record<OutletStatus, string> = {
  Active: "#2caa81",
  Prospect: "#e4aa4b",
  Inactive: "#9daac0",
};
export default function Analytics() {
  const { outlets, restoreDemo } = useOutlets(),
    { toast } = useToast();
  const breakdown = useMemo(
    () =>
      (["Active", "Prospect", "Inactive"] as OutletStatus[]).map((status) => ({
        status,
        count: outlets.filter((o) => o.status === status).length,
      })),
    [outlets],
  );
  const byCity = useMemo(
    () =>
      Object.entries(
        outlets.reduce<Record<string, number>>((result, o) => {
          result[o.city] = (result[o.city] || 0) + 1;
          return result;
        }, {}),
      ).sort((a, b) => b[1] - a[1]),
    [outlets],
  );
  const recently = outlets.filter((o) => {
    const days =
      (Date.now() - new Date(`${o.lastVisit}T00:00:00`).getTime()) / 86400000;
    return days >= 0 && days <= 30;
  }).length;
  const exportData = () => {
    if (!outlets.length) {
      toast("No data to export", "info");
      return;
    }
    downloadCsv(outlets);
    toast("Report exported as CSV");
  };
  return (
    <div className="page-content mx-auto max-w-[1740px] px-[38px] pt-[37px] pb-[48px]">
      <div className="page-heading mb-[30px] flex items-end justify-between gap-5">
        <div>
          <div className="page-eyebrow">
            <span className="eyebrow-dot bg-[var(--accent)] w-[6px] h-[6px] rounded-full" /> NETWORK REPORTING
          </div>
          <h1>Analytics & insights</h1>
          <p>
            Understand your outlet footprint through meaningful, real-time
            summaries.
          </p>
        </div>
        <div className="heading-right flex items-center gap-[11px] pb-[3px]">
          <button className="btn btn-outline" onClick={exportData}>
            <ArrowDownToLine size={17} /> Download data
          </button>
        </div>
      </div>
      <div className="analytics-insight-grid grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-[16px] mb-[20px]">
        <div className="insight-card flex items-center gap-[14px] p-[20px_18px] [border:1px_solid_var(--border)] bg-[var(--surface)] rounded-[13px]">
          <span className="stat-icon stat-icon-violet grid size-11 place-items-center rounded-[11px] bg-[#f2e6f9] text-[color:#9a62c3]">
            <ChartNoAxesCombined size={22} />
          </span>
          <div>
            <small>Total locations</small>
            <strong>{outlets.length}</strong>
            <span>All recorded outlets</span>
          </div>
        </div>
        <div className="insight-card flex items-center gap-[14px] p-[20px_18px] [border:1px_solid_var(--border)] bg-[var(--surface)] rounded-[13px]">
          <span className="stat-icon stat-icon-green grid size-11 place-items-center rounded-[11px] bg-[#e4f7ec] text-[color:#2b9c78]">
            <CircleCheck size={22} />
          </span>
          <div>
            <small>Network activation</small>
            <strong>{getPercent(breakdown[0].count, outlets.length)}%</strong>
            <span>Of outlets are active</span>
          </div>
        </div>
        <div className="insight-card flex items-center gap-[14px] p-[20px_18px] [border:1px_solid_var(--border)] bg-[var(--surface)] rounded-[13px]">
          <span className="stat-icon stat-icon-orange grid size-11 place-items-center rounded-[11px] bg-[#fff4e0] text-[color:#d4a04a]">
            <Clock size={22} />
          </span>
          <div>
            <small>Visited in last 30 days</small>
            <strong>{recently}</strong>
            <span>Based on last visit dates</span>
          </div>
        </div>
        <div className="insight-card flex items-center gap-[14px] p-[20px_18px] [border:1px_solid_var(--border)] bg-[var(--surface)] rounded-[13px]">
          <span className="stat-icon stat-icon-blue grid size-11 place-items-center rounded-[11px] bg-[#eaf0fe] text-[color:#668ed0]">
            <MapPin size={22} />
          </span>
          <div>
            <small>Cities covered</small>
            <strong>{byCity.length}</strong>
            <span>Unique locations by city</span>
          </div>
        </div>
      </div>
      <div className="analytics-panels grid grid-cols-[minmax(0,_1.6fr)_minmax(280px,_1fr)] gap-[19px] mb-[20px]">
        <section className="surface analytics-wide rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
          <div className="section-title-row flex items-start justify-between gap-[15px] px-6 pt-[23px]">
            <div>
              <div className="tiny-eyebrow">OPERATIONS</div>
              <h2>Outlets by status</h2>
              <p>Distribution across your current outlet directory</p>
            </div>
            <span className="chart-tag inline-flex items-center gap-[6px] [border:1px_solid_var(--border)] bg-[var(--surface-2)] rounded-[6px] p-[8px_9px] text-[color:var(--muted)] text-[10px] whitespace-nowrap">
              <TrendingUp size={15} /> Current snapshot
            </span>
          </div>
          <div className="report-bar-chart h-[260px] m-[20px_15px_12px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={breakdown}
                margin={{ top: 15, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid
                  stroke="var(--chart-grid)"
                  vertical={false}
                  strokeDasharray="3 5"
                />
                <XAxis
                  dataKey="status"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted)", fontSize: 12 }}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--text)",
                  }}
                />
                <Bar
                  dataKey="count"
                  name="Outlets"
                  radius={[9, 9, 0, 0]}
                  maxBarSize={72}
                >
                  {breakdown.map((d) => (
                    <Cell key={d.status} fill={shades[d.status]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="surface cities-panel rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
          <div className="section-title-row flex items-start justify-between gap-[15px] px-6 pt-[23px]">
            <div>
              <div className="tiny-eyebrow">GEOGRAPHY</div>
              <h2>Where you operate</h2>
              <p>Outlets grouped by city</p>
            </div>
          </div>
          <div className="city-stats p-[22px]">
            {byCity.length ? (
              byCity.map(([name, count], index) => (
                <div key={name} className="city-stat-row flex items-center gap-[12px] mb-[23px]">
                  <span className="city-rank">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="city-stat-main flex-1 min-w-[0]">
                    <strong>{name}</strong>
                    <span className="city-bar-track w-full h-[7px] bg-[var(--surface-2)] block rounded-[99px] overflow-hidden">
                      <span
                        style={{
                          width: `${getPercent(count, outlets.length)}%`,
                        }}
                      />
                    </span>
                  </span>
                  <strong>{count}</strong>
                </div>
              ))
            ) : (
              <p>No locations added yet.</p>
            )}
          </div>
        </section>
      </div>
      <section className="surface data-note rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] flex items-start gap-[18px] p-[22px_24px]">
        <span className="data-note-icon bg-[var(--accent-bg)] text-[color:var(--accent)] rounded-[10px] h-[42px] w-[42px] grid place-items-center">
          <Activity size={22} />
        </span>
        <div>
          <h3>About these insights</h3>
          <p>
            All charts are calculated directly from your saved outlet records.
            Visit activity represents each outlet’s most recent visit date—not a
            full historical visit log. No revenue or sales amounts are invented.
          </p>
        </div>
      </section>
      <div className="reset-section mt-[26px] flex items-center justify-end gap-[15px]">
        <p>Want to start fresh with the assessment's sample dataset?</p>
        <button
          className="btn btn-outline"
          onClick={() => {
            if (
              window.confirm(
                "Replace all current outlets with the 16 original sample records? This cannot be undone.",
              )
            )
              restoreDemo();
          }}
        >
          <RefreshCw size={16} /> Restore sample data
        </button>
      </div>
    </div>
  );
}
