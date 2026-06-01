import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Typography, Avatar, Chip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGoogleLogin } from "@react-oauth/google";
import { loginSuccess, logout, selectAuth } from "../store/authSlice";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function GoogleLogin() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(selectAuth);

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
          <Typography variant="caption" color="text.secondary" display="block" sx={{ lineHeight: 1.2 }}>
            {user?.name || "User"}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
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
      sx={{ textTransform: "none", borderRadius: 2, borderColor: "divider", color: "text.secondary" }}
      startIcon={<span>🔑</span>}
    >
      {GOOGLE_CLIENT_ID ? "Login with Google" : "Mock Login"}
    </Button>
  );
}

export default GoogleLogin;
