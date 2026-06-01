import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline, AppBar, Toolbar, Typography, Button, IconButton, Box, Container } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { ThemeProvider, useTheme } from "./hooks/useTheme";
import { darkTheme, lightTheme } from "./styles/theme";
import GoogleLogin from "./components/GoogleLogin";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import InfoPage from "./pages/InfoPage";
import NaturalPage from "./pages/NaturalPage";
import ManagePage from "./pages/ManagePage";
import "./App.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Natural", path: "/natural" },
  { label: "About", path: "/about" },
  { label: "Info", path: "/info" },
  { label: "Contact", path: "/contact" },
  { label: "Manage", path: "/manage" },
];

function AppContent() {
  const { theme, toggleTheme } = useTheme();
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
          <Toolbar sx={{ maxWidth: 1400, width: "100%", mx: "auto", px: { xs: 1, md: 2 } }}>
            <LocalFloristIcon sx={{ mr: 1, color: "#f5576c" }} />
            <Typography
              variant="h6"
              component={NavLink}
              to="/"
              sx={{ textDecoration: "none", fontWeight: 800, color: "inherit", mr: 4 }}
            >
              OrchidHub
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 0.5, flex: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  end={item.path === "/"}
                  sx={{
                    color: theme === "dark" ? "#aaa" : "#666",
                    "&.active": {
                      color: "#fff",
                      background: "rgba(102, 126, 234, 0.2)",
                    },
                    "&:hover": { color: theme === "dark" ? "#fff" : "#333", background: "rgba(255,255,255,0.08)" },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
            <Box sx={{ flex: { xs: 1, sm: 0 }, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
              <GoogleLogin />
              <IconButton onClick={toggleTheme} color="inherit">
                {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/natural" element={<NaturalPage />} />
            <Route path="/manage" element={<ManagePage />} />
          </Routes>
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
