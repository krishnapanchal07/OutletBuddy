import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = { data: { month: string; visits: number }[] };

const VisitActivityChart = ({ data }: Props) => (
  <section className="surface analytics-card rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
    <div className="section-title-row flex items-start justify-between gap-[15px] px-6 pt-[23px]">
      <div>
        <div className="tiny-eyebrow">VISIT ACTIVITY</div>
        <h2>Outlet visit overview</h2>
        <p>Count of outlets by their most recent visit month</p>
      </div>
      <span className="chart-tag inline-flex items-center gap-[6px] [border:1px_solid_var(--border)] bg-[var(--surface-2)] rounded-[6px] p-[8px_9px] text-[color:var(--muted)] text-[10px] whitespace-nowrap">
        <TrendingUp size={15} /> Last 6 months
      </span>
    </div>
    <div className="trend-chart h-[244px] m-[9px_16px_13px_8px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: -26, bottom: 0 }}
        >
          <defs>
            <linearGradient id="visitGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#c84993" stopOpacity={0.24} />
              <stop offset="100%" stopColor="#c84993" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 5"
            stroke="var(--chart-grid)"
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted)", fontSize: 12 }}
            dy={8}
          />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted)", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              fontSize: 12,
              color: "var(--text)",
            }}
          />
          <Area
            type="monotone"
            dataKey="visits"
            name="Outlets visited"
            stroke="#cb5297"
            strokeWidth={3}
            fill="url(#visitGradient)"
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </section>
);

export default VisitActivityChart;
