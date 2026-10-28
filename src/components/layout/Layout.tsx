import { useEffect, useState, type ReactNode } from "react";
import {  Menu, Plus, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useOutlets } from "../../context/OutletContext";
import { useToast } from "../../context/ToastContext";
import { useOutletDialogs } from "../../hooks/useOutletDialogs";

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/outlets": "Outlets",
  "/map": "Map explorer",
  "/analytics": "Analytics",
};
export default function Layout({
  children,
  onLogout,
}: {
  children: ReactNode;
  onLogout: () => void;
}) {
  const location = useLocation(),
    navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { warning } = useOutlets(),
    { toast } = useToast();
  const dialog = useOutletDialogs();
  useEffect(() => {
    if (warning) toast(warning, "error");
  }, [warning, toast]);
  return (
    <div className="app-shell flex min-h-screen">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onLogout={onLogout}
      />
      <div className="main-column ml-[249px] flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="topbar sticky top-0 z-[1000] flex h-[77px] items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-[37px]">
          <div className="topbar-left text-[12px] text-[color:var(--muted)] tracking-[.1px]">
            <button
              className="icon-button hamburger border-0 bg-[transparent] text-[color:var(--muted)] inline-flex items-center justify-center w-[34px] h-[34px] rounded-[8px]"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
            <span className="breadcrumb-parent">Workspace</span>
            <span className="breadcrumb-slash text-[color:#c8cbd4]">/</span>
            <strong>{pageNames[location.pathname] || "Dashboard"}</strong>
          </div>
          <div className="topbar-right gap-[20px]">
            <button className="top-search w-[235px] p-[10px_12px] bg-[var(--surface-2)] [border:1px_solid_var(--border)] flex items-center gap-[9px] text-[color:var(--muted)] rounded-[9px] text-left text-[11.5px]" onClick={() => navigate("/outlets")}>
              <Search size={17} />
              <span>Search outlets...</span>
              <kbd>⌘ K</kbd>
            </button>
          </div>
        </header>
        <main id="main-content" className="content-area w-full flex-1">
          {children}
        </main>
        <footer className="site-footer p-[22px_38px_25px] flex justify-between gap-[15px] text-[color:var(--muted)] text-[11px] [border-top:1px_solid_var(--border)] bg-[var(--surface)]">
          <span>
            © {new Date().getFullYear()} OutletBuddy{" "}
            <span className="footer-dot p-[0_4px] text-[color:var(--accent)]">·</span> Sales outlet management
          </span>
        </footer>
      </div>
      {dialog.dialogs}
      <button
        className="floating-add hidden"
        aria-label="Add new outlet"
        onClick={dialog.create}
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
