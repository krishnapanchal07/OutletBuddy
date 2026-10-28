import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ToastProvider } from "../context/ToastContext";
import { OutletProvider } from "../context/OutletContext";
import Login from "./Login";

describe("login screen", () => {
  it("keeps the existing fields, login action, and demo snapshot", () => {
    const html = renderToStaticMarkup(
      <ToastProvider>
        <OutletProvider>
          <Login onLogin={() => {}} />
        </OutletProvider>
      </ToastProvider>,
    );

    expect(html).toContain('id="login-email"');
    expect(html).toContain('id="login-password"');
    expect(html).toContain("Sign in to dashboard");
    expect(html).toContain("16 mapped outlets");
  });
});
