export default function PageLoader() {
  return (
    <div
      className="page-content mx-auto max-w-[1740px] px-[38px] pt-[37px] pb-[48px]"
      role="status"
      aria-label="Loading dashboard"
    >
      <div className="skeleton skeleton-eyebrow mb-[18px] h-[10px] w-[170px]" />
      <div className="skeleton skeleton-title mb-[14px] h-7 w-[265px]" />
      <div className="skeleton skeleton-subtitle mb-[25px] h-[13px] w-[380px] max-w-[85%]" />
      <div className="skeleton-grid grid grid-cols-[repeat(4,_1fr)] gap-[15px] mb-[20px]">
        {[0, 1, 2, 3].map((n) => (
          <div
            className="surface skeleton-card rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] h-[170px] p-[17px]"
            key={n}
          >
            <div className="skeleton skeleton-icon mb-5 size-10 rounded-xl" />
            <div className="skeleton skeleton-subtitle mb-[25px] h-[13px] w-[380px] max-w-[85%]" />
            <div className="skeleton skeleton-number h-8 w-[65px]" />
          </div>
        ))}
      </div>
      <div className="surface skeleton-content rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] h-[310px] p-[26px]">
        <div className="skeleton skeleton-title mb-[14px] h-7 w-[265px]" />
        <div className="skeleton skeleton-row my-[14px] h-10 max-w-full" />
        <div className="skeleton skeleton-row my-[14px] h-10 max-w-full" />
        <div className="skeleton skeleton-row my-[14px] h-10 max-w-full" />
      </div>
      <span className="sr-only absolute left-[-10000px] w-[1px] h-[1px] overflow-hidden">
        Loading page content
      </span>
    </div>
  );
}
