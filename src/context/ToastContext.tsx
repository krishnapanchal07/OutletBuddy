import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type Kind = "success" | "error" | "info";
type Notification = { id: number; kind: Kind; message: string };
type ToastService = { toast: (message: string, kind?: Kind) => void };
const Context = createContext<ToastService | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const toast = useCallback((message: string, kind: Kind = "success") => {
    setNotifications((prev) => [
      ...prev.slice(-2),
      { id: Date.now() + Math.random(), kind, message },
    ]);
  }, []);
  useEffect(() => {
    if (!notifications.length) return;
    const timer = window.setTimeout(
      () => setNotifications((prev) => prev.slice(1)),
      4000,
    );
    return () => window.clearTimeout(timer);
  }, [notifications]);
  return (
    <Context.Provider value={{ toast }}>
      {children}
      <div className="toast-stack fixed z-[7000] right-[23px] top-[92px] flex flex-col gap-[10px] max-w-[min(420px,_calc(100vw_-_30px))]" aria-live="polite" aria-atomic="false">
        {notifications.map((notice) => (
          <div
            key={notice.id}
            className={`toast toast-${notice.kind}`}
            role="status"
          >
            {notice.kind === "success" ? (
              <CheckCircle2 size={18} />
            ) : notice.kind === "error" ? (
              <AlertCircle size={18} />
            ) : (
              <Info size={18} />
            )}
            <span>{notice.message}</span>
            <button
              className="icon-button tiny border-0 bg-[transparent] text-[color:var(--muted)] inline-flex items-center justify-center w-[34px] h-[34px] rounded-[8px]"
              aria-label="Dismiss notification"
              onClick={() =>
                setNotifications((prev) =>
                  prev.filter((t) => t.id !== notice.id),
                )
              }
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </Context.Provider>
  );
}
export const useToast = () => {
  const value = useContext(Context);
  if (!value) throw new Error("useToast requires ToastProvider");
  return value;
};
