import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

type State = { hasError: boolean };
export default class ErrorBoundary extends Component<
  { children: ReactNode },
  State
> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application error", error, info.componentStack);
  }
  render() {
    if (this.state.hasError)
      return (
        <div className="unexpected-error max-w-[480px] m-[90px_auto] p-[25px] text-center" role="alert">
          <span>
            <AlertTriangle size={28} />
          </span>
          <h2>Something went wrong</h2>
          <p>
            We couldn't display this part of your workspace. Your saved outlets
            have not been deleted.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={17} /> Reload dashboard
          </button>
        </div>
      );
    return this.props.children;
  }
}
