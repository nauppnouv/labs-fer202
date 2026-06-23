import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { selectAllOrchids } from "../store/orchidSlice";
import OrchidCard from "../components/OrchidCard";

function NaturalPage() {
  const orchids = useSelector(selectAllOrchids);
  const naturalOrchids = orchids.filter((o) => o.isNatural);

  return (
    <Box sx={{ py: { xs: 3, md: 4 } }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>🌿 Natural Orchids</Typography>
        <Typography variant="body1" color="text.secondary">
          Discover {naturalOrchids.length} naturally grown orchid varieties
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {naturalOrchids.map((orchid) => (
          <Grid key={orchid.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <OrchidCard orchid={orchid} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default NaturalPage;
