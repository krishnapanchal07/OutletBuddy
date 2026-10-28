import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
} from "lucide-react";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("demo@outletbuddy.app");
  const [password, setPassword] = useState("Demo1234");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail && !trimmedPassword) {
      setError("Enter your email and password to continue");
      return;
    }

    if (!trimmedEmail) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!trimmedPassword) {
      setError("Please enter your password");
      return;
    }

    if (trimmedPassword.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    setError("");
    onLogin();
  };

  return (
    <div className="login-layout grid min-h-screen grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] bg-white">
      <section className="login-visual bg-[#1d1c2b] text-[color:#fff] min-h-[100vh] p-[38px_56px_25px] flex flex-col overflow-hidden relative">
        <div className="login-visual-brand flex items-center gap-[10px] text-[23px] font-extrabold tracking-[-1px] [font-family:Plus_Jakarta_Sans]">
          <span className="login-mini-logo">
            <span>o</span>
          </span>
          outletBuddy
        </div>

        <div className="login-visual-content mx-auto my-auto w-full max-w-[575px] min-w-0 py-[50px]">
          <h1>
            Your outlets.
            <br />
            <em>Your overview.</em>
            <br />
            One beautiful place.
          </h1>

          <p>
            Stay on top of every location, track activity, and see your entire
            sales network at a glance.
          </p>

          <div className="login-visual-card">
            <div className="login-visual-map">
              <div className="map-grid-art">
                <i className="grid-dot dot-a left-[25%] top-[40%]" />
                <i className="grid-dot dot-b left-[52%] top-[62%]" />
                <i className="grid-dot dot-c left-[67%] top-[32%]" />
                <i className="grid-dot dot-d left-[84%] top-[55%]" />
                <i className="grid-dot dot-e left-[38%] top-[76%]" />

                <svg viewBox="0 0 450 220" aria-hidden="true">
                  <path
                    d="M15 200Q75 30 140 85T260 60T440 40"
                    fill="none"
                    stroke="#ffffff"
                    opacity=".16"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 120Q105 190 200 130T445 180"
                    fill="none"
                    stroke="#ffffff"
                    opacity=".12"
                    strokeWidth="23"
                  />
                  <path
                    d="M30 200Q120 156 182 130T304 90T402 32"
                    fill="none"
                    stroke="#ee8dc1"
                    strokeWidth="2.5"
                    strokeDasharray="7 6"
                  />
                </svg>

                <div className="grid-focus">
                  <MapPin size={18} />
                  16 mapped outlets
                </div>
              </div>
            </div>

            <div className="login-visual-card-bottom flex gap-[9px] items-center p-[15px_10px_5px] text-[color:#aba7bb] text-[9px] font-extrabold tracking-[1px]">
              <span className="login-green-dot size-[7px] rounded-full bg-[#60dba8]" />
              LIVE NETWORK SNAPSHOT
              <span className="login-card-decoration ml-auto text-base tracking-normal">
                ↗
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="login-form-side flex items-center justify-center bg-white p-10 text-[#242333]">
        <div className="login-form-wrap w-full max-w-[414px]">
          <div className="login-mobile-brand hidden">
            <span className="login-mini-logo">
              <span>o</span>
            </span>
            outletBuddy
          </div>

          <div className="login-welcome mb-[11px] text-xs font-extrabold tracking-[0.4px] text-[#be468b]">
            Welcome back <span>✳</span>
          </div>

          <h2>Sign in to your workspace</h2>

          <p className="login-subtitle text-[13px] text-[color:#8c94a4] leading-[1.6] mb-[36px]">
            Enter your details to access your outlet dashboard.
          </p>

          <form onSubmit={submit} noValidate>
            <div className="form-field login-field mb-[22px] flex min-w-0 flex-col gap-[11px]">
              <label htmlFor="login-email">Email address</label>

              <div className="input-with-icon h-[51px] flex gap-[12px] items-center [border:1px_solid_#e6e8ed] rounded-[10px] p-[0_14px] text-[color:#a8afbb] bg-[#fff]">
                <Mail size={18} />
                <input
                  autoComplete="email"
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="form-field login-field mb-[22px] flex min-w-0 flex-col gap-[11px]">
              <div className="label-row flex items-center justify-between">
                <label htmlFor="login-password">Password</label>
              </div>

              <div className="input-with-icon h-[51px] flex gap-[12px] items-center [border:1px_solid_#e6e8ed] rounded-[10px] p-[0_14px] text-[color:#a8afbb] bg-[#fff]">
                <LockKeyhole size={18} />
                <input
                  autoComplete="current-password"
                  id="login-password"
                  type={visible ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter password"
                />

                <button
                  type="button"
                  className="password-toggle grid place-items-center border-0 bg-transparent text-[#9da4b2]"
                  aria-label={visible ? "Hide password" : "Show password"}
                  onClick={() => setVisible((v) => !v)}
                >
                  {visible ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="login-error text-[color:#d34b58] text-[11px] m-[-9px_0_15px]">
                {error}
              </p>
            )}

            <button
              className="btn btn-primary login-submit mt-[5px] h-[51px] w-full justify-between px-[18px] text-xs"
              type="submit"
            >
              Sign in to dashboard
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="login-terms mt-10 text-center text-[10.5px] leading-[1.7] text-[#a4a7b1]">
            © 2026 OutletBuddy · Sales outlet management
          </div>
        </div>
      </section>
    </div>
  );
}
