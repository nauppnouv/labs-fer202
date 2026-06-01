import { Component } from "react";
import { Box, Typography, Button } from "@mui/material";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            ⚠️ Something went wrong
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {this.state.error?.message || "Unknown error"}
          </Typography>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
          <Button variant="text" sx={{ ml: 2 }} onClick={() => window.location.href = "/"}>
            Go Home
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
