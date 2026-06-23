import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, Button, Chip, Stack, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { selectAllOrchids } from "../store/orchidSlice";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orchids = useSelector(selectAllOrchids);
  const orchid = orchids.find((o) => String(o.id) === String(id));

  if (!orchid) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h4" gutterBottom>Orchid not found</Typography>
        <Button variant="contained" onClick={() => navigate("/")}>Back to Home</Button>
      </Box>
    );
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < orchid.rating ? "#ffd700" : "#555", fontSize: "1.4rem" }}>★</span>
    ));
  };

  return (
    <Box sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3, color: "text.secondary" }}>
        Back
      </Button>

      <Paper elevation={0} sx={{ overflow: "hidden", border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
        <Grid container>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative", height: { xs: 300, md: 450 } }}>
              <Box component="img" src={orchid.image} alt={orchid.name}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Stack direction="row" spacing={1} sx={{ position: "absolute", top: 12, left: 12 }}>
                {orchid.isSpecial && <Chip label="✦ Special" size="small" sx={{ background: "linear-gradient(135deg, #ffd700, #ff8c00)", color: "#1a1a2e", fontWeight: 600 }} />}
                {orchid.isNatural && <Chip label="🌿 Natural" size="small" color="success" sx={{ fontWeight: 600 }} />}
              </Stack>
            </Box>
            {orchid.clip && (
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>🎥 Orchid Clip</Typography>
                <Box component="video" src={orchid.clip} controls
                  sx={{ width: "100%", borderRadius: 2, maxHeight: 200 }}
                />
              </Box>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h4" fontWeight={800} gutterBottom>{orchid.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary" fontStyle="italic" gutterBottom>
                {orchid.category}
              </Typography>
              <Box sx={{ mb: 2 }}>{renderStars()}</Box>

              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <Typography variant="caption" color="text.secondary" textTransform="uppercase">Origin</Typography>
                    <Typography variant="body2">📍 {orchid.origin}</Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography variant="caption" color="text.secondary" textTransform="uppercase">Color</Typography>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box component="span" sx={{ width: 14, height: 14, borderRadius: "50%", bgcolor: orchid.color, border: "2px solid rgba(255,255,255,0.3)", display: "inline-block" }} />
                      {orchid.color}
                    </Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography variant="caption" color="text.secondary" textTransform="uppercase">Likes</Typography>
                    <Typography variant="body2"><FavoriteIcon sx={{ fontSize: 14, color: "#ff6b6b", verticalAlign: "middle", mr: 0.5 }} />{orchid.numberOfLike}</Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography variant="caption" color="text.secondary" textTransform="uppercase">ID</Typography>
                    <Typography variant="body2">#{orchid.id}</Typography>
                  </Grid>
                </Grid>
              </Paper>

              {orchid.description && (
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {orchid.description}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default DetailPage;
