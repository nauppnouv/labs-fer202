import { Box, Typography, Paper, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const contacts = [
  { icon: <EmailIcon sx={{ fontSize: 40 }} />, title: "Email", value: "contact@orchidhub.com" },
  { icon: <PhoneIcon sx={{ fontSize: 40 }} />, title: "Phone", value: "+84 123 456 789" },
  { icon: <LocationOnIcon sx={{ fontSize: 40 }} />, title: "Address", value: "FPT University, HCMC, Vietnam" },
  { icon: <AccessTimeIcon sx={{ fontSize: 40 }} />, title: "Hours", value: "Mon - Fri: 8:00 AM - 5:00 PM" },
];

function ContactPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          📬 Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Have questions about our orchids? We'd love to hear from you!
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {contacts.map((item) => (
          <Grid key={item.title} size={{ xs: 12, sm: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: "center",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                "&:hover": { transform: "translateY(-4px)", boxShadow: 3, transition: "all 0.3s ease" },
              }}
            >
              <Box sx={{ color: "primary.main", mb: 1.5 }}>{item.icon}</Box>
              <Typography variant="h6" gutterBottom>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">{item.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ContactPage;
