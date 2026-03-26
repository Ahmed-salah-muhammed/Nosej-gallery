import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  EmailOutlined as EmailIcon,
  LockOutlined as LockIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (mode === "register" && !form.name.trim())
      e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "At least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate async — 1s delay then log in
    setTimeout(() => {
      login({ email: form.email, name: form.name || form.email.split("@")[0] });
      toast(
        mode === "login"
          ? `Welcome back, ${form.email.split("@")[0]}! 👋`
          : `Account created! Welcome, ${form.name || form.email.split("@")[0]}! ✨`,
        "success",
      );
      navigate(from, { replace: true });
      setLoading(false);
    }, 1000);
  };

  const toggleMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setErrors({});
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-blue-50/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] rounded-full bg-indigo-50/30 blur-3xl pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center items-center px-4 py-16 z-10">
        {/* Brand */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-[0.2em] font-serif text-gray-900 mb-2">
            NOSEJ
          </h1>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
            THE DIGITAL BOUTIQUE
          </span>
        </div>

        <div className="w-full max-w-md bg-white p-10 rounded-[40px] shadow-2xl border border-gray-50">
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-sm text-gray-500 mb-10 font-bold">
            {mode === "login"
              ? "Sign in to access your archive and orders."
              : "Join the NOSEJ. Get early access and exclusive deals."}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {mode === "register" && (
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  FULL NAME
                </label>
                <TextField
                  fullWidth
                  placeholder="Ahmed Salah"
                  value={form.name}
                  onChange={set("name")}
                  error={!!errors.name}
                  helperText={errors.name}
                  autoComplete="name"
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                EMAIL ADDRESS
              </label>
              <TextField
                fullWidth
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={set("email")}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="email"
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon
                        sx={{
                          fontSize: 18,
                          color: errors.email ? "#ef4444" : "#9ca3af",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  PASSWORD
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    className="text-[10px] font-black  hover:underline uppercase tracking-widest"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <TextField
                fullWidth
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
                error={!!errors.password}
                helperText={errors.password}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon
                        sx={{
                          fontSize: 18,
                          color: errors.password ? "#ef4444" : "#9ca3af",
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPass((s) => !s)}
                        edge="end"
                        tabIndex={-1}
                      >
                        {showPass ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#131b2e] text-white font-black text-sm tracking-widest rounded-xl hover:bg-black transition-all mt-4 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : mode === "login" ? (
                "SIGN IN"
              ) : (
                "CREATE ACCOUNT"
              )}
            </button>

            <div className="text-center mt-6">
              <p className="text-xs font-bold text-gray-500">
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className=" font-black hover:underline"
                >
                  {mode === "login" ? "Sign up now" : "Sign in here"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
