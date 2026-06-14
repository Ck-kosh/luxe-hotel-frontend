import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";





// ─── Storage Helpers ──────────────────────────────────────────────────────────
const DB = {
  getUsers: () => { try { return JSON.parse(localStorage.getItem("auth_users") || "[]"); } catch { return []; } },
  saveUsers: (u) => localStorage.setItem("auth_users", JSON.stringify(u)),
  getSession: () => { try { return JSON.parse(sessionStorage.getItem("auth_session") || "null"); } catch { return null; } },
  saveSession: (u) => sessionStorage.setItem("auth_session", JSON.stringify(u)),
  clearSession: () => sessionStorage.removeItem("auth_session"),
};

// ─── OTP Generator ────────────────────────────────────────────────────────────
const genOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ─── Claude API — real-time password strength & smart feedback ────────────────
async function getAIFeedback(type, data) {
  const prompts = {
    password: `You are a concise security assistant. Analyze this password: "${data}". Reply with ONLY a JSON object, no markdown, no extra text:
{"score": <0-4>, "label": "<Weak|Fair|Good|Strong|Excellent>", "color": "<#hex>", "tip": "<one short actionable tip under 60 chars>"}
Score guide: 0=terrible, 1=weak, 2=fair, 3=good, 4=excellent. Colors: 0=#ef4444, 1=#f97316, 2=#eab308, 3=#22c55e, 4=#10b981`,
    username: `You are a concise assistant. Is this username appropriate and available-sounding: "${data}"? Reply ONLY with JSON, no markdown:
{"ok": <true|false>, "msg": "<message under 50 chars>"}`,
    login_hint: `A user failed to log in. Give a single friendly hint in under 60 chars. Reply ONLY with: {"hint": "<text>"}`,
  };
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 120,
        messages: [{ role: "user", content: prompts[type] }],
      }),
    });
    const d = await res.json();
    const text = d.content?.[0]?.text || "{}";
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return null;
  }
}

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#050810",
  panel: "#0b0f1a",
  border: "#1a2035",
  borderHover: "#2a3555",
  accent: "#4f8ef7",
  accentDim: "#1a2d52",
  accentGlow: "rgba(79,142,247,0.15)",
  text: "#e8edf8",
  muted: "#6b7899",
  error: "#ef4444",
  success: "#22c55e",
  warning: "#eab308",
};

// ─── Animated Background ──────────────────────────────────────────────────────
function Background() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", background: C.bg }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse 80% 50% at 20% 20%, rgba(79,142,247,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(120,80,255,0.05) 0%, transparent 60%)` }} />
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: Math.random() * 2 + 1,
          height: Math.random() * 2 + 1,
          borderRadius: "50%",
          background: "rgba(79,142,247,0.4)",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `twinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite alternate`,
        }} />
      ))}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4f8ef7" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────
function Field({ label, type = "text", value, onChange, onBlur, error, success, hint, icon, right, disabled, autoComplete }) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isPass = type === "password";
  const inputType = isPass ? (showPass ? "text" : "password") : type;
  const borderColor = error ? C.error : success ? C.success : focused ? C.accent : C.border;

  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>{label}</label>
      <div style={{ position: "relative" }}>
        {icon && <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.5, pointerEvents: "none" }}>{icon}</span>}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); onBlur && onBlur(e); }}
          disabled={disabled}
          autoComplete={autoComplete}
          style={{
            width: "100%", boxSizing: "border-box",
            background: focused ? "rgba(79,142,247,0.04)" : C.panel,
            border: `1px solid ${borderColor}`,
            borderRadius: 10, padding: `12px ${isPass ? 44 : right ? 44 : 14}px 12px ${icon ? 42 : 14}px`,
            color: C.text, fontSize: 14, fontFamily: "inherit", outline: "none",
            transition: "border-color .2s, background .2s, box-shadow .2s",
            boxShadow: focused ? `0 0 0 3px ${C.accentGlow}` : "none",
            opacity: disabled ? 0.5 : 1,
          }}
        />
        {isPass && (
          <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 16, padding: 4, lineHeight: 1 }}>
            {showPass ? "🙈" : "👁"}
          </button>
        )}
        {right && !isPass && <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>{right}</span>}
      </div>
      {(error || hint) && <p style={{ margin: "6px 0 0", fontSize: 12, color: error ? C.error : C.muted, display: "flex", alignItems: "center", gap: 4 }}>{error || hint}</p>}
      {success && !error && <p style={{ margin: "6px 0 0", fontSize: 12, color: C.success }}>✓ {success}</p>}
    </div>
  );
}

