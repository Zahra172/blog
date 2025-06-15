import React from "react";
import { Box, Container, Typography, Grid, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0a0a0a",
        color: "#fff",
        py: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent={{ xs: "center", md: "space-between" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We provide amazing solutions to your digital problems.
              <br />
              Designed with love using React & Material UI.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              <li>
                <Link href="/" color="inherit" underline="hover">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" color="inherit" underline="hover">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" color="inherit" underline="hover">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" color="inherit" underline="hover">
                  Privacy Policy
                </Link>
              </li>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">Email: test@example.com</Typography>
            <Typography variant="body2">Phone: +20 1013761845 </Typography>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="gray">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
