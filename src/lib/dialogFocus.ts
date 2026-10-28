const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const keepFocusInDialog = (
  event: Pick<KeyboardEvent, "shiftKey" | "preventDefault">,
  dialog: HTMLElement,
) => {
  const elements = Array.from(
    dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((element) => element.getClientRects().length > 0);
  const first = elements[0];
  const last = elements[elements.length - 1];
  const active = document.activeElement;

  if (!first || !last) {
    event.preventDefault();
    dialog.focus();
    return;
  }

  if (event.shiftKey && (active === first || !dialog.contains(active))) {
    event.preventDefault();
    last.focus();
  } else if (
    !event.shiftKey &&
    (active === last || active === dialog || !dialog.contains(active))
  ) {
    event.preventDefault();
    first.focus();
  }
};
