import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Typography, Avatar, Chip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { loginSuccess, logout, selectAuth } from "../store/authSlice";

function GoogleLogin() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(selectAuth);

  // Simulated Google Login
  // In production, use @react-oauth/google with GoogleOAuthProvider
  const handleLogin = () => {
    // Simulate a Google login response
    const mockProfile = {
      name: "Vương Quân",
      email: "quan.vuong@example.com",
      picture: "",
      sub: "google-123456",
    };
    const mockToken = "mock-google-token-" + Date.now();
    dispatch(loginSuccess({ profile: mockProfile, token: mockToken }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoggedIn) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: "0.9rem" }}>
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
      Login with Google
    </Button>
  );
}

export default GoogleLogin;