// ─── Strength Bar ─────────────────────────────────────────────────────────────
function StrengthBar({ score, label, color, tip, loading }) {
  if (!score && score !== 0) return null;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Strength</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: loading ? C.muted : color }}>{loading ? "Analyzing…" : label}</span>
      </div>
      <div style={{ height: 4, background: C.border, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: loading ? "30%" : `${(score / 4) * 100}%`, background: loading ? C.muted : color, borderRadius: 4, transition: "width .4s ease, background .4s ease" }} />
      </div>
      {tip && !loading && <p style={{ margin: "6px 0 0", fontSize: 11, color: C.muted }}>💡 {tip}</p>}
    </div>
  );
}

// ─── OTP Input ────────────────────────────────────────────────────────────────
function OTPInput({ value, onChange, disabled }) {
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);

  function handleKey(i, e) {
    if (e.key === "Backspace") {
      const next = digits.map((d, j) => j === i ? "" : d).join("").trim();
      onChange(next);
      if (i > 0 && !digits[i]) refs[i - 1].current?.focus();
    }
  }

  function handleChange(i, e) {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = digits.map((d, j) => j === i ? val : d).join("");
    onChange(next);
    if (val && i < 5) refs[i + 1].current?.focus();
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted);
    refs[Math.min(pasted.length, 5)].current?.focus();
  }

  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 24 }}>
      {refs.map((ref, i) => (
        <input key={i} ref={ref} type="text" inputMode="numeric" maxLength={1}
          value={digits[i] || ""} disabled={disabled}
          onChange={(e) => handleChange(i, e)} onKeyDown={(e) => handleKey(i, e)} onPaste={handlePaste}
          style={{
            width: 48, height: 56, textAlign: "center", fontSize: 22, fontWeight: 700,
            background: digits[i] ? C.accentDim : C.panel, border: `1.5px solid ${digits[i] ? C.accent : C.border}`,
            borderRadius: 12, color: C.text, fontFamily: "monospace", outline: "none",
            transition: "all .2s", boxShadow: digits[i] ? `0 0 12px ${C.accentGlow}` : "none",
          }}
          onFocus={e => e.target.style.borderColor = C.accent}
          onBlur={e => e.target.style.borderColor = digits[i] ? C.accent : C.border}
        />
      ))}
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
function Btn({ children, onClick, loading, variant = "primary", disabled, style: s }) {
  const base = { width: "100%", padding: "13px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: disabled || loading ? "not-allowed" : "pointer", border: "none", transition: "all .2s", letterSpacing: "0.04em", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, ...s };
  const variants = {
    primary: { background: disabled || loading ? C.accentDim : C.accent, color: disabled || loading ? C.muted : "#fff", boxShadow: disabled || loading ? "none" : "0 4px 20px rgba(79,142,247,0.3)" },
    ghost: { background: "transparent", color: C.muted, border: `1px solid ${C.border}` },
    danger: { background: "rgba(239,68,68,0.1)", color: C.error, border: `1px solid rgba(239,68,68,0.3)` },
  };
  return (
    <button onClick={disabled || loading ? undefined : onClick} style={{ ...base, ...variants[variant] }}
      onMouseEnter={e => { if (!disabled && !loading && variant === "primary") e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
      {loading ? <><Spin />Processing…</> : children}
    </button>
  );
}

function Spin() {
  return <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.2)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .6s linear infinite" }} />;
}

// ─── Timer ────────────────────────────────────────────────────────────────────
function Timer({ seconds, onDone }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (left <= 0) { onDone(); return; }
    const t = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  const pct = (left / seconds) * 100;
  return (
    <div style={{ textAlign: "center", marginBottom: 16 }}>
      <div style={{ position: "relative", width: 56, height: 56, margin: "0 auto 8px" }}>
        <svg viewBox="0 0 56 56" style={{ transform: "rotate(-90deg)", width: 56, height: 56 }}>
          <circle cx="28" cy="28" r="24" fill="none" stroke={C.border} strokeWidth="3" />
          <circle cx="28" cy="28" r="24" fill="none" stroke={left < 30 ? C.warning : C.accent} strokeWidth="3"
            strokeDasharray={`${2 * Math.PI * 24}`} strokeDashoffset={`${2 * Math.PI * 24 * (1 - pct / 100)}`}
            style={{ transition: "stroke-dashoffset 1s linear" }} />
        </svg>
        <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: left < 30 ? C.warning : C.text, fontFamily: "monospace" }}>{left}</span>
      </div>
      <p style={{ margin: 0, fontSize: 12, color: C.muted }}>Code expires in {left}s</p>
    </div>
  );
}

