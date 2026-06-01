import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Typography, Avatar, Chip, useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGoogleLogin } from "@react-oauth/google";
import { loginSuccess, logout, selectAuth } from "../store/authSlice";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Google "G" logo SVG
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

function GoogleLogin() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(selectAuth);
  const muiTheme = useTheme();
  const isDark = muiTheme.palette.mode === "dark";

  // Real Google OAuth
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user info from Google
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const profile = await res.json();
        dispatch(loginSuccess({
          profile: {
            name: profile.name,
            email: profile.email,
            picture: profile.picture,
            sub: profile.sub,
          },
          token: tokenResponse.access_token,
        }));
      } catch (err) {
        console.error("Google login failed:", err);
      }
    },
    onError: () => console.error("Google login failed"),
  });

  // Mock login (demo mode - no client ID)
  const mockLogin = () => {
    const mockProfile = {
      name: "Vương Quân",
      email: "quan.vuong@example.com",
      picture: "",
      sub: "google-123456",
    };
    const mockToken = "mock-google-token-" + Date.now();
    dispatch(loginSuccess({ profile: mockProfile, token: mockToken }));
  };

  const handleLogin = () => {
    if (GOOGLE_CLIENT_ID) {
      googleLogin();
    } else {
      mockLogin();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoggedIn) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          src={user?.picture || ""}
          sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: "0.9rem" }}
        >
          {user?.name?.charAt(0) || "U"}
        </Avatar>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography
            variant="caption"
            display="block"
            noWrap
            sx={{
              lineHeight: 1.2,
              color: isDark ? "#e0e0e0" : "#333",
              fontWeight: 600,
              maxWidth: 180,
              fontFamily: '"Segoe UI", "Noto Sans", system-ui, sans-serif',
            }}
          >
            {user?.name || "User"}
          </Typography>
          <Typography
            variant="caption"
            display="block"
            sx={{
              fontSize: "0.7rem",
              color: isDark ? "#999" : "#666",
              fontFamily: '"Segoe UI", "Noto Sans", system-ui, sans-serif',
            }}
          >
            {user?.email || ""}
          </Typography>
        </Box>
        <Chip
          icon={<LogoutIcon />}
          label="Logout"
          variant="outlined"
          size="small"
          onClick={handleLogout}
          sx={{ color: "text.secondary", cursor: "pointer" }}
        />
      </Box>
    );
  }

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={handleLogin}
      startIcon={<GoogleIcon />}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        borderColor: "divider",
        color: "text.secondary",
        fontWeight: 500,
        px: 1.5,
        py: 0.5,
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
        minWidth: "fit-content",
        "&:hover": {
          borderColor: "text.primary",
          background: "rgba(255,255,255,0.05)",
        },
      }}
    >
      {GOOGLE_CLIENT_ID ? "Google" : "Mock"}
    </Button>
  );
}

export default GoogleLogin;
