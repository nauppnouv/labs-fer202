import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Button, Chip, Stack, Box, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function OrchidCard({ orchid }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { name, image, origin, color, rating, isSpecial, isNatural, category, numberOfLike } = orchid;

  const renderStars = (rate) => {
    const emptyColor = theme.palette.mode === "dark" ? "#555" : "#ddd";
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rate ? "#ffb300" : emptyColor, fontSize: "1rem" }}>★</span>
    ));
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: `0 12px 32px rgba(0,0,0,0.3), 0 0 20px color-mix(in srgb, ${color} 30%, transparent)`,
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ position: "relative", height: 220, overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="220"
          image={image}
          alt={name}
          sx={{
            transition: "transform 0.4s ease",
            "&:hover": { transform: "scale(1.1)" },
          }}
        />
        <Stack direction="column" spacing={0.5} sx={{ position: "absolute", top: 8, left: 8 }}>
          {isSpecial && (
            <Chip label="✦ Special" size="small"
              sx={{ background: "linear-gradient(135deg, #ffd700, #ff8c00)", color: "#1a1a2e", fontWeight: 600, fontSize: "0.7rem", height: 22 }}
            />
          )}
          {isNatural && (
            <Chip label="🌿 Natural" size="small"
              color="success" sx={{ fontWeight: 600, fontSize: "0.7rem", height: 22 }}
            />
          )}
        </Stack>
      </Box>
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h6" fontWeight={700} color="text.primary">
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontStyle="italic">
          {category}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">📍 {origin}</Typography>
          <Box sx={{ width: 14, height: 14, borderRadius: "50%", bgcolor: color, border: "2px solid", borderColor: "divider" }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: "auto", pt: 1 }}>
          {renderStars(rating)}
          <Box sx={{ flex: 1 }} />
          <FavoriteIcon sx={{ fontSize: 14, color: "#e53935", mr: 0.5 }} />
          <Typography variant="caption" color="#e53935">{numberOfLike}</Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate(`/detail/${orchid.id}`)}
          sx={{
            mt: 1,
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            "&:hover": { boxShadow: "0 4px 16px rgba(102, 126, 234, 0.5)" },
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default OrchidCard;