// ─── Card Wrapper ─────────────────────────────────────────────────────────────
function Card({ children, title, subtitle }) {
  return (
    <div style={{
      position: "relative", zIndex: 1, width: "100%", maxWidth: 440, margin: "0 auto",
      background: C.panel, border: `1px solid ${C.border}`, borderRadius: 20,
      padding: "36px 36px 32px", boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
      animation: "fadeUp .4s ease forwards",
    }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: C.accentDim, border: `1px solid ${C.accentGlow}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, margin: "0 auto 16px" }}>🔐</div>
        <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif", letterSpacing: "-0.02em" }}>{title}</h1>
        {subtitle && <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
      <div style={{ flex: 1, height: 1, background: C.border }} />
      {label && <span style={{ fontSize: 11, color: C.muted, letterSpacing: "0.08em" }}>{label}</span>}
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

// ─── Link Text ────────────────────────────────────────────────────────────────
function Link({ children, onClick }) {
  return <span onClick={onClick} style={{ color: C.accent, cursor: "pointer", fontWeight: 500, textDecoration: "none" }} onMouseEnter={e => e.target.style.textDecoration = "underline"} onMouseLeave={e => e.target.style.textDecoration = "none"}>{children}</span>;
}

// ─── Alert ────────────────────────────────────────────────────────────────────
function Alert({ type, msg }) {
  if (!msg) return null;
  const cfg = {
    error: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.25)", color: C.error, icon: "⚠️" },
    success: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.25)", color: C.success, icon: "✅" },
    info: { bg: "rgba(79,142,247,0.08)", border: "rgba(79,142,247,0.25)", color: C.accent, icon: "ℹ️" },
  };
  const c = cfg[type] || cfg.info;
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 18, display: "flex", gap: 10, alignItems: "flex-start", animation: "fadeUp .2s ease" }}>
      <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
      <p style={{ margin: 0, fontSize: 13, color: c.color, lineHeight: 1.5 }}>{msg}</p>
    </div>
  );
}

// ─── Social Button ────────────────────────────────────────────────────────────
function SocialBtn({ icon, label, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ flex: 1, padding: "10px 8px", borderRadius: 10, background: hov ? "rgba(255,255,255,0.04)" : "transparent", border: `1px solid ${hov ? C.borderHover : C.border}`, cursor: "pointer", color: C.text, fontSize: 13, fontFamily: "inherit", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all .2s" }}>
      <span style={{ fontSize: 18 }}>{icon}</span>{label}
    </button>
  );
}

// ─── Dashboard (logged-in view) ───────────────────────────────────────────────
function Dashboard({ user, onLogout }) {
  const [showSessions] = useState(true);
  const sessions = [
    { device: "Chrome · macOS", location: "Nairobi, KE", time: "Now", current: true },
    { device: "Safari · iPhone", location: "Nairobi, KE", time: "2h ago", current: false },
  ];
  return (
    <Card title={`Welcome, ${user.name.split(" ")[0]}! 👋`} subtitle="You're securely signed in">
      <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 12, padding: 16, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: C.accent, border: `2px solid ${C.accent}`, flexShrink: 0 }}>
          {user.name[0].toUpperCase()}
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 600, color: C.text, fontSize: 15 }}>{user.name}</p>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: C.muted }}>{user.email}</p>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <span style={{ background: "rgba(34,197,94,0.15)", color: C.success, fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>● Verified</span>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginBottom: 12 }}>Active Sessions</p>
        {sessions.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: s.current ? C.accentDim : "transparent", border: `1px solid ${s.current ? C.accent : C.border}`, borderRadius: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>{s.device.includes("iPhone") ? "📱" : "💻"}</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: C.text }}>{s.device}</p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: C.muted }}>{s.location} · {s.time}</p>
            </div>
            {s.current && <span style={{ fontSize: 10, fontWeight: 600, color: C.accent, background: "rgba(79,142,247,0.15)", padding: "2px 8px", borderRadius: 10 }}>CURRENT</span>}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[["🔑", "Change Password"], ["✉️", "Update Email"], ["🛡️", "2FA Settings"], ["📋", "Activity Log"]].map(([icon, label]) => (
          <div key={label} style={{ padding: "12px 14px", border: `1px solid ${C.border}`, borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.muted, transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHover; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}>
            <span style={{ fontSize: 18 }}>{icon}</span>{label}
          </div>
        ))}
      </div>

      <Btn variant="danger" onClick={onLogout}>Sign Out</Btn>
    </Card>
  );
}

// ─── Register View ────────────────────────────────────────────────────────────
function Register({ onSwitch }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [pwStrength, setPwStrength] = useState(null);
  const [pwLoading, setPwLoading] = useState(false);
  const [nameCheck, setNameCheck] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pendingOTP, setPendingOTP] = useState(null);
  const pwTimer = useRef(null);
  const nameTimer = useRef(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Real-time password strength via Claude
  useEffect(() => {
    if (!form.password) { setPwStrength(null); return; }
    clearTimeout(pwTimer.current);
    setPwLoading(true);
    pwTimer.current = setTimeout(async () => {
      const res = await getAIFeedback("password", form.password);
      setPwStrength(res);
      setPwLoading(false);
    }, 600);
    return () => clearTimeout(pwTimer.current);
  }, [form.password]);

  // Real-time username check via Claude
  useEffect(() => {
    if (!form.name || form.name.length < 2) { setNameCheck(null); return; }
    clearTimeout(nameTimer.current);
    nameTimer.current = setTimeout(async () => {
      const res = await getAIFeedback("username", form.name);
      setNameCheck(res);
    }, 700);
    return () => clearTimeout(nameTimer.current);
  }, [form.name]);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email address";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  }

  async function submit() {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    const users = DB.getUsers();
    if (users.find(u => u.email === form.email)) return setAlert({ type: "error", msg: "This email is already registered. Try signing in instead." });
    setLoading(true);
    const otp = genOTP();
    // Simulate sending email
    await new Promise(r => setTimeout(r, 1000));
    setPendingOTP({ otp, form });
    setLoading(false);
  }

  if (pendingOTP) return <VerifyOTP pending={pendingOTP} mode="register" onSuccess={(user) => { DB.saveSession(user); window.location.reload(); }} onBack={() => setPendingOTP(null)} />;

  return (
    <Card title="Create Account" subtitle="Join thousands of secure users worldwide">
      {alert && <Alert {...alert} />}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <SocialBtn icon="🔵" label="Google" onClick={() => setAlert({ type: "info", msg: "OAuth providers require backend integration." })} />
        <SocialBtn icon="⬛" label="GitHub" onClick={() => setAlert({ type: "info", msg: "OAuth providers require backend integration." })} />
      </div>
      <Divider label="or register with email" />

      <Field label="Full Name" value={form.name} onChange={e => set("name", e.target.value)} icon="👤" error={errors.name}
        success={nameCheck?.ok ? nameCheck.msg : null} hint={nameCheck && !nameCheck.ok ? nameCheck.msg : null} />
      <Field label="Email Address" type="email" value={form.email} onChange={e => set("email", e.target.value)} icon="✉️" error={errors.email} autoComplete="email" />
      <Field label="Password" type="password" value={form.password} onChange={e => set("password", e.target.value)} error={errors.password} autoComplete="new-password" />
      <StrengthBar {...(pwStrength || {})} loading={pwLoading && form.password.length > 0} />
      <Field label="Confirm Password" type="password" value={form.confirm} onChange={e => set("confirm", e.target.value)} error={errors.confirm} autoComplete="new-password" />

      <Btn onClick={submit} loading={loading}>Create Account →</Btn>
      <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: C.muted }}>Already have an account? <Link onClick={onSwitch}>Sign in</Link></p>
    </Card>
  );
}

// ─── Login View ───────────────────────────────────────────────────────────────
function Login({ onSwitch, onForgot, onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [aiHint, setAiHint] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function submit() {
    const e = {};
    if (!form.email) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    if (Object.keys(e).length) return setErrors(e);
    setErrors({});
    setLoading(true);

    await new Promise(r => setTimeout(r, 800));
    const users = DB.getUsers();
    const user = users.find(u => u.email === form.email && u.password === form.password);

    if (user) {
      DB.saveSession(user);
      onLogin(user);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 2) {
        const hint = await getAIFeedback("login_hint", null);
        setAiHint(hint?.hint);
      }
      setAlert({ type: "error", msg: newAttempts >= 3 ? `Too many failed attempts. Consider resetting your password.` : "Incorrect email or password. Please try again." });
    }
    setLoading(false);
  }

  function handleKey(e) { if (e.key === "Enter") submit(); }

  return (
    <Card title="Welcome Back" subtitle="Sign in to your secure account">
      {alert && <Alert {...alert} />}
      {aiHint && <Alert type="info" msg={`💡 ${aiHint}`} />}

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <SocialBtn icon="🔵" label="Google" onClick={() => setAlert({ type: "info", msg: "OAuth requires backend integration." })} />
        <SocialBtn icon="⬛" label="GitHub" onClick={() => setAlert({ type: "info", msg: "OAuth requires backend integration." })} />
      </div>
      <Divider label="or sign in with email" />

      <Field label="Email Address" type="email" value={form.email} onChange={e => set("email", e.target.value)} onKeyDown={handleKey} icon="✉️" error={errors.email} autoComplete="email" />
      <Field label="Password" type="password" value={form.password} onChange={e => set("password", e.target.value)} onKeyDown={handleKey} error={errors.password} autoComplete="current-password" />

      <div style={{ textAlign: "right", marginTop: -10, marginBottom: 18 }}>
        <Link onClick={onForgot}>Forgot password?</Link>
      </div>

      <Btn onClick={submit} loading={loading}>Sign In →</Btn>

      {attempts >= 3 && (
        <Btn variant="ghost" onClick={onForgot} style={{ marginTop: 10 }}>Reset Password Instead</Btn>
      )}

      <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: C.muted }}>Don't have an account? <Link onClick={onSwitch}>Register</Link></p>
    </Card>
  );
}

// ─── OTP Verification ─────────────────────────────────────────────────────────
function VerifyOTP({ pending, mode, onSuccess, onBack }) {
  const [otp, setOtp] = useState("");
  const [alert, setAlert] = useState({ type: "info", msg: `A 6-digit code has been sent to ${pending.form?.email || pending.email}. (Demo: ${pending.otp})` });
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);
  const [resent, setResent] = useState(false);
  const [currentOTP, setCurrentOTP] = useState(pending.otp);

  async function verify() {
    if (otp.length < 6) return setAlert({ type: "error", msg: "Please enter the complete 6-digit code." });
    if (expired) return setAlert({ type: "error", msg: "This code has expired. Please request a new one." });
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (otp === currentOTP) {
      if (mode === "register") {
        const users = DB.getUsers();
        const newUser = { id: Date.now(), name: pending.form.name, email: pending.form.email, password: pending.form.password, verified: true, createdAt: new Date().toISOString() };
        DB.saveUsers([...users, newUser]);
        onSuccess(newUser);
      } else {
        onSuccess();
      }
    } else {
      setAlert({ type: "error", msg: "Incorrect code. Please check and try again." });
      setLoading(false);
    }
  }

  async function resend() {
    const newOTP = genOTP();
    setCurrentOTP(newOTP);
    setOtp("");
    setExpired(false);
    setResent(true);
    setAlert({ type: "success", msg: `New code sent! (Demo: ${newOTP})` });
    setTimeout(() => setResent(false), 3000);
  }

  return (
    <Card title="Verify Your Email" subtitle={`Enter the 6-digit code sent to ${pending.form?.email || pending.email}`}>
      <Alert {...alert} />
      {!expired && <Timer seconds={120} onDone={() => { setExpired(true); setAlert({ type: "error", msg: "Code expired. Please request a new one." }); }} />}
      <OTPInput value={otp} onChange={setOtp} disabled={loading || expired} />
      <Btn onClick={verify} loading={loading} disabled={otp.length < 6 || expired}>Verify Code ✓</Btn>
      <div style={{ textAlign: "center", marginTop: 14 }}>
        {expired || true ? (
          <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>
            Didn't receive it? <Link onClick={resend}>Resend code</Link>
          </p>
        ) : null}
      </div>
      <div style={{ marginTop: 12 }}>
        <Btn variant="ghost" onClick={onBack}>← Go Back</Btn>
      </div>
    </Card>
  );
}

// ─── Forgot Password ──────────────────────────────────────────────────────────
function ForgotPassword({ onBack }) {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOTP, setSentOTP] = useState(null);
  const [passwords, setPasswords] = useState({ pw: "", confirm: "" });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pwStrength, setPwStrength] = useState(null);
  const [pwLoading, setPwLoading] = useState(false);
  const pwTimer = useRef(null);

  useEffect(() => {
    if (!passwords.pw) { setPwStrength(null); return; }
    clearTimeout(pwTimer.current);
    setPwLoading(true);
    pwTimer.current = setTimeout(async () => {
      const res = await getAIFeedback("password", passwords.pw);
      setPwStrength(res);
      setPwLoading(false);
    }, 600);
    return () => clearTimeout(pwTimer.current);
  }, [passwords.pw]);

  async function sendReset() {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return setAlert({ type: "error", msg: "Enter a valid email address." });
    const users = DB.getUsers();
    const user = users.find(u => u.email === email);
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const code = genOTP();
    setSentOTP({ otp: code, email, user });
    setAlert({ type: "success", msg: `Reset code sent! (Demo code: ${code})` });
    setStep(2);
    setLoading(false);
  }

  async function verifyOTP() {
    if (otp.length < 6) return setAlert({ type: "error", msg: "Enter the 6-digit code." });
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    if (otp === sentOTP.otp) { setAlert(null); setStep(3); }
    else setAlert({ type: "error", msg: "Incorrect code." });
    setLoading(false);
  }

  async function resetPassword() {
    if (passwords.pw.length < 8) return setAlert({ type: "error", msg: "Password must be at least 8 characters." });
    if (passwords.pw !== passwords.confirm) return setAlert({ type: "error", msg: "Passwords do not match." });
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const users = DB.getUsers();
    const updated = users.map(u => u.email === sentOTP.email ? { ...u, password: passwords.pw } : u);
    DB.saveUsers(updated);
    setAlert({ type: "success", msg: "Password reset successfully! You can now sign in." });
    setTimeout(onBack, 2000);
    setLoading(false);
  }

  const stepLabels = ["Email", "Verify", "Reset"];

  return (
    <Card title="Reset Password" subtitle="We'll send a verification code to your email">
      {/* Mini stepper */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        {stepLabels.map((l, i) => {
          const idx = i + 1;
          const done = step > idx, active = step === idx;
          return (
            <div key={l} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: done ? C.success : active ? C.accent : C.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: done || active ? "#fff" : C.muted, transition: "all .3s" }}>{done ? "✓" : idx}</div>
                <span style={{ fontSize: 10, color: active ? C.accent : C.muted, letterSpacing: "0.05em" }}>{l}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 1, background: done ? C.success : C.border, margin: "0 6px", marginBottom: 16, transition: "all .3s" }} />}
            </div>
          );
        })}
      </div>

      {alert && <Alert {...alert} />}

      {step === 1 && (
        <>
          <Field label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} icon="✉️" />
          <Btn onClick={sendReset} loading={loading}>Send Reset Code →</Btn>
        </>
      )}

      {step === 2 && (
        <>
          <p style={{ textAlign: "center", fontSize: 13, color: C.muted, marginBottom: 16 }}>Enter the code sent to <strong style={{ color: C.text }}>{sentOTP?.email}</strong></p>
          <OTPInput value={otp} onChange={setOtp} disabled={loading} />
          <Btn onClick={verifyOTP} loading={loading} disabled={otp.length < 6}>Verify Code →</Btn>
        </>
      )}

      {step === 3 && (
        <>
          <Field label="New Password" type="password" value={passwords.pw} onChange={e => setPasswords(p => ({ ...p, pw: e.target.value }))} />
          <StrengthBar {...(pwStrength || {})} loading={pwLoading && passwords.pw.length > 0} />
          <Field label="Confirm New Password" type="password" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
            error={passwords.confirm && passwords.pw !== passwords.confirm ? "Passwords don't match" : null}
            success={passwords.confirm && passwords.pw === passwords.confirm && passwords.confirm.length > 0 ? "Passwords match" : null} />
          <Btn onClick={resetPassword} loading={loading}>Set New Password ✓</Btn>
        </>
      )}

      <div style={{ marginTop: 12 }}>
        <Btn variant="ghost" onClick={onBack}>← Back to Sign In</Btn>
      </div>
    </Card>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("login"); // login | register | forgot
  const [user, setUser] = useState(() => DB.getSession());

  function handleLogin(u) { setUser(u); }
  function handleLogout() { DB.clearSession(); setUser(null); setView("login"); }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body { font-family: 'DM Sans', sans-serif; background: ${C.bg}; color: ${C.text}; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        #root { width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes twinkle { from { opacity: 0.2; } to { opacity: 0.8; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 100px ${C.panel} inset !important; -webkit-text-fill-color: ${C.text} !important; }
      `}</style>

      <Background />

      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : view === "login" ? (
        <Login onSwitch={() => setView("register")} onForgot={() => setView("forgot")} onLogin={handleLogin} />
      ) : view === "register" ? (
        <Register onSwitch={() => setView("login")} />
      ) : (
        <ForgotPassword onBack={() => setView("login")} />
      )}
    </>
  );
}
 export default Auth