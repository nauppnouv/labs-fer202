import { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import Grid from "@mui/material/Grid";
import ListOfOrchids from "../data/ListOfOrchids";
import OrchidCard from "../components/OrchidCard";

function HomePage() {
  const [categoryTab, setCategoryTab] = useState(0);
  const categories = ["All", ...new Set(ListOfOrchids.map((o) => o.category))];

  const filtered = categoryTab === 0
    ? ListOfOrchids
    : ListOfOrchids.filter((o) => o.category === categories[categoryTab]);

  return (
    <Box sx={{ py: { xs: 3, md: 4 } }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" sx={{
          background: "linear-gradient(135deg, #f093fb, #f5576c, #4facfe)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 800,
        }}>
          🌸 Our Orchid Collection
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Discover {ListOfOrchids.length} exquisite orchid varieties from around the world
        </Typography>
      </Box>

      <Tabs
        value={categoryTab}
        onChange={(_, v) => setCategoryTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, "& .MuiTab-root": { fontWeight: 600, textTransform: "none" } }}
      >
        {categories.map((cat) => (
          <Tab key={cat} label={cat} />
        ))}
      </Tabs>

      <Grid container spacing={3}>
        {filtered.map((orchid) => (
          <Grid key={orchid.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <OrchidCard orchid={orchid} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HomePage;
