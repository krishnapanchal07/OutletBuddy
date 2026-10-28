import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";
import { keepFocusInDialog } from "../../lib/dialogFocus";

describe("dialog rendering", () => {
  it("renders an accessible titled dialog without changing its structure", () => {
    const html = renderToStaticMarkup(
      <Modal title="Edit outlet" onClose={() => {}}>
        <button type="button">Save changes</button>
      </Modal>,
    );
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('aria-label="Edit outlet"');
    expect(html).toContain("Save changes");
  });

  it("renders the delete confirmation actions", () => {
    const html = renderToStaticMarkup(
      <ConfirmDialog name="Urban Basket" onClose={() => {}} onConfirm={() => {}} />,
    );
    expect(html).toContain("Urban Basket");
    expect(html).toContain("Keep outlet");
    expect(html).toContain("Delete outlet");
  });
});

describe("modal keyboard focus", () => {
  const setup = () => {
    const first = { focus: vi.fn(), getClientRects: () => [1] };
    const last = { focus: vi.fn(), getClientRects: () => [1] };
    const dialog = {
      focus: vi.fn(),
      querySelectorAll: () => [first, last],
      contains: (element: unknown) => element === first || element === last,
    };
    const preventDefault = vi.fn();
    return { first, last, dialog, preventDefault };
  };

  it("wraps Tab from the last action to the first", () => {
    const { first, last, dialog, preventDefault } = setup();
    vi.stubGlobal("document", { activeElement: last });

    keepFocusInDialog({ shiftKey: false, preventDefault }, dialog as unknown as HTMLElement);
    expect(preventDefault).toHaveBeenCalledOnce();
    expect(first.focus).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });

  it("wraps Shift+Tab from the first action to the last", () => {
    const { first, last, dialog, preventDefault } = setup();
    vi.stubGlobal("document", { activeElement: first });

    keepFocusInDialog({ shiftKey: true, preventDefault }, dialog as unknown as HTMLElement);
    expect(preventDefault).toHaveBeenCalledOnce();
    expect(last.focus).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });
});
