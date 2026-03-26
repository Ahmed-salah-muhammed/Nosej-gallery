import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background blobs */}
      <Box
        sx={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(42,20,180,0.06) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(67,56,202,0.05) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zIndex: 1,
          py: 8,
        }}
      >
        {/* Brand */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              letterSpacing: "0.14em",
              mb: 0.5,
              fontFamily: '"Playfair Display", serif',
              color: "text.primary",
            }}
          >
            ATELIER
          </Typography>
          <Typography
            variant="overline"
            sx={{
              color: "text.secondary",
              letterSpacing: "0.22em",
              fontWeight: 500,
            }}
          >
            THE DIGITAL BOUTIQUE
          </Typography>
        </Box>

        <Paper
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: "20px",
            bgcolor: "background.paper",
            boxShadow: "0 24px 48px rgba(19,27,46,0.08)",
            border: "1px solid",
            borderColor: "divider",
            width: "100%",
            mx: "auto",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 0.75 }}>
            {mode === "login" ? "Welcome back" : "Create account"}
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, color: "text.secondary" }}>
            {mode === "login"
              ? "Sign in to access your archive and orders."
              : "Join the Atelier. Get early access and exclusive deals."}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {mode === "register" && (
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    display: "block",
                    mb: 0.75,
                    fontSize: "0.68rem",
                    letterSpacing: "0.12em",
                  }}
                >
                  FULL NAME
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Ahmed Salah"
                  value={form.name}
                  onChange={set("name")}
                  error={!!errors.name}
                  helperText={errors.name}
                  autoComplete="name"
                />
              </Box>
            )}

            <Box sx={{ mb: 2.5 }}>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 700,
                  color: "text.secondary",
                  display: "block",
                  mb: 0.75,
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                }}
              >
                EMAIL ADDRESS
              </Typography>
              <TextField
                fullWidth
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={set("email")}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon
                        sx={{
                          fontSize: 18,
                          color: errors.email ? "error.main" : "text.disabled",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.75,
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    fontSize: "0.68rem",
                    letterSpacing: "0.12em",
                  }}
                >
                  PASSWORD
                </Typography>
                {mode === "login" && (
                  <Link
                    href="#"
                    variant="caption"
                    underline="hover"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    Forgot password?
                  </Link>
                )}
              </Box>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon
                        sx={{
                          fontSize: 18,
                          color: errors.password
                            ? "error.main"
                            : "text.disabled",
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
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 1.875, fontWeight: 900, fontSize: "0.9375rem", mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : mode === "login" ? (
                "SIGN IN"
              ) : (
                "CREATE ACCOUNT"
              )}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography
              variant="overline"
              sx={{
                color: "text.disabled",
                px: 1.5,
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
              }}
            >
              OR CONTINUE WITH
            </Typography>
          </Divider>

          <Grid container spacing={2}>
            <Grid size={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  login({ email: "demo@atelier.com", name: "Demo User" });
                  toast("Signed in as Demo User 👋", "success");
                  navigate(from, { replace: true });
                }}
                sx={{
                  py: 1.5,
                  fontWeight: 800,
                  fontSize: "0.78rem",
                  borderColor: "divider",
                  color: "text.primary",
                  bgcolor: "background.default",
                  "&:hover": {
                    bgcolor: "action.hover",
                    borderColor: "primary.main",
                  },
                }}
                startIcon={
                  <Box
                    component="img"
                    src="https://www.google.com/favicon.ico"
                    sx={{ width: 16, height: 16 }}
                  />
                }
              >
                Google
              </Button>
            </Grid>
            <Grid size={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  login({ email: "apple@atelier.com", name: "Apple User" });
                  toast("Signed in with Apple 👋", "success");
                  navigate(from, { replace: true });
                }}
                sx={{
                  py: 1.5,
                  fontWeight: 800,
                  fontSize: "0.78rem",
                  borderColor: "divider",
                  color: "text.primary",
                  bgcolor: "background.default",
                  "&:hover": {
                    bgcolor: "action.hover",
                    borderColor: "primary.main",
                  },
                }}
                startIcon={
                  <Box
                    component="svg"
                    viewBox="0 0 24 24"
                    sx={{ width: 16, height: 16 }}
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </Box>
                }
              >
                Apple
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {mode === "login"
              ? "New to the Atelier? "
              : "Already have an account? "}
            <Link
              component="button"
              variant="body2"
              onClick={toggleMode}
              sx={{
                color: "primary.main",
                fontWeight: 800,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
                background: "none",
                border: "none",
                cursor: "pointer",
                p: 0,
              }}
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </Link>
          </Typography>
        </Box>
      </Container>

      {/* Mini footer */}
      <Box
        sx={{
          py: 3,
          px: 4,
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1.5,
          mt: "auto",
          zIndex: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "text.disabled", fontWeight: 600 }}
        >
          © 2025 ATELIER. All rights reserved.
        </Typography>
        <Stack direction="row" spacing={3}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <Link
              key={l}
              href="#"
              variant="caption"
              underline="hover"
              sx={{ color: "text.disabled", fontWeight: 600 }}
            >
              {l}
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
