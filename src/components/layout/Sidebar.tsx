import {
  Activity,
  ArrowLeftFromLine,
  ChartNoAxesCombined,
  LayoutDashboard,
  MapPinned,
  Moon,
  Store,
  Sun,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/outlets", label: "All outlets", icon: Store, end: false },
  { to: "/map", label: "Map explorer", icon: MapPinned, end: false },
  {
    to: "/analytics",
    label: "Analytics",
    icon: ChartNoAxesCombined,
    end: false,
  },
];
export default function Sidebar({
  mobileOpen,
  onClose,
  onLogout,
}: {
  mobileOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}) {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="sidebar-scrim"
          onClick={onClose}
        />
      )}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-head flex items-center justify-between px-3 pb-[35px]">
          <NavLink
            to="/"
            className="brand flex items-center gap-[11px]"
            onClick={onClose}
          >
            <span className="brand-mark">
              <span>o</span>
            </span>
            <span>
              <strong>
                outletBuddy<span>.</span>
              </strong>
            </span>
          </NavLink>
          <button
            className="mobile-sidebar-close icon-button border-0 bg-[transparent] text-[color:var(--muted)] inline-flex items-center justify-center w-[34px] h-[34px] rounded-[8px]"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <div className="workspace-label [border:1px_solid_#363845] rounded-[11px] p-[13px_12px] mb-[31px]">
          <span>WORKSPACE</span>
          <div>
            <span className="workspace-icon w-[29px] h-[29px] rounded-[8px] bg-[#393141] text-[color:#eb83b7] grid place-items-center">
              <Activity size={16} />
            </span>{" "}
            Sales operations <span className="workspace-caret ml-auto text-[color:#9699a8] text-[17px]">⌄</span>
          </div>
        </div>
        <nav className="side-navigation flex-1" aria-label="Main navigation">
          <div className="nav-section-title p-[0_12px] mb-[14px]">OVERVIEW</div>
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `side-link ${isActive ? "active" : ""}`
              }
              onClick={onClose}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom pt-6">
          <div className="nav-section-title p-[0_12px] mb-[14px]">PREFERENCES</div>
          <button className="side-link" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            <span>
              {theme === "dark" ? "Light appearance" : "Dark appearance"}
            </span>
          </button>
          <button className="side-link" onClick={onLogout}>
            <ArrowLeftFromLine size={19} />
            <span>Sign out</span>
          </button>
          <div className="sidebar-profile [border-top:1px_solid_#363944] m-[20px_0_0] p-[21px_8px_0] flex gap-[10px] items-center">
            <div className="profile-avatar w-[37px] h-[37px]">OB</div>
            <div>
              <strong>Demo Workspace</strong>
              <small>Administrator</small>
            </div>
            <span className="online-dot w-[7px] h-[7px] rounded-full bg-[#57c69a] ml-auto" />
          </div>
        </div>
      </aside>
    </>
  );
}
