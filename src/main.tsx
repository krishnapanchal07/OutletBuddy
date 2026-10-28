import { Component, StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type BoundaryState = { error: Error | null };
function formatError(value: unknown): string {
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  return String(value);
}

// Unlike a blank root, this gives a clear next step if a JS module fails to load.
class StartupBoundary extends Component<
  { children: ReactNode },
  BoundaryState
> {
  state: BoundaryState = { error: null };
  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error("React startup/render error:", error);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="startup-error" role="alert">
        <div className="startup-error-logo font-extrabold text-[34px] text-[color:#c1468b] mb-[14px]">o.</div>
        <h1>We couldn’t start the dashboard</h1>
        <p>
          Try stopping the terminal (Ctrl+C), then run <code>npm install</code>{" "}
          and <code>npm run dev -- --force</code>. This doesn’t erase your saved
          outlet data.
        </p>
        <pre>{formatError(this.state.error)}</pre>
        <button onClick={() => window.location.reload()}>Retry loading</button>
      </main>
    );
  }
}

function showImportError(error: unknown) {
  console.error("Unable to load the application module:", error);
  const root = document.getElementById("root");
  if (!root) return;
  root.replaceChildren();
  const main = document.createElement("main");
  main.className = "startup-error";
  main.setAttribute("role", "alert");
  const heading = document.createElement("h1");
  heading.textContent = "The application could not load";
  const message = document.createElement("p");
  message.textContent =
    "Restart Vite with npm run dev -- --force, then reload the page. If this persists, share the error below.";
  const detail = document.createElement("pre");
  detail.textContent = formatError(error);
  const button = document.createElement("button");
  button.textContent = "Retry";
  button.addEventListener("click", () => window.location.reload());
  main.append(heading, message, detail, button);
  root.append(main);
}

const root = document.getElementById("root");
if (root) {
  import("./App")
    .then(({ default: App }) => {
      createRoot(root).render(
        <StrictMode>
          <StartupBoundary>
            <App />
          </StartupBoundary>
        </StrictMode>,
      );
    })
    .catch(showImportError);
}
