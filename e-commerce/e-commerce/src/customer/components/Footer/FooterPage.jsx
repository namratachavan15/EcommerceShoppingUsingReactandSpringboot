import React from "react";
import { Box, Grid, Typography, Link, Divider } from "@mui/material";

const FooterPage = () => {
  return (
    <Box sx={{ bgcolor: "#172337", color: "#fff", mt: 10, px: { xs: 3, md: 8 }, py: { xs: 6, md: 8 } }}>
      {/* Top Section */}
      <Grid container spacing={12}>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: "#9aa3b2", fontWeight: 700 }}>
            ABOUT
          </Typography>
          {["Contact Us", "About Us", "Careers", "Stories", "Press"].map((text) => (
            <Typography key={text} variant="body2" sx={{ mb: 0.7, color: "#d0d7dd", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
              {text}
            </Typography>
          ))}
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: "#9aa3b2", fontWeight: 700 }}>
            HELP
          </Typography>
          {["Payments", "Shipping", "Cancellation & Returns", "FAQ"].map((text) => (
            <Typography key={text} variant="body2" sx={{ mb: 0.7, color: "#d0d7dd", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
              {text}
            </Typography>
          ))}
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: "#9aa3b2", fontWeight: 700 }}>
            POLICY
          </Typography>
          {["Return Policy", "Terms of Use", "Security", "Privacy"].map((text) => (
            <Typography key={text} variant="body2" sx={{ mb: 0.7, color: "#d0d7dd", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
              {text}
            </Typography>
          ))}
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: "#9aa3b2", fontWeight: 700 }}>
            SOCIAL
          </Typography>
          {["Facebook", "Twitter", "YouTube"].map((text) => (
            <Typography key={text} variant="body2" sx={{ mb: 0.7, color: "#d0d7dd", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
              {text}
            </Typography>
          ))}
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: "#9aa3b2", fontWeight: 700 }}>
            MAIL US
          </Typography>
          <Typography variant="body2" sx={{ color: "#c7ced6", lineHeight: 1.5 }}>
            IndiaMart Pvt Ltd,<br />
            123,Nagala Park  Street,<br />
            Kolhapur - 416215<br />
            India
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: "#9aa3b2", fontWeight: 700 }}>
            REGISTERED OFFICE
          </Typography>
          <Typography variant="body2" sx={{ color: "#c7ced6", lineHeight: 1.5 }}>
            IndiaMart  Pvt Ltd,<br />
            Ground Floor, Some Building,<br />
            Bengaluru - 560034
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ bgcolor: "#394a5b", my: 4 }} />

      {/* Bottom Section */}
      <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ color: "#9aa3b2" }}>
            © {new Date().getFullYear()} StormSofts Technology
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
            <Link href="#" underline="hover" sx={{ color: "#d0d7dd", fontSize: 14 }}>Become a Seller</Link>
            <Link href="#" underline="hover" sx={{ color: "#d0d7dd", fontSize: 14 }}>Advertise</Link>
            <Link href="#" underline="hover" sx={{ color: "#d0d7dd", fontSize: 14 }}>Gift Cards</Link>
            <Link href="#" underline="hover" sx={{ color: "#d0d7dd", fontSize: 14 }}>Help Center</Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FooterPage;
