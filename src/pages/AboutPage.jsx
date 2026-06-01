import { Box, Typography, Paper, Chip, Container, Avatar } from "@mui/material";

const technologies = [
  "React 19", "Vite", "React Router", "MUI", "SCSS",
  "Redux Toolkit", "Formik", "Axios", "React Hooks"
];

function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          🌺 About OrchidHub
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your ultimate destination for discovering the beauty of orchids
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: "1px solid", borderColor: "divider", mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>Our Mission</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          OrchidHub is a React demonstration project built for the FER202 course at FPT University.
          We showcase a curated collection of 16 stunning orchid varieties from around the world,
          demonstrating modern React concepts including components, hooks, routing, UI libraries,
          CSS preprocessors, state management, and API integration.
        </Typography>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: "1px solid", borderColor: "divider", mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>Technologies</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {technologies.map((tech) => (
            <Chip key={tech} label={tech}
              sx={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                fontWeight: 600,
              }}
            />
          ))}
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>Developer</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main", fontSize: "1.8rem" }}>
            👨‍💻
          </Avatar>
          <Box>
            <Typography variant="h6">Vương Quân</Typography>
            <Typography variant="body2" color="text.secondary">
              Software Engineering Student at FPT University HCMC
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default AboutPage;
