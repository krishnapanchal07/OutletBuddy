import { useEffect, useRef, type ReactNode } from "react";
import { keepFocusInDialog } from "../../lib/dialogFocus";
import { X } from "lucide-react";

export default function Modal({
  title,
  subtitle,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      else if (e.key === "Tab" && ref.current)
        keepFocusInDialog(e, ref.current);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("keydown", handleKeyDown);
      previous?.focus();
    };
  }, []);
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`modal-dialog ${wide ? "modal-wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={ref}
        tabIndex={-1}
      >
        <div className="modal-heading flex items-start justify-between gap-[12px] p-[26px_27px_17px] [border-bottom:1px_solid_var(--border)]">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button
            aria-label="Close dialog"
            className="icon-button border-0 bg-[transparent] text-[color:var(--muted)] inline-flex items-center justify-center w-[34px] h-[34px] rounded-[8px]"
            onClick={onClose}
          >
            <X size={19} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
