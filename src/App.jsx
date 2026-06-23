import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline, AppBar, Toolbar, Typography, Button, IconButton, Box, Container, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { ThemeProvider, useTheme } from "./hooks/useTheme";
import { darkTheme, lightTheme } from "./styles/theme";
import GoogleLogin from "./components/GoogleLogin";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import InfoPage from "./pages/InfoPage";
import ManagePage from "./pages/ManagePage";
import { fetchOrchids } from "./store/orchidSlice";
import "./App.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Info", path: "/info" },
  { label: "Contact", path: "/contact" },
  { label: "Manage", path: "/manage" },
];

function AppContent() {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    dispatch(fetchOrchids()).catch(() => {});
  }, [dispatch]);

  const muiTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="app">
        <AppBar position="sticky" elevation={0} sx={{ 
          background: theme === "dark" ? "rgba(15, 15, 26, 0.95)" : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        }}>
          <Toolbar sx={{ maxWidth: 1400, width: "100%", mx: "auto", px: { xs: 1.5, md: 3 } }}>
            {/* Logo */}
            <LocalFloristIcon sx={{ mr: 0.5, color: "#f5576c", fontSize: 28 }} />
            <Typography
              variant="h6"
              component={NavLink}
              to="/"
              sx={{
                textDecoration: "none",
                fontWeight: 800,
                color: "inherit",
                mr: 4,
                background: "linear-gradient(135deg, #f093fb, #f5576c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              OrchidHub
            </Typography>

            {/* Nav links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, flex: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  end={item.path === "/"}
                  size="small"
                  sx={{
                    color: theme === "dark" ? "#999" : "#777",
                    fontWeight: 500,
                    px: 1.5,
                    minWidth: 0,
                    "&.active": {
                      color: theme === "dark" ? "#fff" : "#1a1a2e",
                      background: theme === "dark" ? "rgba(102, 126, 234, 0.2)" : "rgba(102, 126, 234, 0.1)",
                      fontWeight: 700,
                    },
                    "&:hover": {
                      color: theme === "dark" ? "#fff" : "#333",
                      background: "rgba(128, 128, 128, 0.1)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Right side */}
            <Box sx={{ flex: { xs: 1, md: 0 }, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
              <GoogleLogin />
              <Tooltip title={theme === "dark" ? "Light mode" : "Dark mode"}>
                <IconButton
                  onClick={toggleTheme}
                  size="small"
                  sx={{
                    color: theme === "dark" ? "#ffb300" : "#555",
                    background: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
                    width: 34,
                    height: 34,
                    "&:hover": {
                      background: theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  {theme === "dark" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
          <ErrorBoundary>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/manage" element={<ManagePage />} />
          </Routes>
          </ErrorBoundary>
        </Container>

        <Box component="footer" className="app-footer">
          <Container maxWidth="xl">
            <Typography variant="body2" color="text.secondary" align="center">
              🌸 OrchidHub — FER202 React Lab Project
            </Typography>
          </Container>
        </Box>
      </div>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
